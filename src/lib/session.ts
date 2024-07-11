import { cache } from "react";
import { cookies } from "next/headers";
import { type Session } from "lucia";

import { lucia, validateRequest } from "./auth";

export const getCurrentUser = cache(async () => {
  const { user } = await validateRequest();
  if (!user) return undefined;
  return user;
});

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
