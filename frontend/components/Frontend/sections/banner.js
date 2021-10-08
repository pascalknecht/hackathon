import React, { useState } from "react";

import BannerTextLine from "../assets/banner-text-line.png";
import BannerPattern from "../assets/banner-pattern.png";
import BannerImage from "../assets/banner-image-1.png";
import { Box } from "@chakra-ui/layout";
import {
  Alert,
  AlertIcon,
  Button,
  Container,
  Flex,
  FormLabel,
  Heading,
  Input,
  Text,
  VisuallyHidden,
} from "@chakra-ui/react";

import Image from "next/image";

const Banner = () => {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const registerForNewsletter = (e) => {
    e.preventDefault();
    setError(false);
    setSubmitting(true);

    setTimeout(() => {
      setSuccess(true);
      setSubmitting(false);
    }, 3000);
  };

  return (
    <Box as="section" id="banner" sx={styles.banner}>
      <Container sx={styles.banner.container}>
        <Flex sx={styles.banner.row}>
          <Box sx={styles.banner.col}>
            <Box sx={styles.banner.content}>
              <Heading as="h3">
                Accept subscriptions for your business. <br />
                However you need it.
              </Heading>
              <Text as="p">
                We support you by collecting the money for your business each
                month. Never miss out on unpaid invoices again.
              </Text>
              {!success && (
                <Box as="form" mt={8} onSubmit={registerForNewsletter}>
                  <Text mb={3}>
                    Sign up for our newsletter to be informed when we launch
                  </Text>
                  <VisuallyHidden as={FormLabel} htmlFor="emailAddress">
                    Email address
                  </VisuallyHidden>
                  <Box display={{ sm: "flex" }}>
                    <Input
                      id="emailAddress"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      placeholder="Enter your email"
                      width="full"
                      height="full"
                      maxW={{ sm: "xs" }}
                    />
                    <Box
                      mt={[3, 0]}
                      ml={{ sm: 3 }}
                      flexShrink={{ sm: 0 }}
                      borderRadius="md"
                      boxShadow="md"
                    >
                      <Button
                        type="submit"
                        width="full"
                        height="full"
                        px={5}
                        py={3}
                        colorScheme="indigo"
                        isLoading={submitting}
                        loadingText="Submitting"
                      >
                        Submit
                      </Button>
                    </Box>
                  </Box>
                </Box>
              )}
              {error && (
                <Alert status="error" mt={3}>
                  <AlertIcon />
                  There was an error processing your request
                </Alert>
              )}
              {success && (
                <Alert status="success" mt={3}>
                  <AlertIcon />
                  You have been added to the newsletter. Please click the link
                  in the email you have received.
                </Alert>
              )}
            </Box>
          </Box>
          <Box sx={styles.banner.col}>
            <Box sx={styles.banner.imageBox}>
              <Box sx={styles.banner.imageInner}>
                <Image src={BannerImage} alt="banner image" />
              </Box>
            </Box>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default Banner;

const styles = {
  banner: {
    overflowX: "hidden",
    paddingTop: ["0px", "60px", "80px"],
    paddingBottom: ["0px", null, "80px"],
    backgroundPosition: "left top",
    backgroundRepeat: "no-repeat",
    container: {
      maxWidth: ["100%", null, null, null, null, "1240px", "1440px"],
    },
    row: {
      flexWrap: "wrap",
      display: "flex",
      flexDirection: ["column-reverse", "row"],
      marginLeft: "-15px",
      marginRight: "-15px",
      alignItems: "center",
    },
    col: {
      pl: "15px",
      pr: "15px",
      flex: ["1 1 100%", null, "0 0 50%"],
    },
    content: {
      paddingRight: [0, 0, 0, 0, "40px", 0, 0],
      h3: {
        lineHeight: 1.18,
        color: "black",
        fontWeight: "bold",
        position: "relative",
        width: "100%",
        fontSize: ["28px", "35px", null, "45px", null, "50px", "85px"],
        maxWidth: ["550px", null, null, null, null, null, "100%"],
        "&:before": {
          content: '""',
          width: ["290px", null, null, null, null, "260px", "381px"],
          height: "15px",
          backgroundImage: `url(${BannerTextLine})`,
          backgroundPosition: "center center",
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          position: "absolute",
          bottom: "-15px",
          right: ["15px", null, null, null, null, "140px", "100px"],
          display: ["none", null, null, null, null, "block"],
        },
      },
      p: {
        lineHeight: 2.33,
        color: "#02073E",
        marginTop: ["10px", null, null, "35px"],
        fontSize: ["15px", "18px"],
        pr: ["15px", 0],
        br: {
          display: ["none", null, null, null, null, "block"],
        },
      },
    },
    imageBox: {
      display: "flex",
      justifyContent: ["flex-start", null, null, "flex-end"],
      marginBottom: ["20px", 0],
    },
    imageInner: {
      position: "relative",
      "&:before": {
        content: '""',
        width: "100%",
        height: "100%",
        border: "2px solid var(--chakra-colors-indigo-500)",
        borderRadius: "5px",
        top: "30px",
        left: "30px",
        position: "absolute",
        zIndex: 2,
        display: ["none", null, "block"],
        "@media(max-width: 991px)": {
          left: "10px",
          top: "15px",
          height: "calc(100% - 15px)",
        },
      },
      "&:after": {
        content: '""',
        width: "302px",
        height: "347px",
        backgroundImage: `url(${BannerPattern})`,
        backgroundPosition: "center",
        top: "-30px",
        right: "-73px",
        position: "absolute",
        zIndex: 1,
        "@media(max-width: 991px)": {
          right: "-10px",
        },
      },
      img: {
        position: "relative",
        zIndex: 9,
        maxWidth: "100%",
      },
      ".videoBtn": {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        zIndex: 10,
      },
    },
  },
};
