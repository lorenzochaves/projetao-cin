"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, ChevronRight } from "lucide-react"
import { Screen, CartItem } from "../../types"
import { ClientBottomNavigation } from "../../components/BottomNav"

interface PaymentPageProps {
  cart: CartItem[]
  onScreenChange: (screen: Screen) => void
}

export default function PaymentPage({ cart, onScreenChange }: PaymentPageProps) {
  return (
    <div className="min-h-screen bg-white pb-16">
      {/* Header simplificado */}
      <div className="flex items-center justify-center p-4 pt-12 border-b">
        <h1 className="text-lg font-bold">Pagamento</h1>
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

      <ClientBottomNavigation onScreenChange={onScreenChange} />
    </div>
  )
}
