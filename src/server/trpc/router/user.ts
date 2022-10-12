import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
export const userRouter = router({
  all: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input: { userId } }) => {
      const users = await prisma?.user.findMany({
        where: {
          id: {
            not: userId,
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        include: { followers: true, followings: true },
      });
      return users;
    }),
  list: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input: { userId } }) => {
      const list = await prisma?.user.findFirst({
        where: {
          id: {
            equals: userId,
          },
        },
        include: {
          followers: {
            include: {
              follower: true,
            },
          },
          followings: {
            include: {
              following: true,
            },
          },
        },
      });
      return {
        followerslist: list?.followers,
        followinglist: list?.followings,
      };
    }),
  follow: publicProcedure
    .input(z.object({ userId: z.string(), followId: z.string() }))
    .mutation(async ({ input: { userId, followId } }) => {
      if (userId !== followId) {
        await prisma?.follow.create({
          data: {
            followingId: followId,
            followerId: userId,
          },
        });
        return {
          success: true,
        };
      } else {
        throw new TRPCError({
          message: "You can not subscribe your self",
          code: "BAD_REQUEST",
        });
      }
    }),
  unfollow: publicProcedure
    .input(z.object({ userId: z.string(), unFollowId: z.string() }))
    .mutation(async ({ input: { userId, unFollowId } }) => {
      if (userId !== unFollowId) {
        await prisma?.follow.delete({
          where: {
            followingId_followerId: {
              followingId: unFollowId,
              followerId: userId,
            },
          },
        });
        return {
          success: true,
        };
      } else {
        throw new TRPCError({
          message: "You can not unsubscribe your self",
          code: "BAD_REQUEST",
        });
      }
    }),
});
