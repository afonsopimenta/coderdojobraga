"use server";

import { redirect } from "next/navigation";
import { ZSAError } from "zsa";

import { db } from "~/db";
import { usersTable } from "~/db/schema";
import { hashPassword } from "~/lib/password";
import { unauthenticatedAction } from "~/lib/server-action-procedures";
import { createAndSetSessionCookie, createSession } from "~/lib/session";
import { signUpSchema } from "./sign-up-schema";

export const signUpAction = unauthenticatedAction
  .createServerAction()
  .input(signUpSchema)
  .handler(async ({ input }) => {
    const existingUser = await db.query.usersTable.findFirst({
      where: (table, { eq }) => eq(table.email, input.email),
    });
    if (existingUser) throw new ZSAError("CONFLICT", "Utilizador já existe");

    const hashedPassword = await hashPassword(input.password);

    const [createdUser] = await db
      .insert(usersTable)
      .values({ email: input.email, password: hashedPassword })
      .returning();

    const session = await createSession(createdUser!.id);
    await createAndSetSessionCookie(session.id);

    redirect("/dashboard");
  });
