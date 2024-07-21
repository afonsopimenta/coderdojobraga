import { hash, verify, type Options as Argon2Options } from "@node-rs/argon2";

const hashingOptions: Argon2Options = {
  memoryCost: 19456,
  timeCost: 2,
  outputLen: 32,
  parallelism: 1,
};

export const hashPassword = async (password: string) => {
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
