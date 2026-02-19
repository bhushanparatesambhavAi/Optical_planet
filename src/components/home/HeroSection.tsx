"use client"

import * as React from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Sparkles, Gift, Calendar, ShieldCheck, Star, Glasses, ChevronLeft, ChevronRight } from "lucide-react"
import { buttonVariants } from "@/components/ui/Button"
import { cn } from "@/lib/utils"

const slides = [
    {
        id: 1,
        badge: "AI-Powered Vision Experience",
        badgeIcon: <Sparkles className="w-3 h-3 text-primary-400" />,
        title: "The Future of",
        titleAccent: "Pure Vision",
        description: "Discover eyewear that defines you. Precision-crafted, AI-recommended, and delivered with a premium touch.",
        primaryCTA: { label: "Shop Collection", href: "/products" },
        secondaryCTA: { label: "Try AI Recommend", href: "/try-ai" },
        bgColor: "bg-white",
        accentColor: "text-primary-600",
        imageContent: (
            <div className="relative aspect-[4/5] w-full rounded-[4rem] overflow-hidden shadow-2xl bg-gray-100 group">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center p-12">
                    <Glasses className="w-64 h-64 text-gray-200 -rotate-12 group-hover:rotate-0 transition-transform duration-700" />
                </div>
                <div className="absolute bottom-12 left-12 right-12 bg-white/90 backdrop-blur-md p-6 rounded-[2rem] shadow-xl border border-white/50">
                    <div className="flex items-center justify-between">
                        <div className="flex -space-x-3">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden" />
                            ))}
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="flex text-yellow-400">
                                <Star className="w-4 h-4 fill-current" />
                                <Star className="w-4 h-4 fill-current" />
                                <Star className="w-4 h-4 fill-current" />
                            </div>
                            <span className="text-sm font-black text-gray-900">4.9/5</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    },
    {
        id: 2,
        badge: "Exclusive Promo",
        badgeIcon: <Gift className="w-3 h-3 text-red-400" />,
        title: "Buy 1 Get 1",
        titleAccent: "FREE",
        description: "Limited time offer on all premium frames and sunglasses. Upgrade your style without breaking the bank.",
        primaryCTA: { label: "Claim Offer", href: "/products?offer=bogo" },
        secondaryCTA: { label: "View Details", href: "/offers" },
        bgColor: "bg-blue-50/30",
        accentColor: "text-red-500",
        imageContent: (
            <div className="relative aspect-[4/5] w-full rounded-[4rem] overflow-hidden shadow-2xl bg-blue-100 flex items-center justify-center">
                <div className="relative">
                    <Glasses className="w-48 h-48 text-white absolute -top-10 -left-10 rotate-12 drop-shadow-lg" />
                    <Glasses className="w-48 h-48 text-primary-200 -bottom-10 -right-10 -rotate-12 drop-shadow-lg" />
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-500 text-white font-black text-4xl px-8 py-4 rounded-2xl shadow-2xl rotate-3">
                    BOGO
                </div>
            </div>
        )
    },
    {
        id: 3,
        badge: "Your Eyes Matter",
        badgeIcon: <Calendar className="w-3 h-3 text-green-400" />,
        title: "Free Eye",
        titleAccent: "Check-up",
        description: "Professional eye exams by certified specialists. Visit our luxury stores or request a home visit today.",
        primaryCTA: { label: "Book Now", href: "/book-checkup" },
        secondaryCTA: { label: "Our Locations", href: "/stores" },
        bgColor: "bg-green-50/20",
        accentColor: "text-green-600",
        imageContent: (
            <div className="relative aspect-[4/5] w-full rounded-[4rem] overflow-hidden shadow-2xl bg-green-50 flex flex-col items-center justify-center space-y-6">
                <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <Calendar className="w-16 h-16 text-green-500" />
                </div>
                <div className="text-center px-8">
                    <h4 className="text-2xl font-black text-gray-900">Professional Exams</h4>
                    <p className="text-sm text-gray-500 mt-2 font-bold uppercase tracking-widest">Certified Specialists Only</p>
                </div>
                <div className="absolute top-10 right-10 w-20 h-20 bg-green-200 rounded-full blur-2xl opacity-50" />
            </div>
        )
    }
]

