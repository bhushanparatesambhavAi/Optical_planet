"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ShoppingBag, Search, User, Menu, X, Glasses, MapPin, Home as HomeIcon, ChevronDown, Sparkles } from "lucide-react"
import { useCartStore } from "@/store/cartStore"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { cn } from "@/lib/utils"

interface MegaMenuProps {
    isOpen: boolean
    items: {
        title: string
        links: { label: string; href: string }[]
    }[]
    featured?: {
        image: string
        title: string
        description: string
        href: string
    }
}

function MegaMenu({ isOpen, items, featured }: MegaMenuProps) {
    if (!isOpen) return null

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full left-0 w-screen bg-white shadow-2xl border-t border-gray-100 z-50 overflow-hidden"
            style={{ left: '50%', transform: 'translateX(-50%)' }}
        >
            <div className="container mx-auto px-6 py-10">
                <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8">
                    {items.map((section, idx) => (
                        <div key={idx} className="space-y-4">
                            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest border-b border-gray-100 pb-2">
                                {section.title}
                            </h3>
                            <ul className="space-y-2">
                                {section.links.map((link, lIdx) => (
                                    <li key={lIdx}>
                                        <Link
                                            href={link.href}
                                            className="text-gray-600 hover:text-primary-600 transition-colors text-sm py-1 block"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                    {featured && (
                        <div className="md:col-span-2 lg:col-span-2 bg-gray-50 rounded-2xl p-6 flex items-center justify-between group">
                            <div className="space-y-2">
                                <span className="text-[10px] font-bold text-primary-600 uppercase tracking-tighter bg-primary-50 px-2 py-1 rounded-full">
                                    Flash Sale
                                </span>
                                <h4 className="text-xl font-bold text-gray-900">{featured.title}</h4>
                                <p className="text-sm text-gray-500 max-w-[200px]">{featured.description}</p>
                                <Link
                                    href={featured.href}
                                    className="inline-flex items-center text-sm font-bold text-primary-600 hover:underline pt-2"
                                >
                                    Shop Now
                                </Link>
                            </div>
                            <div className="w-40 h-40 bg-white rounded-xl shadow-lg flex items-center justify-center p-4 group-hover:scale-105 transition-transform duration-500">
                                <Glasses className="w-24 h-24 text-gray-300 -rotate-12" />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    )
}

export function Header() {
    const [isScrolled, setIsScrolled] = React.useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
    const [activeMenu, setActiveMenu] = React.useState<string | null>(null)
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
        {
            href: "/products?category=eyeglasses",
            label: "EYEGLASSES",
            menu: [
                {
                    title: "For Men",
                    links: [
                        { label: "Classic Rectangular", href: "/products?cat=men&style=rectangular" },
                        { label: "Round Frames", href: "/products?cat=men&style=round" },
                        { label: "Aviators", href: "/products?cat=men&style=aviator" },
                        { label: "Rimless", href: "/products?cat=men&style=rimless" },
                    ]
                },
                {
                    title: "For Women",
                    links: [
                        { label: "Cat Eye Frames", href: "/products?cat=women&style=cat-eye" },
                        { label: "Oversized", href: "/products?cat=women&style=oversized" },
                        { label: "Floral Patterns", href: "/products?cat=women&style=floral" },
                        { label: "Geometric", href: "/products?cat=women&style=geometric" },
                    ]
                },
                {
                    title: "Premium Collections",
                    links: [
                        { label: "Titanium Pure", href: "/products?collection=titanium" },
                        { label: "Gold plated Lux", href: "/products?collection=gold" },
                        { label: "Limited Edition", href: "/products?collection=limited" },
                    ]
                }
            ],
            featured: {
                title: "Best Sellers 2024",
                description: "Upgrade your style with our most-loved frames of the season.",
                image: "eyeglasses-featured",
                href: "/products?featured=true"
            }
        },
        {
            href: "/products?category=sunglasses",
            label: "SUNGLASSES",
            menu: [
                {
                    title: "UV Protection",
                    links: [
                        { label: "Polarized Lenses", href: "/products?cat=sun&tech=polarized" },
                        { label: "Photochromic", href: "/products?cat=sun&tech=photochromic" },
                        { label: "Mirror Finish", href: "/products?cat=sun&tech=mirror" },
                    ]
                },
                {
                    title: "Sport & Active",
                    links: [
                        { label: "Cycling Glasses", href: "/products?cat=sun&style=cycling" },
                        { label: "Golf Sunglasses", href: "/products?cat=sun&style=golf" },
                        { label: "Running Gear", href: "/products?cat=sun&style=running" },
                    ]
                }
            ]
        },
        { href: "/products?category=contacts", label: "CONTACTS" },
        { href: "/special-power", label: "SPECIAL POWER" },
        { href: "/stores", label: "STORES", icon: <MapPin className="w-4 h-4 mr-1" /> },
        { href: "/try-at-home", label: "TRY @ HOME", icon: <HomeIcon className="w-4 h-4 mr-1" /> },
    ]

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
                isScrolled || activeMenu
                    ? "bg-white border-gray-100 shadow-lg py-2"
                    : "bg-white/80 backdrop-blur-md border-transparent py-4 text-gray-900"
            )}
            onMouseLeave={() => setActiveMenu(null)}
        >
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="relative h-10 w-10 bg-gray-900 rounded-xl flex items-center justify-center transform rotate-3 hover:rotate-0 transition-transform">
                            <Glasses className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-xl font-black uppercase tracking-tighter text-gray-900">
                            Optical<span className="text-primary-600">Planet</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center space-x-2 h-full">
                        {navLinks.map((link) => (
                            <div
                                key={link.label}
                                className="relative h-full flex items-center px-4"
                                onMouseEnter={() => setActiveMenu(link.menu ? link.label : null)}
                            >
                                <Link
                                    href={link.href}
                                    className={cn(
                                        "text-[12px] font-bold tracking-widest uppercase flex items-center transition-all py-3 border-b-2",
                                        pathname === link.href || activeMenu === link.label
                                            ? "text-primary-600 border-primary-600"
                                            : "text-gray-700 border-transparent hover:text-gray-900"
                                    )}
                                >
                                    {link.icon}
                                    {link.label}
                                    {link.menu && <ChevronDown className={cn("ml-1 w-3 h-3 transition-transform", activeMenu === link.label && "rotate-180")} />}
                                </Link>

                                {link.menu && (
                                    <AnimatePresence>
                                        <MegaMenu
                                            isOpen={activeMenu === link.label}
                                            items={link.menu}
                                            featured={link.featured}
                                        />
                                    </AnimatePresence>
                                )}
                            </div>
                        ))}
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center space-x-2">
                        <div className="hidden md:flex relative group">
                            <Input
                                placeholder="Looking for specific frame?"
                                className="w-56 pr-10 h-10 bg-gray-50 border-gray-100 text-[12px] focus:w-80 transition-all duration-300 rounded-full"
                            />
                            <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-hover:text-primary-600 transition-colors" />
                        </div>

                        <div className="flex items-center ml-4">
                            <Button variant="ghost" size="icon" className="relative hover:bg-gray-50 rounded-full h-10 w-10">
                                <Link href="/cart">
                                    <ShoppingBag className="h-5 w-5 text-gray-900" />
                                    {totalItems > 0 && (
                                        <motion.span
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="absolute -top-1 -right-1 h-5 w-5 bg-primary-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white"
                                        >
                                            {totalItems}
                                        </motion.span>
                                    )}
                                </Link>
                            </Button>

                            <Button variant="ghost" size="icon" className="hover:bg-gray-50 rounded-full h-10 w-10">
                                <Link href="/login">
                                    <User className="h-5 w-5 text-gray-900" />
                                </Link>
                            </Button>

                            <Link href="/try-ai" className="hidden xl:flex ml-4">
                                <Button className="bg-gray-900 text-white hover:bg-primary-600 rounded-full px-6 font-bold text-xs h-10 shadow-lg hover:shadow-primary-200 transition-all">
                                    <Sparkles className="w-3 h-3 mr-2 text-primary-400" /> Try AI Recommendation
                                </Button>
                            </Link>

                            <Button
                                variant="ghost"
                                size="icon"
                                className="lg:hidden ml-2"
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            >
                                {isMobileMenuOpen ? (
                                    <X className="h-6 w-6 text-gray-900" />
                                ) : (
                                    <Menu className="h-6 w-6 text-gray-900" />
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-0 top-[60px] bg-white z-40 lg:hidden overflow-y-auto"
                    >
                        <div className="p-6 space-y-8">
                            <div className="space-y-4">
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Navigation</h3>
                                <nav className="grid gap-4">
                                    {navLinks.map((link) => (
                                        <Link
                                            key={link.label}
                                            href={link.href}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="text-2xl font-black text-gray-900 flex items-center hover:text-primary-600 transition-colors"
                                        >
                                            {link.label}
                                            {link.menu && <ChevronDown className="ml-2 w-4 h-4" />}
                                        </Link>
                                    ))}
                                </nav>
                            </div>

                            <div className="bg-gray-50 rounded-3xl p-6 space-y-4">
                                <h4 className="font-bold text-gray-900">Need help choosing?</h4>
                                <p className="text-sm text-gray-600 leading-relaxed">Book a virtual appointment with our specialists today.</p>
                                <Button className="w-full bg-gray-900 text-white rounded-xl py-6 font-bold shadow-xl">
                                    Contact Support
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}
