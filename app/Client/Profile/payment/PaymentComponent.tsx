"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, Plus, CreditCard } from "lucide-react"
import { Screen, CartItem } from "../../types"
import { ClientBottomNavigation } from "../../components/BottomNav"

interface PaymentPageProps {
  cart: CartItem[]
  onScreenChange: (screen: Screen) => void
}

export default function PaymentPage({ cart, onScreenChange }: PaymentPageProps) {
  return (
    <div className="min-h-screen bg-white pb-16">
      {/* Header */}
      <div className="flex items-center p-4 pt-12 border-b">
        <Button variant="ghost" size="sm" onClick={() => onScreenChange("profile")}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-xl font-bold ml-2">Meus Cartões</h1>
      </div>

      <div className="p-4">
        {/* Add new card button */}
        <Button className="w-full h-12 mb-6 border-2 border-dashed border-gray-300 bg-transparent text-gray-600 hover:bg-gray-50">
          <Plus className="w-5 h-5 mr-2" />
          Adicionar novo cartão
        </Button>

        {/* Mock card list */}
        <div className="space-y-4">
          <div className="border rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center">
              <CreditCard className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <p className="font-medium">**** **** **** 1234</p>
                <p className="text-sm text-gray-600">Visa • Crédito</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="text-red-600">
              Remover
            </Button>
          </div>

          <div className="border rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center">
              <CreditCard className="w-8 h-8 text-green-600 mr-3" />
              <div>
                <p className="font-medium">**** **** **** 5678</p>
                <p className="text-sm text-gray-600">Mastercard • Débito</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="text-red-600">
              Remover
            </Button>
          </div>
        </div>
      </div>

      <ClientBottomNavigation cart={cart} onScreenChange={onScreenChange} />
    </div>
  )
}
