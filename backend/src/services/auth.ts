import { RefreshToken } from './../models/UserRefreshToken';
import { sign, verify } from 'jsonwebtoken';
import 'dotenv/config';
import { User } from '../models/User';
import { isNumber, isString } from 'class-validator';
import { AuthenticationError } from 'apollo-server-express';

interface ITokenUser {
  id: number;
}

const getUserForToken = (user: ITokenUser): ITokenUser => {
  return {
    id: user.id
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

const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'cba';
const REFRESH_TOKEN_LIFE = process.env.REFRESH_TOKEN_LIFE || '360d';

const getAccessAndRefreshToken = async (user: User) => {
  const userForToken = getUserForToken(user);

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

const newAccessToken = async (refreshToken: string): Promise<string> => {
  try {
    const decodedToken = verify(refreshToken, REFRESH_TOKEN_SECRET);

    if (!validateTokenUser(decodedToken)) {
      throw new Error('');
    }
    const isTokenInDb = await RefreshToken.findOne({
      userId: decodedToken.id,
      value: refreshToken
    });

    if (!isTokenInDb) {
      throw new Error('');
    }

    return getAccessToken({
      id: decodedToken.id
    });
  } catch (e: any) {
    throw new AuthenticationError('invalid refresh token');
  }
};

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'abcd';
const ACCESS_TOKEN_LIFE = process.env.ACCESS_TOKEN_LIFE || '900s';

const getAccessToken = (user: ITokenUser) => {
  const userForToken = getUserForToken(user);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const accessToken = sign(userForToken, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_LIFE
  });

  return accessToken;
};

const validateTokenUser = (tokenUser: any): tokenUser is ITokenUser => {
  if (!tokenUser || !tokenUser.id || !isNumber(tokenUser.id)) {
    return false;
  }
  return true;
};

const validateAccessToken = async (headers: any): Promise<User | undefined> => {
  if (!headers || !headers.authorization) {
    return undefined;
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const accessToken = headers.authorization;

  if (
    accessToken &&
    isString(accessToken) &&
    accessToken.toLowerCase().startsWith('bearer ')
  ) {
    try {
      const tokenAfterBearer = accessToken.substring(7);

      const decodedToken = verify(tokenAfterBearer, ACCESS_TOKEN_SECRET);

      if (!validateTokenUser(decodedToken)) {
        return undefined;
      }
      const currentUser = await User.findOne({
        id: decodedToken.id
      });

      return currentUser;
    } catch (error) {
      return undefined;
    }
  }
  console.log('???');
  return undefined;
};

const authService = {
  getAccessAndRefreshToken,
  getAccessToken,
  validateAccessToken,
  newAccessToken
};

export default authService;
