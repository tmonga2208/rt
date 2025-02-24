"use client"

import { useAuth } from "../contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { signOut } from "firebase/auth"
import { auth, db } from "../lib/firebase"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useEffect, useState } from "react"
import { doc, getDoc, collection, getDocs } from "firebase/firestore"
import Image from "next/image"

export default function MyAccount() {
  const { user } = useAuth()
  const router = useRouter()
  const [favorites, setFavorites] = useState([])

  useEffect(() => { 
    const fetchFavorites = async () => {
      const userId = auth.currentUser?.uid;
      if (userId) {
        const userDocRef = doc(db, `users`, userId);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          if (userData.favorites) {
            const favoritesData = await Promise.all(
              userData.favorites.map(async (productId) => {
                const productDocRef = doc(db, "products", productId);
                const productDocSnap = await getDoc(productDocRef);
                if (productDocSnap.exists()) {
                  return { id: productDocSnap.id, ...productDocSnap.data() };
                }
                return null;
              })
            );
            setFavorites(favoritesData.filter(product => product !== null));
          }
        }
      }
    }

    fetchFavorites();
  }, [])

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
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">My Favorites</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {favorites.map((product) => (
            <div key={product.id} className="border rounded-lg p-4">
              <Image
                src={product.imgURL}
                alt={product.name}
                width={200}
                height={200}
                className="w-full h-48 object-cover mb-4"
              />
              <h3 className="font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-4">{product.price.currency}{product.price.price}</p>
              <Button asChild className="w-full">
                <Link href={`/product/${product.id}`}>View Product</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}