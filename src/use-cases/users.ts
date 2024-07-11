import {
  createUser,
  getUserByEmail,
  verifyPassword,
} from "~/data-access/users";
import { EmailInUseError, LoginError } from "./errors";

export const registerUserUseCase = async (
  email: string,
  password: string,
  role: "guardion" | "mentor",
) => {
  const existingUser = await getUserByEmail(email);
  if (existingUser) throw new EmailInUseError();

  const registeredUser = await createUser(email, password, role);

  return { id: registeredUser.id };
};

export const signInUseCase = async (email: string, password: string) => {
  const user = await getUserByEmail(email);
  if (!user) throw new LoginError();

  const isPasswordCorrect = await verifyPassword(user.password, password);
  if (!isPasswordCorrect) throw new LoginError();

  return { id: user.id };
};
