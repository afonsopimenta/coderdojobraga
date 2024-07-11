"use server";

import { redirect } from "next/navigation";

import { setSession } from "~/lib/session";
import { registerUserUseCase } from "~/use-cases/users";

export const signUpAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const user = await registerUserUseCase(email, password, "guardion");
  await setSession(user.id);

  return redirect("/dashboard");
};
