import React from "react";
import App, { Container } from "next/app";
import Head from "next/head";
import Copyright from "../components/Copyright";

//@ts-ignore
import "antd/dist/antd.css";
import "../global.scss";
class MyApp extends App {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Head>
          <title>GraphQL Fullstack Web App</title>
        </Head>
        <main>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          {/* <CssBaseline /> */}
          <Component {...pageProps} />
          <Copyright />
        </main>
      </>
    );
  }
}

export default MyApp;
