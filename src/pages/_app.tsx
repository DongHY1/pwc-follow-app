// src/pages/_app.tsx
import "../styles/globals.css";
import { trpc } from "../utils/trpc";
import type { Session } from "next-auth";
import type { AppProps } from "next/app";
import Navbar from "./components/Navbar";
import { SessionProvider } from "next-auth/react";
interface CustomAppProps extends AppProps {
  pageProps: {
    session?: Session;
  } & AppProps["pageProps"];
}

const MyApp = ({ Component, pageProps }: CustomAppProps) => {
  return (
    <SessionProvider session={pageProps.session}>
      <Navbar />
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
