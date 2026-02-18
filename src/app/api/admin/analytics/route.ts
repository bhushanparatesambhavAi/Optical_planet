import { NextResponse } from "next/server"

// Mock Data
export async function GET() {
    // Simulate DB Delay
    await new Promise(resolve => setTimeout(resolve, 800))

    const analyticsData = {
        totalRevenue: 45231.89,
        activeSubscriptions: 2350, // Or Total Orders
        salesCount: 12234,
        activeNow: 573,
        recentOrders: [
            {
                id: "ORD-001",
                customer: "Olivia Martin",
                email: "olivia.martin@email.com",
                total: 199.00,
                status: "Processing",
                date: "Today, 2:34 PM"
            },
            {
                id: "ORD-002",
                customer: "Jackson Lee",
                email: "jackson.lee@email.com",
                total: 39.00,
                status: "Delivered",
                date: "Yesterday, 10:15 AM"
            },
            {
                id: "ORD-003",
                customer: "Isabella Nguyen",
                email: "isabella.nguyen@email.com",
                total: 299.00,
                status: "Processing",
                date: "Yesterday, 8:45 AM"
            },
            {
                id: "ORD-004",
                customer: "William Kim",
                email: "will@email.com",
                total: 99.00,
                status: "Delivered",
                date: "Mon, 4:00 PM"
            },
            {
                id: "ORD-005",
                customer: "Sofia Davis",
                email: "sofia.davis@email.com",
                total: 39.00,
                status: "Cancelled",
                date: "Mon, 2:12 PM"
            }
        ],
        graphData: [
            { name: "Jan", total: 1500 },
            { name: "Feb", total: 2300 },
            { name: "Mar", total: 3400 },
            { name: "Apr", total: 2900 },
            { name: "May", total: 4500 },
            { name: "Jun", total: 3800 },
            { name: "Jul", total: 4200 },
            { name: "Aug", total: 5100 },
            { name: "Sep", total: 4800 },
            { name: "Oct", total: 5600 },
            { name: "Nov", total: 6200 },
            { name: "Dec", total: 7800 },
        ]
    }

    return NextResponse.json(analyticsData)
}
