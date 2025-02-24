"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createUserWithEmailAndPassword, validatePassword } from "firebase/auth"
import { auth, db } from "../lib/firebase"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { addDoc, collection } from "firebase/firestore"

export default function SignUp() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateEmail(email)) {
      setError("Please Enter A Correct Email Address")
      return
    }
    if (!(await validatePassword(auth , password)).isValid) { 
      setError("Password Must Be At Least 8 Characters Long with 1 special character, 1 number, 1 uppercase letter, and 1 lowercase letter")
      return
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      const id = auth.currentUser?.uid
      if (!id) {
        throw new Error("User ID is undefined")
      }
      try {
        await addDoc(collection(db, "users", id), {
          id,
          email,
        })
      } catch (error) { 
        setError(`Failed To Create An Account : ${error}`)
        console.error(error)
      }
      if (auth.currentUser?.emailVerified) {
        router.push("/")
      } else {
        router.push("/verify")
      }
    } catch (error) {
      setError(`Failed To Create An Account : ${error}`)
      console.error(error)
    }
  }

    const validateEmail = (email: string) => {
      const emailPattern = /^[^\s@]+@(yahoo\.com|outlook\.com|gmail\.com|thapar\.edu)$/
      return emailPattern.test(email)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center font-teko">SIGN UP</h1>
      <form onSubmit={handleSignUp} className="max-w-md mx-auto">
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
          Sign Up
        </Button>
      </form>
      <div  className="flex flex-col items-center justify-center mt-4 mb-4">
        <p>--OR--</p>
        <Button className="mt-2"><Link href="/signin">Sign In</Link></Button>
      </div>
    </div>
  )
}

