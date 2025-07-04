"use client";

import React from "react";
import { Modal } from "@/components/modal";
import { DialogOptions, DialogType } from "@/type/dialog.type";
import { Icons } from "./icons";
import { CustomButton } from "./custom-button";

interface DialogProps {
  id: string;
  type: DialogType;
  options: DialogOptions;
  isVisible: boolean;
  onClose: () => void;
}

// Map dialog types to their corresponding icons.
const iconMap: Record<
  DialogType,
  React.ComponentType<{ className?: string }>
> = {
  success: Icons.success,
  error: Icons.error,
  warning: Icons.pending,
  info: Icons.processing,
  confirm: Icons.pending,
};

// Map dialog types to their default confirmation button text.
const defaultConfirmTextMap: Record<DialogType, string> = {
  success: "Done",
  error: "Close",
  warning: "OK",
  info: "OK",
  confirm: "Confirm",
};

const Dialog: React.FC<DialogProps> = ({
  type,
  options,
  isVisible,
  onClose,
}) => {
  const {
    title,
    message,
    content,
    confirmText,
    cancelText,
    onConfirm,
    onCancel,
    showCancel = false,
    persistent = false,
    icon,
    autoClose,
  } = options;

  const IconComponent = iconMap[type];
  const finalConfirmText = confirmText || defaultConfirmTextMap[type];
  const finalCancelText = cancelText || "Cancel";

  // Auto-close the dialog after a specified duration.
  React.useEffect(() => {
    if (autoClose && isVisible) {
      const timer = setTimeout(onClose, autoClose);
      return () => clearTimeout(timer);
    }
  }, [autoClose, isVisible, onClose]);

  const handleConfirm = async () => {
    await onConfirm?.();
    onClose();
  };

  const handleCancel = () => {
    onCancel?.();
    onClose();
  };

  return (
    <Modal
      show={isVisible}
      onClose={persistent ? () => {} : onClose}
      className="max-w-[27.5rem] mt-28 p-4"
    >
      <div className="flex flex-col items-center gap-4">
        {icon || <IconComponent />}

        {title && (
          <h4 className="text-2xl text-center text-foreground">{title}</h4>
        )}

        {message && <p className="text-center text-foreground">{message}</p>}

        {content && <div className="text-center w-full">{content}</div>}

        <div className="flex flex-col gap-3 w-full items-center">
          <CustomButton
            roundedFull
            className="w-full max-w-[20rem]"
            onClick={handleConfirm}
          >
            {finalConfirmText}
          </CustomButton>

          {showCancel && (
            <CustomButton
              roundedFull
              variant="secondary"
              className="w-full max-w-[20rem] border-0 text-muted-foreground"
              onClick={handleCancel}
            >
              {finalCancelText}
            </CustomButton>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default Dialog;
