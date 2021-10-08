// Chakra imports
import {
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  Link as ChakraLink,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Layout from "../layouts/admin";
import Dropzone from "../components/Dropzone/Dropzone";
import { Box } from "@chakra-ui/layout";

export default function Products() {
  const [color, setColor] = useState("#000000");
  return (
    <Layout
      title="Settings"
      primaryAction={<Button colorScheme="indigo">Save</Button>}
    >
      <Tabs pt={8} pb={20} colorScheme="indigo">
        <TabList>
          <Tab>Business details </Tab>
          <Tab>Account details</Tab>
          <Tab>Payment details</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Stack direction="column" spacing={8} pt={10}>
              <Heading as="h3" size="md">
                Business details
              </Heading>
              <FormControl id="title">
                <FormLabel>Logo</FormLabel>
                <Dropzone maxWidth={150} />
              </FormControl>
              <FormControl id="title">
                <FormLabel>Company Color</FormLabel>
                <InputGroup>
                  <InputLeftAddon
                    children={
                      <Box
                        height={22}
                        width={22}
                        borderRadius="md"
                        style={{ backgroundColor: color }}
                      ></Box>
                    }
                  />
                  <Input
                    type="text"
                    onChange={(c) => setColor(c.target.value)}
                  />
                </InputGroup>
              </FormControl>
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
            </Stack>
          </TabPanel>
          <TabPanel>
            <Stack direction="column" spacing={8} pt={10}>
              <Heading as="h3" size="md">
                Account details
              </Heading>
              <FormControl id="email">
                <FormLabel>Admin Email</FormLabel>
                <Input type="email" />
              </FormControl>
            </Stack>
          </TabPanel>
          <TabPanel>
            <Stack direction="column" spacing={8} pt={10}>
              <Heading as="h3" size="md">
                Stripe Credentials
              </Heading>
              <FormControl id="live">
                <Checkbox>Live Mode</Checkbox>
              </FormControl>
              <FormControl id="publishable-key">
                <FormLabel>Stripe Publishable Key</FormLabel>
                <Input type="text" placeholder="pk_" />
              </FormControl>
              <FormControl id="email">
                <FormLabel>Stripe Secret Key</FormLabel>
                <Input type="text" placeholder="sk_" />
              </FormControl>
            </Stack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Layout>
  );
}
