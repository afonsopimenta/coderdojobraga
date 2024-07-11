"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

import { unauthenticatedAction } from "~/lib/safe-action";
import { setSession } from "~/lib/session";
import { signInUseCase } from "~/use-cases/users";

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
    const user = await signInUseCase(input.email, input.password);
    await setSession(user.id);

    return redirect("/dashboard");
  });
