"use server";

import { revalidatePath } from "next/cache";

import { registerNinjaUseCase } from "~/use-cases/ninjas";

export const registerNinjaAction = async (
  userId: string,
  formData: FormData,
) => {
  const name = formData.get("name") as string;
  const age = formData.get("age") as string;

  await registerNinjaUseCase(userId, name, +age);

  revalidatePath("/dashboard/ninjas");
};
