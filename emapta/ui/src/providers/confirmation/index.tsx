/**
 * @module ConfirmationProvider
 * @category Providers
 *
 */

import { Button, ButtonProps } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {
  memo,
  PropsWithChildren,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from 'react';

import { createContext, useContext } from 'react';

export type DialogConfirmationProps = {
  open?: boolean;
  ButtonCancelProps?: Omit<ButtonProps, 'children'>;
  ButtonConfirmProps?: Omit<ButtonProps, 'children'>;
  cancelText?: string;
  confirmText?: string;
  title?: string;
  description?: string | string[];
  content?: ReactNode;
  onCancel?: () => void;
  onConfirm?: () => void;
};

interface IConfirmationContext {
  showConfirmation: (
    props?: Omit<DialogConfirmationProps, 'open'>,
  ) => Promise<boolean>;
}

type PromiseInfo = {
  resolve: (value: boolean | PromiseLike<boolean>) => void;
};

export const ConfirmationContext = createContext<IConfirmationContext>({
  showConfirmation: async () =>
    new Promise<boolean>((resolve) => resolve(false)),
});
export const useConfirmationContext = () => useContext(ConfirmationContext);

/**
 * react-intl provider
 *
 * @category Provider
 * @param Props
 * @see https://formatjs.io/docs/react-intl/
 *
 */
const ConfirmationProvider = ({
  children,
}: PropsWithChildren<Omit<DialogConfirmationProps, 'open'>>) => {
  const [open, setOpen] = useState(false);
  const [props, setProps] =
    useState<
      Partial<
        Omit<
          DialogConfirmationProps,
          'open' | 'onCancel' | 'onClose' | 'onConfirm'
        >
      >
    >();
  const [promiseInfo, setPromiseInfo] = useState<PromiseInfo | null>(null);

  const showConfirmation = useCallback(
    (props?: Omit<DialogConfirmationProps, 'open'>): Promise<boolean> =>
      new Promise((resolve) => {
        if (props) setProps(props);
        setOpen(true);
        setPromiseInfo({ resolve });
      }),
    [],
  );

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => setProps(undefined), 300);
  };

  const handleConfirm = () => {
    promiseInfo?.resolve(true);
    handleClose();
  };

  const handleCancel = () => {
    promiseInfo?.resolve(false);
    handleClose();
  };

  const value = useMemo(() => ({ showConfirmation }), [showConfirmation]);

  return (
    <ConfirmationContext.Provider value={value}>
      <>
        {children}
        <Dialog
          open={open}
          maxWidth="xs"
          fullWidth
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          {props?.title && (
            <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
          )}
          {props?.description && (
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {props?.description}
              </DialogContentText>
            </DialogContent>
          )}
          <DialogActions>
            <Button
              {...props?.ButtonCancelProps}
              color="primary"
              onClick={handleCancel}
            >
              {props?.cancelText ?? 'Cancel'}
            </Button>
            <Button
              autoFocus
              {...props?.ButtonConfirmProps}
              onClick={handleConfirm}
            >
              {props?.confirmText ?? 'Confirm'}
            </Button>
          </DialogActions>
        </Dialog>
      </>
    </ConfirmationContext.Provider>
  );
};

export default memo(ConfirmationProvider);
