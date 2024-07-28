import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

const NewDojoSessionPage = () => {
  return (
    <main className="container space-y-8">
      <h1>Agendar sessão</h1>
      <form className="grid gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">Título</Label>
          <Input id="title" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="starts-at">Início</Label>
          <Input id="starts-at" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="ends-at">Fim</Label>
          <Input id="ends-at" />
        </div>
      </form>
    </main>
  );
};

export default NewDojoSessionPage;
