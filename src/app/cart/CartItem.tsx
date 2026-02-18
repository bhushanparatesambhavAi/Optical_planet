"use client"

import Image from "next/image"
import { Minus, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { useCartStore, CartItem as CartItemType } from "@/store/cartStore"
import { formatPrice } from "@/lib/utils"

interface CartItemProps {
    item: CartItemType
}

export function CartItem({ item }: CartItemProps) {
    const updateQuantity = useCartStore((state) => state.updateQuantity)
    const removeItem = useCartStore((state) => state.removeItem)

    return (
        <div className="flex flex-col sm:flex-row gap-6 py-6 border-b border-gray-100 last:border-0">
            <div className="relative aspect-square w-24 sm:w-32 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
                {/* Placeholder Image */}
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                    {item.name}
                </div>
            </div>

            <div className="flex flex-1 flex-col justify-between">
                <div className="flex justify-between items-start">
                    <div className="space-y-1">
                        <h3 className="font-medium text-gray-900">{item.name}</h3>
                        {item.variant && (
                            <p className="text-sm text-gray-500">{item.variant}</p>
                        )}
                        <p className="font-medium text-gray-900">{formatPrice(item.price)}</p>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-gray-400 hover:text-red-500 -mr-2"
                        onClick={() => removeItem(item.id)}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>

                <div className="flex items-center gap-4 mt-4 sm:mt-0">
                    <div className="flex items-center border border-gray-200 rounded-md">
                        <button
                            className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-50"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                        >
                            <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <button
                            className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-50"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                            <Plus className="w-3 h-3" />
                        </button>
                    </div>
                    <div className="ml-auto font-medium text-gray-900">
                        {formatPrice(item.price * item.quantity)}
                    </div>
                </div>
            </div>
        </div>
    )
}
