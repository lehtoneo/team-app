import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ConfirmDialogType = 'editEvent' | 'copyEvent';

export interface ConfirmState {
  show: boolean;
  text: string;
  currentDialogType?: ConfirmDialogType;
  dontShowAgainOnThisSession: ConfirmDialogType[];
}

const initialState = {
  show: false,
  text: '',
  currentDialogType: undefined,
  dontShowAgainOnThisSession: []
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
    },
    setCurrentDialogType: (
      state,
      action: PayloadAction<ConfirmDialogType | undefined>
    ) => {
      state.currentDialogType = action.payload;
    },
    disableDialog: (state, action: PayloadAction<ConfirmDialogType>) => {
      console.log({ action });
      state.dontShowAgainOnThisSession = [
        ...state.dontShowAgainOnThisSession,
        action.payload
      ];
    }
  }
});

export const confirmDialogActions = confirmDialogReducer.actions;

export default confirmDialogReducer.reducer;
