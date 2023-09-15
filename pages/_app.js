import { ApolloProvider } from "@apollo/client";
import { ThemeProvider } from "next-themes";
import Router from "next/router";
import "../styles/globals.css";
import client from "../components/ApolloClient";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import dynamic from "next/dynamic";
import Script from "next/script";
import ThemeProviderContext from "../components/context/themeContext";
const TopProgressBar = dynamic(
  () => {
    return import("../components/common/TopProgressBar");
  },
  { ssr: false }
);

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Script
        strategy="lazyOnload"
        async
        src={`https://www.googletagmanager.com/gtag/js?id=UA-114934224-1`}
      />

      <Script id="google-analytics-script" strategy="lazyOnload" async>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'UA-114934224-1', {
          page_path: window.location.pathname,
          });
    `}
      </Script>
      <TopProgressBar />
      <ApolloProvider client={client}>
        <ThemeProvider attribute="class">
          <ThemeProviderContext>
            <Component {...pageProps} />
            <Script src="https://cdn.adapex.io/hb/aaw.ww.js" async />
            <Script src="https://platform.twitter.com/widgets.js" async />
          </ThemeProviderContext>
        </ThemeProvider>
      </ApolloProvider>
    </>
  );
}

export default MyApp;
