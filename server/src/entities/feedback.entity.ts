/** @format */
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { CoreEntity } from "./core.entity";
import { UserEntity } from "./user.entity";

@Entity({ name: "feedback" })
export class FeedbackEntity extends CoreEntity {
  @PrimaryGeneratedColumn("uuid")
  uuid: string;

  @Column({ name: "text", type: "text" })
  text: string;

  @Column({
    name: "sentiment",
    type: "varchar",
    enum: ["GOOD", "BAD", "NEUTRAL"],
  })
  sentiment: string;

  @Column({ name: "score", type: "float", nullable: true })
  score: number;

  @ManyToOne(() => UserEntity, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_uuid" })
  user: UserEntity;

  @Column({ name: "user_uuid" })
  userUuid: string;
}
