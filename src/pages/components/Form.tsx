import Link from "next/link";
import { FormStatus } from "../../common/enum";
interface FormProps {
  status: FormStatus;
}
const Form = (props: FormProps) => {
  const { status } = props;
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
        <div className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
              {`${
                status === FormStatus.LOGIN ? "Sign in" : "Sign Up"
              } to your account`}
            </h1>
            <form className="space-y-4 md:space-y-6">
              {status === FormStatus.REGISTER && (
                <div>
                  <div className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                    Your nickname
                  </div>
                  <input
                    id="name"
                    type="name"
                    name="name"
                    className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                    placeholder="David"
                  />
                </div>
              )}
              <div>
                <div className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                  Your email
                </div>
                <input
                  id="email"
                  type="email"
                  name="email"
                  className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                  placeholder="name@company.com"
                />
              </div>
              <div>
                <div className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </div>
                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                />
              </div>
              <button
                type="submit"
                className="bg-primary-600  hover:bg-primary-700 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 w-full rounded-lg px-5 py-2.5 text-center text-sm font-medium focus:outline-none focus:ring-4"
              >
                {status === FormStatus.LOGIN ? "Sign In" : "Sign Up"}
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                {status === FormStatus.LOGIN
                  ? "Don’t have an account yet?"
                  : "Already have an account ?"}{" "}
                <Link
                  href={status === FormStatus.LOGIN ? "signup" : "login"}
                  passHref
                >
                  <button
                    id="sign"
                    className="text-primary-600 dark:text-primary-500 font-medium hover:underline"
                  >
                    {status === FormStatus.LOGIN ? "Sign Up" : "Sign In"}
                  </button>
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Form;
