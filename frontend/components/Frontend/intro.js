import { Box, Container, Heading, Stack } from "@chakra-ui/react";

export default function Intro({ page }) {
  return (
    <>
      <Box mx="auto" pt={24} px={[4, 6, null, 8]}>
        <Box
          display={[null, "flex"]}
          flexDir={[null, "column"]}
          alignItems={[null, "center"]}
          textAlign={[null, "center"]}
        >
          <Heading
            as="h1"
            fontSize="5xl"
            lineHeight="none"
            fontWeight="extrabold"
            color={"black"}
          >
            {page.title}
          </Heading>
          {page.subtitle && (
            <Container
              mt={5}
              p={0}
              centerContent
              color="gray.500"
              lineHeight="tall"
              fontSize="xl"
              variant="SMALL"
            >
              {page.subtitle}
            </Container>
          )}
        </Box>
      </Box>
    </>
  );
}
