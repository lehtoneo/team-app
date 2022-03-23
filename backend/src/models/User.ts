import { RefreshToken } from './UserRefreshToken';
import { Entity, Column, OneToMany } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import { IdAndDates } from './IdAndDates';
import { IsEmail } from 'class-validator';

@Entity()
@ObjectType()
export class User extends IdAndDates {
  @Field(() => String)
  @IsEmail()
  @Column({ unique: true, nullable: false })
  email: string;

  @Field(() => String)
  @Column({ nullable: false })
  firstname: string;

  @Column({ nullable: false })
  passwordHash: string;

  @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.user)
  refreshTokens: RefreshToken[];
}
