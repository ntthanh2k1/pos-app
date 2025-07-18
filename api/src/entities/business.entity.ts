import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import Branch from "./branch.entity";
import Inventory from "./inventory.entity";
import Supplier from "./supplier.entity";
import User from "./user.entity";

@Entity("business")
class Business {
  @PrimaryGeneratedColumn("uuid")
  business_id: string;

  @Column({ type: "varchar", length: 32, unique: true, nullable: true })
  code: string;

  @Column({ type: "varchar", length: 128, nullable: true })
  name: string;

  @Column({ type: "varchar", length: 256, nullable: true })
  image: string;

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

  @OneToMany(() => Branch, (branch) => branch.business, {
    createForeignKeyConstraints: false,
  })
  branches: Branch[];

  @OneToMany(() => Inventory, (inventory) => inventory.business, {
    createForeignKeyConstraints: false,
  })
  inventories: Inventory[];

  @OneToMany(() => Supplier, (supplier) => supplier.business, {
    createForeignKeyConstraints: false,
  })
  suppliers: Supplier[];

  @OneToMany(() => User, (user) => user.business, {
    createForeignKeyConstraints: false,
  })
  users: User[];
}

export default Business;
