import { ProductGrid } from "@/components/products/ProductGrid"
import { ProductFilters } from "@/components/products/ProductFilters"
import { SearchBar } from "@/components/products/SearchBar"
import { Button } from "@/components/ui/Button"
import { SlidersHorizontal } from "lucide-react"

// Mock Data for logic
const MOCK_PRODUCTS = [
    {
        id: "1",
        name: "Ray-Ban Aviator Classic",
        price: 163.00,
        rating: 4.8,
        reviews: 124,
        image: "/images/products/aviator.png",
        category: "Sunglasses",
        isNew: true,
    },
    {
        id: "2",
        name: "Oakley Holbrook",
        price: 152.00,
        rating: 4.6,
        reviews: 89,
        image: "/images/products/holbrook.png",
        category: "Sport",
    },
    {
        id: "3",
        name: "Persol PO3007V",
        price: 260.00,
        rating: 4.9,
        reviews: 45,
        image: "/images/products/persol.png",
        category: "Eyeglasses",
        isSale: true,
        originalPrice: 310.00,
    },
    {
        id: "4",
        name: "Tom Ford Blue Block",
        price: 435.00,
        rating: 5.0,
        reviews: 23,
        image: "/images/products/tomford.png",
        category: "Computer Glasses",
    },
    {
        id: "5",
        name: "Gucci GG0061S",
        price: 350.00,
        rating: 4.7,
        reviews: 12,
        image: "/images/products/gucci.png",
        category: "Sunglasses",
    },
    {
        id: "6",
        name: "Prada Linea Rossa",
        price: 290.00,
        rating: 4.5,
        reviews: 34,
        image: "/images/products/prada.png",
        category: "Sport",
    },
]

export default function ProductsPage({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    // Server-side filtering logic (Mock)
    let products = [...MOCK_PRODUCTS]

    // Filter by Category
    if (searchParams.category) {
        const categories = Array.isArray(searchParams.category)
            ? searchParams.category
            : [searchParams.category]
        products = products.filter(p => categories.includes(p.category))
    }

    // Filter by Search
    if (searchParams.search) {
        const search = (searchParams.search as string).toLowerCase()
        products = products.filter(p =>
            p.name.toLowerCase().includes(search) ||
            p.category.toLowerCase().includes(search)
        )
    }

    // Filter by Price
    if (searchParams.minPrice || searchParams.maxPrice) {
        const min = Number(searchParams.minPrice) || 0
        const max = Number(searchParams.maxPrice) || 1000
        products = products.filter(p => p.price >= min && p.price <= max)
    }

    return (
        <div className="container mx-auto px-4 md:px-6 py-8">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">All Products</h1>
                    <p className="text-gray-500 mt-1">
                        Showing {products.length} results
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    <SearchBar />
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar Filters - Desktop */}
                <aside className="hidden lg:block w-64 flex-shrink-0">
                    <div className="sticky top-24">
                        <ProductFilters />
                    </div>
                </aside>

                {/* Mobile Filter Trigger (Visible only on mobile) */}
                <div className="lg:hidden mb-6">
                    {/* This would be a client component to open a sheet/modal */}
                    <Button variant="outline" className="w-full flex justify-between">
                        <span className="flex items-center"><SlidersHorizontal className="w-4 h-4 mr-2" /> Filters</span>
                        <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs">3</span>
                    </Button>
                </div>

                {/* Product Grid */}
                <div className="flex-1">
                    <ProductGrid products={products} />

                    {/* Pagination (Mock) */}
                    {products.length > 0 && (
                        <div className="mt-12 flex justify-center">
                            <nav className="flex items-center space-x-2">
                                <Button variant="outline" disabled>Previous</Button>
                                <Button variant="outline" className="bg-primary-50 text-primary-600 border-primary-200">1</Button>
                                <Button variant="outline">2</Button>
                                <Button variant="outline">3</Button>
                                <Button variant="outline">Next</Button>
                            </nav>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
