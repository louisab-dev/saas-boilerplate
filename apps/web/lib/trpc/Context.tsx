"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import React, { useState } from "react";

import superJson from "superjson";
import { trpc } from "./client";
import { supabase } from "@/lib/auth/client";

import { env } from "next-runtime-env"; // This is a workaround that makes all the env variables prefixed with NEXT_PUBLIC to be accessible from the browser. I'd like to get rid of this dependency by following the correct way to load a public env var like the API_URL but I could not find it in the docs. This is worth looking into: https://github.com/vercel/next.js/discussions/17641#discussioncomment-11461646

export function TRPCProvider({ children }: { children: React.ReactNode }) {
  const API_URL = env("NEXT_PUBLIC_API_URL");
  const [queryClient] = useState(() => new QueryClient({}));
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: `${API_URL}/api/trpc`,
          headers: async () => {
            const { data: { session } } = await supabase.auth.getSession();
            return {
              Authorization: `Bearer ${session?.access_token}`,
            };
          },
        }),
      ],
      transformer: superJson,
    })
  );
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
}
