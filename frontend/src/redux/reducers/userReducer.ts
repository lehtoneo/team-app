import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MeUserData } from '../../graphql/queries/me';

export interface LoggedInUserState {
  isLoggedIn: true;
  currentUser: MeUserData;
  isLoggingOut: boolean;
}

export interface LoggedInNotDefinedUserState {
  isLoggedIn: undefined;
  currentUser: null;
  isLoggingOut: false;
}

export interface NotLoggedInUserState {
  isLoggedIn: false;
  currentUser: null;
  isLoggingOut: false;
}

export type UserState =
  | LoggedInUserState
  | NotLoggedInUserState
  | LoggedInNotDefinedUserState;

const initialState = {
  currentUser: null,
  isLoggingOut: false,
  isLoggedIn: undefined
} as UserState;

export const currentUserSlice = createSlice({
  name: 'currentUser',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setCurrentUserState: (_state, action: PayloadAction<UserState>) => {
      return {
        ...action.payload
      };
    }
  }
});

export const { setCurrentUserState } = currentUserSlice.actions;

export default currentUserSlice.reducer;
