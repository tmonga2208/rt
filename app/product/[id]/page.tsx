"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Star, ShoppingCart, Heart, Share2, Plus, Minus } from "lucide-react"
import { arrayRemove, arrayUnion, collection, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore"
import { db } from "../../lib/firebase"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CartDropdown } from "../../components/cart-dropdown"
import { useCart } from "../../contexts/cart-provider"
import { useRegion } from "@/app/contexts/RegionContext"
import { getAuth } from "firebase/auth"
import Link from "next/link"

export default function ProductPage() {
  interface Product {
    id: string;
    name: string;
    price: number;
    imgURL: string;
  }

  const [product, setProduct] = useState<Product | null>(null);
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const { getPrice } = useRegion();
  const { id } = useParams();
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isFavorited, setIsFavorited] = useState(false);
  const auth = getAuth();

  const handleisFavourite = async () => {
    setIsFavorited(!isFavorited);
    const userId = auth.currentUser?.uid;
    if (userId) {
      const userDocRef = doc(db, `users`, userId);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        if (!isFavorited) {
          await updateDoc(userDocRef, {
            favorites: arrayUnion(id)
          });
        } else {
          await updateDoc(userDocRef, {
            favorites: arrayRemove(id)
          });
        }
      } else {
        await setDoc(userDocRef, {
          favorites: [id]
        });
      }
    }
  }

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        const docRef = doc(db, "products", id as string);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setProduct({ id: docSnap.id, name: data.name, price: data.price, imgURL: data.imgURL });
        } else {
          console.log("No such document!");
        }
      };
      fetchProduct();
    }
  }, [id]);

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const productsData = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name,
          imgURL: data.imgURL,
          price: data.price,
        };
      }).filter(product => product.id !== id); 
      setRelatedProducts(productsData);
    };

    fetchProducts();
  }, [id]);

  useEffect(() => {
    const checkIfFavorited = async () => {
      const userId = auth.currentUser?.uid;
      if (userId) {
        const userDocRef = doc(db, `users`, userId);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          if (userData.favorites && userData.favorites.includes(id)) {
            setIsFavorited(true);
          }
        }
      }
    };

    checkIfFavorited();
  }, [id, auth]);

  const handleAddToCart = () => {
    if (product) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.imgURL,
        quantity: quantity,
      })
    }
  }

  if (!product) {
    return <div>Loading...</div>;
  }

  const { price, currency } = getPrice(product.price);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Product Header */}
      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square relative overflow-hidden rounded-lg">
            <Image
              src={product.imgURL}
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
                  src={product.imgURL}
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
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
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
            <div className="text-3xl font-bold">{currency} {price}</div>
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
                <Button variant="outline" size="icon" onClick={handleisFavourite}>
                  <Heart className={`h-4 w-4 ${isFavorited ? "fill-red-500" : ""}`} />
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
          {relatedProducts.slice(0, 4).map((relatedProduct) => {
            const { price, currency } = getPrice(relatedProduct.price);
            return (
            <Card key={relatedProduct.id}>
              <CardContent className="p-4">
                <div className="aspect-square relative rounded-lg overflow-hidden mb-4">
                  <Image
                    src={relatedProduct.imgURL}
                    alt={`Related product ${relatedProduct.name}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-medium mb-2">{relatedProduct.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="font-bold">{currency}{price}</span>
                  <Button variant="outline" size="sm">
                     <Link href={`/product/${relatedProduct.id}`}>View</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )})}
        </div>
      </section>
    </div>
  )
}