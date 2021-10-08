import React from "react";
// Chakra imports
import {
  Box,
  Flex,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link as ChakraLink,
  Switch,
  Text,
  useColorModeValue,
  Stack,
  VStack,
  Container,
} from "@chakra-ui/react";
// Assets

import Link from "next/link";
import dynamic from "next/dynamic";

import Layout from "../components/Frontend/layout";
import Intro from "../components/Frontend/intro";

const Stepper = dynamic(() => import("../components/Steps/Steps"), {
  ssr: false,
});

function Setup() {
  return (
    <Layout>
      <Intro
        page={{
          title: "Getting started",
          subtitle:
            "Before you can start using billable we need to know some information about your business. Please answer the questions below.",
        }}
      />
      <Container mt={10} mb={20} variant="SMALL">
        <Stepper />
      </Container>
    </Layout>
  );
}

export default Setup;
