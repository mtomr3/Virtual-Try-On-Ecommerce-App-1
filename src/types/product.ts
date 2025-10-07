export interface Product {
  id: string
  name: string
  price: number
  category: 'tops' | 'bottoms' | 'dresses' | 'outerwear'
  image: string
  description: string
  sizes: string[]
  colors: string[]
}

export interface TryOnState {
  userImage: string | null
  selectedProduct: Product | null
  isProcessing: boolean
}
