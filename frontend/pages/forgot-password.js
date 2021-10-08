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
} from "@chakra-ui/react";
// Assets

import Link from "next/link";

import Layout from "../components/Frontend/layout";

function Login() {
  const titleColor = useColorModeValue("teal.300", "teal.200");
  return (
    <Layout>
      <Flex position="relative" mb="40px">
        <Flex
          h={{ sm: "initial", md: "75vh", lg: "85vh" }}
          w="100%"
          maxW="1044px"
          mx="auto"
          justifyContent="center"
          mb="30px"
          pt={{ sm: "100px", md: "0px" }}
        >
          <Flex
            alignItems="center"
            justifyContent="center"
            w={{ base: "100%", md: "50%", lg: "42%" }}
          >
            <Flex
              direction="column"
              w="100%"
              background="transparent"
              borderWidth={1.5}
              borderRadius={"md"}
              borderColor={"gray.300"}
              p="48px"
              mt={{ md: "150px", lg: "80px" }}
            >
              <Heading
                color={"gray.900"}
                mb={4}
                fontSize="32px"
                textAlign={"center"}
              >
                Forgot your password?
              </Heading>
              <Stack direction="column" spacing={5}>
                <Text
                  fontSize={{ base: "sm", sm: "md" }}
                  color={useColorModeValue("gray.800", "gray.400")}
                  textAlign={"center"}
                  mb={8}
                >
                  You&apos;ll get an email with a reset link
                </Text>
                <FormControl id="email">
                  <FormLabel fontSize="sm" fontWeight="normal">
                    Email
                  </FormLabel>
                  <Input type="email" />
                </FormControl>
                <Link href="/dashboard">
                  <Button colorScheme="indigo">Reset password</Button>
                </Link>
              </Stack>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Layout>
  );
}

export default Login;
