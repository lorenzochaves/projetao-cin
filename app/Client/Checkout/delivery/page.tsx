"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, ChevronRight, Plus } from "lucide-react"
import { Screen, CartItem } from "../../types"
import { BottomNav } from "../../components/BottomNav"

interface DeliveryPageProps {
  cart: CartItem[]
  onScreenChange: (screen: Screen) => void
}

export default function DeliveryPage({ cart, onScreenChange }: DeliveryPageProps) {
  return (
    <div className="min-h-screen bg-white pb-16">
      {/* Header */}
      <div className="flex items-center p-4 pt-12 border-b">
        <Button variant="ghost" size="sm" onClick={() => onScreenChange("cart")}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-lg font-bold ml-4">Entrega</h1>
      </div>

      <div className="p-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-medium">Endereço 1</p>
            </div>
            <div className="w-4 h-4 border-2 border-black rounded-full bg-black"></div>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-medium">Endereço 2</p>
            </div>
            <div className="w-4 h-4 border-2 border-gray-300 rounded-full"></div>
          </div>
        </div>

        <Button variant="link" className="text-blue-500 mt-4 p-0">
          <Plus className="w-4 h-4 mr-2" />
          Adicionar novo endereço
        </Button>

        <Button
          className="w-full mt-8 bg-gray-200 text-black rounded-full py-3"
          onClick={() => onScreenChange("schedule")}
        >
          Continuar
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>

      <BottomNav cart={cart} onScreenChange={onScreenChange} />
    </div>
  )
}
