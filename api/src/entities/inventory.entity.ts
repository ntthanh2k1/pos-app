import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import BranchInventory from "./branch-inventory.entity";
import InventoryItem from "./inventory-item.entity";
import Business from "./business.entity";

@Entity("inventory")
class Inventory {
  @PrimaryGeneratedColumn("uuid")
  inventory_id: string;

  @Column({ type: "uuid", nullable: true })
  business_id: string;

  @Column({ type: "varchar", length: 32, unique: true, nullable: true })
  code: string;

  @Column({ type: "varchar", length: 128, nullable: true })
  name: string;

  @Column({ type: "varchar", length: 256, nullable: true })
  note: string;

  @Column({ default: true })
  is_active: boolean;

  @Column({ type: "varchar", length: 256, nullable: true })
  created_by: string;

  @CreateDateColumn()
  created_at: Date;

  @Column({ type: "varchar", length: 256, nullable: true })
  updated_by: string;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Business, (business) => business.inventories, {
    nullable: true,
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: "business_id" })
  business: Business;

  @OneToMany(
    () => BranchInventory,
    (branch_inventory) => branch_inventory.inventory,
    {
      createForeignKeyConstraints: false,
    }
  )
  branch_inventories: BranchInventory[];

  @OneToMany(
    () => InventoryItem,
    (inventory_item) => inventory_item.inventory,
    {
      createForeignKeyConstraints: false,
    }
  )
  inventory_items: InventoryItem[];
}

export default Inventory;
