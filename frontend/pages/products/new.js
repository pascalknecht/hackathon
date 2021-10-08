// Chakra imports
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Link as ChakraLink,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Stack,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Layout from "../../layouts/admin";
import Link from "next/link";
import { Box } from "@chakra-ui/layout";

export default function Products() {
  const format = (val) => `$` + val;
  const parse = (val) => val.replace(/^\$/, "");

  const [value, setValue] = React.useState("");

  return (
    <Layout
      title="Create product"
      primaryAction={<Button colorScheme="teal">Save</Button>}
    >
      <Stack direction="column" spacing={8} pt={8}>
        <FormControl id="title">
          <FormLabel>Product Title</FormLabel>
          <Input type="text" />
        </FormControl>
        <FormControl id="type">
          <FormLabel>Product Type</FormLabel>
          <Select placeholder="Select option" defaultValue="simple">
            <option value="simple">Simple</option>
            <option value="variable">Variable</option>
          </Select>
        </FormControl>
        <FormControl id="description">
          <FormLabel>Product Description</FormLabel>
          <Textarea />
        </FormControl>
        <FormControl id="price">
          <FormLabel>Price</FormLabel>
          <NumberInput
            onChange={(valueString) => setValue(parse(valueString))}
            value={format(value)}
            precision={2}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
      </Stack>
    </Layout>
  );
}
