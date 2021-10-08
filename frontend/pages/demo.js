import Head from "next/head";
import Intro from "../components/Frontend/intro";
import React from "react";
import Layout from "../components/Frontend/layout";
import Script from "next/script";

export default function Pricing() {
  return (
    <Layout>
      <Head>
        <title>Contact - frequi</title>
        <meta
          name="description"
          content="Demo ouf our subscription billing engine."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Intro
        page={{
          title: "Demo",
          subtitle: "Not sure how it works? Check out the demo below.",
        }}
      />

      <div id="frequi-widget" className="preview"></div>

      <Script src="http://localhost:8080/bundle.js" />
    </Layout>
  );
}
