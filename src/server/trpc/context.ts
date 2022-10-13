// src/server/router/context.ts
import type { inferAsyncReturnType } from "@trpc/server";
import type { CreateNextContextOptions } from "@trpc/server/adapters/next";
import { prisma } from "../db/client";
import { nextAuthOptions } from "../../common/auth";
import { unstable_getServerSession } from "next-auth";

/**
 * Replace this with an object if you want to pass things to createContextInner
 */
/**
 * This is the actual context you'll use in your router
 * @link https://trpc.io/docs/context
 **/
export const createContext = async (opts: CreateNextContextOptions) => {
  const { req, res } = opts;
  const session = await unstable_getServerSession(req, res, nextAuthOptions);
  return {
    req,
    res,
    session,
    prisma,
  };
};

export type Context = inferAsyncReturnType<typeof createContext>;
