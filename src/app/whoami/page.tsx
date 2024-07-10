import { validateRequest } from "~/server/auth";

const WhoAmIPage = async () => {
  const { user } = await validateRequest();

  if (!user) {
    return (
      <main className="container grid min-h-dvh place-content-center">
        <p>Não estás autenticado</p>
      </main>
    );
  }

  return (
    <main className="container grid min-h-dvh place-content-center">
      <p>Autenticado como: {user.email}</p>
    </main>
  );
};

export default WhoAmIPage;
