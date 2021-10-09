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
import {CheckCircleIcon, SearchIcon} from "@chakra-ui/icons";
import Battery from '../assets/svg/battery.svg';

var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

export default function Home({ rootUrl }) {
    const mapContainer = useRef(null);
    const map = useRef(null);

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [ booking, setBooking] = useState(false);
    const [ error, setError ] = useState(false);
    const [ startDate, setStartDate ] = useState(new Date());
    const [ endDate, setEndDate ] = useState(new Date());
    const [ parkingSpaces, setParkingSpaces ] = useState([]);
    const [ currentParkingSpaceId, setCurrentParkingSpaceId ] = useState(0);
    const [ currentParkingSpace, setCurrentParkingSpace ] = useState(null);
    const [ bookings, setBookings ] = useState([]);
    const [ searching, setSearching ] = useState(false);
    const [ currentCoordinates, setCurrentCoordinates] = useState({lat: 46.9480, lng: 7.4474});
    const [ bookingSuccess, setBookingSuccess ] = useState(false);
    const [ loadingRoute, setLoadingRoute ] = useState(false);
    const [ navigationMode, setNavigationMode ] = useState(false);
    const [ filterEvs, setFilterEvs ] = useState(false);

    async function getRoute(end, animation = false) {
        // make directions request using cycling profile
        const query = await fetch(
            `https://api.mapbox.com/directions/v5/mapbox/driving/${currentCoordinates.lng},${currentCoordinates.lat};${end.lng},${end.lat}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
            { method: 'GET' }
        );
        const json = await query.json();
        const data = json.routes[0];
        const route = data.geometry.coordinates;
        const geojson = {
            'type': 'Feature',
            'properties': {},
            'geometry': {
                'type': 'LineString',
                'coordinates': route
            }
        };
        // if the route already exists on the map, we'll reset it using setData
        if (map.current.getSource('route')) {
            map.current.getSource('route').setData(geojson);
        }
        // otherwise, we'll make a new request
        else {
            map.current.addLayer({
                'id': 'route',
                'type': 'line',
                'source': {
                    'type': 'geojson',
                    'data': geojson
                },
                'layout': {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                'paint': {
                    'line-color': '#4F46E5',
                    'line-width': 5,
                    'line-opacity': 0.75
                }
            });
        }

        if (animation) {
            map.current.flyTo({
                // These options control the ending camera position: centered at
                // the target, at zoom level 9, and north up.
                center: [currentCoordinates.lng, currentCoordinates.lat],
                zoom: 15,
                bearing: 0,

                // this animation is considered essential with respect to prefers-reduced-motion
                essential: true
            });

            setTimeout(() => {
                document.getElementsByClassName("mapboxgl-ctrl-geocoder--input")[0].blur();
            }, 0);
        }
    }

    useEffect(() => {
        if (map.current) return; // initialize map only once

        mapboxgl.accessToken = 'pk.eyJ1IjoicmV2ZW53byIsImEiOiJjaXJha2R6OG8wMDRvaWptZzI5c2l4dWUxIn0.r5aO8bRzIUPBnY-41hpTtQ';
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [currentCoordinates.lng, currentCoordinates.lat],
            zoom: 15
        });
        // Add the control to the map.
        map.current.addControl(
            new MapboxGeocoder({
                accessToken: mapboxgl.accessToken,
                mapboxgl: mapboxgl,
                marker: false,
            })
        );

        map.current.on('load', () => {
            // make an initial directions request that
            // starts and ends at the same location
            getRoute({lat: currentCoordinates.lat, lng: currentCoordinates.lng});

            // Add starting point to the map
            map.current.addLayer({
                'id': 'point',
                'type': 'circle',
                'source': {
                    'type': 'geojson',
                    'data': {
                        'type': 'FeatureCollection',
                        'features': [
                            {
                                'type': 'Feature',
                                'properties': {},
                                'geometry': {
                                    'type': 'Point',
                                    'coordinates': []
                                }
                            }
                        ]
                    }
                },
                'paint': {
                    'circle-radius': 10,
                    'circle-color': '#3887be'
                }
            });
        });

        const showPosition = (position) => {
            const el = document.createElement('div');
            el.className = 'marker';

            new mapboxgl.Marker(el)
                .setLngLat([position.coords.longitude, position.coords.latitude])
                .addTo(map.current);

            map.current.setCenter([position.coords.longitude, position.coords.latitude]);

            setCurrentCoordinates({lat: position.coords.latitude, lng: position.coords.longitude});
        }

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        }

        fetch(rootUrl + "/parkingspace")
            .then(response => response.json())
            .then(markers => {
                setParkingSpaces(markers);
                markers.forEach(m => {
                    const marker = new mapboxgl.Marker({scale: 1.2, color: m.chargerType > 1 ? "#ce6206" : "#6366F1"})
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
            fetch(rootUrl + "/parkingspace/" + currentParkingSpaceId, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({lat: currentCoordinates.lat, lng: currentCoordinates.lng})
            })
                .then(resp => resp.json())
                .then(d => setCurrentParkingSpace(d))
        }
        setBookingSuccess(false);
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
                   setBookingSuccess(true);
               } else {
                   alert("Not available");
               }
            });
    }


    const searchParkingSpace = () => {
        setSearching(true);
        setTimeout(() => {
            fetch(rootUrl + `/parkingspace/nearest?longitude=${currentCoordinates.lng}&latitude=${currentCoordinates.lat}`)
                .then(response => response.json())
                .then(({id}) => {
                    setCurrentParkingSpaceId(id);
                    onOpen();
                    setSearching(false);
                });


        }, 3000);
    }

    const showRoute = () => {
        onClose();
        const end = {
            'type': 'FeatureCollection',
            'features': [
                {
                    'type': 'Feature',
                    'properties': {},
                    'geometry': {
                        'type': 'Point',
                        'coordinates': {lat: currentParkingSpace.latitude, lng: currentParkingSpace.longitude}
                    }
                }
            ]
        };
        if (map.current.getLayer('end')) {
            map.current.getSource('end').setData(end);
        } else {
            map.current.addLayer({
                'id': 'end',
                'type': 'circle',
                'source': {
                    'type': 'geojson',
                    'data': {
                        'type': 'FeatureCollection',
                        'features': [
                            {
                                'type': 'Feature',
                                'properties': {},
                                'geometry': {
                                    'type': 'Point',
                                    'coordinates': {lat: currentParkingSpace.latitude, lng: currentParkingSpace.longitude}
                                }
                            }
                        ]
                    }
                },
                'paint': {
                    'circle-radius': 10,
                    'circle-color': '#f30'
                }
            });
        }
        getRoute({lat: currentParkingSpace.latitude, lng: currentParkingSpace.longitude}, true);
        setNavigationMode(true);
    }

    const disableNavigationMode = () => {
        setNavigationMode(false);
        const end = {
            'type': 'FeatureCollection',
            'features': [
                {
                    'type': 'Feature',
                    'properties': {},
                    'geometry': {
                        'type': 'Point',
                        'coordinates': {lat: currentParkingSpace.latitude, lng: currentParkingSpace.longitude}
                    }
                }
            ]
        };
        const geojson = {
            'type': 'Feature',
            'properties': {},
            'geometry': {
                'type': 'LineString',
                'coordinates': []
            }
        };
        map.current.getSource('end').setData(end);
        map.current.getSource('route').setData(geojson);
    }

    const filterEvsToggle = () => {
        const m1 = document.querySelectorAll('[fill="#ce6206"]');
        for(let i = 0; i < m1.length; i++) {
            m1[i].parentNode.parentNode.style.display = !filterEvs ? 'none' : 'block';
        }

        setFilterEvs(!filterEvs);
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
                      <Box position="absolute" right={"20px"} bottom={"120px"}>
                          <HStack spacing={3}>
                              <IconButton icon={<Battery/>} colorScheme="orange" onClick={filterEvsToggle} opacity={filterEvs ? 0.3 : 1} />
                          </HStack>
                      </Box>
                      <Box position="absolute" left={"20px"} right={"20px"} bottom={"55px"}>
                          { navigationMode ? <Button size="lg" onClick={disableNavigationMode} colorScheme="indigo" width={"100%"}>Navigation beenden</Button> : <Button size="lg" loadingText="Parkplatz suchen" isLoading={searching} onClick={searchParkingSpace} colorScheme="indigo" width={"100%"} leftIcon={<SearchIcon mr={3} />}>Parkplatz finden</Button>}
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
                                      <Heading size="sm">{p.title}</Heading>
                                      <Text fontWeight="bold">CHF {p.pricePerHourFormatted}/h</Text>
                                      <Text>Parkplatznr. {p.id}</Text>
                                      <Text>{p.description}</Text>
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
                                  <Text fontWeight="bold">CHF {b.price}</Text>
                                  { b.parkingSpace.chargerType > 1 && <Text color="orange.500">Preis/kWh: CHF {b.parkingSpace.powerPricePerHourFormatted}</Text>}
                                  <Text>{b.bookingFromFormatted} - {b.bookingToFormatted}</Text>
                              </Box>
                          </HStack>
                      </ListItem>)}
                      </List>
                  </TabPanel>
              </TabPanels>
          </Tabs>
          <Drawer placement="bottom" size={"xl"} onClose={onClose} isOpen={isOpen} borderRadius="md">
              <DrawerOverlay />
              <DrawerContent>
                  <DrawerBody>
                      { currentParkingSpace ? <VStack pt={3} spacing={3} align="left">
                          <HStack>
                              <Box>
                                  <Heading size="lg">{currentParkingSpace.title}</Heading>
                                  <Text fontWeight="bold">CHF {currentParkingSpace.pricePerHourFormatted}/h</Text>
                                  { currentParkingSpace.chargerType > 1 && <Text color="orange.500">Preis/kWh: CHF {currentParkingSpace.powerPricePerHourFormatted}</Text>}
                                  <Text>
                                      {currentParkingSpace.travelTime} min Fahrzeit von deinem Standort
                                  </Text>
                              </Box>
                              <Image borderRadius="md" boxSize="75px"  src="/parking.jpg"></Image>
                          </HStack>

                          <Heading size="md">Info</Heading>
                          <Text>Parkplatznr. {currentParkingSpace.id}</Text>
                          <p>{currentParkingSpace.description}</p>
                          <Heading size="md">Parkierzeit</Heading>
                          <Text fontWeight="bold">Von</Text>
                          <Input type="datetime-local" onChange={(e) => setStartDate(new Date(e.target.value))} />
                          <Text fontWeight="bold">Bis</Text>
                          <Input type="datetime-local" onChange={(e) => setEndDate(new Date(e.target.value))} />

                          <Box pt={4} pb={4}>
                              {bookingSuccess ? <Button colorScheme="green" size="lg" loadingText="Route anzeigen" isLoading={loadingRoute} onClick={() => {}} leftIcon={<CheckCircleIcon mr={3} />} width="100%">Buchung erfolgreich</Button> : <Button isLoading={booking} onClick={bookParkingSpace} width="100%" colorScheme="indigo">Jetzt buchen</Button>}
                          </Box>
                          { bookingSuccess && <Flex pt={2} pb={4} justifyContent="center">
                              <Button variant="link" onClick={showRoute}>Route anzeigen</Button>
                          </Flex>}

                      </VStack> : <Box pt={3} pb={3}>
                          <Spinner display="block" ml="auto" mr="auto" />
                      </Box> }
                  </DrawerBody>
              </DrawerContent>
          </Drawer>
      </Layout>
  );
}


export async function getStaticProps() {
    const rootUrl = process.env.ROOT_URL;
    return {props: {rootUrl}};
}