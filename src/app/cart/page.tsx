"use client"

import Link from "next/link"
import { useCartStore } from "@/store/cartStore"
import { useState, useEffect } from "react"
import { CartItem } from "./CartItem"
import { Button, buttonVariants } from "@/components/ui/Button"
import { ArrowRight, ShoppingBag } from "lucide-react"
import { formatPrice } from "@/lib/utils"

export default function CartPage() {
    const [mounted, setMounted] = useState(false)
    const items = useCartStore((state) => state.items)
    const getTotal = useCartStore((state) => state.getTotal)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return <div className="p-12 text-center text-gray-500">Loading cart...</div>

    const total = getTotal()
    const shipping = 0 // Free shipping
    const tax = total * 0.1 // Estimated tax

    return (
        <div className="container mx-auto px-4 md:px-6 py-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

            {items.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 rounded-lg">
                    <div className="bg-white p-4 rounded-full inline-block mb-4 shadow-sm">
                        <ShoppingBag className="w-8 h-8 text-gray-400" />
                    </div>
                    <h2 className="text-xl font-medium text-gray-900 mb-2">Your cart is empty</h2>
                    <p className="text-gray-500 mb-8 max-w-sm mx-auto">
                        Looks like you haven't added any items to the cart yet.
                    </p>
                    <Link href="/products" className={buttonVariants("default")}>
                        Start Shopping
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Cart Items List */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg border border-gray-100 p-6 shadow-sm">
                            {items.map((item) => (
                                <CartItem key={item.id} item={item} />
                            ))}
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-gray-50 rounded-lg p-6 sticky top-24">
                            <h2 className="text-lg font-semibold text-gray-900 mb-6">Order Summary</h2>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span>{formatPrice(total)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping</span>
                                    <span className="text-green-600 font-medium">{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Estimated Tax</span>
                                    <span>{formatPrice(tax)}</span>
                                </div>

                                <div className="h-px bg-gray-200 my-4" />

                                <div className="flex justify-between text-lg font-bold text-gray-900">
                                    <span>Total</span>
                                    <span>{formatPrice(total + shipping + tax)}</span>
                                </div>
                            </div>

                            <Link href="/checkout" className={buttonVariants("default", "default", "w-full text-lg h-12 flex items-center justify-center")}>
                                Proceed to Checkout <ArrowRight className="ml-2 w-5 h-5" />
                            </Link>

                            <p className="text-xs text-center text-gray-500 mt-4">
                                Secure Checkout - SSL Encrypted
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
