// Chakra imports
import { Box, Button, Flex, Link as ChakraLink } from "@chakra-ui/react";
// Custom components
import Card from "../components/Card/Card.js";
import React, { useState } from "react";
import Layout from "../layouts/admin";
import Link from "next/link";

export default function Customers() {
  return (
    <Layout
      title="Customers"
      primaryAction={
        <Link href={`/products/new`} passHref>
          <ChakraLink
            p={3}
            display="flex"
            alignItems="center"
            borderRadius="md"
            color={"inherit"}
            _hover={{
              bg: "gray.50",
            }}
          >
            <Button
              as="span"
              colorScheme="indigo"
              size="md"
              display="flex"
              width={"100%"}
            >
              Create customer
            </Button>
          </ChakraLink>
        </Link>
      }
    >
      <Flex flexDirection="column" pt={{ base: "120px", md: "75px" }}>
        <Card p="16px" overflowX={{ sm: "scroll", xl: "hidden" }}></Card>
      </Flex>
    </Layout>
  );
}
