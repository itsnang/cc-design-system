import Link from 'next/link'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { ArrowRight, CheckCircle, Shield, Zap } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
            Multi-Step Registration
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Experience a seamless registration process with automatic data persistence, 
            route-based navigation, and beautiful UI components.
          </p>
          <div className="mt-8">
            <Link href="/register">
              <Button size="lg" className="px-8 py-3 text-lg">
                Start Registration
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Shield className="w-6 h-6 text-blue-600" />
                <CardTitle>Data Persistence</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Your data is automatically saved to localStorage. Refresh the page, 
                navigate between steps, or close your browser - your progress is preserved.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Zap className="w-6 h-6 text-green-600" />
                <CardTitle>Route-Based Navigation</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Each step has its own URL. Use browser back/forward buttons, 
                bookmark specific steps, or share direct links to form sections.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-6 h-6 text-purple-600" />
                <CardTitle>Smart Validation</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Real-time validation with Zod schemas, route protection, 
                and step-by-step validation gates to ensure data integrity.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Process Overview */}
        <Card className="mb-16">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Registration Process</CardTitle>
            <CardDescription>
              Complete your registration in three simple steps
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-blue-600">1</span>
                </div>
                <h3 className="font-medium mb-2">Personal Information</h3>
                <p className="text-sm text-gray-600">
                  Provide your basic details: name, email, and phone number
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-green-600">2</span>
                </div>
                <h3 className="font-medium mb-2">Address Details</h3>
                <p className="text-sm text-gray-600">
                  Enter your complete address information for our records
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-purple-600">3</span>
                </div>
                <h3 className="font-medium mb-2">Preferences</h3>
                <p className="text-sm text-gray-600">
                  Set your communication preferences and accept terms
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Technical Stack */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Built With Modern Technologies</h2>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
            <span className="bg-white px-4 py-2 rounded-full shadow-sm">Next.js 15</span>
            <span className="bg-white px-4 py-2 rounded-full shadow-sm">React Hook Form</span>
            <span className="bg-white px-4 py-2 rounded-full shadow-sm">Zod Validation</span>
            <span className="bg-white px-4 py-2 rounded-full shadow-sm">shadcn/ui</span>
            <span className="bg-white px-4 py-2 rounded-full shadow-sm">TypeScript</span>
            <span className="bg-white px-4 py-2 rounded-full shadow-sm">Tailwind CSS</span>
            <span className="bg-white px-4 py-2 rounded-full shadow-sm">localStorage</span>
          </div>
        </div>
      </div>
    </div>
  )
}
