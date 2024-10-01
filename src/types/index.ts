import { User } from "@prisma/client";
import { type ClientUploadedFileData } from "uploadthing/types";

export type Locale = "bg" | "en";

export type UserRole = "USER" | "ADMIN";

export type SafeUser = Omit<User, "createdAt" | "updatedAt"> & {
  createdAt: string;
  updatedAt: string;
};

export interface UploadedFile<T = unknown> extends ClientUploadedFileData<T> {};
