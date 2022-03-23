import { RefreshToken } from './../models/UserRefreshToken';
import { SignInInput } from './../inputs/SignInInput';
import { CreateUserInput } from '../inputs/CreateUserInput';
import { sign } from 'jsonwebtoken';
import 'dotenv/config';
import { User } from '../models/User';
import { hash, compare } from 'bcrypt';
import { Tokens } from '../extra-graphql-types/Tokens';

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

  const tokens = await getAccessAndRefreshToken(user);

  return {
    success: true,
    tokens
  };
};

const signOut = async (user: Pick<User, 'id'>, refreshToken: string) => {
  await RefreshToken.delete({
    userId: user.id,
    value: refreshToken
  });

  return {
    success: true
  };
};

const getUserForToken = (user: User) => {
  return {
    id: user.id,
    email: user.email
  };
};

const saveUserRefreshToken = async (
  user: Pick<User, 'id'>,
  refreshTokenValue: string
) => {
  const newRefreshTokenValues = {
    value: refreshTokenValue,
    userId: user.id
  };
  const newRefreshTokenInDb = RefreshToken.create(newRefreshTokenValues);
  await newRefreshTokenInDb.save();
};

const getAccessAndRefreshToken = async (user: User) => {
  const userForToken = getUserForToken(user);

  const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'cba';
  const REFRESH_TOKEN_LIFE = process.env.REFRESH_TOKEN_LIFE || '360d';

  const accessToken = getAccessToken(user);

  const refreshToken = sign(userForToken, REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_LIFE
  });
  await saveUserRefreshToken(user, refreshToken);
  return {
    accessToken,
    refreshToken
  };
};

const getAccessToken = (user: User) => {
  const userForToken = getUserForToken(user);

  const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'abcd';
  const ACCESS_TOKEN_LIFE = process.env.ACCESS_TOKEN_LIFE || '900s';

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const accessToken = sign(userForToken, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_LIFE
  });

  return accessToken;
};

export default {
  getAccessAndRefreshToken,
  getAccessToken,
  createUser,
  signIn,
  signOut
};
