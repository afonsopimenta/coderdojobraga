import { redirect } from "next/navigation";

import { validateRequest } from "~/lib/session";

const DashboardPage = async () => {
  const { user } = await validateRequest();
  if (!user) redirect("/sign-in");

  return (
    <main className="container grid place-content-center gap-4 text-center">
      <h1 className="text-6xl font-bold">CoderDojo Braga</h1>
      <h2 className="text-4xl">Dashboard</h2>
      <p>Welcome, {user.email}</p>
    </main>
  );
};

export default DashboardPage;
