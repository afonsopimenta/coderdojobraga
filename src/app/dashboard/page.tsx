import { redirect } from "next/navigation";
import { validateRequest } from "~/server/auth";

const DashboardPage = async () => {
  const { user } = await validateRequest()
  if (!user) redirect("/sign-in")
  
  return (
    <main className="container grid min-h-dvh place-content-center gap-4">
      <h1 className="text-6xl font-bold">CoderDojo Braga</h1>
      <h2 className="text-4xl text-center">Dashboard</h2>
    </main>
  );
};

export default DashboardPage;
