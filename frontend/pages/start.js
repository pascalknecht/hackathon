import Layout from "../components/Frontend/layout";
import React, {useEffect, useState} from "react";
import Carousel from "../components/Frontend/carousel/Carousel";
import {
    Button, Drawer, DrawerHeader, DrawerBody, DrawerContent, DrawerOverlay,
    Flex,
    Heading,
    HStack, Image, Input, InputGroup, InputLeftElement, List, ListItem,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Tag,
    Text, useDisclosure,
    VStack, Stack
} from "@chakra-ui/react";
import { useRouter } from 'next/router'
import {Box} from "@chakra-ui/layout";
import {Search2Icon} from "@chakra-ui/icons";

var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

export default function Home() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        mapboxgl.accessToken = 'pk.eyJ1IjoicmV2ZW53byIsImEiOiJjaXJha2R6OG8wMDRvaWptZzI5c2l4dWUxIn0.r5aO8bRzIUPBnY-41hpTtQ';
        var map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [7.4474, 46.9480],
            zoom: 15
        });
        const marker = new mapboxgl.Marker()
            .setLngLat([7.4474, 46.9480])
            .addTo(map);
    }, []);

  return (
      <Layout>
          <Tabs height="100%" width="100%" position="relative" isFitted>
              <TabList position="absolute" bottom={0} left={0} right={0} zIndex={50} background="white">
                  <Tab>
                      <svg xmlns="http://www.w3.org/2000/svg" height={25} width={25} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                      </svg>
                  </Tab>
                  <Tab>
                      <svg xmlns="http://www.w3.org/2000/svg" height={25} width={25} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                      </svg>
                  </Tab>
                  <Tab>
                      <svg xmlns="http://www.w3.org/2000/svg" height={25} width={25} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                  </Tab>
              </TabList>

              <TabPanels height="100%" width="100%">
                  <TabPanel height="100%" width="100%" padding={0}>
                      <Box>
                          <InputGroup>
                              <InputLeftElement
                                  pointerEvents="none"
                                  children={<Search2Icon color="gray.300" />}
                              />
                              <Input type="text" px={10} placeholder="Search location" />
                          </InputGroup>
                      </Box>
                      <Box height="100%" width="100%">
                          <Box id="map" height="100%" width="100%"/>
                      </Box>
                  </TabPanel>
                  <TabPanel>
                      <Heading size="lg" mb={4}>Parkplätze in deiner Nähe</Heading>
                      <List spacing={3}>
                          <ListItem onClick={onOpen}>
                              <HStack>
                                  <Image borderRadius="md" boxSize="50px"  src="/parking.jpg"></Image>
                                  <Box>
                                      <Heading size="sm">Parkplatz Holligen</Heading>
                                      Lorem ipsum dolor sit amet, consectetur adipisicing elit
                                  </Box>
                              </HStack>
                          </ListItem>
                          <ListItem onClick={onOpen}>
                              <HStack>
                                  <Image borderRadius="md" boxSize="50px"  src="/parking.jpg"></Image>
                                  <Box>
                                      <Heading size="sm">Parkplatz Holligen</Heading>
                                      Lorem ipsum dolor sit amet, consectetur adipisicing elit
                                  </Box>
                              </HStack>
                          </ListItem>
                          <ListItem onClick={onOpen}>
                              <HStack>
                                  <Image borderRadius="md" boxSize="50px"  src="/parking.jpg"></Image>
                                  <Box>
                                      <Heading size="sm">Parkplatz Holligen</Heading>
                                      Lorem ipsum dolor sit amet, consectetur adipisicing elit
                                  </Box>
                              </HStack>
                          </ListItem>
                          <ListItem onClick={onOpen}>
                              <HStack>
                                  <Image borderRadius="md" boxSize="50px"  src="/parking.jpg"></Image>
                                  <Box>
                                      <Heading size="sm">Parkplatz Holligen</Heading>
                                      Lorem ipsum dolor sit amet, consectetur adipisicing elit
                                  </Box>
                              </HStack>
                          </ListItem>
                      </List>
                  </TabPanel>
                  <TabPanel>
                      <p>three!</p>
                  </TabPanel>
              </TabPanels>
          </Tabs>
          <Drawer placement="bottom" size={"xl"} onClose={onClose} isOpen={isOpen}>
              <DrawerOverlay />
              <DrawerContent>
                  <DrawerBody>
                      <VStack spacing={3}>
                          <HStack>
                              <Heading size="lg">Parktplatz Holligen</Heading>
                              <Image borderRadius="md" boxSize="75px"  src="/parking.jpg"></Image>
                          </HStack>

                          <Heading size="md">Info</Heading>
                          <p>Some contents...</p>
                          <Heading size="md">Parking Time</Heading>
                          <p>Some contents...</p>
                          <p>Some contents...</p>
                          <Button display="block" width="100%" colorScheme="indigo">Book now</Button>
                      </VStack>
                  </DrawerBody>
              </DrawerContent>
          </Drawer>
      </Layout>
  );
}
