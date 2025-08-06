import {
  Avatar,
  createListCollection,
  Flex,
  IconButton,
  Menu,
  Portal,
  Select,
  Text,
} from "@chakra-ui/react";
import { useColorMode } from "../ui/color-mode";
import { LuMoon, LuSun } from "react-icons/lu";
import { Link } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { useSidebarStore } from "@/store/sidebar-store";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const setSidebarOpen = useSidebarStore((state) => state.setSidebarOpen);
  const sidebarWidth = useSidebarStore((state) => state.getSidebarWidth());

  const authUser = {
    businessId: "0",
    branchId: "1",
    userId: "1",
    username: "thanhnt",
    jti: "123",
  };

  const branches = createListCollection({
    items: [
      { value: "0", label: "Branch 0" },
      { value: "1", label: "Branch 1" },
      { value: "2", label: "Branch 2" },
    ],
  });

  const selectBranch = (branchId: string[]) => {
    console.log("Select branch successfully.", branchId);
  };

  return (
    <Flex
      w={`calc(100% - ${sidebarWidth})`}
      h="16"
      left={sidebarWidth}
      justify="space-between"
      align="center"
      borderBottom="solid"
      position="sticky"
      top="0"
      zIndex="1000"
      bg="bg.subtle"
    >
      <Flex align="center" gap="2" ml="3">
        <IconButton
          aria-label="Toggle sidebar"
          variant="ghost"
          border="solid"
          onClick={setSidebarOpen}
        >
          <RxHamburgerMenu />
        </IconButton>

        <Select.Root
          collection={branches}
          size="sm"
          width="240px"
          defaultValue={[authUser.branchId]}
          onValueChange={(branch) => {
            selectBranch(branch.value);
          }}
        >
          <Select.HiddenSelect />
          <Select.Control>
            <Select.Trigger>
              <Select.ValueText placeholder="Select branch" />
            </Select.Trigger>
            <Select.IndicatorGroup>
              <Select.Indicator />
            </Select.IndicatorGroup>
          </Select.Control>
          <Portal>
            <Select.Positioner>
              <Select.Content>
                {branches.items.map((branch) => (
                  <Select.Item item={branch} key={branch.value}>
                    {branch.label}
                    <Select.ItemIndicator />
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Positioner>
          </Portal>
        </Select.Root>
      </Flex>

      <Flex align="center" gap="2" mr="3">
        <Menu.Root>
          <Menu.Trigger asChild>
            <Flex align="center" gap="2" cursor="pointer">
              <Text>
                {authUser.username.length > 5
                  ? `${authUser.username.slice(0, 5)}...`
                  : authUser.username}
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
