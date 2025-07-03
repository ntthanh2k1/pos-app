import { Avatar, Flex, IconButton, Menu, Portal, Text } from "@chakra-ui/react";
import { useColorMode } from "../ui/color-mode";
import { LuMoon, LuSun } from "react-icons/lu";
import { Link } from "react-router-dom";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const username = "thanhnt";
  return (
    <Flex justify="flex-end" align="center" mr="5" py="3">
      <Flex align="center" gap="2">
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
          onClick={toggleColorMode}
          variant="ghost"
        >
          {colorMode === "light" ? <LuMoon /> : <LuSun />}
        </IconButton>
      </Flex>
    </Flex>
  );
};

export default Header;
