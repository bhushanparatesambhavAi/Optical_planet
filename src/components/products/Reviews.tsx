"use client"

import { Star, ThumbsUp } from "lucide-react"
import { Button } from "@/components/ui/Button"

// Mock Reviews

// Mock Reviews
const REVIEWS = [
    {
        id: 1,
        author: "Sarah J.",
        rating: 5,
        date: "2 months ago",
        title: "Perfect fit!",
        content: "I was worried about buying glasses online but these fit perfectly. The virtual try-on was very accurate.",
        helpful: 12,
    },
    {
        id: 2,
        author: "Michael B.",
        rating: 4,
        date: "1 month ago",
        title: "Great quality, fast shipping",
        content: "The frames feel very sturdy and premium. Shipping was faster than expected.",
        helpful: 5,
    },
    {
        id: 3,
        author: "Emily R.",
        rating: 5,
        date: "3 weeks ago",
        title: "Love the style",
        content: "Detailed and stylish. I get compliments all the time.",
        helpful: 8,
    },
]

export function Reviews({ rating = 4.8, count = 124 }: { rating?: number, count?: number }) {
    return (
        <div className="py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Customer Reviews</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {/* Summary */}
                <div className="md:col-span-1 space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="text-5xl font-bold text-gray-900">{rating}</div>
                        <div className="space-y-1">
                            <div className="flex text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className={`w-5 h-5 ${i < Math.floor(rating) ? "fill-current" : "text-gray-300"}`} />
                                ))}
                            </div>
                            <p className="text-sm text-gray-500">{count} reviews</p>
                        </div>
                    </div>

                    <div className="space-y-2">
                        {[5, 4, 3, 2, 1].map((star) => (
                            <div key={star} className="flex items-center gap-2 text-sm">
                                <span className="w-3">{star}</span>
                                <Star className="w-3 h-3 text-gray-400" />
                                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-yellow-400 rounded-full"
                                        style={{ width: star === 5 ? '70%' : star === 4 ? '20%' : '5%' }}
                                    />
                                </div>
                                <span className="w-8 text-right text-gray-400">{star === 5 ? '70%' : star === 4 ? '20%' : '5%'}</span>
                            </div>
                        ))}
                    </div>

                    <Button className="w-full" variant="outline">Write a Review</Button>
                </div>

                {/* Review List */}
                <div className="md:col-span-2 space-y-8">
                    {REVIEWS.map((review) => (
                        <div key={review.id} className="border-b border-gray-100 pb-8 last:border-0">
                            <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center gap-2">
                                    <span className="font-semibold text-gray-900">{review.author}</span>
                                    <span className="text-gray-400 text-sm">• {review.date}</span>
                                </div>
                                <div className="flex text-yellow-400">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`w-4 h-4 ${i < review.rating ? "fill-current" : "text-gray-300"}`} />
                                    ))}
                                </div>
                            </div>
                            <h3 className="font-medium text-gray-900 mb-2">{review.title}</h3>
                            <p className="text-gray-600 mb-4 text-sm leading-relaxed">{review.content}</p>
                            <button className="flex items-center text-sm text-gray-500 hover:text-gray-900">
                                <ThumbsUp className="w-4 h-4 mr-1.5" /> Helpful ({review.helpful})
                            </button>
                        </div>
                    ))}
                    <Button variant="ghost" className="text-primary-600">Load More Reviews</Button>
                </div>
            </div>
        </div>
    )
}
