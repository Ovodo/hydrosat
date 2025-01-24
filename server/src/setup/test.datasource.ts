// test-datasource.ts
import { DataSource } from "typeorm";
import { UserEntity, FeedbackEntity } from "../entities";

export const TestDataSource = new DataSource({
  type: "sqlite",
  database: ":memory:",
  entities: [UserEntity, FeedbackEntity],
  synchronize: true,
  logging: false,
});
