import CustomTable from "@/components/common/tables/custom-table";
import { Flex } from "@chakra-ui/react";

const Home = () => {
  const items = [
    { id: "1", code: "A", name: "A" },
    { id: "2", code: "B", name: "B" },
    { id: "3", code: "C", name: "C" },
  ];
  const visibleColumns = Object.keys(items[0]).filter((key) => key !== "id");

  return (
    <Flex direction="column" w="full">
      <CustomTable items={items} visibleColumns={visibleColumns} />
      <CustomTable items={items} visibleColumns={visibleColumns} />
      <CustomTable items={items} visibleColumns={visibleColumns} />
      <CustomTable items={items} visibleColumns={visibleColumns} />
      <CustomTable items={items} visibleColumns={visibleColumns} />
    </Flex>
  );
};

export default Home;
