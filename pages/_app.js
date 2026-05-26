import "@/styles/globals.css";
import "@/styles/theme.css";
import "@/styles/fonts.css";
import Head from "next/head";
import { useEffect } from "react";
import Lenis from "lenis";

import "aos/dist/aos.css";
import AOS from "aos";
import { useUtmTracker } from "@/components/common/utmData";

function MyApp({ Component, pageProps }) {
  useUtmTracker();

  useEffect(() => {
    const lenis = new Lenis();

    // Use requestAnimationFrame to continuously update the scroll
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    return lenis.destroy();
  }, []);

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
