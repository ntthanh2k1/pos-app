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
import Item from "./item.entity";
import InventoryItem from "./inventory-item.entity";
import Business from "./business.entity";
import Branch from "./branch.entity";

@Entity("units")
class Unit {
  @PrimaryGeneratedColumn("uuid")
  unit_id: string;

  @Column({ type: "uuid", nullable: true })
  business_id: string;

  @Column({ type: "uuid", nullable: true })
  branch_id: string;

  @Column({ type: "varchar", length: 32, nullable: true })
  code: string;

  @Column({ type: "varchar", length: 128, nullable: true })
  name: string;

  @Column({ type: "varchar", length: 32, nullable: true })
  symbol: string;

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

  @ManyToOne(() => Business, (business) => business.units, {
    nullable: true,
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: "business_id" })
  business: Business;

  @ManyToOne(() => Branch, (branch) => branch.units, {
    nullable: true,
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: "branch_id" })
  branch: Branch;

  @OneToMany(() => Item, (item) => item.unit, {
    createForeignKeyConstraints: false,
  })
  items: Item[];

  @OneToMany(() => InventoryItem, (inventory_item) => inventory_item.unit, {
    createForeignKeyConstraints: false,
  })
  inventory_items: InventoryItem[];
}

export default Unit;
