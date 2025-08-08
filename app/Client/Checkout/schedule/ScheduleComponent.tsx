"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, ChevronRight } from "lucide-react"
import { Screen, CartItem } from "../../types"
import { ClientBottomNavigation } from "../../components/BottomNav"

interface SchedulePageProps {
  cart: CartItem[]
  onScreenChange: (screen: Screen) => void
}

export default function SchedulePage({ cart, onScreenChange }: SchedulePageProps) {
  return (
    <div className="min-h-screen bg-white pb-16">
      {/* Header */}
      <div className="flex items-center p-4 pt-12 border-b">
        <Button variant="ghost" size="sm" onClick={() => onScreenChange("delivery")}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
      </div>

      <div className="p-4">
        <h1 className="text-2xl font-bold mb-2">Quando será</h1>
        <h1 className="text-2xl font-bold mb-6">feita a entrega?</h1>
        <p className="text-gray-600 mb-6">Selecione uma opção abaixo.</p>

        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((item, index) => (
            <div key={item} className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">Data</p>
                <p className="text-sm text-gray-600">Turno</p>
              </div>
              <div
                className={`w-4 h-4 border-2 rounded-full ${index === 1 ? "border-black bg-black" : "border-gray-300"}`}
              ></div>
            </div>
          ))}
        </div>

        <Button
          className="w-full mt-8 bg-gray-200 text-black rounded-full py-3"
          onClick={() => onScreenChange("payment")}
        >
          Continuar
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>

      <ClientBottomNavigation cart={cart} onScreenChange={onScreenChange} />
    </div>
  )
}
