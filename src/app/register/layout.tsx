import { FormProvider } from '../../lib/context/form-context'
import { FormProgress } from '../../components/layout/form-progress'

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <FormProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
              Registration Form
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Complete your registration step by step. Your progress is automatically saved.
            </p>
          </div>

          {/* Progress indicator */}
          <FormProgress />

          {/* Form content */}
          <div className="flex justify-center">
            {children}
          </div>

          {/* Footer */}
          <div className="mt-16 text-center">
            <p className="text-sm text-gray-400">
              Built with Next.js 15, shadcn/ui, React Hook Form, and Zod
            </p>
          </div>
        </div>
      </div>
    </FormProvider>
  )
} 