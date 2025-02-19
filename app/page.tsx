"use client"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function Home() {  
  const categories = [
    { id: 1, name: "Women", image: "https://images.unsplash.com/photo-1580910532870-552653d9aa1b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 2, name: "Men", image: "https://plus.unsplash.com/premium_photo-1683140423200-586f61ea8b38?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 3, name: "Kids", image: "https://plus.unsplash.com/premium_photo-1723773698711-50ffbe19b222?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  ];

  const products = [
    { id: 1, name: "Product 1", image: "/placeholder.svg" },
    { id: 2, name: "Product 2", image: "/placeholder.svg" },
    { id: 3, name: "Product 3", image: "/placeholder.svg" },
    { id: 4, name: "Product 4", image: "/placeholder.svg" },
    { id: 5, name: "Product 5", image: "/placeholder.svg" },
    { id: 6, name: "Product 6", image: "/placeholder.svg" },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const itemsPerSlide = 5;

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(products.length / itemsPerSlide));
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(products.length / itemsPerSlide)) % Math.ceil(products.length / itemsPerSlide));
  };

  const startIndex = currentSlide * itemsPerSlide;
  const endIndex = startIndex + itemsPerSlide;
  const currentProducts = products.slice(startIndex, endIndex);

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12">
        <div className="relative h-[60vh]">
          <Image src="https://images.unsplash.com/photo-1591006661718-7216a603da89?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Hero Image" layout="fill" objectFit="cover" />
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div key={category.id} className="relative h-64">
              <Image src={category.image} alt={category.name} layout="fill" objectFit="cover" className="rounded-lg" />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center rounded-lg">
                <Button asChild variant="outline">
                  <Link href={`/category/${category.name.toLowerCase()}`} className="text-black">
                    {category.name}
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full">
        <h2 className="text-3xl font-bold mb-6 font-teko">New Arrivals</h2>
        <div className="flex">
          <div className="relative flex justify-center items-center m-2">
            <Button onClick={handlePrev} variant="ghost" size="icon">
              &lt;
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {currentProducts.map((product) => (
              <div key={product.id} className="border rounded-lg p-4">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={200}
                  height={200}
                  className="w-full h-48 object-cover mb-4"
                />
                <h3 className="font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4">29.99</p>
                <Button asChild className="w-full">
                  <Link href={`/product/${product.id}`}>View Product</Link>
                </Button>
              </div>
            ))}
          </div>
          <div className="relative flex justify-center items-center m-2">
            <Button onClick={handleNext} variant="ghost" size="icon">
              &gt;
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
