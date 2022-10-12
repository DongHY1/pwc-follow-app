import React, { useState } from "react";
import Link from "next/link";
export const Navbar = () => {
  const [isHidden, setIsHidden] = useState(true);
  return (
    <nav className="rounded border-gray-200 bg-white px-2 py-2.5 dark:bg-gray-900 sm:px-4">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <a href="https://flowbite.com/" className="flex items-center">
          <div className="mr-3 h-6 sm:h-9"></div>
          <Link href="/" passHref>
            <button className="self-center whitespace-nowrap text-2xl text-xl font-semibold dark:text-white">
              Follow
            </button>
          </Link>
        </a>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          onClick={() => setIsHidden(!isHidden)}
          className="ml-3 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="h-6 w-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <div
          className={`${isHidden ? "hidden" : ""} w-full md:block md:w-auto`}
        >
          <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:text-sm md:font-medium md:dark:bg-gray-900">
            <>
              <li>
                <Link href="/signup" passHref>
                  <button className="block rounded py-2 pr-4 pl-3 text-lg text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700  dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:dark:hover:bg-transparent md:dark:hover:text-white">
                    Sign Up
                  </button>
                </Link>
              </li>
              <li>
                <Link href="/login" passHref>
                  <button className="block rounded py-2 pr-4 pl-3 text-lg text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700  dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:dark:hover:bg-transparent md:dark:hover:text-white">
                    Log In
                  </button>
                </Link>
              </li>
            </>

            {/* <>
              <li>
                <p className="block rounded py-2 pr-4 pl-3 text-lg text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700  dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:dark:hover:bg-transparent md:dark:hover:text-white">
                  测试
                </p>
              </li>
              <li>
                <button
                  // onClick={logout}
                  className="block rounded py-2 pr-4 pl-3 text-lg text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700  dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:dark:hover:bg-transparent md:dark:hover:text-white"
                >
                  Log out
                </button>
              </li>
            </> */}
          </ul>
        </div>
      </div>
    </nav>
  );
};
