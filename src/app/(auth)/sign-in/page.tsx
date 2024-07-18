import Image from "next/image";
import Link from "next/link";

import backgroundImage from "~/assets/images/image1.jpg";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { signInAction } from "./actions";

const SignInPage = () => {
  return (
    <div className="grid min-h-dvh lg:grid-cols-2">
      <main className="container grid place-content-center gap-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="text-balance text-zinc-500">
            Introduza o seu email para efetuar login
          </p>
        </div>
        <form action={signInAction} className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="m-0">
              Email
            </Label>
            <Input type="email" name="email" id="email" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="m-0">
              Password
            </Label>
            <Input type="password" name="password" id="password" />
          </div>
          <Button type="submit" className="w-full">
            Continuar
          </Button>
        </form>
        <p className="text-balance text-center text-sm">
          Ainda não tem conta?{" "}
          <Link href="/sign-up" className="underline">
            Crie uma
          </Link>
        </p>
      </main>
      <div className="relative hidden bg-zinc-500 lg:block">
        <Image
          src={backgroundImage}
          alt="Mentor a explicar algo ao ninja."
          fill
          className="object-cover opacity-75"
        />
      </div>
    </div>
  );
};

export default SignInPage;
