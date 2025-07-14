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
import Branch from "./branch.entity";
import Inventory from "./inventory.entity";

@Entity("branch_inventory")
@Unique(["branch_id", "inventory_id"])
class BranchInventory {
  @PrimaryGeneratedColumn("uuid")
  branch_inventory_id: string;

  @Column({ type: "uuid", nullable: true })
  branch_id: string;

  @Column({ type: "uuid", nullable: true })
  inventory_id: string;

  @Column({ default: false })
  is_main_inventory: boolean;

  @Column({ type: "varchar", length: 256, nullable: true })
  created_by: string;

  @CreateDateColumn()
  created_at: Date;

  @Column({ type: "varchar", length: 256, nullable: true })
  updated_by: string;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Branch, (branch) => branch.branch_inventories, {
    nullable: true,
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: "branch_id" })
  branch: Branch;

  @ManyToOne(() => Inventory, (inventory) => inventory.branch_inventories, {
    nullable: true,
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: "inventory_id" })
  inventory: Inventory;
}

export default BranchInventory;
