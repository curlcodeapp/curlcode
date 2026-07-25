import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-1 flex-col items-center justify-center gap-6 bg-zinc-950 px-6 text-center text-white">
      <div>
        <h1 className="text-3xl font-semibold">curlcode</h1>
        <p className="mt-2 text-sm text-zinc-400">Personalized hair care. Backed by science.</p>
      </div>

      <div className="flex w-full flex-col gap-3">
        <Link
          href="/today"
          className="rounded-full bg-violet-600 px-5 py-3 text-sm font-semibold text-white"
        >
          Log In
        </Link>
        <Link
          href="/today"
          className="rounded-full border border-zinc-600 px-5 py-3 text-sm font-semibold text-white"
        >
          Create Account
        </Link>
        <Link href="/today" className="text-sm font-medium text-violet-400">
          Continue as Guest
        </Link>
      </div>
    </div>
  );
}
