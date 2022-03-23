import { MyContext } from './../types/MyContext';
import { AuthenticationError } from 'apollo-server-express';
import { MiddlewareFn } from 'type-graphql';

export const isAuth: MiddlewareFn<MyContext> = async ({ context }, next) => {
  console.log({ context });
  if (!context.payload.user) {
    throw new AuthenticationError('Unauthorized');
  }
  return next();
};
