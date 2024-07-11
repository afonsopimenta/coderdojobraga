import { cache } from "react";
import { cookies } from "next/headers";
import { type Session } from "lucia";

import {
  AuthenticationError,
  NotAdminError,
  NotGuardionError,
  NotMentorError,
} from "~/use-cases/errors";
import { lucia, validateRequest } from "./auth";

export const getCurrentUser = cache(async () => {
  const { user } = await validateRequest();
  if (!user) return undefined;
  return user;
});

export const assertAuthenticated = async () => {
  const user = await getCurrentUser();
  if (!user) throw new AuthenticationError();
  return user;
};

export const assertGuardion = async () => {
  const user = await assertAuthenticated();
  if (!user.roles.includes("guardion")) throw new NotGuardionError();
  return user;
};

export const assertMentor = async () => {
  const user = await assertAuthenticated();
  if (!user.roles.includes("mentor")) throw new NotMentorError();
  return user;
};

export const assertAdmin = async () => {
  const user = await assertAuthenticated();
  if (!user.roles.includes("admin")) throw new NotAdminError();
  return user;
};

export const setSession = async (userId: string) => {
  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
};

export const deleteSession = async (session: Session) => {
  await lucia.invalidateSession(session.id);
  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
};
