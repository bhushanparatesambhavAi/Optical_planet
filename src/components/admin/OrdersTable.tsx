import { Badge } from "@/components/ui/Badge"
import { formatPrice } from "@/lib/utils"

interface Order {
    id: string
    customer: string
    email: string
    total: number
    status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled"
    date: string
}

interface OrdersTableProps {
    orders: Order[]
}

export function OrdersTable({ orders }: OrdersTableProps) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-500 uppercase bg-gray-50/50">
                    <tr>
                        <th className="px-4 py-3 font-medium">Order ID</th>
                        <th className="px-4 py-3 font-medium">Customer</th>
                        <th className="px-4 py-3 font-medium">Date</th>
                        <th className="px-4 py-3 font-medium">Status</th>
                        <th className="px-4 py-3 font-medium text-right">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors">
                            <td className="px-4 py-3 font-medium text-gray-900">{order.id}</td>
                            <td className="px-4 py-3">
                                <div className="font-medium text-gray-900">{order.customer}</div>
                                <div className="text-xs text-gray-500">{order.email}</div>
                            </td>
                            <td className="px-4 py-3 text-gray-500">{order.date}</td>
                            <td className="px-4 py-3">
                                <Badge variant={
                                    order.status === "Delivered" ? "default" : // using default (primary) for delivered for now, need success variant
                                        order.status === "Processing" ? "secondary" :
                                            order.status === "Cancelled" ? "outline" : // destructive not avail in my badgess? I'll check. Using outline for now.
                                                "outline"
                                }
                                    className={
                                        order.status === "Delivered" ? "bg-green-100 text-green-700 hover:bg-green-100 border-green-200 shadow-none" :
                                            order.status === "Processing" ? "bg-blue-100 text-blue-700 hover:bg-blue-100 border-blue-200 shadow-none" :
                                                "bg-gray-100 text-gray-700 hover:bg-gray-100 border-gray-200 shadow-none"
                                    }
                                >
                                    {order.status}
                                </Badge>
                            </td>
                            <td className="px-4 py-3 text-right font-medium text-gray-900">
                                {formatPrice(order.total)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
