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
import User from "./user.entity";
import Business from "./business.entity";

@Entity("branch_user")
@Unique(["branch_id", "user_id"])
class BranchUser {
  @PrimaryGeneratedColumn("uuid")
  branch_user_id: string;

  @Column({ type: "uuid", nullable: true })
  branch_id: string;

  @Column({ type: "uuid", nullable: true })
  user_id: string;

  @Column({ type: "uuid", nullable: true })
  business_id: string;

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

  @ManyToOne(() => Branch, (branch) => branch.branch_users, {
    nullable: true,
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: "branch_id" })
  branch: Branch;

  @ManyToOne(() => User, (user) => user.branch_users, {
    nullable: true,
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => Business, (business) => business.branch_users, {
    nullable: true,
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: "business_id" })
  business: Business;
}

export default BranchUser;
