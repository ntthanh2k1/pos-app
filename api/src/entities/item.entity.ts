import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import CategoryItem from "./category-item.entity";
import Unit from "./unit.entity";

@Entity("item")
class Item {
  @PrimaryGeneratedColumn("uuid")
  item_id: string;

  @Column({ type: "uuid", nullable: true })
  category_item_id: string;

  @Column({ type: "uuid", nullable: true })
  unit_id: string;

  @Column({ type: "varchar", length: 32, unique: true, nullable: true })
  code: string;

  @Column({ type: "varchar", length: 128, nullable: true })
  name: string;

  @Column({ type: "varchar", length: 256, nullable: true })
  image: string;

  @Column({ type: "int", default: 0 })
  cost: number;

  @Column({ type: "int", default: 0 })
  price: number;

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

  // relation many item_ids to 1 category_item_id
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
}

export default Item;
