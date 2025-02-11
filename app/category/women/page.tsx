import CategoryLayout from "@/app/components/CategoryLayout"
import ProductGrid from "@/app/components/ProductGrid"

export default function WomenCategory() {
  return (
    <CategoryLayout title="Women's Clothing">
      <ProductGrid category="women" />
    </CategoryLayout>
  )
}

