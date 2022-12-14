import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SignInState {
  signInUpModalOpen: boolean;
  modalState: 'sign-in' | 'sign-up';
}

const initialState = {
  signInUpModalOpen: false
} as SignInState;

export const signInReducer = createSlice({
  name: 'signIn',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setSignInUpModalState: (state, action: PayloadAction<SignInState>) => {
      state.signInUpModalOpen = action.payload.signInUpModalOpen;
      state.modalState = action.payload.modalState;
    }
  }
});

export const { setSignInUpModalState: setSignInUpModalStateAction } =
  signInReducer.actions;

export default signInReducer.reducer;
