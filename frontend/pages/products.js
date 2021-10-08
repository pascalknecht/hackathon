// Chakra imports
import {
  Box,
  Button,
  Flex,
  Link as ChakraLink,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
// Custom components
import Card from "../components/Card/Card.js";
import React, { useState } from "react";
import Layout from "../layouts/admin";
import Link from "next/link";
import { ChevronDownIcon } from "@chakra-ui/icons";

export default function Products() {
  return (
    <Layout
      title="Products"
      primaryAction={
        <Menu>
          <MenuButton
            as={Button}
            colorScheme="indigo"
            rightIcon={<ChevronDownIcon />}
          >
            Create product
          </MenuButton>
          <MenuList boxShadow="base">
            <MenuItem as={"div"}>
              <Link href="/products/new" passHref={true}>
                <ChakraLink>Service</ChakraLink>
              </Link>
            </MenuItem>
            <MenuDivider />
            <MenuItem>
              <Link href="/products/new">SAAS</Link>
            </MenuItem>
            <MenuDivider />
            <MenuItem>
              <Link href="/products/new">Newsletter</Link>
            </MenuItem>
          </MenuList>
        </Menu>
      }
    >
      <Flex flexDirection="column" pt={8}>
        <Card p="16px" overflowX={{ sm: "scroll", xl: "hidden" }}></Card>
      </Flex>
    </Layout>
  );
}
