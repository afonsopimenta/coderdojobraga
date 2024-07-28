import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { createDojoSessionAction } from "./actions";

const NewDojoSessionPage = () => {
  return (
    <main className="container space-y-8">
      <h1>Agendar sessão</h1>
      <form action={createDojoSessionAction} className="grid gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">Título</Label>
          <Input id="title" name="title" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="starts-at">Início</Label>
          <Input id="starts-at" name="startsAt" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="ends-at">Fim</Label>
          <Input id="ends-at" name="endsAt" />
        </div>
        <Button type="submit">Agendar</Button>
      </form>
    </main>
  );
};

export default NewDojoSessionPage;
