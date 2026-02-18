import React from "react"
import { NextResponse } from "next/server"
import { sendEmail } from "@/lib/email/send"
import { AbandonedCartEmail } from "@/lib/email/templates/abandoned-cart"

export async function POST(req: Request) {
    try {
        // In production, verify specific cron header or secret
        // const authHeader = req.headers.get('authorization');
        // if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) ...

        // Mock finding carts
        // const abandonedCarts = await prisma.cart.findMany(...)

        // Simulate sending an email for demo purposes
        await sendEmail({
            to: 'customer@example.com',
            subject: 'You left something behind!',
            react: React.createElement(AbandonedCartEmail, {
                customerName: 'Customer',
                items: ['Ray-Ban Aviator', 'Lens Cleaning Kit'],
                checkoutUrl: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/checkout`
            })
        })

        return NextResponse.json({ success: true, message: "Abandoned cart emails queued" })
    } catch (error) {
        console.error("[ABANDONED_CART_API]", error)
        return NextResponse.json({ error: "Internal Error" }, { status: 500 })
    }
}
