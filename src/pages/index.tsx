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
        <h1>{JSON.stringify(data)}</h1>
        <div className="mx-auto max-w-4xl py-16 px-14 sm:px-6 lg:px-8">
          <h1 className="bg-gradient-to-br from-purple-400 to-gray-400 bg-clip-text text-center font-sans text-4xl font-bold leading-snug text-transparent md:text-5xl lg:text-8xl">
            PWC FOLLOW APP
          </h1>
          <div className="max-w-l mx-auto">
            <p className="mt-5 text-center text-xl text-gray-500 lg:text-3xl ">
              Next.JS + Express + TRPC + Prisma ORM + PostgreSQL
            </p>
          </div>
          <div className="align-center flex justify-center">
            <ul className="mt-10 max-w-md list-inside space-y-1 text-gray-500 dark:text-gray-400">
              <List text="👉 User Login and User Follow API" />
              <List text="🧙‍♂️ E2E Typesafety with tRPC" />
              <List text="🔐 E2E testing with Cypress" />
              <List text="🛠 FullStack React with Next.js " />
              <List text="📱 Responsive Design with Tailwind " />
              <List text="📚 Database with Prisma" />
              <List text="🚢 Docker It !" />
            </ul>
          </div>

          <div className="mx-auto mt-20 flex w-full items-center justify-center">
            <a
              href="https://github.com/DongHY1/pwc-follow"
              className="rounded border border-indigo-500 bg-indigo-600 py-2 px-4 font-sans font-medium text-white hover:bg-indigo-700"
            >
              GitHub
            </a>
            <span className="mx-2">or</span>

            <Link href="/signup" passHref>
              <button className="rounded border py-2 px-4 font-sans font-medium ">
                Sign up
              </button>
            </Link>
            <Link href="/profile" passHref>
              <button className="rounded border py-2 px-4 font-sans font-medium ">
                Profile
              </button>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
};

export default Home;

type TechnologyCardProps = {
  name: string;
  description: string;
  documentation: string;
};

const TechnologyCard = ({
  name,
  description,
  documentation,
}: TechnologyCardProps) => {
  return (
    <section className="flex flex-col justify-center rounded border-2 border-gray-500 p-6 shadow-xl duration-500 motion-safe:hover:scale-105">
      <h2 className="text-lg text-gray-700">{name}</h2>
      <p className="text-sm text-gray-600">{description}</p>
      <a
        className="m-auto mt-3 w-fit text-sm text-violet-500 underline decoration-dotted underline-offset-2"
        href={documentation}
        target="_blank"
        rel="noreferrer"
      >
        Documentation
      </a>
    </section>
  );
};
