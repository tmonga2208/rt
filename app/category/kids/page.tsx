import CategoryLayout from "@/app/components/CategoryLayout"
import ProductGrid from "@/app/components/ProductGrid"

export default function KidsCategory() {
  return (
    <CategoryLayout title="Kids' Clothing">
      <ProductGrid category="kids" />
    </CategoryLayout>
  )
}

