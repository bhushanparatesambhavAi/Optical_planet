"use client"

import { Phone, MessageCircle } from "lucide-react"

export function WhatsAppButton() {
    const phoneNumber = "15551234567" // Replace with real number
    const message = encodeURIComponent("Hi Optical Planet, I need help with an order.")
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-transform hover:scale-110 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
            aria-label="Chat on WhatsApp"
        >
            <MessageCircle className="h-8 w-8" />
            <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                1
            </span>
        </a>
    )
}
