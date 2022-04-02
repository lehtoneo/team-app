import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SignInState {
  userWantsToLogin: boolean;
}

const initialState = {
  userWantsToLogin: false
} as SignInState;

export const signInReducer = createSlice({
  name: 'signIn',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setUserWantsToLogin: (state, action: PayloadAction<boolean>) => {
      state.userWantsToLogin = action.payload;
    }
  }
});

export const { setUserWantsToLogin } = signInReducer.actions;

export default signInReducer.reducer;
