"use server";

import {
  ChangePasswordSchema,
  ChangePasswordSchemaType,
  ContactUsSchema,
  ContactUsSchemaType,
  EditUserSchema,
  EditUserSchemaType,
  EventSchema,
  EventSchemaType,
  ForgotPasswordSchema,
  ForgotPasswordSchemaType,
  LoginSchema,
  LoginSchemaType,
  ResetPasswordSchema,
  ResetPasswordSchemaType,
  SignUpSchema,
} from "@/schemas";
import { Locale, SafeUser } from "@/types";
import { auth, signIn, signOut } from "@/auth";

import { AuthError } from "next-auth";
import { MediaType } from "@prisma/client";
import bcrypt from "bcrypt";
import { getTranslations } from "next-intl/server";
import { getUserByEmail } from "@/data/user";
import { historyObject } from "@/app/[locale]/(dashboard)/dashboard/content/history/client";
import { notFound } from "next/navigation";
import { prisma } from "./db";
import { resend } from "./mail";
import slugify from "slugify";
import { utapi } from "@/server/uploadthing";

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

export const forgotPassword = async (values: ForgotPasswordSchemaType) => {
  const t = await getTranslations();
  const currentUser = await getCurrentUser();

  if (currentUser) {
    return { error: "ALREADY_SIGNED_IN" };
  }

  const validatedFields = ForgotPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "INVALID_FIELDS" };
  }

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { error: "USER_NOT_FOUND" };
  }

  try {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    // code expires in 30 minutes
    const expiresAt = new Date(Date.now() + 30 * 60000);

    await prisma.resetCode.create({
      data: {
        email,
        code,
        expiresAt,
      },
    });

    await resend.emails.send({
      from: `${t("general.fbc")} <ecom.lanoow.dev>`,
      to: [email],
      subject: t("auth.emails.forgotPassword.subject"),
      html: t("auth.emails.forgotPassword.content", { code }),
    });

    return { success: "EMAIL_SENT" };
  } catch {
    return { error: "UNKNOWN_ERROR" };
  }
};

export const resetPassword = async (values: ResetPasswordSchemaType) => {
  const currentUser = await getCurrentUser();

  if (currentUser) {
    return { error: "ALREADY_SIGNED_IN" };
  }

  const validatedFields = ResetPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "INVALID_FIELDS" };
  }

  const { code, email, password } = validatedFields.data;

  const resetCode = await prisma.resetCode.findFirst({
    where: { email },
  });

  if (
    !resetCode ||
    resetCode.expiresAt < new Date() ||
    resetCode.code !== code
  ) {
    return { error: "INVALID_CODE" };
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  try {
    await prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    });

    return { success: "PASSWORD_UPDATED" };
  } catch {
    return { error: "UNKNOWN_ERROR" };
  }
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

  try {
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    return { success: "PASSWORD_UPDATED" };
  } catch {
    return { error: "UNKNOWN_ERROR" };
  }
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
  user: SafeUser,
  values: EditUserSchemaType
) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return { error: "NOT_AUTHENTICATED" };
  }

  const validatedFields = EditUserSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "INVALID_FIELDS" };
  }

  const { name, email, role, password } = validatedFields.data;

  if (name === user.name && email === user.email && role === user.role) {
    return { error: "NO_CHANGES" };
  }

  if (email !== user.email) {
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return { error: "EMAIL_ALREADY_IN_USE" };
    }
  }

  try {
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 12);

      await prisma.user.update({
        where: { id: user.id },
        data: { name, email, role, password: hashedPassword },
      });
    } else {
      await prisma.user.update({
        where: { id: user.id },
        data: { name, email, role },
      });
    }

    return { success: "CHANGED_SUCCESSFULLY" };
  } catch {
    return { error: "UNKNOWN_ERROR" };
  }
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
      await prisma.history.upsert({
        where: {
          language: c.language,
        },
        create: {
          language: c.language,
          content: c.content,
        },
        update: {
          content: c.content,
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
    replacement: "-",
    locale: "bg",
    lower: true,
    trim: true,
    strict: true,
    remove: /[^\w\s-]/g,
  });

  console.log(slug);

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

export const eventEdit = async (id: string, values: EventSchemaType) => {
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

  const event = await prisma.event.findUnique({
    where: { id },
  });

  if (!event) {
    return { error: "EVENT_NOT_FOUND" };
  }

  let slug;

  if (titleBG != event.titleBG) {
    slug = slugify(titleBG, {
      replacement: "-",
      locale: "bg",
      lower: true,
      trim: true,
      strict: true,
      remove: /[^\w\s-]/g,
    });
  } else {
    slug = event.slug;
  }

  await prisma.event.update({
    where: { id },
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
    },
  });

  return { success: "EVENT_EDITED" };
};

export async function getEvent(slug: string) {
  const event = await prisma.event.findUnique({
    where: { slug },
    include: {
      author: true,
    },
  });

  if (!event) {
    return null;
  }

  return {
    ...event,
    createdAt: event.createdAt.toISOString(),
    updatedAt: event.updatedAt.toISOString(),
    author: {
      ...event.author,
      createdAt: event.author.createdAt.toISOString(),
      updatedAt: event.author.updatedAt.toISOString(),
    },
  };
}
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
      date: "desc",
    },
    include: {
      author: true,
    },
  });

  const safeEvents = events.map((events) => ({
    ...events,
    createdAt: events.createdAt.toISOString(),
    updatedAt: events.updatedAt.toISOString(),
    author: {
      ...events.author,
      createdAt: events.author.createdAt.toISOString(),
      updatedAt: events.author.updatedAt.toISOString(),
    },
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
