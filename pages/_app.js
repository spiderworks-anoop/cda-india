import "@/styles/globals.css";
import "@/styles/theme.css";
import "@/styles/fonts.css";
import Head from "next/head";
import { useEffect } from "react";

import "aos/dist/aos.css";
import AOS from "aos";
import { useUtmTracker } from "@/components/common/utmData";

function MyApp({ Component, pageProps }) {
  useUtmTracker();

  useEffect(() => {
    AOS.init({
      duration: 1000, // animation duration
      once: true, // whether animation should happen only once
    });
  }, []);

  return (
    <>
      <Head></Head>

      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
