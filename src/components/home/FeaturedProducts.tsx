"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Heart, ShoppingBag, Eye, Star } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardFooter } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { formatPrice } from "@/lib/utils"

// Mock Data
const PRODUCTS = [
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
]

export function FeaturedProducts() {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">
                            Trending Eyewear
                        </h2>
                        <p className="text-gray-600">
                            Discover the most popular frames selected by our community.
                        </p>
                    </div>
                    <Button variant="link" asChild className="hidden md:inline-flex">
                        <Link href="/products">View All Collection</Link>
                    </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {PRODUCTS.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className="h-full border-0 shadow-none hover:shadow-xl transition-all group overflow-hidden bg-gray-50/50">
                                <CardContent className="p-0 relative">
                                    {/* Badges */}
                                    <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                                        {product.isNew && <Badge className="bg-green-500">New</Badge>}
                                        {product.isSale && <Badge variant="destructive">Sale</Badge>}
                                    </div>

                                    {/* Wishlist Button */}
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        className="absolute top-4 right-4 z-10 rounded-full bg-white/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white text-gray-600 hover:text-red-500"
                                    >
                                        <Heart className="w-5 h-5" />
                                    </Button>

                                    {/* Image Area */}
                                    <div className="aspect-[4/3] relative flex items-center justify-center p-6 group-hover:scale-105 transition-transform duration-500">
                                        {/* Placeholder for real images */}
                                        <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center text-gray-400">
                                            Product Image
                                        </div>
                                    </div>

                                    {/* Quick Actions Overlay */}
                                    <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                        <Button className="w-full rounded-full shadow-lg" size="sm">
                                            <ShoppingBag className="w-4 h-4 mr-2" /> Add to Cart
                                        </Button>
                                    </div>
                                </CardContent>

                                <CardFooter className="flex flex-col items-start p-5 bg-white">
                                    <p className="text-xs text-gray-500 mb-1">{product.category}</p>
                                    <Link href={`/products/${product.id}`} className="block group-hover:text-primary-600 transition-colors">
                                        <h3 className="font-semibold text-gray-900 line-clamp-1 mb-2">{product.name}</h3>
                                    </Link>

                                    <div className="flex items-center justify-between w-full mt-2">
                                        <div className="flex flex-col">
                                            <div className="flex items-center space-x-1 mb-1">
                                                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                                <span className="text-xs font-medium text-gray-600">{product.rating}</span>
                                                <span className="text-xs text-gray-400">({product.reviews})</span>
                                            </div>
                                            <div className="flex items-baseline space-x-2">
                                                <span className="font-bold text-gray-900">{formatPrice(product.price)}</span>
                                                {product.originalPrice && (
                                                    <span className="text-sm text-gray-400 line-through">
                                                        {formatPrice(product.originalPrice)}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </CardFooter>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-12 text-center md:hidden">
                    <Button variant="outline" asChild>
                        <Link href="/products">View All Collection</Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}
