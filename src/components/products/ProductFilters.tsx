"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Slider } from "@/components/ui/Slider"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/Accordion"
import { Checkbox } from "@/components/ui/Checkbox"
import { Button } from "@/components/ui/Button"
import { X } from "lucide-react"
import { formatPrice } from "@/lib/utils"
import { useState, useEffect } from "react"

// Mock Filter Data
const CATEGORIES = ["Eyeglasses", "Sunglasses", "Computer Glasses", "Reading Glasses", "Contact Lenses"]
const GENDERS = ["Men", "Women", "Unisex", "Kids"]
const SHAPES = ["Rectangle", "Round", "Aviator", "Square", "Cat Eye", "Wayfarer"]
const BRANDS = ["Ray-Ban", "Oakley", "Gucci", "Tom Ford", "Carrera", "Persol"]

export function ProductFilters() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [priceRange, setPriceRange] = useState([0, 1000])

    useEffect(() => {
        const min = Number(searchParams.get("minPrice")) || 0
        const max = Number(searchParams.get("maxPrice")) || 1000
        setPriceRange([min, max])
    }, [searchParams])

    // Helper to update query params
    const updateFilter = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString())

        // Toggle logic for multiple values
        const current = params.getAll(key)
        if (current.includes(value)) {
            params.delete(key, value) // Remove specific value? No, URLSearchParams delete removes all if 2nd arg not supported in all envs, but standard supports it. 
            // Actually standard delete(name, value) exists in modern browsers but maybe not strictly everywhere. 
            // Safe way: get all, filter, delete all, append remaining.
            const newValues = current.filter(v => v !== value)
            params.delete(key)
            newValues.forEach(v => params.append(key, v))
        } else {
            params.append(key, value) // Add
        }

        router.push(`/products?${params.toString()}`, { scroll: false })
    }

    const updatePrice = (value: number[]) => {
        setPriceRange(value)
    }

    const applyPriceFilter = () => {
        const params = new URLSearchParams(searchParams.toString())
        params.set("minPrice", priceRange[0].toString())
        params.set("maxPrice", priceRange[1].toString())
        router.push(`/products?${params.toString()}`, { scroll: false })
    }

    const clearFilters = () => {
        router.push("/products", { scroll: false })
    }

    const hasFilters = searchParams.toString().length > 0

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Filters</h3>
                {hasFilters && (
                    <Button variant="ghost" size="sm" onClick={clearFilters} className="text-red-500 h-8 px-2 hover:bg-red-50">
                        Clear <X className="ml-1 w-3 h-3" />
                    </Button>
                )}
            </div>

            <Accordion type="multiple" defaultValue={["category", "price", "gender", "shape"]} className="w-full">

                {/* Category */}
                <AccordionItem value="category">
                    <AccordionTrigger>Category</AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-3 pt-1">
                            {CATEGORIES.map((cat) => (
                                <div key={cat} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`cat-${cat}`}
                                        checked={searchParams.getAll("category").includes(cat)}
                                        onCheckedChange={() => updateFilter("category", cat)}
                                    />
                                    <label htmlFor={`cat-${cat}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">
                                        {cat}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>

                {/* Price Range */}
                <AccordionItem value="price">
                    <AccordionTrigger>Price Range</AccordionTrigger>
                    <AccordionContent>
                        <div className="pt-4 px-2 pb-2 space-y-4">
                            <Slider
                                defaultValue={[0, 1000]}
                                max={1000}
                                step={10}
                                value={priceRange}
                                onValueChange={updatePrice}
                                onValueCommit={applyPriceFilter}
                            />
                            <div className="flex items-center justify-between text-sm font-medium text-gray-700">
                                <span>{formatPrice(priceRange[0])}</span>
                                <span>{formatPrice(priceRange[1])}</span>
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>

                {/* Gender */}
                <AccordionItem value="gender">
                    <AccordionTrigger>Gender</AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-3 pt-1">
                            {GENDERS.map((gender) => (
                                <div key={gender} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`gen-${gender}`}
                                        checked={searchParams.getAll("gender").includes(gender)}
                                        onCheckedChange={() => updateFilter("gender", gender)}
                                    />
                                    <label htmlFor={`gen-${gender}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">
                                        {gender}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>

                {/* Shape */}
                <AccordionItem value="shape">
                    <AccordionTrigger>Frame Shape</AccordionTrigger>
                    <AccordionContent>
                        <div className="grid grid-cols-2 gap-2 pt-1">
                            {SHAPES.map((shape) => (
                                <div key={shape} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`shape-${shape}`}
                                        checked={searchParams.getAll("shape").includes(shape)}
                                        onCheckedChange={() => updateFilter("shape", shape)}
                                    />
                                    <label htmlFor={`shape-${shape}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">
                                        {shape}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>

                {/* Brands */}
                <AccordionItem value="brand">
                    <AccordionTrigger>Brands</AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-3 pt-1">
                            {BRANDS.map((brand) => (
                                <div key={brand} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`brand-${brand}`}
                                        checked={searchParams.getAll("brand").includes(brand)}
                                        onCheckedChange={() => updateFilter("brand", brand)}
                                    />
                                    <label htmlFor={`brand-${brand}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">
                                        {brand}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>

            </Accordion>
        </div>
    )
}
