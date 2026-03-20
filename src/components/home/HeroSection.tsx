"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { ArrowRight, ChevronLeft, ChevronRight, Calendar, PlayCircle } from "lucide-react"
import { buttonVariants } from "@/components/ui/Button"
import { cn } from "@/lib/utils"

const slides = [
    {
        id: 0,
        layout: "video-ambient",
        content: (
            <div className="relative w-full h-[100vh] overflow-hidden flex items-center justify-center bg-black">
                {/* Video Background with Poster Fallback */}
                {/* The poster is the humanized photorealistic AI shop image we just generated! */}
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover z-0 opacity-80"
                    poster="/images/optical-shop-interior.png" 
                >
                    {/* Placeholder video source - user can add their shop-video.mp4 to public/videos/ */}
                    <source src="/videos/shop-video.mp4" type="video/mp4" />
                </video>
                
                {/* Ambient Overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/60 z-10" />

                {/* Content */}
                <div className="relative z-20 text-center px-4 max-w-5xl mx-auto space-y-8 mt-12">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="flex flex-col items-center"
                    >
                        <div className="mb-6 flex items-center justify-center space-x-2 bg-black/40 backdrop-blur-md border border-white/20 px-6 py-2 rounded-full">
                            <span className="relative flex h-3 w-3">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary-500"></span>
                            </span>
                            <h2 className="text-white/90 text-xs md:text-sm font-bold tracking-[0.2em] uppercase">
                                Experience The Boutique
                            </h2>
                        </div>

                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[1.1] tracking-tighter drop-shadow-2xl">
                            DISCOVER YOUR <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-200 to-white">PERFECT STYLE</span>
                        </h1>
                        <p className="mt-8 text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed drop-shadow-md font-medium">
                            Step into luxury. Browse our exclusive designer frames and enjoy professional fitting in an immersive boutique environment.
                        </p>
                        
                        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
                            <Link href="/stores" className="w-full sm:w-auto bg-white text-black px-10 py-5 rounded-full font-black uppercase tracking-widest hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-white/20 text-sm">
                                Visit Our Boutiques
                            </Link>
                            <Link href="/virtual-try-on" className="w-full sm:w-auto bg-black/30 flex items-center justify-center backdrop-blur-md border border-white/30 text-white px-10 py-5 rounded-full font-black uppercase tracking-widest hover:bg-white/20 transition-all duration-300 text-sm">
                                <PlayCircle className="w-5 h-5 mr-2" /> Try Virtually
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        )
    },
    {
        id: 1,
        layout: "green-checkup",
        content: (
            <div className="relative min-h-[100vh] flex items-center pt-24 pb-12 overflow-hidden bg-green-50/20">
                <div className="container mx-auto px-4 md:px-6 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        <div className="lg:col-span-6 h-[500px] flex flex-col justify-center space-y-8">
                                <div className="inline-flex items-center space-x-2 bg-gray-900 text-white px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase self-start shadow-xl">
                                    <Calendar className="w-3 h-3 text-green-400" />
                                    <span>Your Eyes Matter</span>
                                </div>

                                <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-gray-900 leading-[0.9] uppercase drop-shadow-sm">
                                    Free Eye <br />
                                    <span className="text-green-600">Check-up</span>
                                </h1>

                                <p className="text-xl text-gray-600 max-w-xl font-medium leading-relaxed">
                                    Professional eye exams by certified specialists. Visit our luxury stores or request a home visit today.
                                </p>

                                <div className="flex flex-wrap gap-4 pt-4">
                                    <Link href="/book-checkup" className={buttonVariants("default", "lg", "h-16 px-10 rounded-2xl text-lg font-black uppercase tracking-wider shadow-2xl shadow-green-900/20 hover:scale-105 active:scale-95 transition-all")}>
                                        Book Now <ArrowRight className="ml-2 w-5 h-5" />
                                    </Link>
                                    <Link href="/stores" className={cn(buttonVariants("outline", "lg"), "h-16 px-10 rounded-2xl text-lg font-black uppercase tracking-wider border-2 bg-white/50 hover:bg-white hover:scale-105 active:scale-95 transition-all")}>
                                        Our Locations
                                    </Link>
                                </div>
                        </div>

                        <div className="lg:col-span-6 relative hidden lg:block">
                            <div className="relative aspect-square w-full max-w-[600px] ml-auto rounded-[4rem] overflow-hidden shadow-2xl bg-green-100 group">
                                <img 
                                    src="/images/customer-trying-glasses.png" 
                                    alt="Customer trying glasses" 
                                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-1000 origin-bottom" 
                                    onError={(e) => { e.currentTarget.style.display = 'none'; }} 
                                />
                                
                                <div className="absolute inset-0 bg-gradient-to-t from-green-900/40 via-transparent to-transparent" />
                                
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center p-8 bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border border-white z-10 w-3/4 max-w-[280px] text-center transition-transform duration-500 hover:shadow-green-900/20 group-hover:-translate-y-[60%]">
                                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center shadow-inner mb-4">
                                        <Calendar className="w-8 h-8 text-green-600" />
                                    </div>
                                    <h4 className="text-2xl font-black text-gray-900 leading-tight">Professional<br/>Exams</h4>
                                    <p className="text-xs text-green-600 mt-3 font-bold uppercase tracking-widest">Certified Specialists</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
]

export function HeroSection() {
    const [currentSlide, setCurrentSlide] = React.useState(0)

    React.useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length)
        }, 8000)
        return () => clearInterval(timer)
    }, [])

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length)
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)

    return (
        <section className="relative min-h-[100vh] w-full overflow-hidden bg-white">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentSlide % slides.length}
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "backOut" }}
                    className="absolute inset-0"
                >
                    {slides[currentSlide % slides.length]?.content}
                </motion.div>
            </AnimatePresence>

            {/* Global Slideshow Controls */}
            <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 z-50 flex space-x-3 mix-blend-difference text-white">
                <button 
                    onClick={prevSlide} 
                    className="w-14 h-14 bg-transparent backdrop-blur-none border-2 border-white/30 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all shadow-xl active:scale-90"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <button 
                    onClick={nextSlide} 
                    className="w-14 h-14 bg-transparent backdrop-blur-none border-2 border-white/30 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all shadow-xl active:scale-90"
                >
                    <ChevronRight className="w-6 h-6" />
                </button>
            </div>
        </section>
    )
}
