"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { CustomButton } from "@/components/custom-button";
import { useDialogExamples } from "./hooks/use-dialog-examples";
import { UsageExamplesTerminal } from "./components/usage-examples-terminal";

export default function DialogExamplesPage() {
  const { lastResult, isLoading, handlers } = useDialogExamples();

  // Custom content for the user profile dialog
  const customContent = (
    <div className="py-4 space-y-3">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-tertiary rounded-full flex items-center justify-center">
          <span className="text-white text-sm font-medium">JD</span>
        </div>
        <div>
          <p className="font-medium">John Doe</p>
          <p className="text-sm text-gray-600">john.doe@example.com</p>
        </div>
      </div>
      <div className="text-sm text-gray-600 pt-2 border-t">
        <p>Member since: January 2024</p>
        <p>Total orders: 47</p>
      </div>
    </div>
  );

  const handleCustomContent = () => handlers.handleCustomContent(customContent);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              Dialog System
            </h1>
            <p className="text-lg text-gray-600">
              Comprehensive dialog examples with modern design
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Result Display */}
        {lastResult && (
          <div className="mb-8">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-3 h-3 text-white"
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
                <span className="font-medium text-blue-900">Result:</span>
                <span className="text-blue-800">{lastResult}</span>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-12">
          {/* Basic Types */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Basic Types
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button
                onClick={handlers.handleSuccess}
                className="h-12 bg-green-600 hover:bg-green-700"
              >
                Success
              </Button>
              <Button
                onClick={handlers.handleError}
                className="h-12 bg-red-600 hover:bg-red-700"
              >
                Error
              </Button>
              <Button
                onClick={handlers.handleWarning}
                className="h-12 bg-yellow-600 hover:bg-yellow-700"
              >
                Warning
              </Button>
              <Button
                onClick={handlers.handleInfo}
                className="h-12 bg-blue-600 hover:bg-blue-700"
              >
                Info
              </Button>
            </div>
          </section>

          {/* Advanced Features */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Advanced Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button
                onClick={handlers.handleCustomDialog}
                variant="outline"
                className="h-12"
              >
                Auto-Close Dialog
              </Button>
              <Button
                onClick={handlers.handlePersistentDialog}
                variant="outline"
                className="h-12"
              >
                Persistent Dialog
              </Button>
              <Button
                onClick={handleCustomContent}
                variant="outline"
                className="h-12"
              >
                Custom Content
              </Button>
            </div>
          </section>

          {/* Confirmations */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Confirmation Dialogs
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button
                onClick={handlers.handleBasicConfirm}
                variant="destructive"
                className="h-12"
              >
                Delete Confirmation
              </Button>
              <Button
                onClick={handlers.handleAdvancedConfirm}
                variant="destructive"
                className="h-12"
              >
                Deploy Confirmation
              </Button>
            </div>
          </section>

          {/* Loading Example */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Loading States
            </h2>
            <CustomButton
              onClick={handlers.handleLoadingExample}
              isLoading={isLoading}
              disabled={isLoading}
              className="h-12 w-full md:w-auto px-2"
            >
              {isLoading ? "Processing..." : "Simulate API Call"}
            </CustomButton>
          </section>

          {/* Code Examples */}
          <UsageExamplesTerminal />

          {/* Features Overview */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Features
            </h2>
            <div className="bg-white rounded-lg border p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">
                    Dialog Types
                  </h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• Success, Error, Warning, Info</li>
                    <li>• Confirmation dialogs</li>
                    <li>• Custom content support</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Options</h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• Auto-close timers</li>
                    <li>• Persistent dialogs</li>
                    <li>• Custom buttons & callbacks</li>
                    <li>• Promise-based confirmations</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
