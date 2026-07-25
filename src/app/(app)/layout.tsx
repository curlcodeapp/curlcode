import { BottomNav } from '@/components/BottomNav';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-1 flex-col bg-zinc-50">
      <main className="flex-1 overflow-y-auto px-4 pt-6 pb-4">{children}</main>
      <BottomNav />
    </div>
  );
}
