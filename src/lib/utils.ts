import { clsx, type ClassValue } from "clsx";
import { type User } from "lucia";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const isAdmin = (user: User) => {
  return user.roles.includes("admin");
};
