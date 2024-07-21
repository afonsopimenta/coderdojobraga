"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

import { db } from "~/db";
import { usersTable } from "~/db/schema";
import { hashPassword } from "~/lib/password";
import { unauthenticatedAction } from "~/lib/safe-action";
import { createAndSetSessionCookie, createSession } from "~/lib/session";

export const signUpAction = unauthenticatedAction
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
    const existingUser = await db.query.usersTable.findFirst({
      where: (table, { eq }) => eq(table.email, input.email),
    });
    if (existingUser) throw "Utilizador já existe";

    const hashedPassword = await hashPassword(input.password);

    const [createdUser] = await db
      .insert(usersTable)
      .values({ email: input.email, password: hashedPassword })
      .returning();

    const session = await createSession(createdUser!.id);
    await createAndSetSessionCookie(session.id);

    return redirect("/dashboard");
  });
