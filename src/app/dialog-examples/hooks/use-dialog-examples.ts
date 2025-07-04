import { useState } from "react";
import { useDialog } from "@/hooks/use-dialog";

export function useDialogExamples() {
  const dialog = useDialog();
  const [lastResult, setLastResult] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  // Basic dialogs
  const handleSuccess = () =>
    dialog.success("Operation completed successfully!");

  const handleError = () =>
    dialog.error({
      title: "Something went wrong",
      message: "Please try again or contact support.",
      confirmText: "Retry",
    });

  const handleWarning = () => dialog.warning("This action cannot be undone.");

  const handleInfo = () =>
    dialog.info("System maintenance scheduled for tonight.");

  // Advanced examples
  const handleCustomDialog = () =>
    dialog.success({
      title: "🎉 Welcome!",
      message: "Your account has been created successfully.",
      confirmText: "Get Started",
      autoClose: 3000,
    });

  const handlePersistentDialog = () =>
    dialog.warning({
      title: "System Maintenance",
      message: "Service will be unavailable for 30 minutes.",
      persistent: true,
    });

  const handleCustomContent = (content: React.ReactNode) =>
    dialog.info({
      title: "User Profile",
      content,
    });

  // Confirmation dialogs
  const handleBasicConfirm = async () => {
    const confirmed = await dialog.confirm({
      title: "Delete Item",
      message: "This action cannot be undone.",
      confirmText: "Delete",
      cancelText: "Cancel",
    });
    setLastResult(confirmed ? "Item deleted" : "Action cancelled");
  };

  const handleAdvancedConfirm = async () => {
    const confirmed = await dialog.confirm({
      title: "Deploy to Production",
      message: "This will affect all users. Continue?",
      confirmText: "Deploy",
      cancelText: "Cancel",
    });
    setLastResult(confirmed ? "Deployment started" : "Deployment cancelled");
  };

  // Loading example
  const handleLoadingExample = async () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const success = Math.random() > 0.5;

      if (success) {
        dialog.success({
          title: "Success",
          message: "Data saved successfully.",
          autoClose: 2000,
        });
      } else {
        dialog.error({
          title: "Error",
          message: "Failed to save data.",
          confirmText: "Retry",
        });
      }
    }, 2000);
  };

  return {
    lastResult,
    isLoading,
    handlers: {
      handleSuccess,
      handleError,
      handleWarning,
      handleInfo,
      handleCustomDialog,
      handlePersistentDialog,
      handleCustomContent,
      handleBasicConfirm,
      handleAdvancedConfirm,
      handleLoadingExample,
    },
  };
}
