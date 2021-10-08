// Chakra imports
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Icon,
  Input,
  Link as ChakraLink,
  Stack,
  Switch,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
import React from "react";
import Link from "next/link";
import Layout from "../components/Frontend/layout";

function Register() {
  const textColor = useColorModeValue("gray.700", "white");
  const bgColor = useColorModeValue("white", "gray.700");
  return (
    <Layout>
      <Flex direction="column" alignSelf="center" justifySelf="center">
        <Flex alignItems="center" justifyContent="center" mb="60px" mt="20px">
          <Flex
            direction="column"
            w="445px"
            background="transparent"
            p="40px"
            mx={{ base: "100px" }}
            bg={bgColor}
            boxShadow="0 20px 27px 0 rgb(0 0 0 / 5%)"
            borderWidth={1.5}
            borderRadius={"md"}
            borderColor={"gray.300"}
          >
            <Heading color={"gray.900"} fontSize="32px" mb={8}>
              Register
            </Heading>
            <Stack direction="column" spacing={5}>
              <FormControl>
                <FormLabel fontSize="sm">Name</FormLabel>
                <Input type="text" placeholder="Your full name" />
              </FormControl>
              <FormControl>
                <FormLabel fontSize="sm">Email</FormLabel>
                <Input type="email" placeholder="Your email address" />
              </FormControl>
              <FormControl>
                <FormLabel fontSize="sm">Password</FormLabel>
                <Input type="password" placeholder="Your password" />
              </FormControl>
              <FormControl display="flex" alignItems="center">
                <Switch id="remember-login" colorScheme="indigo" me="10px" />
                <FormLabel htmlFor="remember-login" mb="0" fontWeight="normal">
                  Remember me
                </FormLabel>
              </FormControl>
              <Link href="/setup">
                <Button colorScheme="indigo">Register</Button>
              </Link>
              <Flex
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                maxW="100%"
                mt="0px"
              >
                <Text color={textColor} fontWeight="medium">
                  Already have an account?
                  <Link href="/login" passHref={true}>
                    <ChakraLink
                      color={"indigo.700"}
                      as="span"
                      ms="5px"
                      href="#"
                      fontWeight="bold"
                    >
                      Sign In
                    </ChakraLink>
                  </Link>
                </Text>
              </Flex>
            </Stack>
          </Flex>
        </Flex>
      </Flex>
    </Layout>
  );
}

export default Register;
