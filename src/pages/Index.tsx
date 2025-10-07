import { useState, useRef } from "react"
import type { Product } from "@/types/product"
import { Hero } from "@/components/Hero"
import { ProductCard } from "@/components/ProductCard"
import { VirtualTryOn } from "@/components/VirtualTryOn"
import { Sparkles } from "lucide-react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Classic White Tee",
    price: 29.99,
    category: "tops",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=600&fit=crop",
    description: "Essential cotton t-shirt with a relaxed fit",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["#FFFFFF", "#000000", "#6B7280"]
  },
  {
    id: "2",
    name: "Denim Jacket",
    price: 89.99,
    category: "outerwear",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=600&fit=crop",
    description: "Classic denim jacket with vintage wash",
    sizes: ["S", "M", "L", "XL"],
    colors: ["#4A5568", "#2D3748"]
  },
  {
    id: "3",
    name: "Floral Summer Dress",
    price: 79.99,
    category: "dresses",
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=600&fit=crop",
    description: "Light and breezy floral print dress",
    sizes: ["XS", "S", "M", "L"],
    colors: ["#FCA5A5", "#FBBF24", "#A78BFA"]
  },
  {
    id: "4",
    name: "Black Joggers",
    price: 49.99,
    category: "bottoms",
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400&h=600&fit=crop",
    description: "Comfortable joggers for everyday wear",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["#000000", "#6B7280", "#1F2937"]
  },
  {
    id: "5",
    name: "Striped Button-Up",
    price: 59.99,
    category: "tops",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=600&fit=crop",
    description: "Casual striped shirt perfect for any occasion",
    sizes: ["S", "M", "L", "XL"],
    colors: ["#3B82F6", "#FFFFFF", "#EC4899"]
  },
  {
    id: "6",
    name: "Leather Biker Jacket",
    price: 199.99,
    category: "outerwear",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=600&fit=crop",
    description: "Premium leather jacket with classic style",
    sizes: ["S", "M", "L", "XL"],
    colors: ["#000000", "#4A5568"]
  }
]

const Index = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const tryOnRef = useRef<HTMLDivElement>(null)

  const handleTryOn = (product: Product) => {
    setSelectedProduct(product)
    setTimeout(() => {
      tryOnRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })
    }, 100)
  }

  const handleTryNowClick = () => {
    tryOnRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-50">
      {/* Hero Section */}
      <Hero onTryNowClick={handleTryNowClick} />

      {/* Sample Products Carousel Section */}
      <section className="py-16 px-4 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Sample Items to Try</h3>
            <p className="text-gray-600">Click "Try On" to see how these items look on you</p>
          </div>

          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-5xl mx-auto"
          >
            <CarouselContent>
              {PRODUCTS.map((product) => (
                <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/3">
                  <ProductCard product={product} onTryOn={handleTryOn} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* Virtual Try-On Section */}
      <section ref={tryOnRef} className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-purple-100 rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-600">AI-Powered Virtual Try-On</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Try On Studio
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              {selectedProduct
                ? `See how ${selectedProduct.name} looks on you`
                : "Upload your photo and select an item to see yourself in any outfit"}
            </p>
          </div>

          <VirtualTryOn selectedProduct={selectedProduct} />
        </div>
      </section>
    </div>
  )
}

export default Index
