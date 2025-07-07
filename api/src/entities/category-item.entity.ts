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

@Entity("category_item")
class CategoryItem {
  @PrimaryGeneratedColumn("uuid")
  category_item_id: string;

  @Column({ type: "uuid", nullable: true })
  parent_id: string;

  @Column({ type: "varchar", length: 32, unique: true, nullable: true })
  code: string;

  @Column({ type: "varchar", length: 128, nullable: true })
  name: string;

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

  // relation 1 parent_id has many category_item_ids
  @ManyToOne(() => CategoryItem, (parent) => parent.category_items, {
    nullable: true,
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: "parent_id" })
  parent: CategoryItem;

  @OneToMany(() => CategoryItem, (category_item) => category_item.parent, {
    createForeignKeyConstraints: false,
  })
  category_items: CategoryItem[];

  // relation 1 category_item_id has many item_ids
  @OneToMany(() => Item, (item) => item.category_item, {
    createForeignKeyConstraints: false,
  })
  items: Item[];
}

export default CategoryItem;
