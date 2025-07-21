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
import CategoryItem from "./category-item.entity";
import Unit from "./unit.entity";
import InventoryItem from "./inventory-item.entity";
import Branch from "./branch.entity";
import Business from "./business.entity";

@Entity("item")
class Item {
  @PrimaryGeneratedColumn("uuid")
  item_id: string;

  @Column({ type: "uuid", nullable: true })
  business_id: string;

  @Column({ type: "uuid", nullable: true })
  category_item_id: string;

  @Column({ type: "uuid", nullable: true })
  unit_id: string;

  @Column({ type: "uuid", nullable: true })
  branch_id: string;

  @Column({ type: "varchar", length: 32, unique: true, nullable: true })
  code: string;

  @Column({ type: "varchar", length: 128, nullable: true })
  name: string;

  @Column({ type: "varchar", length: 256, nullable: true })
  image: string;

  @Column({ type: "int", nullable: true })
  cost: number;

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

  @ManyToOne(() => Business, (business) => business.items, {
    nullable: true,
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: "business_id" })
  business: Business;

  @ManyToOne(() => CategoryItem, (category_item) => category_item.items, {
    nullable: true,
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: "category_item_id" })
  category_item: CategoryItem;

  @ManyToOne(() => Unit, (unit) => unit.items, {
    nullable: true,
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: "unit_id" })
  unit: Unit;

  @ManyToOne(() => Branch, (branch) => branch.items, {
    nullable: true,
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: "branch_id" })
  branch: Branch;

  @OneToMany(() => InventoryItem, (inventory_item) => inventory_item.item, {
    createForeignKeyConstraints: false,
  })
  inventory_items: InventoryItem[];
}

export default Item;
