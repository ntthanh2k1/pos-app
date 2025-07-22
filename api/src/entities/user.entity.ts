import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import Business from "./business.entity";

@Entity("users")
class User {
  @PrimaryGeneratedColumn("uuid")
  user_id: string;

  @Column({ type: "uuid", nullable: true })
  business_id: string;

  @Column({ type: "varchar", length: 32, unique: true, nullable: true })
  code: string;

  @Column({ type: "varchar", length: 128, nullable: true })
  name: string;

  @Column({ type: "varchar", length: 64, unique: true, nullable: true })
  username: string;

  @Column({ type: "varchar", length: 256, nullable: true })
  password: string;

  @Column({ type: "varchar", length: 256, nullable: true })
  image: string;

  @Column({ type: "varchar", length: 32, nullable: true })
  phone: string;

  @Column({ type: "varchar", length: 128, nullable: true })
  email: string;

  @Column({ type: "varchar", length: 32, nullable: true })
  identity_number: string;

  @Column({ type: "varchar", length: 32, nullable: true })
  tax_number: string;

  @Column({ default: true })
  gender: boolean;

  @Column({ nullable: true })
  birth_date: Date;

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

  @ManyToOne(() => Business, (business) => business.users, {
    nullable: true,
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: "business_id" })
  business: Business;
}

export default User;
