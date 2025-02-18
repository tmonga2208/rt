"use client"

import Link from "next/link"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ShoppingBag, User, Search } from "lucide-react"
import { useAuth } from "../contexts/AuthContext"
import { signOut } from "firebase/auth"
import { auth } from "../lib/firebase"
import { useRouter } from "next/navigation"
import { useCart } from "../contexts/cart-provider"
import { CartDropdown } from "./cart-dropdown"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter();
  const { state } = useCart()
  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0)

  const handleUserNav = () => {
      router.push("/user")
  }

  const { user } = useAuth()

  const handleSignOut = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-gray-600 font-teko">
          RT
        </Link>
        <nav className={`${isMenuOpen ? "block" : "hidden"} md:block`}>
          <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
            <li>
              <Link href="/category/women" className="text-gray-600 hover:text-red-600">
                Women
              </Link>
            </li>
            <li>
              <Link href="/category/men" className="text-gray-600 hover:text-red-600">
                Men
              </Link>
            </li>
            <li>
              <Link href="/category/kids" className="text-gray-600 hover:text-red-600">
                Kids
              </Link>
            </li>
          </ul>
        </nav>
        <div className="flex items-center space-x-4">
          <Input type="search" placeholder="Search..." className="hidden md:block" />
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
          <Button onClick={handleUserNav} variant="ghost" size="icon">
            <User className="h-5 w-5" />
            <span className="sr-only">Account</span>
          </Button>
          <CartDropdown/>
          {user ? (
            <Button variant="ghost" onClick={handleSignOut}>
              Sign Out
            </Button>
          ) : (
            <Button variant="ghost" asChild>
              <Link href="/signup">Sign In</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}

