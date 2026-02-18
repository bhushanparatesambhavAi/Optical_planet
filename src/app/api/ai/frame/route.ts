import { NextResponse } from "next/server"
// import OpenAI from "openai"

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// })

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { shape, style, usage } = body

        // Validation
        if (!shape || !style || !usage) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
        }

        // OpenAI Integration (Placeholder)
        // const completion = await openai.chat.completions.create({ ... })

        // Mock Response for Development
        const mockResponse = {
            recommendation: `For a ${shape} face shape with a preference for ${style} style, we recommend frames that contrast with your facial features. ${style === 'modern' ? 'Geometric and colorful' : 'Classic and understated'} frames would work best for ${usage}.`,
            frames: ["Rectangular", "Square", "Browline"],
            products: [
                { id: "1", name: "Ray-Ban Aviator", price: 163 },
                { id: "2", name: "Oakley Holbrook", price: 152 },
                { id: "3", name: "Persol PO3007V", price: 260 },
            ]
        }

        // Simulate delay
        await new Promise(resolve => setTimeout(resolve, 1000))

        return NextResponse.json(mockResponse)
    } catch (error) {
        console.error("[AI_FRAME_API]", error)
        return NextResponse.json({ error: "Internal Error" }, { status: 500 })
    }
}
