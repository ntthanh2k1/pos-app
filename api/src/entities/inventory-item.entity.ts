import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from "typeorm";
import Inventory from "./inventory.entity";
import Item from "./item.entity";
import Supplier from "./supplier.entity";
import Unit from "./unit.entity";
import Branch from "./branch.entity";

@Entity("inventory_item")
@Unique(["inventory_id", "item_id"])
class InventoryItem {
  @PrimaryGeneratedColumn("uuid")
  inventory_item_id: string;

  @Column({ type: "uuid", nullable: true })
  inventory_id: string;

  @Column({ type: "uuid", nullable: true })
  item_id: string;

  @Column({ type: "uuid", nullable: true })
  supplier_id: string;

  @Column({ type: "uuid", nullable: true })
  unit_id: string;

  @Column({ type: "uuid", nullable: true })
  branch_id: string;

  @Column({ type: "int", default: 0 })
  cost: number;

  @Column({ type: "int", default: 0 })
  quantity: number;

  @Column({ type: "varchar", length: 256, nullable: true })
  created_by: string;

  @CreateDateColumn()
  created_at: Date;

  @Column({ type: "varchar", length: 256, nullable: true })
  updated_by: string;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Inventory, (inventory) => inventory.inventory_items, {
    nullable: true,
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: "inventory_id" })
  inventory: Inventory;

  @ManyToOne(() => Item, (item) => item.inventory_items, {
    nullable: true,
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: "item_id" })
  item: Item;

  @ManyToOne(() => Supplier, (supplier) => supplier.inventory_items, {
    nullable: true,
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: "supplier_id" })
  supplier: Supplier;

  @ManyToOne(() => Unit, (unit) => unit.inventory_items, {
    nullable: true,
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: "unit_id" })
  unit: Unit;

  @ManyToOne(() => Branch, (branch) => branch.inventory_items, {
    nullable: true,
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: "branch_id" })
  branch: Branch;
}

export default InventoryItem;
