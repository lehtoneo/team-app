import { MyAuthContext } from './../types/MyContext';
import { SignOutInput } from './../inputs/SignOutInput';
import { SignInInput } from './../inputs/SignInInput';
import { Tokens } from './../extra-graphql-types/Tokens';
import { CreateUserInput } from './../inputs/CreateUserInput';
import userService from '../services/user';
import { Resolver, Mutation, Arg, UseMiddleware, Ctx } from 'type-graphql';
import { UserInputError } from 'apollo-server-express';
import { User } from '../models/User';
import authService from '../services/auth';
import { isAuth } from '../middleware/isAuth';
import { SignOutResult } from '../extra-graphql-types/SignOutResult';
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
  @Mutation(() => SignOutResult)
  async signOut(
    @Arg('signOutInput') data: SignOutInput
  ): Promise<SignOutResult> {
    return await userService.signOut(data.refreshToken);
  }
  @Mutation(() => Tokens)
  async newAccessToken(
    @Arg('refreshToken') refreshToken: string
  ): Promise<Tokens> {
    const accessToken = await authService.newAccessToken(refreshToken);
    return {
      accessToken,
      refreshToken
    };
  }
  @Mutation(() => Tokens)
  async createUser(
    @Arg('createUserInput') data: CreateUserInput
  ): Promise<Tokens> {
    const newUser = await userService.createUser(data);
    const tokens = await authService.getAccessAndRefreshToken(newUser);
    return tokens;
  }
}
