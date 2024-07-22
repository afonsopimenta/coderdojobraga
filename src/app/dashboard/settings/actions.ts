"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "~/db";
import { usersTable } from "~/db/schema";
import { authenticatedAction } from "~/lib/server-action-procedures";

export const updateUserInfoAction = authenticatedAction
  .createServerAction()
  .input(
    z.object({
      fullName: z.string(),
      phoneNumber: z.union([
        z.string().regex(/^(\+?351)?9\d\d{7}$/),
        z.literal(""),
      ]),
    }),
    {
      type: "formData",
    },
  )
  .handler(async ({ input, ctx }) => {
    await db
      .update(usersTable)
      .set({
        fullName: input.fullName == "" ? null : input.fullName,
        phoneNumber: input.phoneNumber == "" ? null : input.phoneNumber,
      })
      .where(eq(usersTable.email, ctx.user.email));

    revalidatePath("/dashboard/settings");
  });
