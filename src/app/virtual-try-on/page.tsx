"use client"

import { useState, useRef } from "react"
import { FaceMeshOverlay } from "@/components/virtual-tryon/FaceMeshOverlay"
import { FrameSelector } from "@/components/virtual-tryon/FrameSelector"
import { Button } from "@/components/ui/Button"
import { ArrowLeft, Camera, Share2, Download, Save } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Mock Frames
const FRAMES = [
    { id: "1", name: "Ray-Ban Aviator", image: "/frames/aviator.png", price: 163 },
    { id: "2", name: "Oakley Holbrook", image: "/frames/holbrook.png", price: 152 },
    { id: "3", name: "Persol PO3007V", image: "/frames/persol.png", price: 260 },
    { id: "4", name: "Tom Ford Blue", image: "/frames/tomford.png", price: 435 },
    { id: "5", name: "Gucci GG0061S", image: "/frames/gucci.png", price: 350 },
]

export default function VirtualTryOnPage() {
    const [selectedFrame, setSelectedFrame] = useState(FRAMES[0])
    const [capturedImage, setCapturedImage] = useState<string | null>(null)
    const overlayRef = useRef<{ capture: () => string | null }>(null)

    const handleCapture = () => {
        if (overlayRef.current) {
            const image = overlayRef.current.capture()
            if (image) {
                setCapturedImage(image)
            }
        }
    }

    const handleRetake = () => {
        setCapturedImage(null)
    }

    const handleSave = () => {
        if (capturedImage) {
            const link = document.createElement('a')
            link.href = capturedImage
            link.download = `optical-planet-tryon-${Date.now()}.png`
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        }
    }

    const activeContent = capturedImage ? (
        <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden">
            <img src={capturedImage} alt="Captured" className="max-h-full max-w-full object-contain transform scale-x-[-1]" />
            <div className="absolute top-4 right-4 z-40">
                <Button onClick={handleRetake} variant="secondary" size="sm" className="bg-black/50 text-white border-0 hover:bg-black/70">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Retake
                </Button>
            </div>
            <div className="absolute bottom-32 flex gap-4 z-40">
                <Button onClick={handleSave} className="bg-white text-black hover:bg-gray-200">
                    <Save className="w-4 h-4 mr-2" /> Save Photo
                </Button>
            </div>
        </div>
    ) : (
        <div className="flex-1 relative">
            <FaceMeshOverlay
                ref={overlayRef}
                selectedFrame={selectedFrame}
            />

            {/* Floating Capture Button */}
            <div className="absolute bottom-40 left-0 right-0 flex justify-center z-20 pb-4 pointer-events-none">
                <button
                    className="pointer-events-auto w-16 h-16 rounded-full border-4 border-white bg-transparent flex items-center justify-center hover:bg-white/20 transition-all active:scale-95 duration-200"
                    onClick={handleCapture}
                    aria-label="Take Photo"
                >
                    <div className="w-12 h-12 bg-white rounded-full" />
                </button>
            </div>
        </div>
    )

    return (
        <div className="fixed inset-0 bg-gray-900 flex flex-col text-white">
            {/* Header */}
            <header className="absolute top-0 left-0 right-0 z-20 p-4 flex justify-between items-center bg-gradient-to-b from-black/60 to-transparent">
                <Link href="/products" className="p-2 bg-black/20 backdrop-blur-md rounded-full hover:bg-black/40 transition text-white">
                    <ArrowLeft className="w-6 h-6" />
                </Link>
                <div className="text-sm font-medium tracking-wide opacity-90 shadow-sm">VIRTUAL TRY-ON</div>
                <div className="w-10" />
            </header>

            {/* Main Content */}
            <main className="flex-1 relative flex flex-col overflow-hidden">
                {activeContent}

                {/* Frame Selector Bottom Sheet - Only visible when not captured */}
                {!capturedImage && (
                    <div className="absolute bottom-0 left-0 right-0 z-30 transition-transform duration-300">
                        <FrameSelector
                            frames={FRAMES}
                            selectedFrameId={selectedFrame.id}
                            onSelect={setSelectedFrame}
                        />
                    </div>
                )}
            </main>
        </div>
    )
}
