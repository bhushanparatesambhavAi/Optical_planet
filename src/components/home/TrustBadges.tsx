import { ShieldCheck, Truck, RotateCcw, Award } from "lucide-react"

const features = [
    {
        icon: ShieldCheck,
        title: "Secure Payment",
        description: "100% secure payment with 256-bit encryption",
    },
    {
        icon: Truck,
        title: "Fast Delivery",
        description: "Free shipping on orders over $100",
    },
    {
        icon: RotateCcw,
        title: "Easy Returns",
        description: "30-day money-back guarantee policy",
    },
    {
        icon: Award,
        title: "Premium Quality",
        description: "Certified authentic products with warranty",
    },
]

export function TrustBadges() {
    return (
        <section className="py-12 bg-white border-b border-gray-100">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                            <div className="p-3 bg-primary-50 rounded-lg text-primary-600">
                                <feature.icon className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                                <p className="text-sm text-gray-500 mt-1">{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
