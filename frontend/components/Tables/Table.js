import { Table, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import { dashboardTableData } from "../../variables/general";
import DashboardTableRow from "./DashboardTableRow";
import React from "react";

export default function Table() {
  return (
    <Table variant="simple" color={textColor}>
      <Thead>
        <Tr my=".8rem" ps="0px">
          <Th ps="0px" color="gray.400">
            Name
          </Th>
          <Th color="gray.400">Product Type</Th>
          <Th color="gray.400">Price</Th>
          <Th color="gray.400">Actions</Th>
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
  );
}
