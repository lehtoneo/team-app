import { SignInInput } from './../inputs/SignInInput';
import { Tokens } from './../extra-graphql-types/Tokens';
import { CreateUserInput } from './../inputs/CreateUserInput';
import userService from '../services/user';
import { Resolver, Mutation, Arg } from 'type-graphql';
import { UserInputError } from 'apollo-server-express';

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
  @Mutation(() => Tokens)
  async createUser(
    @Arg('createUserInput') data: CreateUserInput
  ): Promise<Tokens> {
    const newUser = await userService.createUser(data);
    const tokens = userService.getAccessAndRefreshToken(newUser);
    return tokens;
  }
}
