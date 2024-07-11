import Link from "next/link";

const HomePage = () => {
  return (
    <main className="grid min-h-dvh place-content-center gap-8">
      <h1 className="text-6xl font-bold">CoderDojo Braga</h1>
      <div className="flex items-center justify-center gap-8">
        <Link href="/sign-up" className="text-blue-500 underline">
          Sign up
        </Link>
        <Link href="/sign-in" className="text-blue-500 underline">
          Sign in
        </Link>
        <Link href="/api/sign-out" className="text-blue-500 underline">
          Sign out
        </Link>
        <Link href="/whoami" className="text-blue-500 underline">
          Who am I
        </Link>
        <Link href="/dashboard" className="text-blue-500 underline">
          Dashboard
        </Link>
      </div>
    </main>
  );
};

export default HomePage;
