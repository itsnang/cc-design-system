// Author: Samnang Lorn
// Copyright (c) 2025 Cellcard

import { useDialogContext } from "@/contexts/dialog-context";
import { DialogOptions } from "@/type/dialog.type";

interface DialogAPI {
  success: (options: DialogOptions | string) => string;
  error: (options: DialogOptions | string) => string;
  warning: (options: DialogOptions | string) => string;
  info: (options: DialogOptions | string) => string;
  confirm: (options: DialogOptions) => Promise<boolean>;
  close: (id: string) => void;
  closeAll: () => void;
}

/**
 * Custom hook for using dialogs with a simple API
 *
 * @example
 * ```tsx
 * const dialog = useDialog();
 *
 * // Simple string message
 * dialog.success('Operation completed successfully!');
 *
 * // With options
 * dialog.error({
 *   title: 'Error',
 *   message: 'Something went wrong',
 *   autoClose: 5000
 * });
 *
 * // Confirmation dialog
 * const confirmed = await dialog.confirm({
 *   title: 'Delete Item',
 *   message: 'Are you sure you want to delete this item?',
 *   confirmText: 'Delete',
 *   cancelText: 'Cancel'
 * });
 *
 * if (confirmed) {
 *   // Proceed with deletion
 * }
 * ```
 */
export const useDialog = (): DialogAPI => {
  const context = useDialogContext();

  return {
    success: context.success,
    error: context.error,
    warning: context.warning,
    info: context.info,
    confirm: context.confirm,
    close: context.close,
    closeAll: context.closeAll,
  };
};
