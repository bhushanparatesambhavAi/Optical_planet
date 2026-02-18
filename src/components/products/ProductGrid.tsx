import { ProductCard } from "./ProductCard"
import { Skeleton } from "@/components/ui/Skeleton"
import { Ghost } from "lucide-react"

// Mock Data Type
interface Product {
    id: string
    name: string
    price: number
    originalPrice?: number
    rating: number
    reviews: number
    image: string
    category: string
    isNew?: boolean
    isSale?: boolean
}

interface ProductGridProps {
    products: Product[]
    isLoading?: boolean
}

export function ProductGrid({ products, isLoading }: ProductGridProps) {
    if (isLoading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="space-y-4">
                        <Skeleton className="aspect-[4/3] w-full rounded-lg" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="h-4 w-1/2" />
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    if (products.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="bg-gray-50 p-6 rounded-full mb-4">
                    <Ghost className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">No products found</h3>
                <p className="text-gray-500 mt-1 max-w-xs">
                    Try adjusting your filters or search query to find what you're looking for.
                </p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    )
}
