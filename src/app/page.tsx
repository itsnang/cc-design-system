import Link from "next/link";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  ArrowRight,
  MessageSquare,
  UserPlus,
  Sparkles,
  Code2,
} from "lucide-react";
import { Typography, H1, H2 } from "../components/ui/typography";

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
              <Typography variant="h5" className="text-gray-900">
                Multi-Form
              </Typography>
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
                Dialogs
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
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-8">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <H1 responsive className="mb-6">
            Modern Form & Dialog
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
              Components
            </span>
          </H1>
          <Typography
            variant="body1"
            responsive
            className="text-gray-600 max-w-lg mx-auto mb-8"
          >
            Modern components built with Next.js and TypeScript.
          </Typography>
        </div>

        {/* Features Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Registration */}
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                  <UserPlus className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-blue-900">Registration</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <Typography variant="body3" className="text-blue-800 mb-6">
                Multi-step form with validation and persistence.
              </Typography>
              <Link href="/register">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Try It
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Dialogs */}
          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-purple-900">Dialogs</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <Typography variant="body3" className="text-purple-800 mb-6">
                Complete modal system with multiple types.
              </Typography>
              <Link href="/dialog-examples">
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                  Explore
                  <MessageSquare className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Typography */}
          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
                  <Code2 className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-green-900">Typography</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <Typography variant="body3" className="text-green-800 mb-6">
                Responsive typography system with React components.
              </Typography>
              <Link href="/typography">
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                  View
                  <Code2 className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="text-center">
          <H2 responsive className="mb-8">
            Get Started
          </H2>
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
                Typography
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
