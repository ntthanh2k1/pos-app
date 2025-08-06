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
import InventoryItem from "./inventory-item.entity";
import Business from "./business.entity";
import Branch from "./branch.entity";
import BranchInventory from "./branch-inventory.entity";

@Entity("inventories")
class Inventory {
  @PrimaryGeneratedColumn("uuid")
  inventory_id: string;

  @Column({ type: "uuid", nullable: true })
  business_id: string;

  @Column({ type: "varchar", length: 32, unique: true, nullable: true })
  code: string;

  @Column({ type: "varchar", length: 128, nullable: true })
  name: string;

  @Column({ type: "varchar", length: 32, nullable: true })
  phone: string;

  @Column({ type: "varchar", length: 128, nullable: true })
  email: string;

  @Column({ type: "varchar", length: 256, nullable: true })
  address: string;

  @Column({ default: false })
  is_main_inventory: boolean;

  @Column({ type: "varchar", length: 256, nullable: true })
  note: string;

  @Column({ default: true })
  is_active: boolean;

  @Column({ default: false })
  is_deleted: boolean;

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
