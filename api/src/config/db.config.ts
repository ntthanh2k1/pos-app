import dotenv from "dotenv";
import { DataSource } from "typeorm";

dotenv.config();

const dbConfig = new DataSource({
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

const connectDB = async () => {
  try {
    await dbConfig.initialize();
    console.log("Database connected successfully.");
  } catch (error) {
    console.log("Error connecting to database.", error);
    process.exit(1);
  }
};

export { dbConfig, connectDB };
