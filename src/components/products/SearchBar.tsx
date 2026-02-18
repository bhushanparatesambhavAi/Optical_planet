"use client"

import * as React from "react"
import { Search, X } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/Input"
import { useDebounce } from "@/hooks/useDebounce"

export function SearchBar() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [value, setValue] = React.useState(searchParams.get("search") || "")
    const [isFocused, setIsFocused] = React.useState(false)

    // Implementation of debounced search will go here
    // For now simple immediate update on enter or button click

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        const params = new URLSearchParams(searchParams.toString())
        if (value) {
            params.set("search", value)
        } else {
            params.delete("search")
        }
        router.push(`/products?${params.toString()}`)
    }

    const clearSearch = () => {
        setValue("")
        const params = new URLSearchParams(searchParams.toString())
        params.delete("search")
        router.push(`/products?${params.toString()}`)
    }

    return (
        <form onSubmit={handleSearch} className="relative w-full max-w-sm">
            <div className="relative">
                <Input
                    placeholder="Search for frames, brands..."
                    className="pl-10 pr-10"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                {value && (
                    <button
                        type="button"
                        onClick={clearSearch}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                        <X className="h-4 w-4" />
                    </button>
                )}
            </div>

            {/* Auto-suggestions Dropdown (Mock) */}
            {isFocused && value.length > 1 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-100 rounded-md shadow-lg z-50 p-2">
                    <p className="text-xs text-gray-400 px-2 py-1">Popular Suggestions</p>
                    <div className="space-y-1">
                        <button className="w-full text-left px-2 py-1.5 text-sm hover:bg-gray-50 rounded-sm flex items-center">
                            <Search className="w-3 h-3 mr-2 text-gray-400" />
                            <span>Ray-Ban Aviator</span>
                        </button>
                        <button className="w-full text-left px-2 py-1.5 text-sm hover:bg-gray-50 rounded-sm flex items-center">
                            <Search className="w-3 h-3 mr-2 text-gray-400" />
                            <span>Computer Glasses</span>
                        </button>
                    </div>
                </div>
            )}
        </form>
    )
}
