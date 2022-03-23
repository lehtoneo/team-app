import { SignOutInput } from './../inputs/SignOutInput';
import { SignInInput } from './../inputs/SignInInput';
import { Tokens } from './../extra-graphql-types/Tokens';
import { CreateUserInput } from './../inputs/CreateUserInput';
import userService from '../services/user';
import { Resolver, Mutation, Arg } from 'type-graphql';
import { UserInputError } from 'apollo-server-express';
import { User } from '../models/User';



@Resolver()
export class UserResolver {
  @Mutation(() => Tokens)
  async signIn(@Arg('signInInput') data: SignInInput): Promise<Tokens> {
    const signInResult = await userService.signIn(data);
    if (!signInResult.success) {
      throw new UserInputError('Invalid email or password');
    }
    return signInResult.tokens;
  }
  @Mutation(() => User)
  async signOut(@Arg('signOutInput') _data: SignOutInput): Promise<User> {
    throw new UserInputError('not implemented');
    return new User();
  }
  @Mutation(() => Tokens)
  async createUser(
    @Arg('createUserInput') data: CreateUserInput
  ): Promise<Tokens> {
    const newUser = await userService.createUser(data);
    const tokens = await userService.getAccessAndRefreshToken(newUser);
    return tokens;
  }
}
