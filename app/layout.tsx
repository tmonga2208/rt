import { Inter, Teko } from "next/font/google"
import "./globals.css"
import Header from "./components/Header"
import Footer from "./components/Footer"
import { AuthProvider } from "./contexts/AuthContext"
import type React from "react"
import { CartProvider } from "./contexts/cart-provider"

const inter = Inter({ subsets: ["latin"] })
const teko = Teko({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"], variable: "--font-teko" })

export const metadata = {
  title: "RT",
  description: "A Place for All Your Styling Needs",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${teko.variable}`}>
        <AuthProvider>
          <CartProvider>
          <Header />
          <main>{children}</main>
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}

