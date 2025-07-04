import Link from "next/link";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  ArrowRight,
  CheckCircle,
  Shield,
  Zap,
  MessageSquare,
  UserPlus,
  Sparkles,
  Code2,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">
                Multi-Form
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/register"
                className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
              >
                Registration
              </Link>
              <Link
                href="/dialog-examples"
                className="text-gray-600 hover:text-purple-600 font-medium transition-colors"
              >
                Dialog Examples
              </Link>
              <Link
                href="/typography"
                className="text-gray-600 hover:text-green-600 font-medium transition-colors"
              >
                Typography
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-8 shadow-lg">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Modern Form & Dialog
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
              Components
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Explore powerful, accessible, and beautifully designed form and
            dialog components built with modern web technologies. Perfect for
            any application requiring sophisticated user interactions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button
                size="lg"
                className="px-8 py-3 text-lg bg-blue-600 hover:bg-blue-700"
              >
                Try Registration Form
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/dialog-examples">
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-3 text-lg border-purple-200 text-purple-700 hover:bg-purple-50"
              >
                Explore Dialogs
                <MessageSquare className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Main Features */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {/* Registration System */}
          <Card className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 shadow-xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full -translate-y-16 translate-x-16"></div>
            <CardHeader className="relative z-10 pb-4">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                  <UserPlus className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl text-blue-900">
                    Multi-Step Registration
                  </CardTitle>
                  <CardDescription className="text-blue-700">
                    Route-based form wizard
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-blue-800 leading-relaxed">
                Experience a seamless registration process with automatic data
                persistence, route-based navigation, and smart validation. Each
                step has its own URL for better UX and accessibility.
              </p>

              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <span className="text-blue-800">
                    Automatic localStorage persistence
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Zap className="w-5 h-5 text-blue-600" />
                  <span className="text-blue-800">
                    Route-based step navigation
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                  <span className="text-blue-800">Zod schema validation</span>
                </div>
              </div>

              <div className="pt-4">
                <Link href="/register">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    Start Registration Process
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Dialog System */}
          <Card className="relative overflow-hidden bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 shadow-xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/10 rounded-full -translate-y-16 translate-x-16"></div>
            <CardHeader className="relative z-10 pb-4">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl text-purple-900">
                    Dialog System
                  </CardTitle>
                  <CardDescription className="text-purple-700">
                    Comprehensive modal solution
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-purple-800 leading-relaxed">
                Explore a complete dialog system with success, error, warning,
                and info modals. Features include auto-close timers, persistent
                dialogs, custom content, and promise-based confirmations.
              </p>

              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                  <span className="text-purple-800">
                    Multiple dialog types & styles
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-purple-600" />
                  <span className="text-purple-800">
                    Promise-based confirmations
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Zap className="w-5 h-5 text-purple-600" />
                  <span className="text-purple-800">
                    Auto-close & persistent options
                  </span>
                </div>
              </div>

              <div className="pt-4">
                <Link href="/dialog-examples">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                    Explore Dialog Examples
                    <MessageSquare className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Typography System */}
          <Card className="relative overflow-hidden bg-gradient-to-br from-green-50 to-green-100 border-green-200 shadow-xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-600/10 rounded-full -translate-y-16 translate-x-16"></div>
            <CardHeader className="relative z-10 pb-4">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
                  <Code2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl text-green-900">
                    Typography System
                  </CardTitle>
                  <CardDescription className="text-green-700">
                    Complete typography system
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-green-800 leading-relaxed">
                Comprehensive typography system using Mulish font with
                responsive variants, proper font weights, and semantic styling
                for consistent design across all screen sizes.
              </p>

              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Sparkles className="w-5 h-5 text-green-600" />
                  <span className="text-green-800">
                    Complete typography scale
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Zap className="w-5 h-5 text-green-600" />
                  <span className="text-green-800">
                    Responsive typography system
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-green-800">
                    React component library
                  </span>
                </div>
              </div>

              <div className="pt-4">
                <Link href="/typography">
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                    Explore Typography System
                    <Code2 className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Registration Process Overview */}
        <Card className="mb-20 bg-white/60 backdrop-blur-sm border-gray-200/50">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl text-gray-900 mb-2">
              Registration Journey
            </CardTitle>
            <CardDescription className="text-lg text-gray-600">
              Complete your registration in three intuitive steps
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform">
                  <span className="text-2xl font-bold text-blue-600">1</span>
                </div>
                <h3 className="text-lg font-semibold mb-3 text-gray-900">
                  Personal Information
                </h3>
                <p className="text-gray-600">
                  Provide your basic details: name, email, and phone number with
                  real-time validation
                </p>
              </div>
              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform">
                  <span className="text-2xl font-bold text-green-600">2</span>
                </div>
                <h3 className="text-lg font-semibold mb-3 text-gray-900">
                  Address Details
                </h3>
                <p className="text-gray-600">
                  Enter your complete address information with smart field
                  validation and formatting
                </p>
              </div>
              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform">
                  <span className="text-2xl font-bold text-purple-600">3</span>
                </div>
                <h3 className="text-lg font-semibold mb-3 text-gray-900">
                  Preferences
                </h3>
                <p className="text-gray-600">
                  Set your communication preferences and review your information
                  before submission
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Quick Actions
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-4xl mx-auto">
            <Link href="/register" className="flex-1">
              <Button
                size="lg"
                className="w-full h-16 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold"
              >
                <UserPlus className="mr-3 w-5 h-5" />
                Start Registration
              </Button>
            </Link>
            <Link href="/dialog-examples" className="flex-1">
              <Button
                size="lg"
                variant="outline"
                className="w-full h-16 border-2 border-purple-200 text-purple-700 hover:bg-purple-50 font-semibold"
              >
                <MessageSquare className="mr-3 w-5 h-5" />
                View Dialogs
              </Button>
            </Link>
            <Link href="/typography" className="flex-1">
              <Button
                size="lg"
                variant="outline"
                className="w-full h-16 border-2 border-green-200 text-green-700 hover:bg-green-50 font-semibold"
              >
                <Code2 className="mr-3 w-5 h-5" />
                Typography System
              </Button>
            </Link>
          </div>
        </div>

        {/* Technology Stack */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Built With Modern Technologies
          </h2>
          <div className="flex flex-wrap justify-center gap-3 text-sm">
            {[
              "Next.js 15",
              "React Hook Form",
              "Zod Validation",
              "shadcn/ui",
              "TypeScript",
              "Tailwind CSS",
              "localStorage",
              "Lucide Icons",
            ].map((tech) => (
              <span
                key={tech}
                className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-gray-200/50 text-gray-700 hover:shadow-md hover:scale-105 transition-all duration-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
