import Layout from "../components/Frontend/layout";
import React, {useEffect, useState} from "react";
import Carousel from "../components/Frontend/carousel/Carousel";
import {Button, Flex, Heading, HStack, Spinner, Tag, Text, VStack} from "@chakra-ui/react";
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
          { activeItem === 3 ?
              <Flex height="100%" justifyContent="center" alignItems="center"><Spinner display="block" ml="auto" mr="auto" /></Flex> :
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
                      <img src="/intro_1.png" width={150}/>
                      <Heading
                          fontSize={{ base: "xl", md: "2xl" }}
                          textAlign="center"
                          w="full"
                          pt={4}
                          mb={2}
                      >
                          Finde einen freistehenden Parkplatz in deiner Nähe.
                      </Heading>
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
                      <img src="/intro_2.png" width={150}/>
                      <Heading
                          fontSize={{ base: "xl", md: "2xl" }}
                          textAlign="center"
                          w="full"
                          pt={4}
                          mb={2}
                      >
                          Reserviere für sofort oder im Voraus den nächsten freien Parkplatz in der Nähe deines Zielortes.
                      </Heading>
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
                      <img src="/intro_3.png" width={150}/>
                      <Heading
                          fontSize={{ base: "xl", md: "2xl" }}
                          textAlign="center"
                          w="full"
                          pt={4}
                          mb={2}
                      >
                          Wähle deine Parkzeit und bezahle einfach via Kreditkarte oder Twint.
                      </Heading>
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
          </Carousel>}
      </Layout>
  );
}

export async function getStaticProps() {
    const rootUrl = process.env.ROOT_URL;
    return {props: {rootUrl}};
}
