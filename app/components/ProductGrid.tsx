import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface Product {
  id: string
  name: string
  price: number
  image: string
}

interface ProductGridProps {
  products: Product[]
}

export default function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {products.map((product) => (
        <div key={product.id} className="border rounded-lg p-4">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            width={200}
            height={200}
            className="w-full h-48 object-cover mb-4"
          />
          <h3 className="font-semibold mb-2">{product.name}</h3>
          <p className="text-gray-600 mb-4">{product.price}</p>
          <Button asChild className="w-full">
            <Link href={`/product/${product.id}`}>View Product</Link>
          </Button>
        </div>
      ))}
    </div>
  )
}