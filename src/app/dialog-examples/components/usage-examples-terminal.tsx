export function UsageExamplesTerminal() {
  return (
    <section>
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        Usage Examples
      </h2>
      <div className="space-y-6">
        {/* Terminal Interface */}
        <div className="bg-slate-900 rounded-xl shadow-2xl overflow-hidden">
          {/* Terminal Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-slate-800 border-b border-slate-700">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="text-slate-400 text-sm font-mono">
              dialog-examples.ts
            </div>
            <div className="w-16"></div>
          </div>

          {/* Code Content */}
          <div className="p-6">
            <div className="space-y-8">
              {/* Basic Usage */}
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  <span className="text-emerald-400 font-medium text-sm">
                    Basic Usage
                  </span>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                  <pre className="text-emerald-300 text-sm leading-relaxed font-mono">
                    {`// Simple dialogs
dialog.success('Operation completed!');
dialog.error('Something went wrong');
dialog.warning('Action cannot be undone');
dialog.info('Helpful information');`}
                  </pre>
                </div>
              </div>

              {/* Advanced Usage */}
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-blue-400 font-medium text-sm">
                    Advanced Options
                  </span>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                  <pre className="text-emerald-300 text-sm leading-relaxed font-mono">
                    {`// Custom configuration
dialog.success({
  title: 'Custom Title',
  message: 'Custom message',
  confirmText: 'OK',
  autoClose: 3000
});

// Promise-based confirmation
const confirmed = await dialog.confirm({
  title: 'Confirm Action',
  message: 'Are you sure?'
});`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Reference Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              <code className="text-emerald-700 text-sm font-semibold">
                success()
              </code>
            </div>
            <p className="text-emerald-600 text-xs">
              Positive feedback & confirmations
            </p>
          </div>

          <div className="bg-gradient-to-br from-red-50 to-red-100 border border-red-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <code className="text-red-700 text-sm font-semibold">
                error()
              </code>
            </div>
            <p className="text-red-600 text-xs">Error handling & failures</p>
          </div>

          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <code className="text-yellow-700 text-sm font-semibold">
                warning()
              </code>
            </div>
            <p className="text-yellow-600 text-xs">
              Caution & important notices
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <code className="text-blue-700 text-sm font-semibold">
                confirm()
              </code>
            </div>
            <p className="text-blue-600 text-xs">User decision prompts</p>
          </div>
        </div>
      </div>
    </section>
  );
}
