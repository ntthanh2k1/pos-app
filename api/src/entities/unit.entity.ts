import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import Item from "./item.entity";

@Entity("unit")
class Unit {
  @PrimaryGeneratedColumn("uuid")
  unit_id: string;

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

  // relation 1 unit_id has many item_ids
  @OneToMany(() => Item, (item) => item.unit, {
    createForeignKeyConstraints: false,
  })
  items: Item[];
}

export default Unit;
