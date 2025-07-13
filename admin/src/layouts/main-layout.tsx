import Header from "@/components/layouts/header";
import Sidebar from "@/components/layouts/sidebar";
import { Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <Flex minH="100vh">
      <Sidebar />

      <Flex direction="column" flex="1">
        <Header />

        <Outlet />
      </Flex>
    </Flex>
  );
};

export default MainLayout;
