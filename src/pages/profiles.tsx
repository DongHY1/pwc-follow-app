import Follow from "./components/Follow";
import type { NextPage } from "next";
import { trpc } from "../utils/trpc";
const Profile: NextPage = () => {
  // const { data: users } = trpc.useQuery(["user/all"], {
  //   enabled: isAuthenticated,
  // });
  // const { data: list } = trpc.useQuery(["user/list"], {
  //   enabled: isAuthenticated,
  // });
  // const { mutate: followMutate } = trpc.useMutation(["user/subscribe"], {
  //   onSuccess: () => {},
  // });
  // const { mutate: unfollowMutate } = trpc.useMutation(["user/unsubscribe"], {
  //   onSuccess: () => {},
  // });
  // const hasFollow = (id: string): boolean => {
  //   let flag = false;
  //   list?.followinglist?.map((item: any) => {
  //     if (item.followingId === id) {
  //       flag = true;
  //     }
  //   });
  //   return flag;
  // };
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
            {list?.followinglist?.map((user) => (
              <li className="py-3 sm:py-4" key={user.following.id}>
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 rounded-full" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-m truncate font-medium text-gray-900 dark:text-white">
                      {user.following.name}
                    </p>
                    <p className="text-m truncate text-gray-500 dark:text-gray-400">
                      Email: {user.following.email}
                    </p>
                  </div>
                  <Follow
                    id={user.following.id}
                    hasFollow={hasFollow(user.following.id)}
                    unFollowMutate={unfollowMutate}
                    followMutate={followMutate}
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
                      {user.name}
                    </p>
                    <p className="text-m truncate text-gray-500 dark:text-gray-400">
                      Email: {user.email}
                    </p>
                  </div>
                  <Follow
                    id={user.id}
                    hasFollow={hasFollow(user.id)}
                    unFollowMutate={unfollowMutate}
                    followMutate={followMutate}
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
            {list?.followerslist?.map((user) => (
              <li className="py-3 sm:py-4" key={user.follower.id}>
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 rounded-full" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-m truncate font-medium text-gray-900 dark:text-white">
                      {user.follower.name}
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
