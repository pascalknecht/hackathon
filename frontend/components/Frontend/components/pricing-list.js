import React from "react";
import { Box } from "@chakra-ui/layout";
import { Flex, IconButton } from "@chakra-ui/react";

export default function PricingList({ items = [], parentStyle, childStyle }) {
  return (
    <Box
      as="ul"
      sx={{
        listStyleType: "none",
        margin: 0,
        padding: 0,
        ...parentStyle,
      }}
    >
      {items.map(({ icon, text, isAvailable }, i) => (
        <Flex
          className={isAvailable ? "open" : "closed"}
          as="li"
          sx={{ ...childStyle }}
          key={i}
        >
          <IconButton
            sx={{
              width: "35px",
              height: "auto",
              color: "indigo.500",
              padding: 0,
              fontSize: 23,
              marginLeft: "-1px",
              flexShrink: 0,
              justifyContent: "flex-start",
              marginTop: "3px",
              "@media screen and (max-width: 480px)": {
                width: "25px",
                fontSize: 18,
                mt: "5px",
              },
            }}
            aria-label="list icon"
          >
            {icon}
          </IconButton>
          {text}
        </Flex>
      ))}
    </Box>
  );
}
