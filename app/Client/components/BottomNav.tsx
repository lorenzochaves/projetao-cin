"use client"

import { Badge } from "@/components/ui/badge"
import { Home, Search, ShoppingBasket, User } from "lucide-react"
import { Screen, CartItem } from "../types"

interface ClientBottomNavigationProps {
  cart: CartItem[]
  onScreenChange: (screen: Screen) => void
}

export function ClientBottomNavigation({ cart, onScreenChange }: ClientBottomNavigationProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="flex items-center justify-around py-2">
        <button 
          className="flex flex-col items-center p-2"
          onClick={() => onScreenChange("home")}
        >
          <Home className="h-6 w-6 text-gray-600" />
        </button>
        <button 
          className="flex flex-col items-center p-2"
          onClick={() => onScreenChange("global-search")}
        >
          <Search className="h-6 w-6 text-gray-600" />
        </button>
        <button 
          className="flex flex-col items-center p-2 relative"
          onClick={() => onScreenChange("cart")}
        >
          <ShoppingBasket className="h-6 w-6 text-gray-600" />
          {cart.length > 0 && (
            <Badge className="absolute -top-1 -right-1 w-5 h-5 rounded-full p-0 flex items-center justify-center text-xs">
              {cart.length}
            </Badge>
          )}
        </button>
        <button 
          className="flex flex-col items-center p-2"
          onClick={() => onScreenChange("profile")}
        >
          <User className="h-6 w-6 text-gray-600" />
        </button>
      </div>
    </div>
  )
}
