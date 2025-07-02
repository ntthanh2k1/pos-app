import { Box, Flex, Text } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <Box>
      <Flex align="center" justify="center">
        <Text
          position="absolute"
          top="50px"
          textAlign="center"
          fontSize="3xl"
          fontWeight="bold"
        >
          Welcome to Shroomie POS
        </Text>
      </Flex>
      <Flex minH="100vh" align="center" justify="center">
        <Flex
          direction="column"
          align="center"
          justify="center"
          border="solid"
          w="96"
          px="10"
          py="3"
        >
          <Outlet />
        </Flex>
      </Flex>
    </Box>
  );
};

export default AuthLayout;
