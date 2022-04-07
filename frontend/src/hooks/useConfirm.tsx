import { confirmDialogActions } from '../redux/reducers/confirmDialogReducer';
import { useAppDispatch, useAppSelector } from './redux';

let resolveCallback: (arg: boolean) => void;
const useConfirm = () => {
  const confirmState = useAppSelector((state) => state.confirmDialog);
  const dispatch = useAppDispatch();
  const onConfirm = () => {
    closeConfirm();
    resolveCallback(true);
  };

  const onCancel = () => {
    closeConfirm();
    resolveCallback(false);
  };
  const confirm = (text: string) => {
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
