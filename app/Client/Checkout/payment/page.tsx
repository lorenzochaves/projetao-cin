"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, ChevronRight } from "lucide-react"
import { Screen, CartItem } from "../../types"
import { BottomNav } from "../../components/BottomNav"

interface PaymentPageProps {
  cart: CartItem[]
  onScreenChange: (screen: Screen) => void
}

export default function PaymentPage({ cart, onScreenChange }: PaymentPageProps) {
  return (
    <div className="min-h-screen bg-white pb-16">
      {/* Header */}
      <div className="flex items-center p-4 pt-12 border-b">
        <Button variant="ghost" size="sm" onClick={() => onScreenChange("schedule")}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
      </div>

      <div className="p-4">
        <h1 className="text-2xl font-bold mb-6">
          Selecione um meio
          <br />
          de pagamento
        </h1>

        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <p className="font-bold mb-2">Pix</p>
          </div>

          <div className="p-4 border rounded-lg">
            <p className="font-bold mb-2">Débito</p>
            <p className="text-sm text-gray-600">Cartão final xxxx</p>
          </div>

          <div className="p-4 border rounded-lg">
            <p className="font-bold mb-2">Crédito</p>
          </div>
        </div>

        <Button
          className="w-full mt-8 bg-gray-200 text-black rounded-full py-3"
          onClick={() => onScreenChange("success")}
        >
          Continuar
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>

      <BottomNav cart={cart} onScreenChange={onScreenChange} />
    </div>
  )
}
