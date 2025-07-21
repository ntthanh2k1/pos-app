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
import Business from "./business.entity";
import CategoryItem from "./category-item.entity";
import Item from "./item.entity";
import Inventory from "./inventory.entity";

@Entity("branch")
class Branch {
  @PrimaryGeneratedColumn("uuid")
  branch_id: string;

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

  @Column({ type: "varchar", length: 32, nullable: true })
  tax_number: string;

  @Column({ type: "varchar", length: 256, nullable: true })
  address: string;

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

  @ManyToOne(() => Business, (business) => business.branches, {
    nullable: true,
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: "business_id" })
  business: Business;

  @OneToMany(() => Inventory, (inventory) => inventory.branch, {
    createForeignKeyConstraints: false,
  })
  inventories: Inventory[];

  @OneToMany(() => CategoryItem, (category_item) => category_item.branch, {
    createForeignKeyConstraints: false,
  })
  category_items: CategoryItem[];

  @OneToMany(() => Item, (item) => item.branch, {
    createForeignKeyConstraints: false,
  })
  items: Item[];
}

export default Branch;
