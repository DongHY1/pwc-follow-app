import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import List from "./components/List";

const Home: NextPage = () => {
  const { data } = useSession();
  return (
    <>
      <Head>
        <title>PWC Follow App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <div className="mx-auto max-w-4xl py-16 px-14 sm:px-6 lg:px-8">
          <h1 className="bg-gradient-to-br from-purple-400 to-gray-400 bg-clip-text text-center font-sans text-4xl font-bold leading-snug text-transparent md:text-5xl lg:text-8xl">
            PWC FOLLOW APP
          </h1>
          <div className="max-w-l mx-auto">
            <p className="mt-5 text-center text-xl text-gray-500 lg:text-3xl ">
              Next.JS + TRPC + Prisma ORM + PostgreSQL + TailwindCSS
            </p>
          </div>
          <div className="align-center flex justify-center">
            <ul className="mt-10 max-w-6xl list-inside space-y-1 text-gray-500 dark:text-gray-400">
              <List text="👉 User Login and Follow API" />
              <List text="🧙‍♂️ E2E Typesafety with tRPC" />
              <List text="🔐 E2E testing with Cypress" />
              <List text="🛠 FullStack React with Next.js " />
              <List text="📱 Responsive Design Tailwind " />
              <List text="📚 Database with Prisma" />
              <List text="🚢 Docker It !" />
            </ul>
          </div>

          <div className="mx-auto mt-20 flex w-full items-center justify-center">
            <a
              id='github'
              href="https://github.com/DongHY1/pwc-follow-app"
              className="rounded border border-indigo-500 bg-indigo-600 py-2 px-4 font-sans font-medium text-white hover:bg-indigo-700"
            >
              GitHub
            </a>
            <span className="mx-2">or</span>
            {!data ? (
              <Link href="/signup" passHref>
                <button className="rounded border py-2 px-4 font-sans font-medium ">
                  Sign up
                </button>
              </Link>
            ) : (
              <Link href="/profile" passHref>
                <button className="rounded border py-2 px-4 font-sans font-medium ">
                  Profile
                </button>
              </Link>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Home;
