"use client"

import { useAuth } from "../contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { signOut } from "firebase/auth"
import { auth } from "../lib/firebase"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function MyAccount() {
  const { user } = useAuth()
  const router = useRouter()

  const handleSignOut = async () => {
    try {
      await signOut(auth)
      router.push("/")
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6 font-teko">My Account</h1>
        <p>Please sign in to view your account details.</p>
        <Button><Link href="/signup">Sign Up</Link></Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6 font-teko">My Account</h1>
      <p className="mb-4">Welcome, {user.email}!</p>
      <Button onClick={handleSignOut}>Sign Out</Button>
    </div>
  )
}

