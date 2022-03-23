import { MyContext } from './../types/MyContext';
import { AuthenticationError } from 'apollo-server-express';
import { MiddlewareFn } from 'type-graphql';

export const isAuth: MiddlewareFn<MyContext> = async ({ context }, next) => {
  const contextPayload = context.payload;
  console.log({ contextPayload });
  if (!context.payload.user) {
    throw new AuthenticationError('Unauthorized');
  }
  return next();
};
