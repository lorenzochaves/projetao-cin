import { Home, Package, ShoppingCart, DollarSign, Settings } from 'lucide-react'
import Link from "next/link"

export function MarketerBottomNavigation() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="flex items-center justify-around py-2">
        <Link href="/Marketer" className="flex flex-col items-center p-2">
          <Home className="h-6 w-6 text-gray-600" />
        </Link>
        <Link href="/Marketer/MarketerOrders" className="flex flex-col items-center p-2">
          <Package className="h-6 w-6 text-gray-600" />
        </Link>
        <Link href="/Marketer/MarketerStall" className="flex flex-col items-center p-2">
          <ShoppingCart className="h-6 w-6 text-gray-600" />
        </Link>
        <Link href="/Marketer/Finance" className="flex flex-col items-center p-2">
          <DollarSign className="h-6 w-6 text-gray-600" />
        </Link>
        <Link href="/Marketer/Settings" className="flex flex-col items-center p-2">
          <Settings className="h-6 w-6 text-gray-600" />
        </Link>
      </div>
    </div>
  )
}
