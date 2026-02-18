"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ShoppingBag, Search, User, Menu, X, Glasses, Sun } from "lucide-react"
import { useCartStore } from "@/store/cartStore"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { cn } from "@/lib/utils"

export function Header() {
    const [isScrolled, setIsScrolled] = React.useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
    const pathname = usePathname()
    const totalItems = useCartStore((state) => state.totalItems())

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const navLinks = [
        { href: "/products?category=eyeglasses", label: "Eyeglasses" },
        { href: "/products?category=sunglasses", label: "Sunglasses" },
        { href: "/products?category=computer-glasses", label: "Computer Glasses" },
        { href: "/virtual-try-on", label: "Virtual Try-On", isNew: true },
        { href: "/find-your-frame", label: "Find Your Frame", isAi: true },
    ]

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
                isScrolled
                    ? "bg-white/90 backdrop-blur-md border-gray-200 shadow-sm py-2"
                    : "bg-white border-transparent py-4"
            )}
        >
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="relative h-8 w-8 bg-primary-600 rounded-lg flex items-center justify-center">
                            <Glasses className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-indigo-600">
                            Optical Planet
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "text-sm font-medium transition-colors hover:text-primary-600 relative group",
                                    pathname === link.href ? "text-primary-600" : "text-gray-600"
                                )}
                            >
                                {link.label}
                                {link.isNew && (
                                    <span className="absolute -top-3 -right-6 text-[10px] font-bold text-white bg-green-500 px-1.5 py-0.5 rounded-full">
                                        NEW
                                    </span>
                                )}
                                {link.isAi && (
                                    <span className="absolute -top-3 -right-3 text-[10px] font-bold text-white bg-purple-500 px-1.5 py-0.5 rounded-full animate-pulse">
                                        AI
                                    </span>
                                )}
                                <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-primary-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                            </Link>
                        ))}
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center space-x-4">
                        <div className="hidden md:flex relative w-64">
                            <Input
                                placeholder="Search frames..."
                                className="pr-10 h-9 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                            />
                            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        </div>

                        <Button variant="ghost" size="icon" className="relative">
                            <Link href="/cart">
                                <ShoppingBag className="h-5 w-5 text-gray-700" />
                                {totalItems > 0 && (
                                    <span className="absolute -top-1 -right-1 h-4 w-4 bg-primary-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                                        {totalItems}
                                    </span>
                                )}
                            </Link>
                        </Button>

                        <Button variant="ghost" size="icon">
                            <Link href="/login">
                                <User className="h-5 w-5 text-gray-700" />
                            </Link>
                        </Button>

                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? (
                                <X className="h-5 w-5" />
                            ) : (
                                <Menu className="h-5 w-5" />
                            )}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden border-t border-gray-100 bg-white"
                    >
                        <div className="container mx-auto px-4 py-4 space-y-4">
                            <div className="relative">
                                <Input placeholder="Search frames..." className="pr-10" />
                                <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            </div>
                            <nav className="flex flex-col space-y-2">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50 text-gray-700 font-medium"
                                    >
                                        <span>{link.label}</span>
                                        {link.isNew && (
                                            <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                                                NEW
                                            </span>
                                        )}
                                        {link.isAi && (
                                            <span className="text-[10px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">
                                                AI
                                            </span>
                                        )}
                                    </Link>
                                ))}
                            </nav>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}
