import Link from "next/link";
import { useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import { signIn } from "next-auth/react";
import { loginSchema, ILogin } from "../utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { NextPage } from "next";
import toast, { Toaster } from "react-hot-toast";
const Login: NextPage = () => {
  const { handleSubmit, control, reset } = useForm<ILogin>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });
  const onSubmit = useCallback(
    async (data: ILogin) => {
      try {
        await signIn("credentials", { ...data, callbackUrl: "/profile" });
        reset();
        toast.success("Success login!", {
          icon: "🎉",
        });
      } catch (err) {
        toast.error("Network Error", {
          icon: "😮‍💨",
        });
        console.error(err);
      }
    },
    [reset]
  );

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
        <div className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
              Log In your account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <div className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                  Your email
                </div>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <input
                      id="email"
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
                      id="password"
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
                Login
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Dont have an account yet?
                <Link href={"/signup"} passHref>
                  <button
                    id="sign"
                    className="text-primary-600 dark:text-primary-500 font-medium hover:underline"
                  >
                    Sign Up
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

export default Login;
