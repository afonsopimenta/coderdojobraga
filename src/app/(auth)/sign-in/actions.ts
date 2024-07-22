"use server";

import { redirect } from "next/navigation";
import { ZSAError } from "zsa";

import { db } from "~/db";
import { verifyPassword } from "~/lib/password";
import { unauthenticatedAction } from "~/lib/server-action-procedures";
import { createAndSetSessionCookie, createSession } from "~/lib/session";
import { signInSchema } from "./sign-in-schema";

export const signInAction = unauthenticatedAction
  .createServerAction()
  .input(signInSchema)
  .handler(async ({ input }) => {
    await new Promise((resolve) => setTimeout(resolve, 5000));

    const user = await db.query.usersTable.findFirst({
      where: (table, { eq }) => eq(table.email, input.email),
    });
    if (!user) {
      throw new ZSAError("NOT_FOUND", "Email ou password incorretos");
    }

    const isPasswordCorrect = await verifyPassword(
      user.password,
      input.password,
    );
    if (!isPasswordCorrect) {
      throw new ZSAError("NOT_FOUND", "Email ou password incorretos");
    }

    const session = await createSession(user.id);
    await createAndSetSessionCookie(session.id);

    redirect("/dashboard");
  });
