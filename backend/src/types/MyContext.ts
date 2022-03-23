import { Request, Response } from 'express';
import { User } from '../models/User';

export interface MyContext {
  payload: {
    user?: User;
  };
  req: Request;
  res: Response;
}

export interface MyAuthContext extends MyContext {
  payload: {
    user: User;
  };
}
