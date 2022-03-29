import { RefreshToken } from './../models/UserRefreshToken';
import { SignInInput } from './../inputs/SignInInput';
import { CreateUserInput } from '../inputs/CreateUserInput';
import 'dotenv/config';
import { User } from '../models/User';
import { hash, compare } from 'bcrypt';
import { Tokens } from '../extra-graphql-types/Tokens';
import authService from './auth';
import AppDataSource from '../data-source';
const userRepository = AppDataSource.getRepository(User);
const devUserEmail = 'a@b.fi';
const getDevUser = async () => {
  return await userRepository.findOne({
    where: {
      email: devUserEmail
    }
  });
};

const createDevUserIfNotExists = async () => {
  const isInDb = await User.findOne({
    where: {
      email: devUserEmail
    }
  });
  if (!isInDb) {
    await createUser({ email: devUserEmail, password: 's', firstname: 'ossi' });
  }
};

const createUser = async (userInput: CreateUserInput) => {
  console.log('Creating user');
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const passwordHash: string = await hash(userInput.password, 10);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...newUserValues } = { ...userInput, passwordHash };

  const user = User.create(newUserValues);
  const newUser = await user.save();
  console.log('User created');
  return newUser;
};

interface SignInSuccessResult {
  success: true;
  tokens: Tokens;
}

interface SignInErrorResult {
  success: false;
}
type SignInResult = SignInErrorResult | SignInSuccessResult;

const signIn = async (signInInput: SignInInput): Promise<SignInResult> => {
  const user = await User.findOne({
    where: {
      email: signInInput.email
    }
  });

  if (!user) return { success: false };

  const success = await compare(signInInput.password, user.passwordHash);
  if (!success) return { success: false };

  const tokens = await authService.getAccessAndRefreshToken(user);

  return {
    success: true,
    tokens
  };
};

const signOut = async (refreshToken: string) => {
  await RefreshToken.delete({
    value: refreshToken
  });

  return {
    success: true
  };
};

const userService = {
  createUser,
  signIn,
  signOut,
  createDevUserIfNotExists,
  getDevUser
};

export default userService;
