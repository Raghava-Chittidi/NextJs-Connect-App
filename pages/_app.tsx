import type { AppProps } from "next/app";
import { AuthContextProvider } from "../store/AuthContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <Component {...pageProps} />
    </AuthContextProvider>
  );
}

export default MyApp;
