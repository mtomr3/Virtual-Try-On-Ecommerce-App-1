import { useState, useRef } from "react"
import type { Product } from "@/types/product"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, X, Camera, Loader2 } from "lucide-react"
import { toast } from "sonner"

interface VirtualTryOnProps {
  selectedProduct: Product | null
}

export const VirtualTryOn = ({ selectedProduct }: VirtualTryOnProps) => {
  const [userImage, setUserImage] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB')
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      setUserImage(e.target?.result as string)
      toast.success('Image uploaded successfully!')

      if (selectedProduct) {
        setIsProcessing(true)
        setTimeout(() => {
          setIsProcessing(false)
          toast.success('Virtual try-on ready!')
        }, 1500)
      }
    }
    reader.readAsDataURL(file)
  }

  const handleRemoveImage = () => {
    setUserImage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="w-full">
      <Card className="border-none shadow-2xl rounded-3xl overflow-hidden bg-white">
        <CardContent className="p-8 md:p-10">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Upload Section */}
            <div className="space-y-4">
              <h3 className="font-semibold text-xl text-gray-800">Your Photo</h3>

              {!userImage ? (
                <div
                  onClick={handleUploadClick}
                  className="border-2 border-dashed border-gray-300 rounded-3xl p-12 text-center hover:border-purple-400 hover:bg-purple-50/50 transition-all duration-200 cursor-pointer aspect-[3/4] flex items-center justify-center"
                >
                  <div>
                    <Upload className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                    <p className="text-base text-gray-600 mb-2 font-medium">
                      Click to upload
                    </p>
                    <p className="text-sm text-gray-500">
                      PNG, JPG up to 5MB
                    </p>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
              ) : (
                <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-gray-100 shadow-lg">
                  <img
                    src={userImage}
                    alt="Your photo"
                    className="w-full h-full object-cover"
                  />
                  <Button
                    size="icon"
                    variant="destructive"
                    className="absolute top-4 right-4 rounded-full shadow-lg"
                    onClick={handleRemoveImage}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              )}

              {userImage && (
                <Button onClick={handleUploadClick} variant="outline" className="w-full rounded-2xl h-12 border-2">
                  <Upload className="w-4 h-4 mr-2" />
                  Change Photo
                </Button>
              )}
            </div>

            {/* Preview Section */}
            <div className="space-y-4">
              <h3 className="font-semibold text-xl text-gray-800">Try-On Preview</h3>

              {!userImage && !selectedProduct ? (
                <div className="border-2 border-dashed border-gray-300 rounded-3xl p-12 aspect-[3/4] flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50">
                  <div className="text-center text-gray-500">
                    <Camera className="w-16 h-16 mx-auto mb-4 opacity-40" />
                    <p className="text-base font-medium">Upload your photo and select an item</p>
                  </div>
                </div>
              ) : !userImage ? (
                <div className="border-2 border-dashed border-gray-300 rounded-3xl p-12 aspect-[3/4] flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50">
                  <div className="text-center text-gray-500">
                    <Upload className="w-16 h-16 mx-auto mb-4 opacity-40" />
                    <p className="text-base font-medium">Upload your photo to see the preview</p>
                  </div>
                </div>
              ) : !selectedProduct ? (
                <div className="border-2 border-dashed border-gray-300 rounded-3xl p-12 aspect-[3/4] flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50">
                  <div className="text-center text-gray-500">
                    <ShoppingCartIcon className="w-16 h-16 mx-auto mb-4 opacity-40" />
                    <p className="text-base font-medium">Select a product to try on</p>
                  </div>
                </div>
              ) : (
                <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-gray-100 shadow-lg">
                  {isProcessing ? (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-100 to-pink-100">
                      <div className="text-center">
                        <Loader2 className="w-16 h-16 mx-auto mb-4 text-purple-600 animate-spin" />
                        <p className="text-base text-purple-600 font-semibold">
                          Processing...
                        </p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <img
                        src={userImage}
                        alt="Your photo with product"
                        className="w-full h-full object-cover opacity-90"
                      />
                      <div className="absolute inset-0 flex items-center justify-center p-6">
                        <div className="bg-white/95 backdrop-blur-md rounded-2xl p-5 max-w-[80%] shadow-2xl border border-white/50">
                          <img
                            src={selectedProduct.image}
                            alt={selectedProduct.name}
                            className="w-full h-auto rounded-xl"
                          />
                          <div className="mt-3 text-center">
                            <p className="font-semibold text-base">{selectedProduct.name}</p>
                            <p className="text-sm text-gray-600 font-medium">${selectedProduct.price}</p>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}

              {userImage && selectedProduct && !isProcessing && (
                <div className="space-y-3 pt-2">
                  <Button className="w-full h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-2xl text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-200">
                    Add to Cart
                  </Button>
                  <p className="text-xs text-center text-gray-500 italic">
                    AI-powered virtual try-on for demonstration
                  </p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

const ShoppingCartIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
)
