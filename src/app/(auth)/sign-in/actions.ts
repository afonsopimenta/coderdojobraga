"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

import { db } from "~/db";
import { verifyPassword } from "~/lib/password";
import { unauthenticatedAction } from "~/lib/safe-action";
import { createAndSetSessionCookie, createSession } from "~/lib/session";

export const signInAction = unauthenticatedAction
  .createServerAction()
  .input(
    z.object({
      email: z.string().email(),
      password: z.string().min(8),
    }),
    {
      type: "formData",
    },
  )
  .handler(async ({ input }) => {
    const user = await db.query.usersTable.findFirst({
      where: (table, { eq }) => eq(table.email, input.email),
    });
    if (!user) throw "Email ou password incorretos";

    const isPasswordCorrect = await verifyPassword(
      user.password,
      input.password,
    );
    if (!isPasswordCorrect) throw "Email ou password incorretos";

    const session = await createSession(user.id);
    await createAndSetSessionCookie(session.id);

    return redirect("/dashboard");
  });
