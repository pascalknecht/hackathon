import {
  Box,
  Heading,
  Text,
  FormLabel,
  VisuallyHidden,
  Button,
  Input,
  Container,
} from "@chakra-ui/react";

export default function NewsletterSignup({ ctaLabel, subtitle, title }) {
  return (
    <Container>
      <Box bg="indigo.600" borderRadius={"lg"} mb={8}>
        <Box
          maxW="7xl"
          mx="auto"
          py={{ base: 12, lg: 16 }}
          px={[4, 6, null, 8]}
        >
          <Heading
            as="h2"
            fontSize={["3xl", "4xl"]}
            lineHeight="shorter"
            fontWeight="extrabold"
            display={["inline", "block"]}
            letterSpacing="tight"
            color={"white"}
          >
            {title}
          </Heading>
          <Text
            fontSize={["3xl", "4xl"]}
            lineHeight="shorter"
            fontWeight="extrabold"
            display={["inline", "block"]}
            letterSpacing="tight"
            color={"white"}
          >
            {subtitle}
          </Text>
          <Box as="form" mt={8} display={{ sm: "flex" }}>
            <VisuallyHidden as={FormLabel} htmlFor="emailAddress">
              Email address
            </VisuallyHidden>
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
              <Button type="submit" width="full" height="full" px={5} py={3}>
                {ctaLabel || "Submit"}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
