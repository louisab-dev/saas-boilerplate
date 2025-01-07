import { initTRPC, TRPCError } from "@trpc/server";

import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import superJson from "superjson";
import { prisma } from "@my/db";
import { createClient } from "@supabase/supabase-js";
import { env } from "./env";

type User = {
  id: string;
  isAdmin: boolean | undefined;
};

export type Context = {
  requestOrigin: string | null;
  user: User | null;
  prisma: typeof prisma;
};

export const createTRPCContext = async ({
  req,
  res,
}: CreateExpressContextOptions): Promise<Context> => {
  let userId: string | undefined;

  const supabase = createClient(env.SUPABASE_URL!, env.SUPABASE_ANON_KEY!);

  const authHeader = req.headers.authorization;
  if (authHeader) {
    const accessToken = authHeader.split("Bearer ").pop();
    if (accessToken) {
      try {
        const {
          data: { user: supabaseUser },
          error,
        } = await supabase.auth.getUser(accessToken);
        if (error) {
          console.error("Error getting user:", error.message);
        }
        userId = supabaseUser?.id;
      } catch (error) {
        if (error instanceof Error) {
          console.error("Error parsing JWT", error.message);
        }
      }
    }
  }

  // Fetch user data from database
  let user: { id: string; isAdmin: boolean } | undefined | null;
  if (userId) {
    user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        isAdmin: true,
      },
    });
  }

  return {
    requestOrigin: req.headers.origin ?? null,
    user: user ? { id: user.id, isAdmin: user.isAdmin } : null,
    prisma,
  };
};

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superJson,
});

export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;

const enforceUserIsAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return next({
    ctx: {
      ...ctx,
      user: ctx.user, // TypeScript now knows this is non-null
    },
  });
});

const enforceUserIsAdmin = t.middleware(({ ctx, next }) => {
  if (!ctx.user?.isAdmin) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Admin access required",
    });
  }

  return next({
    ctx: {
      ...ctx,
      user: {
        ...ctx.user,
        isAdmin: true,
      },
    },
  });
});

export const protectedProcedure = t.procedure.use(enforceUserIsAuthed);
export const adminProcedure = t.procedure
  .use(enforceUserIsAuthed)
  .use(enforceUserIsAdmin);
