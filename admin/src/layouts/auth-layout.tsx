import { Box, Flex, Text } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <Flex
      direction="column"
      minH="100vh"
      align="center"
      justify="flex-start"
      pt="12"
    >
      <Text
        top="50px"
        textAlign="center"
        fontSize="3xl"
        fontWeight="bold"
        mb="12"
      >
        Welcome to Shroomie POS
      </Text>

      <Flex
        align="center"
        justify="center"
        direction="column"
        border="solid"
        w="96"
        px="10"
        py="3"
      >
        <Outlet />
      </Flex>
    </Flex>
  );
};

export default AuthLayout;
