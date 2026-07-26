import { AuthForms } from '@/app/(auth)/login/AuthForms';

export default function LoginPage() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-1 flex-col items-center justify-center gap-6 bg-zinc-950 px-6 text-center text-white">
      <div>
        <h1 className="text-3xl font-semibold">curlcode</h1>
        <p className="mt-2 text-sm text-zinc-400">Personalized hair care. Backed by science.</p>
      </div>

      <AuthForms />
    </div>
  );
}
