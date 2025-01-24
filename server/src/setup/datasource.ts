/** @format */

import { DataSource } from "typeorm";
import { FeedbackEntity, UserEntity } from "../entities";
import "dotenv/config";

const options: any =
  process.env.NODE_ENV === "production"
    ? {
        type: "postgres",
        url: process.env.DATABASE_URL,
        ssl: true,
        synchronize: true,
        entities: [UserEntity, FeedbackEntity],
      }
    : {
        type: "postgres",
        host: process.env.DB_HOST,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        port: Number(process.env.DB_PORT) || 5432,
        database: process.env.DB_DATABASE,
        entities: [UserEntity, FeedbackEntity],
        logging: false,
        synchronize: true,
      };

export const AppDataSource =
  process.env.NODE_ENV === "test"
    ? new DataSource({
        type: "sqlite",
        database: ":memory:",
        entities: [UserEntity, FeedbackEntity],
        synchronize: true,
        logging: false,
      })
    : new DataSource({
        type: "postgres",
        url: process.env.DATABASE_URL,
        ssl: true,
        synchronize: true,
        entities: [UserEntity, FeedbackEntity],
      });
