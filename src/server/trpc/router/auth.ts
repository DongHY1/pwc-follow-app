import { router, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { hash } from "argon2";
import { signUpSchema } from "../../../utils/schema";
export const authRouter = router({
  signup: publicProcedure
    .input(signUpSchema)
    .mutation(async ({ input: { username, email, password } }) => {
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
      const hashedpassword = await hash(password);
      const user = await prisma?.user.create({
        data: {
          username,
          email,
          hashedpassword,
        },
      });
      return {
        status: 201,
        message: "Account created successfully",
        result: user,
      };
    }),
});
