// Chakra imports
import {
  Box,
  Button,
  Flex,
  Grid,
  Icon,
  Image,
  Portal,
  Progress,
  SimpleGrid,
  Spacer,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "../components/Card/Card.js";
import CardBody from "../components/Card/CardBody.js";
import CardHeader from "../components/Card/CardHeader.js";
import IconBox from "../components/Icons/IconBox";
// Custom icons
import {
  CartIcon,
  DocumentIcon,
  GlobeIcon,
  WalletIcon,
} from "../components/Icons/Icons.js";
import DashboardTableRow from "../components/Tables/DashboardTableRow";
import TimelineRow from "../components/Tables/TimelineRow";
import React, { useState } from "react";
import { dashboardTableData, timelineData } from "../variables/general";
import Layout from "../layouts/admin";

export default function Dashboard() {
  const textColor = useColorModeValue("gray.700", "white");

  return (
    <Layout title="Dashboard">
      <Flex flexDirection="column" pt={8} mx={"-22px"}>
        <SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} spacing="24px">
          <Card minH="83px">
            <CardBody>
              <Flex
                flexDirection="row"
                align="center"
                justify="center"
                w="100%"
              >
                <Stat me="auto">
                  <StatLabel
                    fontSize="sm"
                    color="gray.400"
                    fontWeight="bold"
                    pb=".1rem"
                  >
                    Monthly revenue
                  </StatLabel>
                  <Flex>
                    <StatNumber fontSize="lg" color={textColor}>
                      $53,000
                    </StatNumber>
                    <StatHelpText
                      alignSelf="flex-end"
                      justifySelf="flex-end"
                      m="0px"
                      color="green.400"
                      fontWeight="bold"
                      ps="3px"
                      fontSize="md"
                    >
                      +55%
                    </StatHelpText>
                  </Flex>
                </Stat>
              </Flex>
            </CardBody>
          </Card>
          <Card minH="83px">
            <CardBody>
              <Flex
                flexDirection="row"
                align="center"
                justify="center"
                w="100%"
              >
                <Stat me="auto">
                  <StatLabel
                    fontSize="sm"
                    color="gray.400"
                    fontWeight="bold"
                    pb=".1rem"
                  >
                    Customers
                  </StatLabel>
                  <Flex>
                    <StatNumber fontSize="lg" color={textColor}>
                      2,300
                    </StatNumber>
                    <StatHelpText
                      alignSelf="flex-end"
                      justifySelf="flex-end"
                      m="0px"
                      color="green.400"
                      fontWeight="bold"
                      ps="3px"
                      fontSize="md"
                    >
                      +5%
                    </StatHelpText>
                  </Flex>
                </Stat>
              </Flex>
            </CardBody>
          </Card>
          <Card minH="83px">
            <CardBody>
              <Flex
                flexDirection="row"
                align="center"
                justify="center"
                w="100%"
              >
                <Stat>
                  <StatLabel
                    fontSize="sm"
                    color="gray.400"
                    fontWeight="bold"
                    pb=".1rem"
                  >
                    New Customers
                  </StatLabel>
                  <Flex>
                    <StatNumber fontSize="lg" color={textColor}>
                      +3,020
                    </StatNumber>
                    <StatHelpText
                      alignSelf="flex-end"
                      justifySelf="flex-end"
                      m="0px"
                      color="red.500"
                      fontWeight="bold"
                      ps="3px"
                      fontSize="md"
                    >
                      -14%
                    </StatHelpText>
                  </Flex>
                </Stat>
              </Flex>
            </CardBody>
          </Card>
          <Card minH="83px">
            <CardBody>
              <Flex
                flexDirection="row"
                align="center"
                justify="center"
                w="100%"
              >
                <Stat me="auto">
                  <StatLabel
                    fontSize="sm"
                    color="gray.400"
                    fontWeight="bold"
                    pb=".1rem"
                  >
                    Total Sales
                  </StatLabel>
                  <Flex>
                    <StatNumber
                      fontSize="lg"
                      color={textColor}
                      fontWeight="bold"
                    >
                      $173,000
                    </StatNumber>
                    <StatHelpText
                      alignSelf="flex-end"
                      justifySelf="flex-end"
                      m="0px"
                      color="green.400"
                      fontWeight="bold"
                      ps="3px"
                      fontSize="md"
                    >
                      +8%
                    </StatHelpText>
                  </Flex>
                </Stat>
              </Flex>
            </CardBody>
          </Card>
        </SimpleGrid>
        <Card p="16px" overflowX={{ sm: "scroll", xl: "hidden" }}>
          <CardHeader p="12px 0px 28px 0px">
            <Flex direction="column">
              <Text
                fontSize="lg"
                color={textColor}
                fontWeight="bold"
                pb=".5rem"
              >
                Subscriptions
              </Text>
            </Flex>
          </CardHeader>
          <Table variant="simple" color={textColor}>
            <Thead>
              <Tr my=".8rem" ps="0px">
                <Th ps="0px" color="gray.400">
                  Companies
                </Th>
                <Th color="gray.400">Members</Th>
                <Th color="gray.400">Budget</Th>
                <Th color="gray.400">Completion</Th>
              </Tr>
            </Thead>
            <Tbody>
              {dashboardTableData.map((row) => {
                return (
                  <DashboardTableRow
                    name={row.name}
                    logo={row.logo}
                    members={row.members}
                    budget={row.budget}
                    progression={row.progression}
                  />
                );
              })}
            </Tbody>
          </Table>
        </Card>
      </Flex>
    </Layout>
  );
}
