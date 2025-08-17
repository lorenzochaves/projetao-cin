"use client"

import { Badge } from "@/components/ui/badge"
import { Home, Search, ShoppingBasket, User, Package } from "lucide-react"
import { Screen } from "../types"
import { useState, useEffect } from "react"
import { getCurrentUser } from "@/lib/utils"
import { useCart } from "@/hooks/api/useCart"

interface ClientBottomNavigationProps {
  onScreenChange: (screen: Screen) => void
  currentScreen?: Screen
}

export function ClientBottomNavigation({ 
  onScreenChange, 
  currentScreen = "home" 
}: ClientBottomNavigationProps) {
  const [activeOrders, setActiveOrders] = useState(0)
  const { cart } = useCart() // Usar o hook diretamente

  useEffect(() => {
    // Simular pedidos ativos - você pode conectar com dados reais depois
    const user = getCurrentUser()
    if (user) {
      // Por enquanto, simular 1 pedido ativo
      setActiveOrders(1)
    }
  }, [])

  const isActive = (screen: Screen) => currentScreen === screen

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
      <div className="flex items-center justify-around py-2 px-1">
        
        {/* Início */}
        <button 
          className="flex flex-col items-center p-2 min-w-0 flex-1"
          onClick={() => onScreenChange("home")}
        >
          <Home className={`h-6 w-6 ${isActive("home") ? "text-orange-500" : "text-gray-600"}`} />
          <span className={`text-xs mt-1 ${isActive("home") ? "text-orange-500" : "text-gray-600"}`}>
            Início
          </span>
        </button>

        {/* Busca */}
        <button 
          className="flex flex-col items-center p-2 min-w-0 flex-1"
          onClick={() => onScreenChange("global-search")}
        >
          <Search className={`h-6 w-6 ${isActive("global-search") ? "text-orange-500" : "text-gray-600"}`} />
          <span className={`text-xs mt-1 ${isActive("global-search") ? "text-orange-500" : "text-gray-600"}`}>
            Busca
          </span>
        </button>

        {/* Carrinho */}
        <button 
          className="flex flex-col items-center p-2 min-w-0 flex-1 relative"
          onClick={() => onScreenChange("cart")}
        >
          <div className="relative">
            <ShoppingBasket className={`h-6 w-6 ${isActive("cart") ? "text-orange-500" : "text-gray-600"}`} />
            {cart.items.length > 0 && (
              <Badge className="absolute -top-2 -right-2 w-5 h-5 rounded-full p-0 flex items-center justify-center text-xs bg-orange-500 hover:bg-orange-500">
                {cart.items.length}
              </Badge>
            )}
          </div>
          <span className={`text-xs mt-1 ${isActive("cart") ? "text-orange-500" : "text-gray-600"}`}>
            Carrinho
          </span>
        </button>

        {/* Pedidos */}
        <button 
          className="flex flex-col items-center p-2 min-w-0 flex-1 relative"
          onClick={() => onScreenChange("orders")}
        >
          <div className="relative">
            <Package className={`h-6 w-6 ${isActive("orders") ? "text-orange-500" : "text-gray-600"}`} />
            {activeOrders > 0 && (
              <Badge className="absolute -top-2 -right-2 w-5 h-5 rounded-full p-0 flex items-center justify-center text-xs bg-red-500 hover:bg-red-500">
                {activeOrders}
              </Badge>
            )}
          </div>
          <span className={`text-xs mt-1 ${isActive("orders") ? "text-orange-500" : "text-gray-600"}`}>
            Pedidos
          </span>
        </button>

        {/* Perfil */}
        <button 
          className="flex flex-col items-center p-2 min-w-0 flex-1"
          onClick={() => onScreenChange("profile")}
        >
          <User className={`h-6 w-6 ${isActive("profile") ? "text-orange-500" : "text-gray-600"}`} />
          <span className={`text-xs mt-1 ${isActive("profile") ? "text-orange-500" : "text-gray-600"}`}>
            Perfil
          </span>
        </button>

      </div>
    </div>
  )
}
