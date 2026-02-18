"use client"

import { useState, useEffect } from "react"
import { useCartStore } from "@/store/cartStore"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Loader2, CheckCircle, CreditCard, Truck, MapPin } from "lucide-react"
import { formatPrice } from "@/lib/utils"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function CheckoutPage() {
    const router = useRouter()
    const [mounted, setMounted] = useState(false)
    const items = useCartStore((state) => state.items)
    const getTotal = useCartStore((state) => state.getTotal)
    const clearCart = useCartStore((state) => state.clearCart)

    const [isLoading, setIsLoading] = useState(false)
    const [step, setStep] = useState(1) // 1: Contact, 2: Shipping, 3: Payment
    const [formData, setFormData] = useState({
        email: "",
        name: "",
        address: "",
        city: "",
        zip: "",
        country: "",
    })

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return <div className="p-12 text-center text-gray-500">Loading checkout...</div>

    const total = getTotal()
    const shipping = 0
    const tax = total * 0.1

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleNextStep = (e: React.FormEvent) => {
        e.preventDefault()
        setStep(prev => prev + 1)
    }

    const handlePlaceOrder = async () => {
        setIsLoading(true)
        try {
            // Simulate API call to create Stripe session or process order
            const res = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    items,
                    total: total + shipping + tax,
                    customer: formData
                })
            })

            if (res.ok) {
                const data = await res.json()
                clearCart()
                // Redirect to Stripe or Success Page
                if (data.url) {
                    window.location.href = data.url
                } else {
                    router.push("/checkout/success")
                }
            } else {
                console.error("Checkout failed")
            }
        } catch (error) {
            console.error("Error processing checkout", error)
        } finally {
            setIsLoading(false)
        }
    }

    if (items.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4">
                <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
                <Button asChild><Link href="/products">Continue Shopping</Link></Button>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 md:px-6 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">

                {/* Checkout Form */}
                <div className="space-y-8">
                    {/* Steps Indicator */}
                    <div className="flex justify-between mb-8 relative">
                        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -z-10" />
                        {[1, 2, 3].map((s) => (
                            <div key={s} className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${step >= s ? "bg-primary-600 text-white" : "bg-gray-100 text-gray-400"}`}>
                                {step > s ? <CheckCircle className="w-5 h-5" /> : s}
                            </div>
                        ))}
                    </div>

                    <div className="space-y-6">
                        {step === 1 && (
                            <form id="contact-form" onSubmit={handleNextStep} className="space-y-4">
                                <h2 className="text-xl font-bold flex items-center gap-2"><MapPin className="w-5 h-5" /> Contact & Shipping</h2>
                                <div className="grid gap-4">
                                    <Input name="email" placeholder="Email" type="email" required value={formData.email} onChange={handleInputChange} />
                                    <Input name="name" placeholder="Full Name" required value={formData.name} onChange={handleInputChange} />
                                    <Input name="address" placeholder="Address" required value={formData.address} onChange={handleInputChange} />
                                    <div className="grid grid-cols-2 gap-4">
                                        <Input name="city" placeholder="City" required value={formData.city} onChange={handleInputChange} />
                                        <Input name="zip" placeholder="ZIP Code" required value={formData.zip} onChange={handleInputChange} />
                                    </div>
                                    <Input name="country" placeholder="Country" required value={formData.country} onChange={handleInputChange} />
                                </div>
                                <Button type="submit" className="w-full">Continue to Shipping Method</Button>
                            </form>
                        )}

                        {step === 2 && (
                            <div className="space-y-4">
                                <h2 className="text-xl font-bold flex items-center gap-2"><Truck className="w-5 h-5" /> Shipping Method</h2>
                                <div className="border rounded-lg p-4 flex justify-between items-center cursor-pointer border-primary-500 bg-primary-50">
                                    <span className="font-medium">Standard Shipping (3-5 days)</span>
                                    <span className="font-bold">Free</span>
                                </div>
                                <div className="flex gap-4">
                                    <Button variant="outline" onClick={() => setStep(1)} className="flex-1">Back</Button>
                                    <Button onClick={() => setStep(3)} className="flex-1">Continue to Payment</Button>
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="space-y-4">
                                <h2 className="text-xl font-bold flex items-center gap-2"><CreditCard className="w-5 h-5" /> Payment</h2>
                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                    <p className="text-sm text-gray-500 mb-4">Secure payment processing handled by Stripe.</p>
                                    {/* Mock Card Element */}
                                    <div className="h-10 bg-white border border-gray-300 rounded px-3 flex items-center text-gray-400 mb-4">
                                        Card number
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="h-10 bg-white border border-gray-300 rounded px-3 flex items-center text-gray-400">MM / YY</div>
                                        <div className="h-10 bg-white border border-gray-300 rounded px-3 flex items-center text-gray-400">CVC</div>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <Button variant="outline" onClick={() => setStep(2)} className="flex-1" disabled={isLoading}>Back</Button>
                                    <Button onClick={handlePlaceOrder} className="flex-1" disabled={isLoading}>
                                        {isLoading ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : "Pay Now"}
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Order Summary */}
                <div className="bg-gray-50 p-6 rounded-lg h-fit sticky top-24">
                    <h2 className="text-lg font-bold mb-4">Order Summary</h2>
                    <div className="space-y-4 mb-6 max-h-80 overflow-y-auto pr-2">
                        {items.map((item) => (
                            <div key={item.id} className="flex gap-4">
                                <div className="w-16 h-16 bg-white rounded border flex items-center justify-center text-xs text-gray-400 flex-shrink-0">
                                    img
                                </div>
                                <div className="flex-1 text-sm">
                                    <div className="font-medium">{item.name}</div>
                                    <div className="text-gray-500">Qty: {item.quantity}</div>
                                </div>
                                <div className="font-medium text-sm">{formatPrice(item.price * item.quantity)}</div>
                            </div>
                        ))}
                    </div>

                    <div className="space-y-2 pt-4 border-t border-gray-200 text-sm">
                        <div className="flex justify-between"><span>Subtotal</span><span>{formatPrice(total)}</span></div>
                        <div className="flex justify-between"><span>Shipping</span><span>Free</span></div>
                        <div className="flex justify-between"><span>Tax (10%)</span><span>{formatPrice(tax)}</span></div>
                        <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200 mt-2">
                            <span>Total</span><span>{formatPrice(total + shipping + tax)}</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
