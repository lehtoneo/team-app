import { ConfirmDialogType } from './../redux/reducers/confirmDialogReducer';
import { confirmDialogActions } from '../redux/reducers/confirmDialogReducer';
import { useAppDispatch, useAppSelector } from './redux';

let resolveCallback: (arg: boolean) => void;
const useConfirm = (dialogType?: ConfirmDialogType) => {
  const confirmState = useAppSelector((state) => state.confirmDialog);
  const dispatch = useAppDispatch();

  const onConfirm = (
    dontShowAgainEnabled: boolean,
    dialType?: ConfirmDialogType | undefined
  ) => {
    if (dontShowAgainEnabled && dialType) {
      dispatch(confirmDialogActions.disableDialog(dialType));
    }
    closeConfirm();
    resolveCallback(true);
  };

  const onCancel = () => {
    closeConfirm();
    resolveCallback(false);
  };
  const confirm = (text: string): Promise<boolean> => {
    const showDialog =
      dialogType === undefined
        ? true
        : !confirmState.dontShowAgainOnThisSession.find(
            (v) => v === dialogType
          );
    dispatch(confirmDialogActions.setCurrentDialogType(dialogType));

    const asyncTrue = async () => {
      return true;
    };

    if (!showDialog) {
      return asyncTrue();
    }

    dispatch(confirmDialogActions.showConfirm(text));
    return new Promise((res, rej) => {
      resolveCallback = res;
    });
  };

  const closeConfirm = () => {
    dispatch(confirmDialogActions.hideConfirm());
  };

  return { confirm, onConfirm, onCancel, confirmState };
};

export default useConfirm;
