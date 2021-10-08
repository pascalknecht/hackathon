import Layout from "../components/Frontend/layout";
import React, {useEffect, useState, useRef} from "react";
import {
    Button,
    Drawer,
    DrawerHeader,
    DrawerBody,
    DrawerContent,
    DrawerOverlay,
    Flex,
    Heading,
    HStack,
    Image,
    Input,
    InputGroup,
    InputLeftElement,
    List,
    ListItem,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Tag,
    Text,
    useDisclosure,
    VStack,
    Stack,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalFooter,
    ModalBody,
    InputRightElement, IconButton, Spinner
} from "@chakra-ui/react";
import { useRouter } from 'next/router'
import {Box} from "@chakra-ui/layout";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import {SearchIcon} from "@chakra-ui/icons";

var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

export default function Home({ rootUrl }) {
    const mapContainer = useRef(null);
    const map = useRef(null);

    const { isOpen, onOpen, onClose } = useDisclosure();
    const {  isOpen: isOpenConfirmModal,
        onOpen: onOpenConfirmModal,
        onClose: onCloseConfirmModal  } = useDisclosure();
    const [ booking, setBooking] = useState(false);
    const [ error, setError ] = useState(false);
    const [ startDate, setStartDate ] = useState(new Date());
    const [ endDate, setEndDate ] = useState(new Date());
    const [ parkingSpaces, setParkingSpaces ] = useState([]);
    const [ currentParkingSpaceId, setCurrentParkingSpaceId ] = useState(0);
    const [ currentParkingSpace, setCurrentParkingSpace ] = useState(null);
    const [ bookings, setBookings ] = useState([]);
    const [ searching, setSearching ] = useState(false);

    useEffect(() => {
        if (map.current) return; // initialize map only once

        mapboxgl.accessToken = 'pk.eyJ1IjoicmV2ZW53byIsImEiOiJjaXJha2R6OG8wMDRvaWptZzI5c2l4dWUxIn0.r5aO8bRzIUPBnY-41hpTtQ';
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [7.4474, 46.9480],
            zoom: 15
        });
        // Add the control to the map.
        map.current.addControl(
            new MapboxGeocoder({
                accessToken: mapboxgl.accessToken,
                mapboxgl: mapboxgl
            })
        );

        const showPosition = (position) => {
            const el = document.createElement('div');
            el.className = 'marker';

            new mapboxgl.Marker(el)
                .setLngLat([position.coords.longitude, position.coords.latitude])
                .addTo(map.current);

            map.current.setCenter([position.coords.longitude, position.coords.latitude]);
        }

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        }

        fetch(rootUrl + "/parkingspace")
            .then(response => response.json())
            .then(markers => {
                setParkingSpaces(markers);
                markers.forEach(m => {
                    const marker = new mapboxgl.Marker({scale: 1.2, color: "#6366F1"})
                        .setLngLat([m.longitude, m.latitude])
                        .addTo(map.current);
                    marker.getElement().addEventListener('click', () => {
                        setCurrentParkingSpaceId(m.id);
                        onOpen();
                    });
                })

            });

        fetch(rootUrl + "/booking")
            .then(response => response.json())
            .then(bs => setBookings(bs));

    }, []);

    useEffect(() => {
        if (isOpen) {
            fetch(rootUrl + "/parkingspace/" + currentParkingSpaceId).then(resp => resp.json()).then(d => setCurrentParkingSpace(d))
        }
    }, [isOpen])

    const bookParkingSpace = () => {
        setBooking(true);
        fetch(rootUrl + "/booking", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({bookingFrom: startDate, bookingTo: endDate, parkingId: currentParkingSpaceId})
        })
            .then(response => response.json())
            .then(available => {
               if (available) {
                   setBooking(false);
                   onOpenConfirmModal();
               } else {
                   alert("Not available");
               }
            });
    }


    const searchParkingSpace = () => {
        setSearching(true);
        setTimeout(() => {
            fetch(rootUrl + "/parkingspace/nearest")
                .then(response => response.json())
                .then(id => setCurrentParkingSpaceId(id))

            onOpen();
            setSearching(false);
        }, 3000);
    }

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
                  <TabPanel height="100%" width="100%" padding={0} position="relative">
                      <Box height="100%" width="100%">
                          <Box ref={mapContainer} height="100%" width="100%"/>
                      </Box>
                      <Box position="absolute" left={"20px"} right={"20px"} bottom={"55px"}>
                          <Button size="lg" loadingText="Parkplatz suchen" isLoading={searching} onClick={searchParkingSpace} colorScheme="indigo" width={"100%"} leftIcon={<SearchIcon mr={3} />}>Parkplatz finden</Button>
                      </Box>
                  </TabPanel>
                  <TabPanel>
                      <Heading size="lg" mb={4} color="black">Parkplätze in deiner Nähe</Heading>
                      <List spacing={3}>
                          { parkingSpaces.map(p => (<ListItem onClick={() => {
                                  setCurrentParkingSpaceId(p.id);
                                  onOpen();
                              }}>
                              <HStack>
                                  <Image borderRadius="md" boxSize="50px"  src="/parking.jpg"></Image>
                                  <Box>
                                      <Heading size="sm">{p.Title}</Heading>
                                      <Text>CHF {p.PricePerHour}</Text>
                                      <Text>{p.Description}</Text>
                                  </Box>
                              </HStack>
                          </ListItem>)
                          )}
                      </List>
                  </TabPanel>
                  <TabPanel>
                      <Heading size="lg" mb={4} color="black">Deine Bestellungen</Heading>
                      <List spacing={3}>
                      { bookings.map(b => <ListItem onClick={() => {
                          alert(0)
                      }}>
                          <HStack>
                              <Image borderRadius="md" boxSize="50px"  src="/parking.jpg"></Image>
                              <Box>
                                  <Heading size="sm">{b.parkingSpace.title}</Heading>
                                  <Text>16.05.2021 09:00 - 16.05.2021 12:00</Text>
                              </Box>
                          </HStack>
                      </ListItem>)}
                      </List>
                  </TabPanel>
              </TabPanels>
          </Tabs>
          <Drawer placement="bottom" size={"xl"} onClose={onClose} isOpen={isOpen}>
              <DrawerOverlay />
              <DrawerContent>
                  <DrawerBody>
                      { currentParkingSpace ? <VStack pt={3} spacing={3} align="left">
                          <HStack>
                              <Box>
                                  <Heading size="lg">{currentParkingSpace.title}</Heading>
                                  <Text>CHF {currentParkingSpace.PricePerHour}</Text>
                                  <Text>
                                      2 min Fahrzeit von deinem Standort
                                  </Text>
                              </Box>
                              <Image borderRadius="md" boxSize="75px"  src="/parking.jpg"></Image>
                          </HStack>

                          <Heading size="md">Info</Heading>
                          <p>{currentParkingSpace.description}</p>
                          <Heading size="md">Parkierzeit</Heading>
                          <Text fontWeight="bold">Von</Text>
                          <Input type="datetime-local" onChange={(e) => setStartDate(new Date(e.target.value))} />
                          <Text fontWeight="bold">Bis</Text>
                          <Input type="datetime-local" onChange={(e) => setEndDate(new Date(e.target.value))} />

                          <Box pt={4} pb={4}>
                              <Button isLoading={booking} onClick={bookParkingSpace} width="100%" colorScheme="indigo">Jetzt buchen</Button>
                          </Box>

                      </VStack> : <Box pt={3} pb={3}>
                          <Spinner display="block" ml="auto" mr="auto" />
                      </Box> }
                  </DrawerBody>
              </DrawerContent>
          </Drawer>
          <Modal isOpen={isOpenConfirmModal} onClose={onCloseConfirmModal}>
              <ModalOverlay />
              <ModalContent>
                  <ModalHeader>Vielen Dank für deine Bestellung</ModalHeader>
                  <ModalBody>
                     dsawddas
                  </ModalBody>

                  <ModalFooter>
                      <Button colorScheme="indigo" onClick={onCloseConfirmModal}>Bestätigen</Button>
                  </ModalFooter>
              </ModalContent>
          </Modal>
      </Layout>
  );
}


export async function getStaticProps() {
    const rootUrl = process.env.ROOT_URL;
    return {props: {rootUrl}};
}