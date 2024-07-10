import { signUpAction } from "./actions";

const SignUpPage = () => {
  return (
    <main className="container grid min-h-dvh place-items-center">
      <div className="space-y-2">
        <h1>Criar conta </h1>
        <form action={signUpAction} className="space-y-2">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            className="ml-2 border border-zinc-300"
          />
          <br />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            className="ml-2 border border-zinc-300"
          />
          <br />
          <button type="submit" className="bg-zinc-300 px-2 py-1">
            Continuar
          </button>
        </form>
      </div>
    </main>
  );
};

export default SignUpPage;
