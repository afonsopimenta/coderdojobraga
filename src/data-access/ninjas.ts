import { eq } from "drizzle-orm";

import { db } from "~/db";
import { ninjasTable } from "~/db/schema";

export const createNinja = async (
  guardionId: string,
  name: string,
  age: number,
) => {
  const [createdNinja] = await db
    .insert(ninjasTable)
    .values({
      guardionId: guardionId,
      name: name,
      age: age,
    })
    .returning();

  return createdNinja!;
};

export const getNinjasFromUserId = async (userId: string) => {
  const ninjas = db.query.ninjasTable.findMany({
    where: eq(ninjasTable.guardionId, userId),
  });

  return ninjas;
};
