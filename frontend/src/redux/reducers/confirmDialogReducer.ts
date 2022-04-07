import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ConfirmState {
  show: boolean;
  text: string;
}

const initialState = {
  show: false,
  text: ''
} as ConfirmState;

export const confirmDialogReducer = createSlice({
  name: 'confirm',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    showConfirm: (state, action: PayloadAction<string>) => {
      state.show = true;
      state.text = action.payload;
    },
    hideConfirm: (state) => {
      state.show = false;
      state.text = '';
    }
  }
});

export const confirmDialogActions = confirmDialogReducer.actions;

export default confirmDialogReducer.reducer;
