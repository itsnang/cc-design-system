import React, { Fragment } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { cn } from "../lib/utils";

interface ModalProps {
  children: React.ReactNode | string;
  show: boolean;
  title?: string;
  className?: string;
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({
  show,
  onClose,
  children,
  title,
  className = "",
}) => {
  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog as="div" onClose={onClose} className="relative z-50">
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </TransitionChild>
        <div className="fixed inset-0">
          <div className="opa mt-20 flex min-h-full items-start justify-center p-4 md:mt-40">
            <TransitionChild
              as={Fragment}
              enter="duration-[25ms]"
              enterFrom="opacity-90 scale-105"
              enterTo="opacity-100 scale-100"
              leave="duration-75 ease-in"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel
                className={cn(
                  "w-full max-w-xl transform rounded-2xl bg-white px-6 pt-6 pb-8 text-left align-middle shadow-xl transition-all",
                  className,
                )}
              >
                <DialogTitle
                  as="h3"
                  className="items-between flex justify-between text-lg font-medium leading-6 text-gray-900"
                >
                  <span>{title}</span>
                </DialogTitle>
                <div>{children}</div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
