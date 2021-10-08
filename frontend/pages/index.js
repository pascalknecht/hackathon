import Layout from "../components/Frontend/layout";
import React, {useEffect, useState} from "react";
import Carousel from "../components/Frontend/carousel/Carousel";
import {Button, Flex, Heading, HStack, Tag, Text, VStack} from "@chakra-ui/react";
import { useRouter } from 'next/router'

export default function Home() {
    const router = useRouter()
    const [activeItem, setActiveItem] = useState(0);
    useEffect(() => {
        if (activeItem === 3) {
            router.push("/start");
        }
    }, [activeItem])
  return (
      <Layout>
          <Carousel gap={32} activeItem={activeItem} setActiveItem={setActiveItem}>
              <Flex
                  justifyContent="space-between"
                  flexDirection="column"
                  overflow="hidden"
                  bg="base.d100"
                  textAlign="center"
                  rounded={5}
                  flex={1}
                  p={5}
                  height="100%"
              >
                  <VStack mb={0} mt={"30vh"}>
                      <img src="/sedan.png" width={150}/>
                      <Heading
                          fontSize={{ base: "xl", md: "2xl" }}
                          textAlign="center"
                          w="full"
                          mb={2}
                      >
                          Willkommen bei test
                      </Heading>
                      <Text w="full">Mit test buchen Sie Parkplätze von Unternehmen und Privatpersonen.</Text>
                  </VStack>

                  <Flex justifyContent="space-between">
                      <Button
                          onClick={() => setActiveItem(activeItem + 1)}
                          colorScheme="indigo"
                          fontWeight="bold"
                          display="block"
                          width="100%"
                      >
                          Weiter
                      </Button>
                  </Flex>
              </Flex>
              <Flex
                  justifyContent="space-between"
                  flexDirection="column"
                  overflow="hidden"
                  bg="base.d100"
                  textAlign="center"
                  rounded={5}
                  flex={1}
                  p={5}
                  height="100%"
              >
                  <VStack mb={0} mt={"30vh"}>
                      <img src="/sedan.png" width={150}/>
                      <Heading
                          fontSize={{ base: "xl", md: "2xl" }}
                          textAlign="center"
                          w="full"
                          mb={2}
                      >
                          Parkplätze einfach und günstig buchen
                      </Heading>
                      <Text w="full">Mit test buchen Sie Parkplätze von Unternehmen und Privatpersonen.</Text>
                  </VStack>

                  <Flex justifyContent="space-between">
                      <Button
                          onClick={() => setActiveItem(activeItem + 1)}
                          colorScheme="indigo"
                          fontWeight="bold"
                          display="block"
                          width="100%"
                      >
                          Weiter
                      </Button>
                  </Flex>
              </Flex>
              <Flex
                  justifyContent="space-between"
                  flexDirection="column"
                  overflow="hidden"
                  bg="base.d100"
                  textAlign="center"
                  rounded={5}
                  flex={1}
                  p={5}
                  height="100%"
              >
                  <VStack mb={0} mt={"30vh"}>
                      <img src="/sedan.png" width={150}/>
                      <Heading
                          fontSize={{ base: "xl", md: "2xl" }}
                          textAlign="center"
                          w="full"
                          mb={2}
                      >
                          Lorem ipsum
                      </Heading>
                      <Text w="full">Lorem ipsum dolor</Text>
                  </VStack>

                  <Flex justifyContent="space-between">
                      <Button
                          onClick={() => setActiveItem(activeItem + 1)}
                          colorScheme="indigo"
                          fontWeight="bold"
                          display="block"
                          width="100%"
                      >
                          Weiter
                      </Button>
                  </Flex>
              </Flex>
          </Carousel>
      </Layout>
  );
}

export async function getStaticProps() {
    const rootUrl = process.env.ROOT_URL;
    return {props: {rootUrl}};
}
