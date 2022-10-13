import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { ISignUp, signUpSchema } from "../utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { trpc } from "../utils/trpc";
import toast, { Toaster } from "react-hot-toast";
const SignUp: NextPage = () => {
  const router = useRouter();
  const { handleSubmit, control, reset } = useForm<ISignUp>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(signUpSchema),
  });
  const { mutateAsync } = trpc.auth.signup.useMutation();
  const onSubmit = useCallback(
    async (data: ISignUp) => {
      try {
        const result = await mutateAsync(data);
        if (result.status === 201) {
          reset();
          router.push("/login");
          toast.success("Success signin!", {
            icon: "👏",
          });
        }
      } catch (err) {
        console.error(err);
      }
    },
    [mutateAsync, router, reset]
  );

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
        <div className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
              Sign up your account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <div className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                  Your nickname
                </div>
                <Controller
                  name="username"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="text"
                      placeholder="Type your username..."
                      className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                      {...field}
                    />
                  )}
                />
              </div>

              <div>
                <div className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                  Your email
                </div>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="email"
                      className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                      placeholder="name@email.com"
                      {...field}
                    />
                  )}
                />
              </div>
              <div>
                <div className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </div>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="password"
                      placeholder="Type your password..."
                      className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                      {...field}
                    />
                  )}
                />
              </div>
              <button
                type="submit"
                className="bg-primary-600  hover:bg-primary-700 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 w-full rounded-lg px-5 py-2.5 text-center text-sm font-medium focus:outline-none focus:ring-4"
              >
                Sign Up
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account ?
                <Link href={"/login"} passHref>
                  <button
                    id="sign"
                    className="text-primary-600 dark:text-primary-500 font-medium hover:underline"
                  >
                    Sign In
                  </button>
                </Link>
              </p>
            </form>
            <Toaster />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
