"use client"
import CategoryLayout from "@/app/components/CategoryLayout"
import ProductGrid from "@/app/components/ProductGrid"
import { useEffect, useState } from "react"
import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "@/app/lib/firebase"

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

export default function KidsCategory() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      const q = query(collection(db, "products"), where("category", "==", "summer"))
      const querySnapshot = await getDocs(q)
      const productsData = querySnapshot.docs.map(doc => {
        const data = doc.data()
        return {
          id: doc.id,
          name: data.name,
          price: data.price,
          image: data.imgURL
        }
      })
      setProducts(productsData)
    }

    fetchProducts()
  }, [])

  return (
    <CategoryLayout title="Summer Collection">
      <ProductGrid products={products} />
    </CategoryLayout>
  )
}
