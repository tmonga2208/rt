"use client"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useRegion } from "./contexts/RegionContext"

export default function Home() {
  const { getPrice } = useRegion();
  const { price ,currency } = getPrice(29.99);

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12">
        <div className="relative h-[60vh]">
          <Image src="/placeholder.svg" alt="Hero Image" layout="fill" objectFit="cover" />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 font-teko">Summer Collection</h1>
              <p className="text-xl text-white mb-6">Discover the latest trends</p>
              <Button asChild>
                <Link href="/category/summer">Shop Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6 font-teko">Featured Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {["Women", "Men", "Kids"].map((category) => (
            <div key={category} className="relative h-64">
              <Image src="/placeholder.svg" alt={category} layout="fill" objectFit="cover" className="rounded-lg" />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center rounded-lg">
                <Button asChild variant="outline">
                  <Link href={`/category/${category.toLowerCase()}`} className="text-black">
                    {category}
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-6 font-teko">New Arrivals</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((id) => (
            <div key={id} className="border rounded-lg p-4">
              <Image
                src="/placeholder.svg"
                alt={`Product ${id}`}
                width={200}
                height={200}
                className="w-full h-48 object-cover mb-4"
              />
              <h3 className="font-semibold mb-2">Product {id}</h3>
              <p className="text-gray-600 mb-4">{currency} {price}</p>
              <Button asChild className="w-full">
                <Link href={`/product/${id}`}>View Product</Link>
              </Button>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

