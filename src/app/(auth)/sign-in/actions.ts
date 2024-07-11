"use server";

import { redirect } from "next/navigation";

import { setSession } from "~/lib/session";
import { signInUseCase } from "~/use-cases/users";

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const user = await signInUseCase(email, password);
  await setSession(user.id);

  return redirect("/dashboard");
};
