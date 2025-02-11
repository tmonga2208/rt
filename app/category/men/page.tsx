import CategoryLayout from "@/app/components/CategoryLayout"
import ProductGrid from "@/app/components/ProductGrid"

export default function MenCategory() {
  return (
    <CategoryLayout title="Men's Clothing">
      <ProductGrid category="men" />
    </CategoryLayout>
  )
}

