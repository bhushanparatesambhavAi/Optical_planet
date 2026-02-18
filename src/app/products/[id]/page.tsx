import { ProductGallery } from "@/components/products/ProductGallery"
import { ProductInfo } from "@/components/products/ProductInfo"
import { ProductGrid } from "@/components/products/ProductGrid"
import { Reviews } from "@/components/products/Reviews"

// Mock Data Access (Simulating DB Fetch)
async function getProduct(id: string) {
    // Mock delay
    await new Promise(resolve => setTimeout(resolve, 500))

    return {
        id,
        name: "Ray-Ban Aviator Classic",
        price: 163.00,
        originalPrice: 200.00,
        description: "Currently one of the most iconic sunglass models in the world, Ray-Ban Aviator Classic sunglasses were originally designed for U.S. Aviators in 1937. Aviator Classic sunglasses are a timeless model that combines great aviator styling with exceptional quality, performance and comfort.",
        rating: 4.8,
        reviews: 124,
        images: ["/images/products/aviator-1.jpg", "/images/products/aviator-2.jpg", "/images/products/aviator-3.jpg"],
        category: "Sunglasses",
        isNew: true,
        stock: 15,
        colors: ["Gold", "Silver", "Black"],
    }
}

async function getRelatedProducts() {
    return [
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
    ]
}

export default async function ProductPage({ params }: { params: { id: string } }) {
    const product = await getProduct(params.id)
    const relatedProducts = await getRelatedProducts()

    return (
        <div className="container mx-auto px-4 md:px-6 py-12">
            {/* Breadcrumbs (Mock) */}
            <nav className="text-sm text-gray-500 mb-8">
                Home / {product.category} / <span className="text-gray-900 font-medium">{product.name}</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
                <ProductGallery images={product.images} />
                <ProductInfo product={product} />
            </div>

            <Reviews rating={product.rating} count={product.reviews} />

            {/* Related Products */}
            <section className="border-t border-gray-200 pt-16">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">You might also like</h2>
                <ProductGrid products={relatedProducts} />
            </section>
        </div>
    )
}
