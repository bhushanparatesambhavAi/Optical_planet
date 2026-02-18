"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const AccordionContext = React.createContext<{
    expanded: string[]
    toggle: (value: string) => void
}>({ expanded: [], toggle: () => { } })

export function Accordion({
    children,
    type = "single",
    defaultValue = [],
    className,
}: {
    children: React.ReactNode
    type?: "single" | "multiple"
    defaultValue?: string | string[]
    className?: string
}) {
    const [expanded, setExpanded] = React.useState<string[]>(
        Array.isArray(defaultValue) ? defaultValue : [defaultValue]
    )

    const toggle = (value: string) => {
        if (type === "single") {
            setExpanded(expanded.includes(value) ? [] : [value])
        } else {
            setExpanded(
                expanded.includes(value)
                    ? expanded.filter((v) => v !== value)
                    : [...expanded, value]
            )
        }
    }

    return (
        <AccordionContext.Provider value={{ expanded, toggle }}>
            <div className={cn("space-y-1", className)}>{children}</div>
        </AccordionContext.Provider>
    )
}

export function AccordionItem({
    children,
    value,
    className,
}: {
    children: React.ReactNode
    value: string
    className?: string
}) {
    return (
        <div className={cn("border-b border-gray-100 last:border-0", className)}>
            {React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                    return React.cloneElement(child as React.ReactElement<any>, { value })
                }
                return child
            })}
        </div>
    )
}

export function AccordionTrigger({
    children,
    value,
    className,
}: {
    children: React.ReactNode
    value?: string
    className?: string
}) {
    const { expanded, toggle } = React.useContext(AccordionContext)
    const isOpen = value ? expanded.includes(value) : false

    return (
        <button
            onClick={() => value && toggle(value)}
            className={cn(
                "flex w-full items-center justify-between py-4 font-medium transition-all hover:text-primary-600 [&[data-state=open]>svg]:rotate-180",
                className
            )}
            data-state={isOpen ? "open" : "closed"}
        >
            {children}
            <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
        </button>
    )
}

export function AccordionContent({
    children,
    value,
    className,
}: {
    children: React.ReactNode
    value?: string
    className?: string
}) {
    const { expanded } = React.useContext(AccordionContext)
    const isOpen = value ? expanded.includes(value) : false

    return (
        <AnimatePresence initial={false}>
            {isOpen && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                >
                    <div className={cn("pb-4 pt-0", className)}>{children}</div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
