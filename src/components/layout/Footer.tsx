"use client"

import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube, Mail, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"

export function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand Info */}
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-6">Optical Planet</h3>
                        <p className="text-gray-400 mb-6 leading-relaxed">
                            Your premium destination for eyewear. Integrating advanced technology
                            with timeless style to provide the perfect vision experience.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="hover:text-primary-500 transition-colors">
                                <Instagram className="h-5 w-5" />
                            </a>
                            <a href="#" className="hover:text-primary-500 transition-colors">
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a href="#" className="hover:text-primary-500 transition-colors">
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a href="#" className="hover:text-primary-500 transition-colors">
                                <Youtube className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-6">Quick Links</h4>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/products" className="hover:text-primary-500 transition-colors">
                                    All Products
                                </Link>
                            </li>
                            <li>
                                <Link href="/find-your-frame" className="hover:text-primary-500 transition-colors">
                                    Find Your Frame (AI)
                                </Link>
                            </li>
                            <li>
                                <Link href="/virtual-try-on" className="hover:text-primary-500 transition-colors">
                                    Virtual Try-On
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="hover:text-primary-500 transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-primary-500 transition-colors">
                                    Contact Support
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-6">Support</h4>
                        <ul className="space-y-3">
                            <li className="flex items-start space-x-3">
                                <MapPin className="h-5 w-5 mt-0.5 text-primary-500" />
                                <span>123 Vision Street, Eye City, OC 12345</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Phone className="h-5 w-5 text-primary-500" />
                                <span>+1 (800) 123-4567</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Mail className="h-5 w-5 text-primary-500" />
                                <span>support@opticalplanet.com</span>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-6">Newsletter</h4>
                        <p className="text-gray-400 mb-4">
                            Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
                        </p>
                        <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                            <Input
                                placeholder="Enter your email"
                                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-primary-500"
                            />
                            <Button className="w-full bg-primary-600 hover:bg-primary-700 text-white border-none">
                                Subscribe
                            </Button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                    <p>© 2024 Optical Planet. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <Link href="/privacy" className="hover:text-white transition-colors">
                            Privacy Policy
                        </Link>
                        <Link href="/terms" className="hover:text-white transition-colors">
                            Terms of Service
                        </Link>
                        <Link href="/sitemap" className="hover:text-white transition-colors">
                            Sitemap
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
