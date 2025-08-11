"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { Screen, CartItem } from "../../types"
import { ClientBottomNavigation } from "../../components/BottomNav"

interface OrdersPageProps {
  cart: CartItem[]
  onScreenChange: (screen: Screen) => void
}

export default function OrdersPage({ cart, onScreenChange }: OrdersPageProps) {
  return (
    <div className="min-h-screen bg-white pb-16">
      {/* Header */}
      <div className="flex items-center p-4 pt-12 border-b">
        <Button variant="ghost" size="sm" onClick={() => onScreenChange("profile")}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-xl font-bold ml-2">Meus Pedidos</h1>
      </div>

      <div className="p-4">
        {/* Mock order list */}
        <div className="space-y-4">
          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium">Pedido #001</h3>
              <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded">Entregue</span>
            </div>
            <p className="text-sm text-gray-600 mb-2">Feirante: João da Feira</p>
            <p className="text-sm text-gray-600 mb-2">Data: 05/08/2025</p>
            <p className="font-medium">Total: R$ 25,50</p>
          </div>

          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium">Pedido #002</h3>
              <span className="text-sm text-blue-600 bg-blue-100 px-2 py-1 rounded">Em preparo</span>
            </div>
            <p className="text-sm text-gray-600 mb-2">Feirante: Maria das Verduras</p>
            <p className="text-sm text-gray-600 mb-2">Data: 08/08/2025</p>
            <p className="font-medium">Total: R$ 18,90</p>
          </div>

          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium">Pedido #003</h3>
              <span className="text-sm text-orange-600 bg-orange-100 px-2 py-1 rounded">Pendente</span>
            </div>
            <p className="text-sm text-gray-600 mb-2">Feirante: Seu Antônio</p>
            <p className="text-sm text-gray-600 mb-2">Data: 10/08/2025</p>
            <p className="font-medium">Total: R$ 32,75</p>
          </div>
        </div>
      </div>

      <ClientBottomNavigation cart={cart} onScreenChange={onScreenChange} />
    </div>
  )
}
