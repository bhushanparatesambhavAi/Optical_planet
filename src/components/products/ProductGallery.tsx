"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface ProductGalleryProps {
    images: string[]
}

export function ProductGallery({ images }: ProductGalleryProps) {
    const [selectedImage, setSelectedImage] = useState(images[0])

    return (
        <div className="flex flex-col gap-4">
            <div className="aspect-square relative overflow-hidden rounded-lg border bg-gray-50 flex items-center justify-center">
                {/* Placeholder logic for now, using text if no real image */}
                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-lg font-medium">
                    {selectedImage ? (
                        <span className="sr-only">Image: {selectedImage}</span>
                    ) : "No Image"}
                    Product Image Main
                </div>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2">
                {images.map((image, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedImage(image)}
                        className={cn(
                            "relative aspect-square w-20 flex-shrink-0 overflow-hidden rounded-md border bg-gray-50 hover:bg-gray-100",
                            selectedImage === image && "ring-2 ring-primary-500 ring-offset-2"
                        )}
                    >
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-xs text-gray-400">
                            Thumb {index + 1}
                        </div>
                    </button>
                ))}
            </div>
        </div>
    )
}
