import { redirect } from "next/navigation";

import {
  createAndSetBlankSessionCookie,
  invalidateSession,
  validateRequest,
} from "~/lib/session";

export const GET = async () => {
  const { session } = await validateRequest();
  if (!session) return redirect("/sign-in");

  await invalidateSession(session.id);
  await createAndSetBlankSessionCookie();

  return redirect("/");
};
