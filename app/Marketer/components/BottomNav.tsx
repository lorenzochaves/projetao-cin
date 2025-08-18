"use client"

import { Home, Package, ClipboardList, BarChart3, Store, User } from "lucide-react"

interface MarketerBottomNavigationProps {
  onScreenChange: (screen: string) => void
  currentScreen?: string
}

export function MarketerBottomNavigation({ 
  onScreenChange, 
  currentScreen = "home" 
}: MarketerBottomNavigationProps) {
  const isActive = (screen: string) => currentScreen === screen

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="flex items-center justify-around py-2 px-1">
        
        {/* Início */}
        <button 
          className="flex flex-col items-center p-2 min-w-0 flex-1"
          onClick={() => onScreenChange("home")}
        >
          <Home className={`h-5 w-5 ${isActive("home") ? "text-orange-600" : "text-gray-600"}`} />
          <span className={`text-xs mt-1 ${isActive("home") ? "text-orange-600" : "text-gray-600"}`}>
            Início
          </span>
        </button>

        {/* Pedidos */}
        <button 
          className="flex flex-col items-center p-2 min-w-0 flex-1"
          onClick={() => onScreenChange("orders")}
        >
          <ClipboardList className={`h-5 w-5 ${isActive("orders") ? "text-orange-600" : "text-gray-600"}`} />
          <span className={`text-xs mt-1 ${isActive("orders") ? "text-orange-600" : "text-gray-600"}`}>
            Pedidos
          </span>
        </button>

        {/* Minha Feira */}
        <button 
          className="flex flex-col items-center p-2 min-w-0 flex-1"
          onClick={() => onScreenChange("my-store")}
        >
          <Store className={`h-5 w-5 ${isActive("my-store") ? "text-orange-600" : "text-gray-600"}`} />
          <span className={`text-xs mt-1 ${isActive("my-store") ? "text-orange-600" : "text-gray-600"}`}>
            Minha Feira
          </span>
        </button>

        {/* Finanças */}
        <button 
          className="flex flex-col items-center p-2 min-w-0 flex-1"
          onClick={() => onScreenChange("finance")}
        >
          <BarChart3 className={`h-5 w-5 ${isActive("finance") ? "text-orange-600" : "text-gray-600"}`} />
          <span className={`text-xs mt-1 ${isActive("finance") ? "text-orange-600" : "text-gray-600"}`}>
            Finanças
          </span>
        </button>

        {/* Perfil */}
        <button 
          className="flex flex-col items-center p-2 min-w-0 flex-1"
          onClick={() => onScreenChange("profile")}
        >
          <User className={`h-5 w-5 ${isActive("profile") ? "text-orange-600" : "text-gray-600"}`} />
          <span className={`text-xs mt-1 ${isActive("profile") ? "text-orange-600" : "text-gray-600"}`}>
            Perfil
          </span>
        </button>

      </div>
    </div>
  )
}
