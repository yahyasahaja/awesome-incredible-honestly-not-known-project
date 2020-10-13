import React, { Fragment } from "react";
import NProgress from "nprogress";
import Router from "next/router";
import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css";

Router.events.on("routeChangeStart", (url) => {
  NProgress.start();
});
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      <Head>
        <title>Simplilearn</title>
      </Head>
      <Component {...pageProps} />
    </Fragment>
  );
}

export default MyApp;
