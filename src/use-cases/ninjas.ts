import { createNinja, untrackNinja } from "~/data-access/ninjas";
import { getUserById } from "~/data-access/users";
import { AuthenticationError, NotGuardionError } from "./errors";

export const registerNinjaUseCase = async (
  guardionId: string,
  ninjaName: string,
  ninjaAge: number,
) => {
  const user = await getUserById(guardionId);
  if (!user) throw new AuthenticationError();
  if (!user.roles.includes("guardion")) throw new NotGuardionError();

  const registeredNinja = await createNinja(guardionId, ninjaName, ninjaAge);

  return { id: registeredNinja.id };
};

export const untrackNinjaUseCase = async (ninjaId: string) => {
  const untrackedNinja = await untrackNinja(ninjaId);

  return { id: untrackedNinja?.id };
};
