import { redirect } from "next/navigation";

import { getTrackedNinjasFromUserId } from "~/data-access/ninjas";
import { getCurrentUser } from "~/lib/session";
import { NinjaList } from "./_components/ninja_list";
import { registerNinjaAction } from "./actions";

const NinjasPage = async () => {
  const user = await getCurrentUser();
  if (!user) redirect("/sign-in");

  const userNinjas = await getTrackedNinjasFromUserId(user.id);

  return (
    <main className="container min-h-dvh space-y-8">
      <div className="space-y-2">
        <h2>Registar ninja</h2>
        <form action={registerNinjaAction} className="space-y-2">
          <label htmlFor="name">Nome</label>
          <input
            name="name"
            id="name"
            className="ml-2 border border-zinc-300"
          />
          <br />
          <label htmlFor="age">Idade</label>
          <input
            type="number"
            name="age"
            id="age"
            className="ml-2 border border-zinc-300"
          />
          <br />
          <button type="submit" className="bg-zinc-300 px-2 py-1">
            Registar
          </button>
        </form>
      </div>
      <NinjaList ninjas={userNinjas} />
    </main>
  );
};

export default NinjasPage;
