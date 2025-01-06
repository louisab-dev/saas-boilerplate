import "server-only";

import { createTRPCProxyClient, TRPCClientError } from "@trpc/client";
import { callProcedure } from "@trpc/server";
import { observable } from "@trpc/server/observable";
import { type TRPCErrorResponse } from "@trpc/server/rpc";
import { headers } from "next/headers";
import { type AppRouter, appRouter, createTRPCContext } from "@my/api";
import superJson from "superjson";

export type TRPCContext = Awaited<ReturnType<typeof createTRPCContext>>;
/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a tRPC call from a React Server Component.
 */
const createContext = async (): Promise<Partial<TRPCContext>> => {
  const heads = new Headers(await headers());
  heads.set("x-trpc-source", "rsc");

  return {
    // @ts-ignore
    headers: heads,
  };
};

export const api = createTRPCProxyClient<AppRouter>({
  transformer: superJson,
  links: [
    /**
     * Custom RSC link that lets us invoke procedures without using http requests. Since Server
     * Components always run on the server, we can just call the procedure as a function.
     */
    () =>
      ({ op }) =>
        observable((observer) => {
          const context = createContext();

          callProcedure({
            procedures: appRouter._def.procedures,
            path: op.path,
            rawInput: op.input,
            ctx: context,
            type: op.type,
          })
            .then((data) => {
              observer.next({ result: { data } });
              observer.complete();
            })
            .catch((cause: TRPCErrorResponse) => {
              observer.error(TRPCClientError.from(cause));
            });
        }),
  ],
});
