import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { IdAndDates } from './IdAndDates';

import { User } from './User';

@Entity()
export class RefreshToken extends IdAndDates {
  @Column({ nullable: false })
  value: string;
  @Column()
  userId: number;

  @JoinColumn({ name: 'userId' })
  @ManyToOne(() => User, (user) => user.refreshTokens, { nullable: false })
  user: User;
}
