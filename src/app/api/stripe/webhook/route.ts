import { headers } from "next/headers"
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import Stripe from "stripe"
import { sendEmail } from "@/lib/email/send"
import { OrderConfirmationEmail } from "@/lib/email/templates/order-confirmation"

const stripe = process.env.STRIPE_SECRET_KEY
    ? new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2023-10-16" })
    : null

export async function POST(req: Request) {
    if (!stripe) {
        return NextResponse.json({ error: "Stripe not configured" }, { status: 500 })
    }

    const body = await req.text()
    const signature = headers().get("Stripe-Signature") as string

    let event: Stripe.Event

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        )
    } catch (error: any) {
        return NextResponse.json({ error: `Webhook Error: ${error.message}` }, { status: 400 })
    }

    const session = event.data.object as Stripe.Checkout.Session

    if (event.type === "checkout.session.completed") {
        const customerEmail = session.customer_details?.email
        const customerName = session.customer_details?.name || "Customer"
        const amountTotal = (session.amount_total || 0) / 100

        // Payment success logic
        // const orderId = session.metadata?.orderId
        // await prisma.order.update({
        //    where: { id: orderId },
        //    data: { isPaid: true, status: 'PROCESSING' }
        // })

        console.log("Payment successful for session:", session.id)

        if (customerEmail) {
            try {
                await sendEmail({
                    to: customerEmail,
                    subject: "Order Confirmation - Optical Planet",
                    react: OrderConfirmationEmail({ // Now valid component usage
                        customerName: customerName,
                        orderId: session.metadata?.orderId || "ORD-UNKNOWN",
                        total: amountTotal
                    }) as React.ReactElement // Type casting if needed or ensures it matches 
                })
            } catch (e) {
                console.error("Failed to send confirmation email", e)
            }
        }
    }

    return NextResponse.json({ received: true }, { status: 200 })
}
