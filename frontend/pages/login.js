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
                fontSize="32px"
                mb={8}
                textAlign={"center"}
              >
                Sign in to your account
              </Heading>
              <Stack direction="column" spacing={5}>
                <FormControl>
                  <FormLabel fontSize="sm" fontWeight="normal">
                    Email
                  </FormLabel>
                  <Input type="text" placeholder="Your email adress" />
                </FormControl>
                <FormControl>
                  <FormLabel
                    display="flex"
                    justifyContent="space-between"
                    fontSize="sm"
                    fontWeight="normal"
                  >
                    Password
                    <Link href="/forgot-password" passHref={true}>
                      <ChakraLink color={"indigo.700"}>
                        Forgot password?
                      </ChakraLink>
                    </Link>
                  </FormLabel>
                  <Input type="password" placeholder="Your password" />
                </FormControl>
                <FormControl display="flex" alignItems="center">
                  <Switch id="remember-login" colorScheme="indigo" me="10px" />
                  <FormLabel
                    htmlFor="remember-login"
                    mb="0"
                    ms="1"
                    fontWeight="normal"
                  >
                    Remember me
                  </FormLabel>
                </FormControl>
                <Link href="/dashboard">
                  <Button colorScheme="indigo">Login</Button>
                </Link>
                <Flex
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  maxW="100%"
                  mt="0px"
                >
                  <Text color={"gray.600"} fontWeight="medium">
                    Don't have an account?
                    <Link href="/register" passHref={true}>
                      <ChakraLink
                        color={"indigo.700"}
                        as="span"
                        ms="5px"
                        href="#"
                        fontWeight="bold"
                      >
                        Register
                      </ChakraLink>
                    </Link>
                  </Text>
                </Flex>
              </Stack>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Layout>
  );
}

export default Login;
