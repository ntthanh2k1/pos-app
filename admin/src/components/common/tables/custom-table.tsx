import { Table } from "@chakra-ui/react";

const CustomTable = ({ items, visibleColumns }: any) => {
  if (!items || items.length === 0) {
    return <div>No data</div>;
  }

  return (
    <Table.ScrollArea borderWidth="1px" minW="6xl">
      <Table.Root showColumnBorder stickyHeader interactive>
        <Table.Header>
          <Table.Row bg="blue.subtle">
            {visibleColumns.map((column: any) => (
              <Table.ColumnHeader key={column}>
                {column.replace(/_/g, " ").toUpperCase()}
              </Table.ColumnHeader>
            ))}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {items.map((item: any) => (
            <Table.Row key={item.id}>
              {visibleColumns.map((column: any) => (
                <Table.Cell key={column}>{item[column]}</Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Table.ScrollArea>
  );
};

export default CustomTable;
