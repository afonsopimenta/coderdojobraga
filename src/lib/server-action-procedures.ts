import { createServerActionProcedure, ZSAError } from "zsa";

import { validateRequest } from "./session";
import { isAdmin } from "./utils";

export const unauthenticatedAction = createServerActionProcedure().handler(
  async () => {
    return { user: undefined };
  },
);

export const authenticatedAction = createServerActionProcedure().handler(
  async () => {
    const { user } = await validateRequest();
    if (!user) {
      throw new ZSAError(
        "NOT_AUTHORIZED",
        "É necessário estar autenticado para realizar esta ação",
      );
    }

    return { user };
  },
);

export const adminAction = createServerActionProcedure().handler(async () => {
  const { user } = await validateRequest();

  if (!user) {
    throw new ZSAError(
      "NOT_AUTHORIZED",
      "É necessário estar autenticado para realizar esta ação",
    );
  }

  if (!isAdmin(user)) {
    throw new ZSAError(
      "FORBIDDEN",
      "É necessário ser admin para realizar esta ação",
    );
  }

  return { user };
});
