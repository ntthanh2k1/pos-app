import { useLayoutStore } from "@/store/layout-store";
import { Flex, Text } from "@chakra-ui/react";

const Sidebar = () => {
  const { isSidebarOpen, isSidebarHovered, setSidebarHovered } =
    useLayoutStore();
  const sidebarWidth = isSidebarOpen || isSidebarHovered ? "56" : "20";

  return (
    <Flex
      w={sidebarWidth}
      direction="column"
      borderEnd="solid"
      transition="width 0.2s ease-in-out"
      overflow="hidden"
      onMouseEnter={() => setSidebarHovered(true)}
      onMouseLeave={() => setSidebarHovered(false)}
    >
      <Flex h="16" align="center" justify="center" borderBottom="solid">
        <Text
          fontSize="3xl"
          fontWeight="bold"
          opacity={isSidebarOpen || isSidebarHovered ? 1 : 0}
          transition="opacity 0.2s ease-in-out"
        >
          POS
        </Text>
      </Flex>
      <Flex>Tree view</Flex>
    </Flex>
  );
};

export default Sidebar;
