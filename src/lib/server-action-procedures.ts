import { createServerActionProcedure } from "zsa";

import { validateRequest } from "./session";

export const unauthenticatedAction = createServerActionProcedure().handler(
  async () => {
    return { user: undefined };
  },
);

export const authenticatedAction = createServerActionProcedure().handler(
  async () => {
    const { user } = await validateRequest();
    if (!user) throw "É necessário estar autenticado para realizar esta ação";

    return { user };
  },
);
