import { createNinja } from "~/data-access/ninjas";
import { getUserById } from "~/data-access/users";
import { AuthenticationError, NotGuardionError } from "./errors";

export const registerNinjaUseCase = async (
  userId: string,
  ninjaName: string,
  ninjaAge: number,
) => {
  const user = await getUserById(userId);
  if (!user) throw new AuthenticationError();
  if (!user.roles.includes("guardion")) throw new NotGuardionError();

  const registeredNinja = await createNinja(userId, ninjaName, ninjaAge);

  return { id: registeredNinja.id };
};
