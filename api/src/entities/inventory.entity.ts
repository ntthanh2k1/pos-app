import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("inventory")
class Inventory {
  @PrimaryGeneratedColumn("uuid")
  inventory_id: string;

  @Column({ type: "uuid", nullable: true })
  branch_id: string;

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
}

export default Inventory;
