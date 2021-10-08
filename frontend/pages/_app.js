import "../styles/globals.css";
import React from "react";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export async function getStaticProps(context) {
  console.log("static props");
  return {
    props: {}, // will be passed to the page component as props
  };
}

export default MyApp;
