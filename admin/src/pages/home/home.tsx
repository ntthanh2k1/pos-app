import CustomTable from "@/components/common/tables/custom-table";
import { Flex } from "@chakra-ui/react";

const Home = () => {
  const items = [
    { id: 1, name: "Laptop", category: "Electronics", price: 999.99 },
    { id: 2, name: "Coffee Maker", category: "Home Appliances", price: 49.99 },
    { id: 3, name: "Desk Chair", category: "Furniture", price: 150.0 },
    { id: 4, name: "Smartphone", category: "Electronics", price: 799.99 },
    { id: 5, name: "Headphones", category: "Accessories", price: 199.99 },
    { id: 6, name: "Camera", category: "Electronics", price: 699.99 },
    { id: 7, name: "Laptop", category: "Electronics", price: 999.99 },
    { id: 8, name: "Coffee Maker", category: "Home Appliances", price: 49.99 },
    { id: 9, name: "Desk Chair", category: "Furniture", price: 150.0 },
    { id: 10, name: "Smartphone", category: "Electronics", price: 799.99 },
  ];
  const visibleColumns = Object.keys(items[0]).filter((key) => key !== "id");

  return (
    <Flex direction="column">
      <CustomTable items={items} visibleColumns={visibleColumns} />
      <CustomTable items={items} visibleColumns={visibleColumns} />
      <CustomTable items={items} visibleColumns={visibleColumns} />
    </Flex>
  );
};

export default Home;
