import { redirect } from "next/navigation";

import { validateRequest } from "~/lib/auth";
import { deleteSession } from "~/lib/session";

export const GET = async () => {
  const { session } = await validateRequest();
  if (!session) return redirect("/sign-in");

  await deleteSession(session);

  return redirect("/");
};