export function HeroSection() {
    const [currentSlide, setCurrentSlide] = React.useState(0)
    const { scrollY } = useScroll()
    const y = useTransform(scrollY, [0, 500], [0, 150])
    const opacity = useTransform(scrollY, [0, 300], [1, 0])

    React.useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length)
        }, 6000)
        return () => clearInterval(timer)
    }, [])

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length)
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)

    const slide = slides[currentSlide]

    return (
        <section className={cn("relative min-h-[95vh] flex items-center pt-24 pb-12 overflow-hidden transition-colors duration-1000", slide.bgColor)}>
            {/* Background Decor */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gray-50/50 skew-x-12 transform origin-top-right -z-10" />
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    {/* Main Content */}
                    <div className="lg:col-span-7 h-[500px] flex flex-col justify-center">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentSlide}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.5 }}
                                className="space-y-8"
                            >
                                <div className="inline-flex items-center space-x-2 bg-gray-900 text-white px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase">
                                    {slide.badgeIcon}
                                    <span>{slide.badge}</span>
                                </div>

                                <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-gray-900 leading-[0.9] uppercase">
                                    {slide.title} <br />
                                    <span className={slide.accentColor}>{slide.titleAccent}</span>
                                </h1>

                                <p className="text-xl text-gray-600 max-w-xl font-medium leading-relaxed">
                                    {slide.description}
                                </p>

                                <div className="flex flex-wrap gap-4">
                                    <Link
                                        href={slide.primaryCTA.href}
                                        className={buttonVariants("default", "lg", "h-16 px-10 rounded-2xl text-lg font-black uppercase tracking-wider shadow-2xl transition-all")}
                                    >
                                        {slide.primaryCTA.label} <ArrowRight className="ml-2 w-5 h-5" />
                                    </Link>
                                    <Link
                                        href={slide.secondaryCTA.href}
                                        className={cn(buttonVariants("outline", "lg"), "h-16 px-10 rounded-2xl text-lg font-black uppercase tracking-wider border-2 bg-white/50")}
                                    >
                                        {slide.secondaryCTA.label}
                                    </Link>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Hero Assets */}
                    <div className="lg:col-span-5 relative hidden lg:block">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentSlide}
                                initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                exit={{ opacity: 0, scale: 1.1, rotate: 2 }}
                                transition={{ duration: 0.6 }}
                            >
                                <motion.div style={{ y, opacity }}>
                                    {slide.imageContent}
                                </motion.div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Floating elements (Static or Semi-static) */}
                        <motion.div
                            animate={{ y: [0, -20, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-10 -left-10 bg-white p-6 rounded-3xl shadow-2xl border border-gray-100 z-20 flex items-center space-x-4"
                        >
                            <div className="w-12 h-12 bg-primary-100 rounded-2xl flex items-center justify-center">
                                <ShieldCheck className="w-6 h-6 text-primary-600" />
                            </div>
                            <div>
                                <h4 className="font-black text-gray-900 text-sm">2 Year Warranty</h4>
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Unmatched protection</p>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Slideshow Controls */}
                <div className="mt-12 flex items-center justify-between lg:justify-start lg:space-x-8">
                    <div className="flex space-x-2">
                        {slides.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentSlide(idx)}
                                className={cn(
                                    "h-2 transition-all duration-300 rounded-full",
                                    currentSlide === idx ? "w-12 bg-gray-900" : "w-2 bg-gray-300"
                                )}
                            />
                        ))}
                    </div>

                    <div className="flex space-x-2">
                        <button
                            onClick={prevSlide}
                            className="w-12 h-12 rounded-2xl border-2 border-gray-200 flex items-center justify-center hover:bg-gray-900 hover:text-white transition-all active:scale-95"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="w-12 h-12 rounded-2xl border-2 border-gray-200 flex items-center justify-center hover:bg-gray-900 hover:text-white transition-all active:scale-95"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}
