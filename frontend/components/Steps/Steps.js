import { Step, Steps, useSteps } from "chakra-ui-steps";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Tr,
  VStack,
} from "@chakra-ui/react";
import React from "react";

import Link from "next/link";

const StepButtons = ({
  nextStep,
  prevStep,
  prevDisabled,
  nextDisabled,
  isLast,
}) => {
  return (
    <Flex width="100%" justify="flex-end">
      <Button
        mr={4}
        variant="ghost"
        size="sm"
        onClick={prevStep}
        isDisabled={prevDisabled}
      >
        Previous
      </Button>
      <Button
        isDisabled={nextDisabled}
        size="sm"
        colorScheme="indigo"
        onClick={nextStep}
      >
        {isLast ? "Finish" : "Next"}
      </Button>
    </Flex>
  );
};

export default function Stepper() {
  const { nextStep, prevStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const [showConfirm, setShowConfirm] = React.useState(false);
  const handleClickConfirm = () => setShowConfirm(!showConfirm);

  return (
    <VStack width="100%">
      {activeStep !== 3 && (
        <Steps orientation="vertical" activeStep={activeStep}>
          <Step label={"Shop Information"}>
            <Stack direction="column" spacing={8} pt={4}>
              <Text textAlign="left">
                Please enter your shop information. You can always change them
                later.
              </Text>
              <FormControl id="title">
                <FormLabel>Title of the shop</FormLabel>
                <Input type="text" />
              </FormControl>
              <FormControl id="companyName">
                <FormLabel>Company name</FormLabel>
                <Input type="text" />
              </FormControl>
              <FormControl id="street">
                <FormLabel>Street, Nr.</FormLabel>
                <Input type="text" />
              </FormControl>
              <FormControl id="zip">
                <FormLabel>Zip Code</FormLabel>
                <Input type="text" />
              </FormControl>
              <FormControl id="country">
                <FormLabel>Country</FormLabel>
                <Input type="text" />
              </FormControl>
              <FormControl id="website">
                <FormLabel>Website</FormLabel>
                <Input type="url" />
              </FormControl>
              <FormControl id="langauge">
                <FormLabel>Language</FormLabel>
                <Select placeholder="Select language">
                  <option value="service">English</option>
                  <option value="service">German</option>
                  <option value="service">French</option>
                </Select>
              </FormControl>
              <FormControl id="currency">
                <FormLabel>Currency</FormLabel>
                <Select placeholder="Select currency">
                  <option value="service">CHF</option>
                  <option value="service">EUR</option>
                </Select>
              </FormControl>
              <StepButtons
                {...{ nextStep, prevStep }}
                prevDisabled={activeStep === 0}
              />
            </Stack>
          </Step>
          <Step label={"User Information"}>
            <Stack direction="column" spacing={8} pt={4}>
              <Text textAlign="left">
                We need the email address of you to send you information
                concerning your online shop and to get in touch with you. Please
                enter your email and a save password below.
              </Text>
              <FormControl id="email">
                <FormLabel>Admin Email</FormLabel>
                <Input type="email" />
              </FormControl>
              <FormControl id="email">
                <FormLabel>Password</FormLabel>
                <InputGroup size="md">
                  <Input pr="4.5rem" type={show ? "text" : "password"} />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                      {show ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl id="emailConfirm">
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup size="md">
                  <Input pr="4.5rem" type={showConfirm ? "text" : "password"} />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClickConfirm}>
                      {showConfirm ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <StepButtons {...{ nextStep, prevStep }} />
            </Stack>
          </Step>
          <Step label={"Confirm"}>
            <Stack direction="column" spacing={8} pt={4}>
              <Text textAlign="left">
                Confirm all your data is correct and press <i>Finish</i> to
                start using billable.
              </Text>
              <Table variant="simple">
                <Tbody>
                  <Tr>
                    <Td>Title of the shop</Td>
                    <Td>Lorem ipsum</Td>
                  </Tr>
                  <Tr>
                    <Td>Company name</Td>
                    <Td>Lorem ipsum</Td>
                  </Tr>
                  <Tr>
                    <Td>Street, Nr.</Td>
                    <Td>Lorem ipsum</Td>
                  </Tr>
                  <Tr>
                    <Td>Zip Code</Td>
                    <Td>Lorem ipsum</Td>
                  </Tr>
                  <Tr>
                    <Td>Country</Td>
                    <Td>Lorem ipsum</Td>
                  </Tr>
                  <Tr>
                    <Td>Website</Td>
                    <Td>Lorem ipsum</Td>
                  </Tr>
                  <Tr>
                    <Td>Language</Td>
                    <Td>Lorem ipsum</Td>
                  </Tr>
                  <Tr>
                    <Td>Currency</Td>
                    <Td>Lorem ipsum</Td>
                  </Tr>
                </Tbody>
              </Table>
              <StepButtons {...{ nextStep, prevStep }} isLast={true} />
            </Stack>
          </Step>
        </Steps>
      )}
      {activeStep === 3 && (
        <Alert
          status="success"
          variant="subtle"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          height="200px"
        >
          <AlertIcon boxSize="40px" mr={0} />
          <AlertTitle mt={4} mb={1} fontSize="lg">
            Shop has been created
          </AlertTitle>
          <AlertDescription maxWidth="sm">
            Your store is now ready for your first product.
            <Link href="/dashboard">
              <Button colorScheme="indigo" mt={4}>
                Go to dashboard
              </Button>
            </Link>
          </AlertDescription>
        </Alert>
      )}
    </VStack>
  );
}
