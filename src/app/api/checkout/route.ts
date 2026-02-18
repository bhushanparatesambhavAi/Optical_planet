import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import Stripe from "stripe"

// Initialize Stripe if key is available
const stripe = process.env.STRIPE_SECRET_KEY
    ? new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2023-10-16" })
    : null

export async function POST(req: Request) {
    try {
        const { items, total, customer } = await req.json()

        // 1. Create Order in DB (Pending Status)
        // In a real app, you might create the order here with "PENDING" status
        // const order = await prisma.order.create({ ... })
        // For now, we'll simulate an order ID
        const orderId = `ORD-${Date.now()}`

        // 2. Create Stripe Session
        if (stripe) {
            const line_items = items.map((item: any) => ({
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: item.name,
                        images: item.image ? [item.image] : [],
                    },
                    unit_amount: Math.round(item.price * 100), // Stripe expects cents
                },
                quantity: item.quantity,
            }))

            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items,
                mode: 'payment',
                success_url: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/checkout`,
                customer_email: customer.email,
                metadata: {
                    orderId: orderId,
                    customerName: customer.name
                }
            })

            return NextResponse.json({
                success: true,
                orderId,
                url: session.url
            })
        }

        // Fallback Mock for Development
        await new Promise(resolve => setTimeout(resolve, 1500))

        return NextResponse.json({
            success: true,
            orderId,
            url: "/checkout/success" // Redirect to success page directly in mock mode
        })
    } catch (error) {
        console.error("[CHECKOUT_API]", error)
        return NextResponse.json({ error: "Internal Error" }, { status: 500 })
    }
}
