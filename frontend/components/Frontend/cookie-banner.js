import { Button, Stack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

/**
 * Default name of the cookie which is set by CookieConsent
 */
const defaultCookieConsentName = "CookieConsent";

/**
 * Returns the value of the consent cookie
 * Retrieves the regular value first and if not found the legacy one according
 * to: https://web.dev/samesite-cookie-recipes/#handling-incompatible-clients
 * @param {*} name optional name of the cookie
 */
export const getCookieConsentValue = (name = defaultCookieConsentName) => {
  return Cookies.get(name);
};

/**
 * Reset the consent cookie
 * Remove the cookie on browser in order to allow user to change their consent
 * @param {*} name optional name of the cookie
 */
export const resetCookieConsentValue = (name = defaultCookieConsentName) => {
  Cookies.remove(name);
};

export default function CookieConsent(props) {
  const [visible, setIsVisible] = useState(props.visible);

  /**
   * Returns the value of the consent cookie
   * Retrieves the regular value first and if not found the legacy one according
   * to: https://web.dev/samesite-cookie-recipes/#handling-incompatible-clients
   */
  const getCookieValue = () => {
    return getCookieConsentValue(defaultCookieConsentName);
  };

  useEffect(() => {
    if (getCookieValue() === undefined) {
      setIsVisible(true);
    }
  }, []);

  /**
   * Function to set the consent cookie based on the provided variables
   * Sets two cookies to handle incompatible browsers, more details:
   * https://web.dev/samesite-cookie-recipes/#handling-incompatible-clients
   */
  const setCookie = (cookieName, cookieValue) => {
    const expires = 150;
    const sameSite = false;

    let cookieSecurity = location ? location.protocol === "https:" : true;

    let cookieOptions = {
      expires,
      sameSite,
      secure: cookieSecurity,
    };

    // set the regular cookie
    Cookies.set(cookieName, cookieValue, cookieOptions);
  };

  /**
   * Set a persistent accept cookie
   */
  const accept = () => {
    setCookie(defaultCookieConsentName, "accepted");

    setIsVisible(false);
  };

  /**
   * Set a persistent decline cookie
   */
  const decline = () => {
    setIsVisible(false);
  };

  if (!visible) return null;

  return (
    <Stack
      p="4"
      boxShadow="lg"
      m="4"
      borderRadius="sm"
      backgroundColor={"white"}
      position={"fixed"}
      left={0}
      right={0}
      bottom={0}
    >
      <Stack direction="row" alignItems="center">
        <Text fontWeight="semibold">Your Privacy</Text>
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          version="1"
          viewBox="0 0 48 48"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#424242"
            d="M24,4c-5.5,0-10,4.5-10,10v4h4v-4c0-3.3,2.7-6,6-6s6,2.7,6,6v4h4v-4C34,8.5,29.5,4,24,4z"
          ></path>
          <path
            fill="#FB8C00"
            d="M36,44H12c-2.2,0-4-1.8-4-4V22c0-2.2,1.8-4,4-4h24c2.2,0,4,1.8,4,4v18C40,42.2,38.2,44,36,44z"
          ></path>
          <circle fill="#C76E00" cx="24" cy="31" r="3"></circle>
        </svg>
      </Stack>

      <Stack
        direction={{ base: "column", md: "row" }}
        justifyContent="space-between"
      >
        <Text fontSize={{ base: "sm" }} textAlign={"left"} maxW={"4xl"}>
          We use cookies and similar technologies to help personalise content,
          tailor and measure ads, and provide a better experience. By clicking
          OK you agree to this, as outlined in our Cookie Policy.
        </Text>
        <Stack direction={{ base: "column", md: "row" }}>
          <Button colorScheme="indigo" onClick={accept}>
            OK
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}
