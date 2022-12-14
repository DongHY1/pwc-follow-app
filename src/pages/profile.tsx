import Follow from "./components/Follow";
import type { NextPage } from "next";
import { trpc } from "../utils/trpc";
const Profile: NextPage = () => {
  const { data: users, refetch: refetchUsers } = trpc.user.all.useQuery();
  const { data: lists, refetch: refetchLists } = trpc.user.list.useQuery();
  const { mutate: followMutate } = trpc.user.follow.useMutation({
    onSuccess: () => {
      refetchUsers();
      refetchLists();
    },
  });
  const { mutate: unFollowMutate } = trpc.user.unfollow.useMutation({
    onSuccess: () => {
      refetchUsers();
      refetchLists();
    },
  });
  const hasFollow = (id: string): boolean => {
    let flag = false;
    lists?.followinglist?.map((item) => {
      if (item.followingId === id) {
        flag = true;
      }
    });
    return flag;
  };
  return (
    <div className="flex flex-wrap justify-between">
      {/* Following List */}
      <div className="w-full max-w-md rounded-lg border bg-white p-4 shadow-md dark:border-gray-700 dark:bg-gray-800 sm:p-8">
        <div className="mb-4 flex items-center justify-between">
          <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
            Your Following Lists
          </h5>
        </div>
        <div>
          <ul
            role="list"
            className="divide-y divide-gray-200 dark:divide-gray-700"
          >
            {lists?.followinglist?.map((user) => (
              <li className="py-3 sm:py-4" key={user.following.id}>
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 rounded-full" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-m truncate font-medium text-gray-900 dark:text-white">
                      {user.following.username}
                    </p>
                    <p className="text-m truncate text-gray-500 dark:text-gray-400">
                      Email: {user.following.email}
                    </p>
                  </div>
                  <Follow
                    id={user.following.id}
                    hasFollow={hasFollow(user.following.id)}
                    unFollowMutate={() =>
                      unFollowMutate({
                        unFollowId: user.following.id,
                      })
                    }
                    followMutate={() =>
                      followMutate({ followId: user.following.id })
                    }
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* All User List */}
      <div className="w-full max-w-md rounded-lg border bg-white p-4 shadow-md dark:border-gray-700 dark:bg-gray-800 sm:p-8">
        <div className="mb-4 flex items-center justify-between">
          <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
            All User Lists
          </h5>
        </div>
        <div>
          <ul
            role="list"
            className="divide-y divide-gray-200 dark:divide-gray-700"
          >
            {users?.map((user) => (
              <li className="py-3 sm:py-4" key={user.id}>
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 rounded-full" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-m truncate font-medium text-gray-900 dark:text-white">
                      {user.username}
                    </p>
                    <p className="text-m truncate text-gray-500 dark:text-gray-400">
                      Email: {user.email}
                    </p>
                  </div>
                  <Follow
                    id={user.id}
                    hasFollow={hasFollow(user.id)}
                    unFollowMutate={() =>
                      unFollowMutate({ unFollowId: user.id })
                    }
                    followMutate={() => followMutate({ followId: user.id })}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Follower List */}
      <div className="w-full max-w-md rounded-lg border bg-white p-4 shadow-md dark:border-gray-700 dark:bg-gray-800 sm:p-8">
        <div className="mb-4 flex items-center justify-between">
          <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
            Your Follower Lists
          </h5>
        </div>
        <div>
          <ul
            role="list"
            className="divide-y divide-gray-200 dark:divide-gray-700"
          >
            {lists?.followerslist?.map((user) => (
              <li className="py-3 sm:py-4" key={user.follower.id}>
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 rounded-full" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-m truncate font-medium text-gray-900 dark:text-white">
                      {user.follower.username}
                    </p>
                    <p className="text-m truncate text-gray-500 dark:text-gray-400">
                      Email: {user.follower.email}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;
