import { hash, verify, type Options as Argon2Options } from "@node-rs/argon2";
import { eq } from "drizzle-orm";

import { db } from "~/db";
import { usersTable } from "~/db/schema";

const hashingOptions: Argon2Options = {
  memoryCost: 19456,
  timeCost: 2,
  outputLen: 32,
  parallelism: 1,
};

const hashPassword = async (password: string) => {
  const hashedPassword = await hash(password, hashingOptions);
  return hashedPassword;
};

export const verifyPassword = async (
  hashedPassword: string,
  password: string,
) => {
  const isPasswordCorrect = await verify(
    hashedPassword,
    password,
    hashingOptions,
  );
  return isPasswordCorrect;
};

export const createUser = async (
  email: string,
  password: string,
  role: "guardion" | "mentor",
) => {
  const hashedPassword = await hashPassword(password);

  const [createdUser] = await db
    .insert(usersTable)
    .values({
      email: email,
      password: hashedPassword,
      roles: [role],
    })
    .returning();

  return createdUser!;
};

export const getUserById = async (id: string) => {
  const user = await db.query.usersTable.findFirst({
    where: eq(usersTable.id, id),
  });

  return user;
};

export const getUserByEmail = async (email: string) => {
  const user = await db.query.usersTable.findFirst({
    where: eq(usersTable.email, email),
  });

  return user;
};
