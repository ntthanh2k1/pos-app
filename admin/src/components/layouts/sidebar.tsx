import { useSidebarStore } from "@/store/sidebar-store";
import { Box, Flex, Text } from "@chakra-ui/react";

const Sidebar = () => {
  const isSidebarOpen = useSidebarStore((state) => state.isSidebarOpen);
  const isSidebarHovered = useSidebarStore((state) => state.isSidebarHovered);
  // const setSidebarHovered = useSidebarStore((state) => state.setSidebarHovered);
  const sidebarWidth = useSidebarStore((state) => state.getSidebarWidth());

  return (
    <Flex
      w={sidebarWidth}
      h="100vh"
      direction="column"
      borderEnd="solid"
      transition="width 0.2s ease-in-out"
      // onMouseEnter={() => setSidebarHovered(true)}
      // onMouseLeave={() => setSidebarHovered(false)}
      hideBelow="md"
      position="sticky"
      top="0"
    >
      <Flex
        h="16"
        align="center"
        justify="center"
        borderBottom="solid"
        position="sticky"
        top="0"
        zIndex="1000"
        bg="bg.subtle"
      >
        <Text
          fontSize="3xl"
          fontWeight="bold"
          opacity={isSidebarOpen || isSidebarHovered ? 1 : 0}
          transition="opacity 0.2s ease-in-out"
          my="3"
        >
          POS
        </Text>
      </Flex>

      {/* This is a component for tree view in sidebar */}
      <Box className="scrollbar-hidden" overflowY="auto">
        <Flex direction="column" mt="5">
          {Array.from({ length: 50 }).map((_, i) => (
            <Text key={i}>Tree view item {i + 1}</Text>
          ))}
        </Flex>
      </Box>
    </Flex>
  );
};

export default Sidebar;
