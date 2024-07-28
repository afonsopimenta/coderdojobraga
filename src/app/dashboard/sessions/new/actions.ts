"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { db } from "~/db";
import { dojoSessionsTable } from "~/db/schema";
import { adminAction } from "~/lib/server-action-procedures";

export const createDojoSessionAction = adminAction
  .createServerAction()
  .input(
    z.object({
      title: z.string(),
      startsAt: z.string(),
      endsAt: z.string(),
    }),
    {
      type: "formData",
    },
  )
  .handler(async ({ input }) => {
    console.log("parsing input");

    const startsAt = new Date(input.startsAt);
    const endsAt = new Date(input.endsAt);

    await db.insert(dojoSessionsTable).values({
      title: input.title,
      startsAt: startsAt,
      endsAt: endsAt,
    });

    revalidatePath("/dashboard/sessions");
    redirect("/dashboard/sessions");
  });
