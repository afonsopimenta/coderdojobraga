import { validateRequest } from "~/lib/session";

const WhoAmIPage = async () => {
  const { user } = await validateRequest();

  return (
    <main className="container grid min-h-dvh place-content-center">
      {user && <p>Autenticado como: {user.email}</p>}
      {!user && <p>Não estás autenticado</p>}
    </main>
  );
};

export default WhoAmIPage;
