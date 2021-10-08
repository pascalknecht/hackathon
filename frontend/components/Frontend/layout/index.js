import { theme } from "./theme";
import Head from "next/head";
import { ChakraProvider } from "@chakra-ui/react";
import "typeface-dm-sans";

export default function Layout(props) {
  return (
    <>
        <Head>
            <link href='https://api.mapbox.com/mapbox-gl-js/v2.3.1/mapbox-gl.css' rel='stylesheet' />
        </Head>
      <ChakraProvider theme={theme}>
        <div className="page-wrapper">
          <div className="content-wrapper">
            {props.children}
          </div>
        </div>
      </ChakraProvider>
    </>
  );
}
