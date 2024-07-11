import { getCurrentUser } from "~/lib/session";

const WhoAmIPage = async () => {
  const user = await getCurrentUser();

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
