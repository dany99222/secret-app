"use client";

import { useSession } from "@/lib/auth-client";
import Link from "next/link";

export default function DashboardPage() {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center gap-6">
      <div className="text-6xl">
        🔐
      </div>
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">
          ¡Hola, {session?.user?.name}! 👋
        </h1>
        <p className="text-slate-400">Bienvenido a tu bóveda de secretos</p>
      </div>
      <Link
        href="/secrets"
        className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-xl transition"
      >
        Ver mis secretos →
      </Link>
    </div>
  );
}