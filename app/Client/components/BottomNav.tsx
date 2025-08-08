"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Home, Search, ShoppingBasket, User } from "lucide-react"
import { Screen, CartItem } from "../types"

interface BottomNavProps {
  cart: CartItem[]
  onScreenChange: (screen: Screen) => void
}

export function BottomNav({ cart, onScreenChange }: BottomNavProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 safe-area-pb">
      <div className="flex justify-around items-center max-w-md mx-auto">
        <Button
          variant="ghost"
          size="sm"
          className="flex flex-col items-center gap-1 p-2"
          onClick={() => onScreenChange("home")}
        >
          <Home className="w-5 h-5" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="flex flex-col items-center gap-1 p-2"
          onClick={() => onScreenChange("global-search")}
        >
          <Search className="w-5 h-5" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="flex flex-col items-center gap-1 p-2 relative"
          onClick={() => onScreenChange("cart")}
        >
          <ShoppingBasket className="w-5 h-5" />
          {cart.length > 0 && (
            <Badge className="absolute -top-1 -right-1 w-5 h-5 rounded-full p-0 flex items-center justify-center text-xs">
              {cart.length}
            </Badge>
          )}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="flex flex-col items-center gap-1 p-2"
          onClick={() => onScreenChange("profile")}
        >
          <User className="w-5 h-5" />
        </Button>
      </div>
    </div>
  )
}
