"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

import { unauthenticatedAction } from "~/lib/safe-action";
import { setSession } from "~/lib/session";
import { registerUserUseCase } from "~/use-cases/users";

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
    const user = await registerUserUseCase(
      input.email,
      input.password,
      "guardion",
    );
    await setSession(user.id);

    return redirect("/dashboard");
  });
