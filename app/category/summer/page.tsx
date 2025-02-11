import CategoryLayout from "@/app/components/CategoryLayout"
import ProductGrid from "@/app/components/ProductGrid"

export default function SummerCategory() {
  return (
    <CategoryLayout title="Summer Collection">
      <ProductGrid category="summer" />
    </CategoryLayout>
  )
}

