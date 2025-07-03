import Header from "@/components/layouts/header";
import Sidebar from "@/components/layouts/sidebar";
import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <Flex minH="100vh">
      <Box w="60" borderEnd="solid">
        <Sidebar />
      </Box>

      <Flex direction="column" flex="1">
        <Box w="full" borderBottom="solid">
          <Header />
        </Box>

        <Box flex="1">
          <Outlet />
        </Box>
      </Flex>
    </Flex>
  );
};

export default MainLayout;
