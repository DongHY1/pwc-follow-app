import { router, protectedProcedure } from "../trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
// 下方的UserID需要更换为ctx session内容
export const userRouter = router({
  all: protectedProcedure.query(async ({ ctx: { session } }) => {
    const users = await prisma?.user.findMany({
      where: {
        id: {
          not: session.user.userId,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      include: { followers: true, followings: true },
    });
    return users;
  }),
  list: protectedProcedure.query(async ({ ctx: { session } }) => {
    const list = await prisma?.user.findFirst({
      where: {
        id: {
          equals: session.user.userId,
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
  follow: protectedProcedure
    .input(z.object({ followId: z.string() }))
    .mutation(async ({ input: { followId }, ctx: { session } }) => {
      if (session.user.userId !== followId) {
        await prisma?.follow.create({
          data: {
            followingId: followId,
            followerId: session.user.userId,
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
  unfollow: protectedProcedure
    .input(z.object({ unFollowId: z.string() }))
    .mutation(async ({ input: { unFollowId }, ctx: { session } }) => {
      if (session.user.userId !== unFollowId) {
        await prisma?.follow.delete({
          where: {
            followingId_followerId: {
              followingId: unFollowId,
              followerId: session.user.userId,
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
