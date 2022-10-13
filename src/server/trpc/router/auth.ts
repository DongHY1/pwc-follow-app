import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import bcrypt from "bcrypt";
export const authRouter = router({
  login: publicProcedure
    .input(z.object({ email: z.string(), password: z.string() }))
    .mutation(async ({ input: { email, password } }) => {
      const user = await prisma?.user.findUnique({
        where: {
          email,
        },
      });
      if (!user) throw new Error("Invalid credentials");
      const doPasswordsMatch = await bcrypt.compare(
        password,
        user.hashedpassword
      );
      if (!doPasswordsMatch) throw new Error("Invalid credentials");
      return user.name;
    }),
  signup: publicProcedure
    .input(
      z.object({ name: z.string(), email: z.string(), password: z.string() })
    )
    .mutation(async ({ input: { name, email, password } }) => {
      const existUser = await prisma?.user.findUnique({
        where: {
          email,
        },
      });
      if (existUser) {
        throw new TRPCError({
          message: "The email is already in use",
          code: "BAD_REQUEST",
        });
      }
      const hashedpassword = await bcrypt.hash(password, 10);
      const user = await prisma?.user.create({
        data: {
          name,
          email,
          hashedpassword,
        },
      });
      return user;
    }),
});
