// Chakra imports
import {
  Box,
  Button,
  Flex,
  Icon,
  IconButton,
  Link as ChakraLink,
  Spacer,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
// Custom components
import Card from "../components/Card/Card.js";
import React, { useState } from "react";
import Layout from "../layouts/admin";
import Link from "next/link";
import { useTable, useSortBy } from "react-table";
import {
  DeleteIcon,
  EditIcon,
  SearchIcon,
  TriangleDownIcon,
  TriangleUpIcon,
} from "@chakra-ui/icons";

function DataTable({ columns, data }) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);

  return (
    <Table {...getTableProps()}>
      <Thead>
        {headerGroups.map((headerGroup) => (
          <Tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <Th
                {...column.getHeaderProps(column.getSortByToggleProps())}
                isNumeric={column.isNumeric}
              >
                {column.render("Header")}
                <Text as={"span"} pl="4">
                  {column.isSorted ? (
                    column.isSortedDesc ? (
                      <TriangleDownIcon aria-label="sorted descending" />
                    ) : (
                      <TriangleUpIcon aria-label="sorted ascending" />
                    )
                  ) : null}
                </Text>
              </Th>
            ))}
          </Tr>
        ))}
      </Thead>
      <Tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <Tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <Td {...cell.getCellProps()} isNumeric={cell.column.isNumeric}>
                  {cell.render("Cell")}
                </Td>
              ))}
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
}

export default function Subscriptions() {
  return (
    <Layout
      title="Subscriptions"
      primaryAction={
        <Link href={`/products/new`} passHref>
          <ChakraLink
            p={3}
            display="flex"
            alignItems="center"
            borderRadius="md"
            color={"inherit"}
            _hover={{
              bg: "gray.50",
            }}
          >
            <Button
              as="span"
              colorScheme="indigo"
              size="md"
              display="flex"
              width={"100%"}
            >
              Create subscription
            </Button>
          </ChakraLink>
        </Link>
      }
    >
      <Flex flexDirection="column" pt={8}>
        <Card p="16px" overflowX={{ sm: "scroll", xl: "hidden" }}>
          <DataTable
            columns={[
              {
                Header: "Customer",
                accessor: "fromUnit",
              },
              {
                Header: "Date",
                accessor: "toUnit",
              },
              {
                Header: "Price",
                accessor: "factor",
                isNumeric: true,
              },
              {
                Header: () => (
                  <Text sx={{ textIndent: "-99999px" }}>dsassda</Text>
                ),
                id: "actions", // It needs an ID
                Cell: ({ row }) => (
                  // Use Cell to render an expander for each row.
                  // We can use the getToggleRowExpandedProps prop-getter
                  // to build the expander.
                  <Stack spacing={3} direction={"horizontal"}>
                    <IconButton
                      ariaLabel={"Edit"}
                      colorScheme={"indigo"}
                      icon={<EditIcon />}
                    ></IconButton>
                    <IconButton aria-label={"Delete"} icon={<DeleteIcon />} />
                  </Stack>
                ),
              },
            ]}
            data={[
              {
                fromUnit: "Pascal Knecht",
                toUnit: "21.09.2021",
                factor: 25.4,
              },
              {
                fromUnit: "CreativeJoe",
                toUnit: "22.09.2021",
                factor: 30.4,
              },
              {
                fromUnit: "Joe Doe",
                toUnit: "23.09.2021",
                factor: 1.2,
              },
            ]}
          />
        </Card>
      </Flex>
    </Layout>
  );
}
