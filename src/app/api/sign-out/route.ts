import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { lucia, validateRequest } from "~/server/auth";

export const GET = async () => {
  const { session } = await validateRequest();
  if (!session) {
    redirect("/sign-in");
  }

  await lucia.invalidateSession(session.id);
  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  redirect("/");
};
