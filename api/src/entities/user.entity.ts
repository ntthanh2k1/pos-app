import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("user")
class User {
  @PrimaryGeneratedColumn("uuid")
  user_id: string;

  @Column({ nullable: true })
  user_code: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  username: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  identity_number: string;

  @Column({ nullable: true })
  tax_number: string;

  @Column({ nullable: true })
  gender: boolean;

  @Column({ nullable: true })
  birthdate: Date;

  @Column({ nullable: true })
  address: string;
}

export default User;
