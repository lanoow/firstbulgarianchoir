"use server";

import { auth, signIn, signOut } from "@/auth";
import { utapi } from "@/server/uploadthing";
import { getUserByEmail } from "@/data/user";
import { AuthError } from "next-auth";
import { Locale, SafeUser } from "@/types";
import { prisma } from "./db";
import slugify from "slugify";
import bcrypt from "bcrypt";

import {
  LoginSchema,
  LoginSchemaType,
  ChangePasswordSchema,
  ChangePasswordSchemaType,
  SignUpSchema,
  UpdateProfileSchema,
  UpdateProfileSchemaType,
  EventSchemaType,
  EventSchema,
} from "@/schemas";
import { historyObject } from "@/app/[locale]/(dashboard)/dashboard/content/history/client";

export async function getCurrentUser() {
  try {
    const session = await auth();

    if (!session?.user?.email) return null;

    const currentUser = await getUserByEmail(session.user.email);

    if (!currentUser) return null;

    return {
      ...currentUser,
      createdAt: currentUser.createdAt.toISOString(),
      updatedAt: currentUser.updatedAt.toISOString(),
    };
  } catch (error: any) {
    return null;
  }
}

export async function getUsers() {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeUsers = users.map((users) => ({
      ...users,
      createdAt: users.createdAt.toISOString(),
      updatedAt: users.updatedAt.toISOString(),
    }));

    return safeUsers;
  } catch (error: any) {
    throw new Error(error);
  }
}

// File uploads

export const utDeleteFile = async (files: string | string[]) => {
  await utapi.deleteFiles(files);
};

// Auth

export const login = async (data: LoginSchemaType) => {
  const currentUser = await getCurrentUser();

  if (currentUser) {
    return { error: "ALREADY_SIGNED_IN" };
  }

  const validatedFields = LoginSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: "INVALID_CREDENTIALS" };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "USER_NOT_FOUND" };
  }

  try {
    await signIn("credentials", {
      email,
      password,
    });

    return { success: "SIGNED_IN" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "INVALID_CREDENTIALS" };
          break;

        default:
          return { error: "UNKNOWN_ERROR" };
          break;
      }
    }

    throw error;
  }
};

export const logout = async () => {
  await signOut();
};

export const changePassword = async (
  user: SafeUser,
  values: ChangePasswordSchemaType
) => {
  const validatedFields = ChangePasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "INVALID_FIELDS" };
  }

  const { oldPassword, newPassword } = validatedFields.data;

  if (!user) {
    return { error: "USER_NOT_FOUND" };
  }

  const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

  if (!isPasswordValid) {
    return { error: "INVALID_CREDENTIALS" };
  }

  const hashedPassword = await bcrypt.hash(newPassword, 12);

  await prisma.user.update({
    where: { id: user.id },
    data: { password: hashedPassword },
  });

  return { success: "PASSWORD_UPDATED" };
};

export const register = async (data: any) => {
  const currentUser = await getCurrentUser();

  if (currentUser) {
    return { error: "ALREADY_SIGNED_IN" };
  }

  const validatedFields = SignUpSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: "INVALID_FIELDS" };
  }

  const { name, email, password } = validatedFields.data;

  const hashedPassword = await bcrypt.hash(password, 12);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "EMAIL_ALREADY_IN_USE" };
  }

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return { success: "ACCOUNT_CREATED" };
};

export const changeDetails = async (
  currentUser: SafeUser,
  values: UpdateProfileSchemaType
) => {
  const validatedFields = UpdateProfileSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "INVALID_FIELDS" };
  }

  const { name, email } = validatedFields.data;

  if (name === currentUser.name && email === currentUser.email) {
    return { error: "NO_CHANGES" };
  }

  if (email !== currentUser.email) {
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return { error: "EMAIL_ALREADY_IN_USE" };
    }
  }

  await prisma.user.update({
    where: { id: currentUser.id },
    data: { name, email },
  });

  return { success: "CHANGED_SUCCESSFULLY" };
};

export const getHistory = async (language: Locale) => {
  const history = await prisma.history.findUnique({
    where: { language },
  });

  return history;
};

export const updateHistory = async (content: historyObject[]) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return { error: "NOT_AUTHENTICATED" };
  }

  try {
    content.forEach(async (c: historyObject) => {
      const content = JSON.stringify(c.content);

      await prisma.history.upsert({
        where: {
          language: c.language,
        },
        create: {
          language: c.language,
          content,
        },
        update: {
          content,
        },
      });
    });

    return { success: "CONTENT_UPDATED" };
  } catch {
    return { error: "UNKNOWN_ERROR" };
  }
};

export const eventCreate = async (values: EventSchemaType) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return { error: "NOT_AUTHENTICATED" };
  }

  const validatedFields = EventSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "INVALID_FIELDS" };
  }

  const {
    titleBG,
    titleEN,
    contentBG,
    contentEN,
    locationBG,
    locationEN,
    date,
    images,
  } = validatedFields.data;

  const slug = slugify(titleBG, {
    locale: "bg",
    lower: true,
    trim: true,
  });

  await prisma.event.create({
    data: {
      slug,
      titleBG,
      contentBG,
      locationBG,
      date,
      images,
      titleEN,
      contentEN,
      locationEN,
      authorId: currentUser.id,
    },
  });

  return { success: "EVENT_CREATED" };
};

export async function uploadThings(fd: FormData) {
  const files = fd.getAll("files") as File[];

  console.log({ files });

  return files;
}
