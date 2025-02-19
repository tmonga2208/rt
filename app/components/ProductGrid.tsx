import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface ProductGridProps {
  category: string
}


const dummyProducts = [
  {
    id: 1,
    name: "Orange Pattern Half Sleeves T-Shirt & Shorts Set",
    price: 599.00,
    image: "https://tse1.mm.bing.net/th?id=OIP.qtpbmZnzBpZCuljv1Bp07gHaI-&pid=Api"
  },
  {
    id: 2,
    name: "Auto Rickshaw Pattern Half Sleeves T-Shirt & Shorts Set",
    price: 599.00,
    image: "https://tse3.mm.bing.net/th?id=OIP.Yrix_PxrK_IeohwFsgD-ZgHaI-&pid=Api"
  },
  {
    id: 3,
    name: "Pack of 3 Mom Dad Kids T-Shirt Combo",
    price: 799.00,
    image: "https://tse2.mm.bing.net/th?id=OIP.Dg0G78UM8grdn9Or8m-P_AHaJ4&pid=Api"
  },
  {
    id: 4,
    name: "Handsome Like My Dad Kids T-Shirt",
    price: 299.00,
    image: "https://tse4.mm.bing.net/th?id=OIP.tZXo7gWW9HySiCBpBMxkXwAAAA&pid=Api"
  },
  {
    id: 5,
    name: "Mom+Dad= Me Kids T-Shirt",
    price: 299.00,
    image: "https://tse1.mm.bing.net/th?id=OIP.5e3vh2ssdzApZ-Lnt29dYwHaHa&pid=Api"
  },
  {
    id: 6,
    name: "Mummy Ki Jaan Kids T-Shirt",
    price: 299.00,
    image: "https://tse2.mm.bing.net/th?id=OIP.Eibcx-jHUj3wPmbdBQM07QHaJ4&pid=Api"
  },
  {
    id: 7,
    name: "Kangaroo Pattern Half Sleeves T-Shirt & Shorts Set",
    price: 599.00,
    image: "https://tse1.mm.bing.net/th?id=OIP.OOu9EshkXdRmGNh84rTJawHaI-&pid=Api"
  },
  {
    id: 8,
    name: "Cuter Version of Dad Kids T-Shirt",
    price: 299.00,
    image: "https://tse4.mm.bing.net/th?id=OIP.zch1CF3leCgU97LnJI_W6QHaG7&pid=Api"
  },
  {
    id: 9,
    name: "Daddy's Girl Kids T-Shirt",
    price: 299.00,
    image: "https://tse4.mm.bing.net/th?id=OIP.3aqqdn8cieiPtjMZv_YBugHaHa&pid=Api"
  },
  {
    id: 10,
    name: "Honeybee Pattern Half Sleeves T-Shirt & Shorts Set",
    price: 599.00,
    image: "https://tse2.mm.bing.net/th?id=OIP.IqR8-ihxjW0y9ZmsJeHgdAHaI-&pid=Api"
  }
]

export default function ProductGrid({ category }: ProductGridProps) {

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
          <p className="text-gray-600 mb-4">{product.price}</p>
          <Button asChild className="w-full">
            <Link href={`/product/${product.id}`}>View Product</Link>
          </Button>
        </div>
      ))}
    </div>
  )
}
