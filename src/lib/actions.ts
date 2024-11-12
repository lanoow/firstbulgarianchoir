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
  ContactUsSchemaType,
  ContactUsSchema,
} from "@/schemas";
import { historyObject } from "@/app/[locale]/(dashboard)/dashboard/content/history/client";
import { MediaType } from "@prisma/client";
import { notFound } from "next/navigation";

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
  } catch {
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
    cover,
  } = validatedFields.data;

  console.log(validatedFields.data);

  const slug = slugify(titleBG, {
    locale: "bg",
    lower: true,
    trim: true,
  });

  console.log(cover);

  await prisma.event.create({
    data: {
      slug,
      titleBG,
      contentBG,
      locationBG,
      date,
      cover,
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

export const createMessage = async (values: ContactUsSchemaType) => {
  const validatedFields = ContactUsSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "INVALID_FIELDS" };
  }

  const { name, email, phone, subject, message } = validatedFields.data;

  await prisma.message.create({
    data: {
      name,
      email,
      phone,
      subject,
      message,
    },
  });

  return { success: "MESSAGE_SENT" };
};

export const getMessages = async () => {
  const messages = await prisma.message.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const safeMessages = messages.map((message) => ({
    ...message,
    createdAt: message.createdAt.toISOString(),
    updatedAt: message.updatedAt.toISOString(),
  }));

  return safeMessages;
};

export const getEvents = async () => {
  const events = await prisma.event.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const safeEvents = events.map((events) => ({
    ...events,
    createdAt: events.createdAt.toISOString(),
    updatedAt: events.updatedAt.toISOString(),
  }));

  return safeEvents;
};

export const getMessage = async (id: string) => {
  const message = await prisma.message.findUnique({
    where: { id },
  });

  return message;
};

export const deleteMessage = async (id: string) => {
  await prisma.message.delete({
    where: { id },
  });

  return { success: "MESSAGE_DELETED" };
};

export const deleteEvent = async (id: string) => {
  await prisma.event.delete({
    where: { id },
  });

  return { success: "EVENT_DELETED" };
};

export const createGalleryVideo = async (values: any) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return notFound();
  }

  const { media } = values;

  // regex to get only the youtube video id from a link
  const match = media.match(
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?([a-zA-Z0-9_-]+)/
  );

  try {
    await prisma.galleryPost.create({
      data: {
        mediaType: MediaType.VIDEO,
        media: match[1],
        authorId: currentUser.id,
      },
    });
  } catch {
    return { error: "UNKNOWN_ERROR" };
  }
};

export const createGalleryPhoto = async (key: string) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return notFound();
  }

  try {
    await prisma.galleryPost.create({
      data: {
        mediaType: MediaType.IMAGE,
        media: key,
        authorId: currentUser.id,
      },
    });
  } catch {
    return { error: "UNKNOWN_ERROR" };
  }
};

export const getGallery = async () => {
  const gallery = await prisma.galleryPost.findMany({
    orderBy: { createdAt: "desc" },
  });

  const safeGallery = gallery.map((post) => ({
    ...post,
    createdAt: post.createdAt.toISOString(),
    updatedAt: post.updatedAt.toISOString(),
  }));

  return safeGallery;
};

export const getHomeGallery = async () => {
  const gallery = await prisma.galleryPost.findMany({
    orderBy: { createdAt: "desc" },
    take: 6,
  });

  const safeGallery = gallery.map((post) => ({
    ...post,
    createdAt: post.createdAt.toISOString(),
    updatedAt: post.updatedAt.toISOString(),
  }));

  return safeGallery;
};

export const deleteGalleryPost = async (id: string) => {
  await prisma.galleryPost.delete({
    where: { id },
  });

  return { success: "POST_DELETED" };
};
