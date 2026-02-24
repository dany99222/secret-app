import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL ?? "http://localhost:3000",
});

// Exportamos lo que vamos a usar en los componentes
export const {
  signIn,
  signUp,
  signOut,
  useSession,
} = authClient;