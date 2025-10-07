import type { Product } from "@/types/product"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface ProductCardProps {
  product: Product
  onTryOn: (product: Product) => void
}

export const ProductCard = ({ product, onTryOn }: ProductCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 border-none shadow-lg rounded-3xl bg-white hover:scale-[1.02]">
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
        <Badge className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm text-gray-800 rounded-full px-3 py-1 shadow-md border-0">
          {product.category}
        </Badge>
      </div>

      <CardContent className="p-5">
        <h3 className="font-semibold text-xl mb-2 text-gray-800">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            ${product.price.toFixed(2)}
          </span>
          <div className="flex gap-1.5">
            {product.colors.slice(0, 3).map((color, idx) => (
              <div
                key={idx}
                className="w-6 h-6 rounded-full border-2 border-gray-200 shadow-sm"
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-5 pt-0">
        <Button
          onClick={() => onTryOn(product)}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-2xl h-11 font-semibold shadow-md hover:shadow-lg transition-all duration-200"
        >
          Try On
        </Button>
      </CardFooter>
    </Card>
  )
}
