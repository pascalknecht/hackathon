/*eslint-disable*/
import { HamburgerIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
// chakra imports
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Link as ChakraLink,
  List,
  ListItem,
  Select,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import LogoSVG from "../../assets/svg/logo.svg";
import { Separator } from "../Separator/Separator";
import PropTypes from "prop-types";
import React from "react";
import Link from "next/link";
import { locales } from "../Frontend/lib/_locales";

// FUNCTIONS

function Sidebar(props) {
  // to check for active links and opened collapses
  let location = useRouter();
  // this is for the rest of the collapses
  const [state, setState] = React.useState({});
  const mainPanel = React.useRef();
  let variantChange = "0.2s linear";
  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return location.asPath.includes(routeName) ? "active" : "";
  };
  // this function creates the links and collapses that appear in the sidebar (left menu)
  const createLinks = () => {
    const activeClasses = {
      backgroundColor: "rgba(140, 140, 140, 0.2)",
    };

    return (
      <>
        <List spacing={3}>
          <ListItem borderRadius="md">
            <Link href="/dashboard" passHref={true}>
              <Box
                as={"a"}
                display={"flex"}
                alignItems={"center"}
                px={3}
                py={2}
                color="gray.800"
                fontWeight={600}
                transition={"150ms all ease-in-out"}
                _hover={{ backgroundColor: "rgba(140, 140, 140, 0.2)" }}
                {...(activeRoute("dashboard") && activeClasses)}
              >
                <Box marginRight={3}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    height={20}
                    width={20}
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                </Box>
                Dashboard
              </Box>
            </Link>
          </ListItem>
          <ListItem borderRadius="md">
            <Link href="/subscriptions" passHref={true}>
              <Box
                as={"a"}
                display={"flex"}
                alignItems={"center"}
                px={3}
                py={2}
                color="gray.800"
                fontWeight={600}
                transition={"150ms all ease-in-out"}
                _hover={{ backgroundColor: "rgba(140, 140, 140, 0.2)" }}
                {...(activeRoute("subscriptions") && activeClasses)}
              >
                <Box marginRight={3}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    height={20}
                    width={20}
                  >
                    <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
                    <path
                      fillRule="evenodd"
                      d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Box>
                Subscriptions
              </Box>
            </Link>
          </ListItem>
          <ListItem borderRadius="md">
            <Link href="/customers" passHref={true}>
              <Box
                as={"a"}
                display={"flex"}
                alignItems={"center"}
                px={3}
                py={2}
                color="gray.800"
                fontWeight={600}
                transition={"150ms all ease-in-out"}
                _hover={{ backgroundColor: "rgba(140, 140, 140, 0.2)" }}
                {...(activeRoute("customers") && activeClasses)}
              >
                <Box marginRight={3}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    height={20}
                    width={20}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </Box>
                Customers
              </Box>
            </Link>
          </ListItem>
          <ListItem borderRadius="md">
            <Link href="/settings" passHref={true}>
              <Box
                as={"a"}
                display={"flex"}
                alignItems={"center"}
                px={3}
                py={2}
                color="gray.800"
                fontWeight={600}
                transition={"150ms all ease-in-out"}
                _hover={{ backgroundColor: "rgba(140, 140, 140, 0.2)" }}
                {...(activeRoute("settings") && activeClasses)}
              >
                <Box marginRight={3}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    height={20}
                    width={20}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </Box>
                Settings
              </Box>
            </Link>
          </ListItem>
        </List>
      </>
    );
  };
  const { logoText, routes, sidebarVariant } = props;

  var links = <>{createLinks(routes)}</>;
  //  BRAND

  let sidebarRadius = "0px";
  let sidebarMargins = "0px";

  var brand = (
    <Box pt={"25px"} mb="60px">
      <ChakraLink href={`${process.env.PUBLIC_URL}/#/`}>
        <LogoSVG />
      </ChakraLink>
    </Box>
  );

  // SIDEBAR
  return (
    <Box ref={mainPanel}>
      <Box
        display={{ sm: "none", xl: "block" }}
        borderRightColor={"gray.300"}
        borderRightWidth={1.5}
        position="fixed"
      >
        <Box
          transition={variantChange}
          w="260px"
          maxW="260px"
          my={{
            sm: "16px",
          }}
          h="calc(100vh - 32px)"
          ps="20px"
          pe="20px"
          m={sidebarMargins}
          borderRadius={sidebarRadius}
          display="flex"
          flexDirection="column"
        >
          <Box>{brand}</Box>
          <Stack direction="column" mb="40px">
            <Box>{links}</Box>
          </Stack>
          <Box marginTop="auto">
            <Stack direction="column" spacing={3}>
              <Select id="language" name="language" fontSize={{ sm: "sm" }}>
                <option value="german">German</option>
                <option value="english">English</option>
              </Select>
              <List>
                <ListItem borderRadius="md">
                  <Link href="/logout" passHref={true}>
                    <Box
                      as={"a"}
                      display={"flex"}
                      px={3}
                      py={2}
                      color="gray.800"
                      fontWeight={600}
                      transition={"150ms all ease-in-out"}
                      _hover={{ backgroundColor: "rgba(140, 140, 140, 0.2)" }}
                    >
                      <Box marginRight={3}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          height={20}
                          width={20}
                        >
                          <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                          <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                        </svg>
                      </Box>
                      Sign out
                    </Box>
                  </Link>
                </ListItem>
              </List>
            </Stack>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

// FUNCTIONS

export function SidebarResponsive(props) {
  // to check for active links and opened collapses
  let location = useRouter();
  // this is for the rest of the collapses
  const [state, setState] = React.useState({});
  const mainPanel = React.useRef();
  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return location.pathname === routeName ? "active" : "";
  };
  // this function creates the links and collapses that appear in the sidebar (left menu)
  const createLinks = (routes) => {
    // Chakra Color Mode

    return (
      <>
        <Link href="/dashboard">Dashboard</Link>
      </>
    );
  };
  const { logoText, routes, ...rest } = props;

  var links = <>{createLinks(routes)}</>;
  //  BRAND
  //  Chakra Color Mode
  let hamburgerColor = useColorModeValue("gray.500", "gray.200");
  var brand = (
    <Box pt={"35px"} mb="8px">
      <Link
        href={`${process.env.PUBLIC_URL}/#/`}
        target="_blank"
        display="flex"
        lineHeight="100%"
        mb="30px"
        fontWeight="bold"
        justifyContent="center"
        alignItems="center"
        fontSize="11px"
      >
        <LogoSVG />
      </Link>
      <Separator></Separator>
    </Box>
  );

  // SIDEBAR
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  // Color variables
  return (
    <Flex
      display={{ sm: "flex", xl: "none" }}
      ref={mainPanel}
      alignItems="center"
    >
      <HamburgerIcon
        color={hamburgerColor}
        w="18px"
        h="18px"
        ref={btnRef}
        colorScheme="teal"
        onClick={onOpen}
      />
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        placement={"right"}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent
          w="250px"
          maxW="250px"
          ms={{
            sm: "16px",
          }}
          my={{
            sm: "16px",
          }}
          borderRadius="16px"
        >
          <DrawerCloseButton
            _focus={{ boxShadow: "none" }}
            _hover={{ boxShadow: "none" }}
          />
          <DrawerBody maxW="250px" px="1rem">
            <Box maxW="100%" h="100vh">
              <Box>{brand}</Box>
              <Stack direction="column" mb="40px">
                <Box>{links}</Box>
              </Stack>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
}
// PROPS

Sidebar.propTypes = {
  logoText: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
  variant: PropTypes.string,
};
SidebarResponsive.propTypes = {
  logoText: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
};

export default Sidebar;
