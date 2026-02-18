"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"
import { buttonVariants } from "@/components/ui/Button"

export function HeroSection() {
    const { scrollY } = useScroll()
    const y = useTransform(scrollY, [0, 500], [0, 200])
    const opacity = useTransform(scrollY, [0, 300], [1, 0])

    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20">
            {/* Background Decor */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-64 h-64 bg-primary-200/20 rounded-full blur-3xl animate-pulse-slow" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl animate-pulse-slow delay-1000" />
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-6"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-100 shadow-sm"
                        >
                            <Sparkles className="w-4 h-4 text-primary-600" />
                            <span className="text-sm font-medium text-gray-800">
                                AI-Powered Frame Recommendation
                            </span>
                        </motion.div>

                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 leading-tight text-balance">
                            Find Your Perfect <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-600">
                                Vision & Style
                            </span>
                        </h1>

                        <p className="text-xl text-gray-600 max-w-lg leading-relaxed text-balance">
                            Experience the future of eyewear shopping. Use our AI to find frames that match your face shape instantly, or try them on virtually from home.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Link
                                href="/find-your-frame"
                                className={buttonVariants("default", "lg", "rounded-full h-14 px-8 text-lg shadow-lg hover:shadow-xl transition-all")}
                            >
                                Find My Frames <ArrowRight className="ml-2 w-5 h-5" />
                            </Link>
                            <Link
                                href="/virtual-try-on"
                                className={buttonVariants("outline", "lg", "rounded-full h-14 px-8 text-lg border-2 bg-white/50 backdrop-blur-sm")}
                            >
                                Virtual Try-On
                            </Link>
                        </div>
                    </motion.div>

                    {/* Hero Image / Animation */}
                    <motion.div
                        style={{ y, opacity }}
                        className="relative lg:h-[600px] flex items-center justify-center"
                    >
                        {/* Main Floating Glasses */}
                        <motion.div
                            animate={{
                                y: [0, -20, 0],
                                rotate: [0, 2, -2, 0]
                            }}
                            transition={{
                                duration: 6,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="relative z-20 w-full max-w-lg"
                        >
                            <div className="relative aspect-[16/9] w-full bg-gradient-to-r from-gray-200 to-gray-100 rounded-2xl shadow-2xl overflow-hidden border border-white/50 backdrop-blur-md flex items-center justify-center group">
                                <div className="text-center p-8">
                                    <div className="w-full h-32 bg-gray-200 rounded-lg mb-4 animate-pulse group-hover:scale-105 transition-transform" />
                                    <p className="text-gray-500 font-medium">Premium Eyewear Collection</p>
                                </div>

                                {/* Floating Card inside */}
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 1 }}
                                    className="absolute -right-4 top-1/4 bg-white p-3 rounded-xl shadow-xl border border-gray-100 z-30"
                                >
                                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-1">
                                        <span className="text-green-600 font-bold text-xs">98%</span>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* Background Circle */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-blue-100 to-purple-100 rounded-full opacity-50 blur-3xl -z-10" />
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
