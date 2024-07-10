"use server";

import { revalidatePath } from "next/cache";
import { db } from "~/server/db";
import { ninjas } from "~/server/db/schema";

export const createNinjaAction = async (guardionId: string, formData: FormData) => {
  const name = formData.get("name") as string;
  const age = formData.get("age") as string;

  await db.insert(ninjas).values({
    guardionId: guardionId,
    name: name,
    age: +age,
  });

  revalidatePath("/dashboard/ninjas")
}