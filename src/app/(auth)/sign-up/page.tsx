import Image from "next/image";
import Link from "next/link";

import backgroundImage from "~/assets/images/image1.jpg";
import { SignUpForm } from "./_components/sign-up-form";

const SignUpPage = () => {
  return (
    <div className="grid min-h-dvh lg:grid-cols-2">
      <main className="container grid place-content-center gap-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Criar conta</h1>
          <p className="text-balance text-zinc-500">
            Introduza o seu email para criar uma conta
          </p>
        </div>
        <SignUpForm />
        <p className="text-balance text-center text-sm">
          Já tem uma conta?{" "}
          <Link href="/sign-in" className="underline">
            Faça login
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

export default SignUpPage;
