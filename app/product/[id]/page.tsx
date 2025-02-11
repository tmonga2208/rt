"use client"

import Image from "next/image"
import { useState } from "react"
import { Star, ShoppingCart, Heart, Share2, Plus, Minus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CartDropdown } from "../../components/cart-dropdown"
import { useCart } from "../../contexts/cart-provider"

export default function ProductPage() {
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)

  const product = {
    id: "1",
    name: "Premium Lifestyle Product",
    price: 29.99,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-PR7OOPaFmnkwUXbV371F3tnrTpRhkx.png",
  }

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity,
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Add CartDropdown to the header */}
      <div className="flex justify-end mb-4">
        <CartDropdown />
      </div>

      {/* Product Header */}
      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square relative overflow-hidden rounded-lg">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-PR7OOPaFmnkwUXbV371F3tnrTpRhkx.png"
              alt="Product image"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="aspect-square relative rounded-lg overflow-hidden border cursor-pointer hover:border-primary"
              >
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-PR7OOPaFmnkwUXbV371F3tnrTpRhkx.png"
                  alt={`Product thumbnail ${i + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Premium Lifestyle Product</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-5 h-5 ${i < 4 ? "fill-primary" : "fill-muted"} stroke-primary`} />
                ))}
              </div>
              <span className="text-muted-foreground">(128 reviews)</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-3xl font-bold">$29.99</div>
            <Badge variant="secondary">New Arrival</Badge>
          </div>

          <Separator />

          <div className="space-y-4">
            <p className="text-muted-foreground">
              Experience premium quality with our latest lifestyle product. Designed for comfort and style, this
              versatile item is perfect for everyday use.
            </p>

            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center">{quantity}</span>
              <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid gap-4">
              <div className="flex gap-4">
                <Button className="flex-1" onClick={handleAddToCart}>
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
                <Button variant="outline" size="icon">
                  <Heart className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <Tabs defaultValue="description" className="mt-12">
        <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="specifications">Specifications</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        <TabsContent value="description" className="mt-6">
          <div className="prose max-w-none">
            <p>
              Introducing our premium lifestyle product, designed to enhance your daily routine. This versatile item
              combines style with functionality, making it perfect for modern living.
            </p>
            <ul>
              <li>Premium quality materials</li>
              <li>Ergonomic design</li>
              <li>Versatile functionality</li>
              <li>Modern aesthetic</li>
            </ul>
          </div>
        </TabsContent>
        <TabsContent value="specifications" className="mt-6">
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4 border-b pb-4">
              <div className="font-medium">Material</div>
              <div className="text-muted-foreground">Premium grade</div>
            </div>
            <div className="grid grid-cols-2 gap-4 border-b pb-4">
              <div className="font-medium">Dimensions</div>
              <div className="text-muted-foreground">12" x 8" x 4"</div>
            </div>
            <div className="grid grid-cols-2 gap-4 border-b pb-4">
              <div className="font-medium">Weight</div>
              <div className="text-muted-foreground">1.5 lbs</div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="reviews" className="mt-6">
          <div className="space-y-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className={`w-4 h-4 ${j < 4 ? "fill-primary" : "fill-muted"} stroke-primary`} />
                    ))}
                  </div>
                  <span className="font-medium">Great product!</span>
                </div>
                <p className="text-muted-foreground">
                  This product exceeded my expectations. The quality is outstanding and it looks even better in person.
                </p>
                <div className="text-sm text-muted-foreground">Posted 2 days ago</div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Users Also Bought */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Users Also Bought</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <div className="aspect-square relative rounded-lg overflow-hidden mb-4">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-PR7OOPaFmnkwUXbV371F3tnrTpRhkx.png"
                    alt={`Related product ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-medium mb-2">Related Product {i + 1}</h3>
                <div className="flex items-center justify-between">
                  <span className="font-bold">$24.99</span>
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}

