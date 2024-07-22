import { redirect } from "next/navigation";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { validateRequest } from "~/lib/session";
import { updateUserInfoAction } from "./actions";

const SettingsPage = async () => {
  const { user } = await validateRequest();
  if (!user) redirect("/sign-in");

  return (
    <main className="container space-y-8">
      <h1 className="text-3xl font-bold">Definições</h1>
      <form action={updateUserInfoAction} className="grid gap-6">
        <div className="flex items-center gap-4">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            defaultValue={user.email}
            className="max-w-80"
          />
        </div>
        <div className="flex items-center gap-4">
          <Label htmlFor="full-name">Nome Completo</Label>
          <Input
            id="full-name"
            name="fullName"
            defaultValue={user.fullName ?? ""}
            className="max-w-80"
          />
        </div>
        <div className="flex items-center gap-4">
          <Label htmlFor="phone-number">Contacto Telefónico</Label>
          <Input
            id="phone-number"
            name="phoneNumber"
            defaultValue={user.phoneNumber ?? ""}
            className="max-w-40"
          />
        </div>
        <Button type="submit" className="w-fit">
          Guardar alterações
        </Button>
      </form>
    </main>
  );
};

export default SettingsPage;
