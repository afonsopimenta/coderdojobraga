import { cache } from "react";
import { cookies } from "next/headers";

import { lucia } from "./auth";

export const validateRequest = cache(async () => {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
  if (!sessionId) return { user: null, session: null };

  const result = await lucia.validateSession(sessionId);

  try {
    if (result.session?.fresh) {
      await createAndSetSessionCookie(result.session.id);
    }

    if (!result.session) {
      await createAndSetBlankSessionCookie();
    }
  } catch {}

  return result;
});

export const createSession = async (userId: string) => {
  const session = await lucia.createSession(userId, {});
  return session;
};

export const invalidateSession = async (sessionId: string) => {
  await lucia.invalidateSession(sessionId);
};

export const createAndSetSessionCookie = async (sessionId: string) => {
  const sessionCookie = lucia.createSessionCookie(sessionId);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
};

export const createAndSetBlankSessionCookie = async () => {
  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
};
