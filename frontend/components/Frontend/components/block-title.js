import { Box } from "@chakra-ui/layout";
import { Heading, Text } from "@chakra-ui/react";

const BlockTitle = (props) => {
  return (
    <Box variant="blockTitle" sx={props.sx}>
      <Text as="p" color={"indigo.700"}>
        {props.tagline}
      </Text>
      <Heading as="h3" color={"black"}>
        {props.heading}
      </Heading>
    </Box>
  );
};

export default BlockTitle;
