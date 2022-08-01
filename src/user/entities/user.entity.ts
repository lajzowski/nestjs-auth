import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @Column({
    length: 255,
    unique: true,
  })
    username: string;

  @Column({ select: false })
    password: string;


  @Column({
    nullable: true,
    default: null,
    select: false,
  })
    token: string | null;

  @Column({
    nullable: true,
    default: null,
    select: false,
    type: 'integer',
  })
    rule: string | null;

}