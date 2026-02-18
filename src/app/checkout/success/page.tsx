"use client"

import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { CheckCircle } from "lucide-react"

export default function CheckoutSuccessPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
            <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md w-full">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
                <p className="text-gray-600 mb-8">
                    Thank you for your purchase. We have received your order and will send you a confirmation email shortly.
                </p>
                <div className="bg-gray-50 rounded-lg p-4 mb-8 text-sm text-left">
                    <p className="font-medium text-gray-900 mb-1">Order #ORD-{Math.floor(Math.random() * 10000)}</p>
                    <p className="text-gray-500">Estimated Delivery: {new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
                </div>
                <div className="space-y-4">
                    <Button asChild className="w-full">
                        <Link href="/products">Continue Shopping</Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full">
                        <Link href="/">Return Home</Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}
