import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useRegion } from "../contexts/RegionContext"

interface ProductGridProps {
  category: string
}

const dummyProducts = [
  { id: 1, name: "Product 1", price: 29.99, image: "/placeholder.svg" },
  { id: 2, name: "Product 2", price: 39.99, image: "/placeholder.svg" },
  { id: 3, name: "Product 3", price: 49.99, image: "/placeholder.svg" },
  { id: 4, name: "Product 4", price: 59.99, image: "/placeholder.svg" },
]

export default function ProductGrid({ category }: ProductGridProps) {
  const { getPrice } = useRegion();
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {dummyProducts.map((product) => (
        <div key={product.id} className="border rounded-lg p-4">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            width={200}
            height={200}
            className="w-full h-48 object-cover mb-4"
          />
          <h3 className="font-semibold mb-2">{product.name}</h3>
          <p className="text-gray-600 mb-4">{getPrice(Number(product.price)).price}</p>
          <Button asChild className="w-full">
            <Link href={`/product/${product.id}`}>View Product</Link>
          </Button>
        </div>
      ))}
    </div>
  )
}

