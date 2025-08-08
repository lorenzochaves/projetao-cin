"use client"

import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { Screen, CartItem } from "../../types"
import { BottomNav } from "../../components/BottomNav"

interface SuccessPageProps {
  cart: CartItem[]
  onScreenChange: (screen: Screen) => void
}

export default function SuccessPage({ cart, onScreenChange }: SuccessPageProps) {
  return (
    <div className="min-h-screen bg-white pb-16 flex flex-col items-center justify-center">
      <div className="text-center px-4">
        <div className="w-24 h-24 bg-black rounded-full flex items-center justify-center mx-auto mb-8">
          <Check className="w-12 h-12 text-white" />
        </div>

        <h1 className="text-3xl font-bold mb-2">Eba!</h1>
        <p className="text-xl mb-8">
          Sua feira foi pedida
          <br />
          com sucesso.
        </p>

        <Button variant="link" className="text-black underline" onClick={() => onScreenChange("home")}>
          Acompanhe seu pedido
        </Button>
      </div>

      <BottomNav cart={cart} onScreenChange={onScreenChange} />
    </div>
  )
}
