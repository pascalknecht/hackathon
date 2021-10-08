import React from "react";
import BlockTitle from "../components/block-title";
import { Box } from "@chakra-ui/layout";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Container,
  Text,
} from "@chakra-ui/react";
import { Link } from "../components/link";

const FAQ = () => {
  return (
    <Box as="section" id="faq" paddingBottom={[80, null, null, null, 150]}>
      <Container sx={{ maxWidth: "900px" }}>
        <BlockTitle
          textAlign="center"
          tagline="Frequent Questions"
          heading="Do you have any question?"
        />
        <Text mt={5}>
          If you have any questions check out our FAQ or write us a message in
          our <Link path={"/contact"}>contact form</Link>
        </Text>
        <Accordion
          defaultIndex={[0]}
          allowMultiple
          paddingTop={20}
          paddingBottom={20}
        >
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  How does it work?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              We provide a code snippet that you can include in your website.
              Your customers will be able to buy your subscriptions in a widget
              that we render in your website. No code knowledge required.
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  Section 2 title
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Container>
    </Box>
  );
};
export default FAQ;
