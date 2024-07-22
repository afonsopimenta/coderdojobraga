import Link from "next/link";

import { validateRequest } from "~/lib/session";

const HomePage = async () => {
  const { session } = await validateRequest();

  return (
    <main className="grid min-h-dvh place-content-center gap-8">
      <h1 className="text-6xl font-bold">CoderDojo Braga</h1>
      <div className="flex items-center justify-center gap-8">
        {session ? (
          <>
            <Link href="/api/sign-out" className="text-blue-500 underline">
              Sign out
            </Link>
            <Link href="/dashboard" className="text-blue-500 underline">
              Dashboard
            </Link>
          </>
        ) : (
          <>
            <Link href="/sign-up" className="text-blue-500 underline">
              Sign up
            </Link>
            <Link href="/sign-in" className="text-blue-500 underline">
              Sign in
            </Link>
          </>
        )}
      </div>
    </main>
  );
};

export default HomePage;
