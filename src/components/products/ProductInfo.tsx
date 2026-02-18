"use client"

import { useState } from "react"
import { Star, Heart, Share2, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { formatPrice } from "@/lib/utils"
import { useCartStore } from "@/store/cartStore"
import { cn } from "@/lib/utils"

interface ProductInfoProps {
    product: {
        id: string
        name: string
        price: number
        originalPrice?: number
        description: string
        rating: number
        reviews: number
        category: string
        isNew?: boolean
        stock: number
        colors?: string[] // simplified for now
        sizes?: string[]
    }
}

export function ProductInfo({ product }: ProductInfoProps) {
    const addItem = useCartStore((state) => state.addItem)
    const [quantity, setQuantity] = useState(1)
    const [selectedColor, setSelectedColor] = useState(product.colors?.[0])
    const [selectedSize, setSelectedSize] = useState(product.sizes?.[0])
    const [isWishlisted, setIsWishlisted] = useState(false)

    const handleAddToCart = () => {
        addItem({
            id: product.id,
            productId: product.id,
            name: product.name,
            price: product.price,
            image: "/placeholder.png", // Mock image path
            quantity: quantity,
            variant: selectedColor ? `${selectedColor} / ${selectedSize}` : undefined
        })
        // Could show a toast here
    }

    return (
        <div className="flex flex-col gap-6">
            <div>
                <div className="flex items-center gap-2 mb-2">
                    {product.isNew && <Badge className="bg-green-500 hover:bg-green-600">New Arrival</Badge>}
                    <Badge variant="outline" className="text-gray-500 border-gray-300">{product.category}</Badge>
                </div>
                <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center">
                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        <span className="ml-1 font-medium text-gray-900">{product.rating}</span>
                        <span className="ml-1 text-gray-500">({product.reviews} reviews)</span>
                    </div>
                </div>
            </div>

            <div className="flex items-baseline gap-4">
                <span className="text-3xl font-bold text-gray-900">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                    <span className="text-lg text-gray-500 line-through">{formatPrice(product.originalPrice)}</span>
                )}
            </div>

            <p className="text-gray-600 leading-relaxed">
                {product.description}
            </p>

            {/* Variants Selection (Mock) */}
            {product.colors && (
                <div>
                    <span className="text-sm font-medium text-gray-900 mb-2 block">Frame Color</span>
                    <div className="flex gap-2">
                        {product.colors.map(color => (
                            <button
                                key={color}
                                onClick={() => setSelectedColor(color)}
                                className={cn(
                                    "w-8 h-8 rounded-full border-2 transition-all",
                                    selectedColor === color ? "border-primary-500 ring-2 ring-primary-200 ring-offset-2" : "border-gray-200 hover:border-gray-300"
                                )}
                                style={{ backgroundColor: color.toLowerCase() }} // Assuming color names are valid CSS colors for demo
                                title={color}
                            />
                        ))}
                    </div>
                </div>
            )}

            <div className="h-px bg-gray-200 my-2" />

            <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center border border-gray-200 rounded-md">
                    <button
                        className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-50"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        disabled={quantity <= 1}
                    >
                        -
                    </button>
                    <span className="w-12 text-center text-gray-900 font-medium">{quantity}</span>
                    <button
                        className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-50"
                        onClick={() => setQuantity(quantity + 1)}
                    >
                        +
                    </button>
                </div>
                <Button
                    size="lg"
                    className="flex-1 text-lg font-medium"
                    onClick={handleAddToCart}
                >
                    <ShoppingCart className="w-5 h-5 mr-2" /> Add to Cart
                </Button>
                <Button
                    size="lg"
                    variant="outline"
                    className={cn("px-4", isWishlisted && "bg-red-50 text-red-500 border-red-200")}
                    onClick={() => setIsWishlisted(!isWishlisted)}
                >
                    <Heart className={cn("w-6 h-6", isWishlisted && "fill-current")} />
                </Button>
            </div>

            <div className="text-sm text-gray-500 flex gap-6 mt-2">
                {product.stock > 0 ? (
                    <div className="flex items-center text-green-600">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                        In Stock
                    </div>
                ) : (
                    <div className="flex items-center text-red-600">
                        <span className="w-2 h-2 bg-red-500 rounded-full mr-2" />
                        Out of Stock
                    </div>
                )}
                <div className="flex items-center hover:text-gray-900 cursor-pointer">
                    <Share2 className="w-4 h-4 mr-2" /> Share
                </div>
            </div>
        </div>
    )
}
