import { redirect } from 'next/navigation'

export default function RegisterPage() {
  // Redirect to the first step
  redirect('/register/personal')
} 