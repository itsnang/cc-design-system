"use client";

import React, { useState } from "react";
import { useDialog } from "@/hooks/use-dialog";
import { Button } from "@/components/ui/button";
import { CustomButton } from "@/components/custom-button";
import { Icons } from "@/components/icons";

export default function DialogExamplesPage() {
  const dialog = useDialog();
  const [lastResult, setLastResult] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  // Basic dialog examples
  const showSuccessDialog = () => {
    dialog.success("Operation completed successfully!");
  };

  const showErrorDialog = () => {
    dialog.error("Something went wrong. Please try again.");
  };

  const showWarningDialog = () => {
    dialog.warning("This action cannot be undone.");
  };

  const showInfoDialog = () => {
    dialog.info("Here's some important information you should know.");
  };

  // Advanced dialog examples
  const showCustomSuccessDialog = () => {
    dialog.success({
      title: "🎉 Welcome!",
      message:
        "Your account has been created successfully. You can now start using all the features.",
      confirmText: "Get Started",
      autoClose: 5000,
    });
  };

  const showCustomErrorDialog = () => {
    dialog.error({
      title: "Payment Failed",
      message:
        "Your payment could not be processed. Please check your payment details and try again.",
      confirmText: "Try Again",
      onConfirm: () => {
        console.log("User clicked Try Again");
      },
    });
  };

  const showPersistentDialog = () => {
    dialog.warning({
      title: "System Maintenance",
      message:
        "We're performing scheduled maintenance. The system will be unavailable for the next 30 minutes.",
      confirmText: "I Understand",
      persistent: true,
    });
  };

  const showAutoCloseDialog = () => {
    dialog.info({
      title: "Notification",
      message: "This dialog will automatically close in 3 seconds.",
      autoClose: 3000,
    });
  };

  // Confirmation dialog examples
  const showBasicConfirmDialog = async () => {
    const confirmed = await dialog.confirm({
      title: "Delete Item",
      message:
        "Are you sure you want to delete this item? This action cannot be undone.",
      confirmText: "Delete",
      cancelText: "Cancel",
    });

    setLastResult(
      confirmed ? "User confirmed deletion" : "User cancelled deletion",
    );
  };

  const showCustomConfirmDialog = async () => {
    const confirmed = await dialog.confirm({
      title: "🚀 Deploy to Production",
      message:
        "You're about to deploy to production. This will affect all users. Are you sure?",
      confirmText: "Deploy Now",
      cancelText: "Cancel Deploy",
      onConfirm: () => {
        console.log("Deploying to production...");
      },
      onCancel: () => {
        console.log("Deployment cancelled");
      },
    });

    setLastResult(confirmed ? "Deployment confirmed" : "Deployment cancelled");
  };

  // Complex dialog with custom content
  const showCustomContentDialog = () => {
    dialog.info({
      title: "User Profile",
      content: (
        <div className="space-y-4 py-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-tertiary rounded-full flex items-center justify-center">
              <span className="text-white font-semibold">JD</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">John Doe</h3>
              <p className="text-gray-600 text-sm">john.doe@example.com</p>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-4">
            <p className="text-sm text-gray-700">Member since: January 2024</p>
            <p className="text-sm text-gray-700">Total orders: 47</p>
          </div>
        </div>
      ),
      confirmText: "View Full Profile",
    });
  };

  // Dialog with custom icon
  const showCustomIconDialog = () => {
    dialog.success({
      title: "Achievement Unlocked!",
      message: "You've completed 100 tasks this month. Congratulations!",
      icon: <Icons.success className="w-16 h-16 text-green-500" />,
      confirmText: "Awesome!",
    });
  };

  // Loading simulation
  const showLoadingExample = async () => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(async () => {
      setIsLoading(false);

      const success = Math.random() > 0.5; // 50% chance of success

      if (success) {
        dialog.success({
          title: "Data Saved",
          message: "Your changes have been saved successfully.",
          autoClose: 3000,
        });
      } else {
        dialog.error({
          title: "Save Failed",
          message: "Failed to save your changes. Please try again.",
          confirmText: "Retry",
        });
      }
    }, 2000);
  };

  // Multiple dialogs
  const showMultipleDialogs = () => {
    dialog.info("First dialog");
    setTimeout(() => dialog.warning("Second dialog"), 500);
    setTimeout(() => dialog.success("Third dialog"), 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-tertiary/10 rounded-2xl mb-6">
              <svg
                className="w-8 h-8 text-tertiary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6 tracking-tight">
              Custom Dialog System
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Explore our comprehensive dialog system with modern design, smooth
              animations, and powerful features for every use case.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Last Result Display */}
        {lastResult && (
          <div className="mb-12 max-w-2xl mx-auto">
            <div className="bg-gradient-to-r from-tertiary/10 to-tertiary/5 border border-tertiary/20 rounded-xl p-6">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-tertiary rounded-full flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-tertiary mb-1">
                    Last Action Result
                  </h3>
                  <p className="text-gray-700">{lastResult}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-20">
          {/* Basic Dialogs */}
          <section>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Basic Dialog Types
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Simple, effective dialogs for common scenarios. Each type comes
                with appropriate styling and default messaging.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="group">
                <Button
                  onClick={showSuccessDialog}
                  className="w-full h-14 bg-green-600 hover:bg-green-700 text-white font-medium rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Success Dialog</span>
                  </div>
                </Button>
              </div>
              <div className="group">
                <Button
                  onClick={showErrorDialog}
                  className="w-full h-14 bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Error Dialog</span>
                  </div>
                </Button>
              </div>
              <div className="group">
                <Button
                  onClick={showWarningDialog}
                  className="w-full h-14 bg-yellow-600 hover:bg-yellow-700 text-white font-medium rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Warning Dialog</span>
                  </div>
                </Button>
              </div>
              <div className="group">
                <Button
                  onClick={showInfoDialog}
                  className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Info Dialog</span>
                  </div>
                </Button>
              </div>
            </div>
          </section>

          {/* Advanced Options */}
          <section>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Advanced Features
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Powerful customization options including auto-close timers,
                persistent dialogs, custom content, and more.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  onClick: showCustomSuccessDialog,
                  label: "Custom Success",
                  icon: "✨",
                },
                {
                  onClick: showCustomErrorDialog,
                  label: "Custom Error",
                  icon: "🚫",
                },
                {
                  onClick: showPersistentDialog,
                  label: "Persistent Dialog",
                  icon: "🔒",
                },
                {
                  onClick: showAutoCloseDialog,
                  label: "Auto-Close Dialog",
                  icon: "⏱️",
                },
                {
                  onClick: showCustomIconDialog,
                  label: "Custom Icon",
                  icon: "🎯",
                },
                {
                  onClick: showCustomContentDialog,
                  label: "Custom Content",
                  icon: "📝",
                },
              ].map((item, index) => (
                <Button
                  key={index}
                  onClick={item.onClick}
                  variant="outline"
                  className="h-16 border-2 border-gray-200 hover:border-tertiary hover:bg-tertiary/5 rounded-xl font-medium transition-all duration-200"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{item.icon}</span>
                    <span className="text-gray-700">{item.label}</span>
                  </div>
                </Button>
              ))}
            </div>
          </section>

          {/* Confirmation Dialogs */}
          <section>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Confirmation Dialogs
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Promise-based confirmation dialogs with custom callbacks and
                full control over user interactions.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
                <div className="text-center mb-6">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-6 h-6 text-red-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"
                        clipRule="evenodd"
                      />
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Basic Confirmation
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Simple yes/no confirmation with result tracking
                  </p>
                </div>
                <Button
                  onClick={showBasicConfirmDialog}
                  variant="destructive"
                  className="w-full h-12 rounded-lg font-medium"
                >
                  Delete Item
                </Button>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
                <div className="text-center mb-6">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-6 h-6 text-orange-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Advanced Confirmation
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Custom callbacks and enhanced messaging
                  </p>
                </div>
                <Button
                  onClick={showCustomConfirmDialog}
                  variant="destructive"
                  className="w-full h-12 rounded-lg font-medium"
                >
                  Deploy to Production
                </Button>
              </div>
            </div>
          </section>

          {/* Special Examples */}
          <section>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Special Features
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Advanced functionality including loading states, multiple
                dialogs, and global controls.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <CustomButton
                onClick={showLoadingExample}
                isLoading={isLoading}
                disabled={isLoading}
                fullWidth
                className="h-16 text-base font-medium"
              >
                {isLoading ? "Processing..." : "🔄 Loading Example"}
              </CustomButton>
              <Button
                onClick={showMultipleDialogs}
                variant="secondary"
                className="h-16 text-base font-medium rounded-xl"
              >
                📚 Multiple Dialogs
              </Button>
              <Button
                onClick={() => dialog.closeAll()}
                variant="ghost"
                className="h-16 text-base font-medium rounded-xl border-2 border-dashed border-gray-300 hover:border-gray-400"
              >
                ❌ Close All Dialogs
              </Button>
            </div>
          </section>

          {/* Code Examples */}
          <section className="bg-gray-900 rounded-3xl p-8 md:p-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Code Examples
              </h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Copy-paste ready code snippets to get started quickly with our
                dialog system.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">
                    Basic Usage
                  </h3>
                  <pre className="bg-gray-800 text-green-400 p-4 rounded-xl text-sm overflow-x-auto border border-gray-700">
                    {`// Simple message
dialog.success('Operation completed!');

// With options
dialog.error({
  title: 'Custom Title',
  message: 'Custom message',
  confirmText: 'OK'
});`}
                  </pre>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">
                    Auto-Close & Persistent
                  </h3>
                  <pre className="bg-gray-800 text-green-400 p-4 rounded-xl text-sm overflow-x-auto border border-gray-700">
                    {`// Auto-close after 3 seconds
dialog.info({
  message: 'Auto-close message',
  autoClose: 3000
});

// Persistent dialog
dialog.warning({
  message: 'Persistent message',
  persistent: true
});`}
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">
                  Confirmation Dialog
                </h3>
                <pre className="bg-gray-800 text-green-400 p-4 rounded-xl text-sm overflow-x-auto border border-gray-700 h-64">
                  {`const confirmed = await dialog.confirm({
  title: 'Delete Item',
  message: 'Are you sure?',
  confirmText: 'Delete',
  cancelText: 'Cancel',
  onConfirm: () => {
    console.log('Confirmed!');
  },
  onCancel: () => {
    console.log('Cancelled!');
  }
});

if (confirmed) {
  // User confirmed
  deleteItem();
} else {
  // User cancelled
  console.log('Operation cancelled');
}`}
                </pre>
              </div>
            </div>
          </section>

          {/* Features Grid */}
          <section>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Complete Feature Set
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Everything you need for modern dialog interactions in your
                applications.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-sm border border-gray-200">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-tertiary/10 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-tertiary"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    Dialog Types
                  </h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "✅ Success dialogs with celebration",
                    "❌ Error dialogs with clear messaging",
                    "⚠️ Warning dialogs for important actions",
                    "ℹ️ Info dialogs for helpful tips",
                    "❓ Confirmation dialogs with callbacks",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <span className="mr-3 text-sm">{item.split(" ")[0]}</span>
                      <span>{item.substring(2)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-sm border border-gray-200">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-secondary"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    Advanced Options
                  </h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "🎨 Custom titles & messages",
                    "🔘 Custom button text & actions",
                    "🎯 Custom icons & content (JSX)",
                    "⏰ Auto-close timers",
                    "🔒 Persistent dialogs",
                    "🔄 Promise-based confirmations",
                    "📱 Fully responsive design",
                    "🎭 Theme-aware styling",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <span className="mr-3 text-sm">{item.split(" ")[0]}</span>
                      <span>{item.substring(2)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
