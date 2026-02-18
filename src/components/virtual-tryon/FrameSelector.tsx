"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"
// import { ScrollArea, ScrollBar } from "@/components/ui/ScrollArea" // Avoid extra deps if possible
// Will use simple overflow div

interface Frame {
    id: string
    name: string
    image: string
    price: number
}

interface FrameSelectorProps {
    frames: Frame[]
    selectedFrameId: string
    onSelect: (frame: Frame) => void
}

export function FrameSelector({ frames, selectedFrameId, onSelect }: FrameSelectorProps) {
    return (
        <div className="w-full bg-white/90 backdrop-blur-md border-t border-gray-200 p-4 shadow-lg z-50">
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide snap-x">
                {frames.map((frame) => (
                    <button
                        key={frame.id}
                        onClick={() => onSelect(frame)}
                        className={cn(
                            "flex-shrink-0 w-24 flex flex-col items-center gap-2 p-2 rounded-xl transition-all snap-center",
                            selectedFrameId === frame.id
                                ? "bg-primary-50 ring-2 ring-primary-500 ring-offset-2"
                                : "hover:bg-gray-50 border border-transparent hover:border-gray-200"
                        )}
                    >
                        <div className="relative w-20 h-10">
                            {/* Placeholder image logic */}
                            <div className="w-full h-full bg-gray-200 rounded-md flex items-center justify-center text-xs text-gray-500 overflow-hidden">
                                {/* <Image src={frame.image} alt={frame.name} fill className="object-contain" /> */}
                                {frame.name}
                            </div>
                        </div>
                        <div className="text-center">
                            <p className="text-xs font-medium text-gray-900 truncate w-full max-w-[5rem]">{frame.name}</p>
                            <p className="text-[10px] text-gray-500">${frame.price}</p>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    )
}
