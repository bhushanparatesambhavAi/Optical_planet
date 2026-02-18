"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, ArrowRight, Loader2, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"
import Image from "next/image"

// Define Steps
const STEPS = [
    {
        id: "shape",
        title: "What represents your face shape best?",
        options: [
            { id: "round", label: "Round", icon: "/icons/face-round.svg" }, // Placeholders
            { id: "oval", label: "Oval", icon: "/icons/face-oval.svg" },
            { id: "square", label: "Square", icon: "/icons/face-square.svg" },
            { id: "heart", label: "Heart", icon: "/icons/face-heart.svg" },
        ]
    },
    {
        id: "style",
        title: "How would you describe your style?",
        options: [
            { id: "modern", label: "Modern & Trendy" },
            { id: "classic", label: "Classic & Timeless" },
            { id: "bold", label: "Bold & Artistic" },
            { id: "minimalist", label: "Minimalist" },
        ]
    },
    {
        id: "usage",
        title: "Where do you wear glasses most?",
        options: [
            { id: "office", label: "Office / Work" },
            { id: "casual", label: "Everyday Casual" },
            { id: "party", label: "Special Occasions" },
            { id: "outdoors", label: "Outdoors / Active" },
        ]
    }
]

export default function FindYourFramePage() {
    const [currentStep, setCurrentStep] = useState(0)
    const [selections, setSelections] = useState<Record<string, string>>({})
    const [isLoading, setIsLoading] = useState(false)
    const [showResult, setShowResult] = useState(false)
    const [result, setResult] = useState<any>(null)

    const handleSelect = (optionId: string) => {
        setSelections(prev => ({ ...prev, [STEPS[currentStep].id]: optionId }))
    }

    const handleNext = async () => {
        if (currentStep < STEPS.length - 1) {
            setCurrentStep(prev => prev + 1)
        } else {
            // Submit
            setIsLoading(true)
            try {
                const response = await fetch("/api/ai/frame", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(selections),
                })
                const data = await response.json()
                setResult(data)
                setShowResult(true)
            } catch (error) {
                console.error("Failed to get recommendations", error)
                // Fallback for demo if API fails/not implemented
                setTimeout(() => {
                    setResult({
                        recommendation: "Based on your selections, we recommend rectangular or square frames to add structure to your face features.",
                        frames: ["Rectangular", "Square"],
                        products: [] // Mock handled in component
                    })
                    setShowResult(true)
                }, 1500)
            } finally {
                setIsLoading(false)
            }
        }
    }

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1)
        }
    }

    if (showResult) {
        return (
            <div className="container mx-auto px-4 py-12 text-center max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white rounded-2xl p-8 shadow-xl border border-primary-100"
                >
                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Sparkles className="w-8 h-8 text-primary-600" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Perfect Match</h1>
                    <p className="text-xl text-gray-700 leading-relaxed mb-8">
                        {result?.recommendation}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        {/* Products placeholder */}
                        <div className="bg-gray-50 rounded-lg p-6 aspect-[4/3] flex items-center justify-center">Product 1</div>
                        <div className="bg-gray-50 rounded-lg p-6 aspect-[4/3] flex items-center justify-center">Product 2</div>
                        <div className="bg-gray-50 rounded-lg p-6 aspect-[4/3] flex items-center justify-center">Product 3</div>
                    </div>

                    <div className="flex gap-4 justify-center">
                        <Button onClick={() => window.location.reload()} variant="outline">Start Over</Button>
                        <Button onClick={() => window.location.href = '/products'}>Shop Recommendations</Button>
                    </div>
                </motion.div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="w-full max-w-2xl">
                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="flex justify-between text-sm font-medium text-gray-500 mb-2">
                        <span>Step {currentStep + 1} of {STEPS.length}</span>
                        <span>{Math.round(((currentStep + 1) / STEPS.length) * 100)}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-primary-600 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
                            transition={{ duration: 0.5 }}
                        />
                    </div>
                </div>

                <Card className="bg-white shadow-xl border-0 overflow-hidden relative min-h-[400px] flex flex-col">
                    <div className="p-8 flex-1 flex flex-col">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentStep}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="flex-1"
                            >
                                <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                                    {STEPS[currentStep].title}
                                </h2>

                                <div className="grid grid-cols-2 gap-4">
                                    {STEPS[currentStep].options.map((option) => (
                                        <button
                                            key={option.id}
                                            onClick={() => handleSelect(option.id)}
                                            className={`
                                        relative p-6 rounded-xl border-2 transition-all text-left flex flex-col items-center justify-center gap-3 aspect-[4/3]
                                        ${selections[STEPS[currentStep].id] === option.id
                                                    ? "border-primary-500 bg-primary-50 text-primary-900 ring-2 ring-primary-200 ring-offset-2"
                                                    : "border-gray-100 bg-white hover:border-gray-200 hover:bg-gray-50"
                                                }
                                    `}
                                        >
                                            {selections[STEPS[currentStep].id] === option.id && (
                                                <div className="absolute top-3 right-3 text-primary-600">
                                                    <Check className="w-5 h-5" />
                                                </div>
                                            )}
                                            {/* Icon placeholder logic */}
                                            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
                                                Icon
                                            </div>
                                            <span className="font-semibold text-lg">{option.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
                        <Button
                            variant="ghost"
                            onClick={handleBack}
                            disabled={currentStep === 0 || isLoading}
                        >
                            Back
                        </Button>
                        <Button
                            onClick={handleNext}
                            disabled={!selections[STEPS[currentStep].id] || isLoading}
                            className="pl-8 pr-6"
                        >
                            {isLoading ? (
                                <>Analyzing <Loader2 className="ml-2 w-4 h-4 animate-spin" /></>
                            ) : (
                                <>{currentStep === STEPS.length - 1 ? "See Matches" : "Next Step"} <ArrowRight className="ml-2 w-4 h-4" /></>
                            )}
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
    )
}
