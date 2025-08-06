import { Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Sidebar from "@/components/layouts/sidebar";
import Header from "@/components/layouts/header";

const MainLayout = () => {
  return (
    <Flex minH="100vh">
      {/* Sidebar */}
      <Sidebar />

      <Flex direction="column" flex="1">
        {/* Header */}
        <Header />

        {/* Content */}
        <Flex flex="1" px="10">
          <Outlet />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default MainLayout;
