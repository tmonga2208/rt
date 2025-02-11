import { Button } from "@/components/ui/button"
import Link from "next/link"
import type React from "react" // Added import for React

interface CategoryLayoutProps {
  title: string
  children: React.ReactNode
}

export default function CategoryLayout({ title, children }: CategoryLayoutProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6 font-teko">{title}</h1>
      <div className="mb-6">
        <Button asChild variant="outline" className="mr-2">
          <Link href="#new-arrivals">New Arrivals</Link>
        </Button>
        <Button asChild variant="outline" className="mr-2">
          <Link href="#trending">Trending</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="#sale">Sale</Link>
        </Button>
      </div>
      {children}
    </div>
  )
}

