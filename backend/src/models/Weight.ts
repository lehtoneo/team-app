import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { IdAndDates } from './IdAndDates';

import { User } from './User';

@Entity()
export class Weight extends IdAndDates {
  @Column({ nullable: false })
  kgValue: number;

  @Column({ nullable: false })
  date: Date;

  @Column()
  userId: number;

  @JoinColumn({ name: 'userId' })
  @ManyToOne(() => User, (user) => user, { nullable: true })
  user: User;
}
