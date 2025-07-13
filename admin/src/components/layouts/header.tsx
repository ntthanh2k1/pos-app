import { Avatar, Flex, IconButton, Menu, Portal, Text } from "@chakra-ui/react";
import { useColorMode } from "../ui/color-mode";
import { LuMoon, LuSun } from "react-icons/lu";
import { Link } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { useLayoutStore } from "@/store/layout-store";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const toggleSidebar = useLayoutStore((state) => state.toggleSidebar);

  const username = "thanhnt";

  return (
    <Flex h="16" justify="space-between" align="center" borderBottom="solid">
      <Flex ml="3">
        <IconButton
          aria-label="Toggle sidebar"
          variant="ghost"
          border="solid"
          onClick={toggleSidebar}
        >
          <RxHamburgerMenu />
        </IconButton>
      </Flex>
      <Flex align="center" gap="2" mr="3">
        <Menu.Root>
          <Menu.Trigger asChild>
            <Flex align="center" gap="2" cursor="pointer">
              <Text>
                {username.length > 5 ? `${username.slice(0, 5)}...` : username}
              </Text>
              <Avatar.Root>
                <Avatar.Fallback />
                <Avatar.Image />
              </Avatar.Root>
            </Flex>
          </Menu.Trigger>
          <Portal>
            <Menu.Positioner>
              <Menu.Content>
                <Menu.Item value="item-1" cursor="pointer">
                  Settings
                </Menu.Item>
                <Menu.Item asChild value="item-2" cursor="pointer">
                  <Link to="/login">Logout</Link>
                </Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>
        <IconButton
          aria-label="Toggle theme mode"
          variant="ghost"
          border="solid"
          onClick={toggleColorMode}
        >
          {colorMode === "light" ? <LuMoon /> : <LuSun />}
        </IconButton>
      </Flex>
    </Flex>
  );
};

export default Header;
