"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, Plus, MapPin } from "lucide-react"
import { Screen, CartItem } from "../../types"
import { ClientBottomNavigation } from "../../components/BottomNav"

interface AddressesPageProps {
  cart: CartItem[]
  onScreenChange: (screen: Screen) => void
}

export default function AddressesPage({ cart, onScreenChange }: AddressesPageProps) {
  return (
    <div className="min-h-screen bg-white pb-16">
      {/* Header */}
      <div className="flex items-center p-4 pt-12 border-b">
        <Button variant="ghost" size="sm" onClick={() => onScreenChange("profile")}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-xl font-bold ml-2">Meus Endereços</h1>
      </div>

      <div className="p-4">
        {/* Add new address button */}
        <Button className="w-full h-12 mb-6 border-2 border-dashed border-gray-300 bg-transparent text-gray-600 hover:bg-gray-50">
          <Plus className="w-5 h-5 mr-2" />
          Adicionar novo endereço
        </Button>

        {/* Mock address list */}
        <div className="space-y-4">
          <div className="border rounded-lg p-4">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-blue-600 mr-3 mt-1" />
                <div>
                  <p className="font-medium">Casa</p>
                  <p className="text-sm text-gray-600">Rua das Flores, 123</p>
                  <p className="text-sm text-gray-600">Boa Viagem, Recife - PE</p>
                  <p className="text-sm text-gray-600">CEP: 51020-120</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="text-blue-600">
                Editar
              </Button>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">Principal</span>
              <Button variant="ghost" size="sm" className="text-red-600">
                Remover
              </Button>
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-gray-600 mr-3 mt-1" />
                <div>
                  <p className="font-medium">Trabalho</p>
                  <p className="text-sm text-gray-600">Av. Boa Viagem, 456</p>
                  <p className="text-sm text-gray-600">Boa Viagem, Recife - PE</p>
                  <p className="text-sm text-gray-600">CEP: 51021-000</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="text-blue-600">
                Editar
              </Button>
            </div>
            <div className="flex justify-end pt-2">
              <Button variant="ghost" size="sm" className="text-red-600">
                Remover
              </Button>
            </div>
          </div>
        </div>
      </div>

      <ClientBottomNavigation cart={cart} onScreenChange={onScreenChange} />
    </div>
  )
}
