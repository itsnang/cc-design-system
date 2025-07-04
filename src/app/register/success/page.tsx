"use client"

import { Button } from '../../../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card'
import { CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default function SuccessPage() {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="w-16 h-16 text-green-600" />
          </div>
          <CardTitle className="text-green-600 text-2xl">
            Registration Completed Successfully!
          </CardTitle>
          <CardDescription className="text-lg">
            Thank you for completing your registration. You should receive a confirmation email shortly.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-medium text-green-800 mb-2">What&apos;s Next?</h3>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• Check your email for confirmation</li>
              <li>• Your account will be activated within 24 hours</li>
              <li>• You can update preferences anytime</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button variant="outline" className="px-8">
                Back to Home
              </Button>
            </Link>
            <Link href="/register">
              <Button className="px-8">
                Fill Out Another Form
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 