import theme from "../theme/theme";
import Sidebar from "../components/Sidebar/Sidebar";
import MainPanel from "../components/Layout/MainPanel";
import { ChakraProvider, Portal } from "@chakra-ui/react";
import AdminNavbar from "../components/Navbars/AdminNavbar";
import PanelContent from "../components/Layout/PanelContent";
import PanelContainer from "../components/Layout/PanelContainer";
import React from "react";

console.log(theme);

const Layout = (props) => (
  <ChakraProvider theme={theme} resetCss={false}>
    <Sidebar
      logoText={"PURITY UI DASHBOARD"}
      display="none"
      sidebarVariant={"opaque"}
    />
    <MainPanel
      w={{
        base: "100%",
        xl: "calc(100% - 260px)",
      }}
    >
      <AdminNavbar
        title={props.title}
        primaryAction={props.primaryAction && props.primaryAction}
      />
      <PanelContent>
        <PanelContainer>{props.children}</PanelContainer>
      </PanelContent>
    </MainPanel>
  </ChakraProvider>
);

export default Layout;
