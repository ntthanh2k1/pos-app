import dotenv from "dotenv";
import { DataSource } from "typeorm";

dotenv.config();

const typeOrmConfig = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : false,
  entities: ["src/entities/*.ts"],
  synchronize: true,
});

export default typeOrmConfig;
