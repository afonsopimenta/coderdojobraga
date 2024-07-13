"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { guardionAction } from "~/lib/safe-action";
import { registerNinjaUseCase, untrackNinjaUseCase } from "~/use-cases/ninjas";

export const registerNinjaAction = guardionAction
  .createServerAction()
  .input(
    z.object({
      name: z.string(),
      age: z.coerce.number(),
    }),
    {
      type: "formData",
    },
  )
  .handler(async ({ input, ctx }) => {
    await registerNinjaUseCase(ctx.user.id, input.name, input.age);
    revalidatePath("/dashboard/ninjas");
  });

export const untrackNinjaAction = guardionAction
  .createServerAction()
  .input(
    z.object({
      id: z.string(),
    }),
  )
  .handler(async ({ input }) => {
    await untrackNinjaUseCase(input.id);
    revalidatePath("/dashboard/ninjas");
  });
