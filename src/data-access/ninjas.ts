import { and, eq } from "drizzle-orm";

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

export const getTrackedNinjasFromUserId = async (userId: string) => {
  const ninjas = await db.query.ninjasTable.findMany({
    where: and(
      eq(ninjasTable.guardionId, userId),
      eq(ninjasTable.isCurrentlyTracked, true),
    ),
  });

  return ninjas;
};

export const untrackNinja = async (ninjaId: string) => {
  const [untrackedNinja] = await db
    .update(ninjasTable)
    .set({ isCurrentlyTracked: false })
    .where(eq(ninjasTable.id, ninjaId))
    .returning();

  return untrackedNinja;
};
