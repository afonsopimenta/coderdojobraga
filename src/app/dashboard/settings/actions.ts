"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

import { db } from "~/db";
import { usersTable } from "~/db/schema";
import { authenticatedAction } from "~/lib/server-action-procedures";
import { profileSettingsSchema } from "./profile-settings-schema";

export const updateUserInfoAction = authenticatedAction
  .createServerAction()
  .input(profileSettingsSchema)
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
