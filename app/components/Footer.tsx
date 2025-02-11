import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
export default function Footer() {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <footer className="bg-gray-100 mt-10">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-teko text-lg font-semibold mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/category/women" className="text-gray-600 hover:text-red-600">
                  Women
                </Link>
              </li>
              <li>
                <Link href="/category/men" className="text-gray-600 hover:text-red-600">
                  Men
                </Link>
              </li>
              <li>
                <Link href="/category/kids" className="text-gray-600 hover:text-red-600">
                  Kids
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-teko text-lg font-semibold mb-4">Corporate Info</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-600 hover:text-red-600">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-600 hover:text-red-600">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/sustainability" className="text-gray-600 hover:text-red-600">
                  Sustainability
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-teko text-lg font-semibold mb-4">Help</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/customer-service" className="text-gray-600 hover:text-red-600">
                  Customer Service
                </Link>
              </li>
              <li>
                <Link href="/my-account" className="text-gray-600 hover:text-red-600">
                  My Account
                </Link>
              </li>
              <li>
                <Link href="/store-locator" className="text-gray-600 hover:text-red-600">
                  Find a Store
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-teko text-lg font-semibold mb-4">Sign up for newsletter</h3>
            <p className="text-gray-600 mb-4">
              Be the first to know about our newest arrivals, special offers and store events near you.
            </p>
            <div className="flex gap-2">
              <Input placeholder="email" />
              <Button className="bg-red-600 text-white rounded-md">Subscribe</Button>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-500">
          <p>&copy; {year} RT. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

