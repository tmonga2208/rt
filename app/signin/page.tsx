"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../lib/firebase"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function SignIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter();
  const auth = getAuth();
  const user = auth.currentUser;

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    await signInWithEmailAndPassword(auth, email, password)
    try {
      if (user?.emailVerified) {
        router.push("/")
      } else { 
        router.push("/verify")
      }
    } catch (error) {
      setError("Failed To Sign In")
      console.error(error)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center font-teko">SIGN IN</h1>
      <form onSubmit={handleSignIn} className="max-w-md mx-auto">
        <div className="mb-4">
          <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="mb-4">
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <Button type="submit" className="w-full">
          Sign In
        </Button>
      </form>
    </div>
  )
}
