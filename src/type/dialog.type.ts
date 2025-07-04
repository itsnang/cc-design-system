import { ReactNode } from "react";

export type DialogType = "success" | "error" | "warning" | "info" | "confirm";

export interface DialogOptions {
  title?: string;
  message?: string;
  content?: ReactNode;
  confirmText?: string;
  cancelText?: string;
  icon?: ReactNode;
  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void;
  autoClose?: number;
  persistent?: boolean;
  className?: string;
}

export interface DialogState {
  id: string;
  type: DialogType;
  options: DialogOptions;
  isVisible: boolean;
}

export interface DialogContextType {
  dialogs: DialogState[];
  success: (options: DialogOptions | string) => string;
  error: (options: DialogOptions | string) => string;
  warning: (options: DialogOptions | string) => string;
  info: (options: DialogOptions | string) => string;
  confirm: (options: DialogOptions) => Promise<boolean>;
  close: (id: string) => void;
  closeAll: () => void;
}
