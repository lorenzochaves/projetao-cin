"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ChevronRight, Plus, MapPin, Home, Building2 } from "lucide-react"
import { Screen, CartItem } from "../../types"
import { ClientBottomNavigation } from "../../components/BottomNav"
import { useCart } from "@/contexts/CartContext"

interface DeliveryPageProps {
  cart: CartItem[]
  onScreenChange: (screen: Screen) => void
}

interface Address {
  id: string
  label: string
  street: string
  neighborhood: string
  city: string
  state: string
  zipCode: string
  isPrimary: boolean
}

const mockAddresses: Address[] = [
  {
    id: "1",
    label: "Casa",
    street: "Rua das Flores, 123",
    neighborhood: "Boa Viagem",
    city: "Recife",
    state: "PE",
    zipCode: "51020-000",
    isPrimary: true
  },
  {
    id: "2", 
    label: "Trabalho",
    street: "Av. Agamenon Magalhães, 456",
    neighborhood: "Santo Amaro",
    city: "Recife",
    state: "PE",
    zipCode: "50100-000",
    isPrimary: false
  },
  {
    id: "3",
    label: "Casa da Família",
    street: "Rua do Sol, 789",
    neighborhood: "Casa Amarela",
    city: "Recife", 
    state: "PE",
    zipCode: "52070-000",
    isPrimary: false
  }
]

export default function DeliveryPage({ cart, onScreenChange }: DeliveryPageProps) {
  const [selectedAddress, setSelectedAddress] = useState<string>("1")
  const [addresses, setAddresses] = useState<Address[]>(mockAddresses)
  const { cart: hookCart } = useCart()

  const cartTotal = hookCart.items.reduce((total, item) => total + item.price * item.quantity, 0)
  const deliveryFee = 5.0
  const finalTotal = cartTotal + deliveryFee
  const totalItems = hookCart.items.reduce((total, item) => total + item.quantity, 0)

  const getAddressIcon = (label: string) => {
    switch (label.toLowerCase()) {
      case 'casa':
        return <Home className="w-5 h-5 text-orange-500" />
      case 'trabalho':
        return <Building2 className="w-5 h-5 text-blue-500" />
      default:
        return <MapPin className="w-5 h-5 text-gray-500" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="px-4 py-4 pt-12">
          <div className="flex items-center justify-between mb-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => onScreenChange("cart")}
              className="p-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-bold">Endereço de Entrega</h1>
            <div className="w-9" />
          </div>
          
          {/* Progress indicator */}
          <div className="flex items-center gap-2">
            <div className="flex-1 h-2 bg-orange-500 rounded-full"></div>
            <div className="flex-1 h-2 bg-orange-500 rounded-full"></div>
            <div className="flex-1 h-2 bg-gray-200 rounded-full"></div>
          </div>
          <div className="flex justify-between text-xs text-gray-600 mt-1">
            <span>Carrinho</span>
            <span>Entrega</span>
            <span>Pagamento</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Subtitle */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <p className="text-gray-600 text-sm">
            Selecione o endereço onde você deseja receber seus produtos
          </p>
        </div>

        {/* Address list */}
        <div className="space-y-3">
          {addresses.map((address) => (
            <div 
              key={address.id}
              className={`bg-white rounded-lg p-4 shadow-sm border-2 transition-all ${
                selectedAddress === address.id 
                  ? 'border-orange-500 bg-orange-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedAddress(address.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  {getAddressIcon(address.label)}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-gray-900">{address.label}</h3>
                      {address.isPrimary && (
                        <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">
                          Principal
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{address.street}</p>
                    <p className="text-sm text-gray-500">
                      {address.neighborhood}, {address.city} - {address.state}
                    </p>
                    <p className="text-sm text-gray-500">CEP: {address.zipCode}</p>
                  </div>
                </div>
                <div className={`w-5 h-5 border-2 rounded-full ${
                  selectedAddress === address.id 
                    ? 'border-orange-500 bg-orange-500' 
                    : 'border-gray-300'
                }`}>
                  {selectedAddress === address.id && (
                    <div className="w-2 h-2 bg-white rounded-full m-auto mt-0.5"></div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add new address */}
        <Button 
          variant="outline" 
          className="w-full border-dashed border-gray-300 text-gray-600 hover:bg-gray-50 py-6"
        >
          <Plus className="w-5 h-5 mr-2" />
          Adicionar novo endereço
        </Button>
      </div>

      {/* Footer with summary and continue */}
      <div className="bg-white border-t p-4 mb-16 shadow-lg">
        <div className="space-y-3 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal ({totalItems} itens)</span>
            <span className="font-medium">R$ {cartTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Taxa de entrega</span>
            <span className="font-medium">R$ {deliveryFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-lg font-bold pt-2 border-t">
            <span>Total</span>
            <span className="text-orange-600">R$ {finalTotal.toFixed(2)}</span>
          </div>
        </div>
        
        <Button
          className="w-full bg-orange-500 hover:bg-orange-600 text-white h-12 rounded-lg font-medium"
          onClick={() => onScreenChange("schedule")}
          disabled={!selectedAddress}
        >
          Continuar para agendamento
          <ChevronRight className="w-5 h-5 ml-2" />
        </Button>
      </div>

      <ClientBottomNavigation onScreenChange={onScreenChange} />
    </div>
  )
}
