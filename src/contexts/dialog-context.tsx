"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import {
  DialogContextType,
  DialogState,
  DialogOptions,
  DialogType,
} from "@/type/dialog.type";
import Dialog from "@/components/custom-dialog";

const DialogContext = createContext<DialogContextType | undefined>(undefined);

interface DialogProviderProps {
  children: ReactNode;
}

let dialogCounter = 0;

const generateDialogId = (): string => {
  dialogCounter += 1;
  return `dialog-${dialogCounter}-${Date.now()}`;
};

export const DialogProvider: React.FC<DialogProviderProps> = ({ children }) => {
  const [dialogs, setDialogs] = useState<DialogState[]>([]);

  const addDialog = useCallback(
    (type: DialogType, options: DialogOptions): string => {
      const id = generateDialogId();
      const newDialog: DialogState = {
        id,
        type,
        options,
        isVisible: true,
      };

      setDialogs((prev) => [...prev, newDialog]);
      return id;
    },
    []
  );

  const close = useCallback((id: string): void => {
    setDialogs((prev) => prev.filter((dialog) => dialog.id !== id));
  }, []);

  const closeAll = useCallback((): void => {
    setDialogs([]);
  }, []);

  const success = useCallback(
    (options: DialogOptions | string): string => {
      const dialogOptions =
        typeof options === "string"
          ? { message: options, title: "Success" }
          : { title: "Success", ...options };

      return addDialog("success", dialogOptions);
    },
    [addDialog]
  );

  const error = useCallback(
    (options: DialogOptions | string): string => {
      const dialogOptions =
        typeof options === "string"
          ? { message: options, title: "Error" }
          : { title: "Error", ...options };

      return addDialog("error", dialogOptions);
    },
    [addDialog]
  );

  const warning = useCallback(
    (options: DialogOptions | string): string => {
      const dialogOptions =
        typeof options === "string"
          ? { message: options, title: "Warning" }
          : { title: "Warning", ...options };

      return addDialog("warning", dialogOptions);
    },
    [addDialog]
  );

  const info = useCallback(
    (options: DialogOptions | string): string => {
      const dialogOptions =
        typeof options === "string"
          ? { message: options, title: "Information" }
          : { title: "Information", ...options };

      return addDialog("info", dialogOptions);
    },
    [addDialog]
  );

  const confirm = useCallback(
    (options: DialogOptions): Promise<boolean> => {
      return new Promise((resolve) => {
        const dialogOptions: DialogOptions = {
          title: "Confirm",
          confirmText: "Confirm",
          cancelText: "Cancel",
          ...options,
          onConfirm: () => {
            if (options.onConfirm) {
              options.onConfirm();
            }
            resolve(true);
          },
          onCancel: () => {
            if (options.onCancel) {
              options.onCancel();
            }
            resolve(false);
          },
        };

        addDialog("confirm", dialogOptions);
      });
    },
    [addDialog]
  );

  const contextValue: DialogContextType = {
    dialogs,
    success,
    error,
    warning,
    info,
    confirm,
    close,
    closeAll,
  };

  return (
    <DialogContext.Provider value={contextValue}>
      {children}
      {dialogs.map((dialog) => (
        <Dialog
          key={dialog.id}
          id={dialog.id}
          type={dialog.type}
          options={dialog.options}
          isVisible={dialog.isVisible}
          onClose={() => close(dialog.id)}
        />
      ))}
    </DialogContext.Provider>
  );
};

export const useDialogContext = (): DialogContextType => {
  const context = useContext(DialogContext);
  if (context === undefined) {
    throw new Error("useDialogContext must be used within a DialogProvider");
  }
  return context;
};
