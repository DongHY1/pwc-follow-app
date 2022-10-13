import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { verify } from "argon2";
import { loginSchema } from "../utils/schema";

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "test@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        // login logic goes here
        try {
          const { email, password } = await loginSchema.parseAsync(credentials);

          const result = await prisma?.user.findFirst({
            where: { email },
          });

          if (!result) {
            return null;
          }

          const isValidPassword = await verify(result.hashedpassword, password);

          if (!isValidPassword) {
            return null;
          }
          return {
            id: result.id,
            email: result.email,
            username: result.username,
          };
        } catch {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.userId = user.id;
        token.email = user.email;
        token.username = user.username;
      }

      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user.userId = token.userId;
        session.user.email = token.email;
        session.user.username = token.username;
      }
      return session;
    },
  },
  jwt: {
    maxAge: 15 * 24 * 30 * 60, // 15 days
  },
  pages: {
    signIn: "/login",
    newUser: "/signup",
  },
  secret: "super-secret",
};
