"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ChevronRight, CreditCard, Smartphone, DollarSign, Shield } from "lucide-react"
import { Screen, CartItem } from "../../types"
import { ClientBottomNavigation } from "../../components/BottomNav"
import { useCart } from "@/contexts/CartContext"

interface PaymentPageProps {
  cart: CartItem[]
  onScreenChange: (screen: Screen) => void
}

interface PaymentMethod {
  id: string
  type: 'pix' | 'credit' | 'debit'
  name: string
  description?: string
  icon: React.ReactNode
  fee?: number
}

const paymentMethods: PaymentMethod[] = [
  {
    id: 'pix',
    type: 'pix',
    name: 'PIX',
    description: 'Pagamento instantâneo',
    icon: <Smartphone className="w-6 h-6 text-purple-600" />,
    fee: 0
  },
  {
    id: 'debit',
    type: 'debit',
    name: 'Cartão de Débito',
    description: 'Cartão final ****1234',
    icon: <CreditCard className="w-6 h-6 text-blue-600" />,
    fee: 0
  },
  {
    id: 'credit',
    type: 'credit',
    name: 'Cartão de Crédito',
    description: 'Cartão final ****5678',
    icon: <CreditCard className="w-6 h-6 text-green-600" />,
    fee: 2.50
  },
  {
    id: 'cash',
    type: 'debit',
    name: 'Dinheiro na Entrega',
    description: 'Pague ao receber o pedido',
    icon: <DollarSign className="w-6 h-6 text-yellow-600" />,
    fee: 0
  }
]

export default function PaymentPage({ cart, onScreenChange }: PaymentPageProps) {
  const [selectedPayment, setSelectedPayment] = useState<string>("pix")
  const { cart: hookCart } = useCart()

  const cartTotal = hookCart.items.reduce((total, item) => total + item.price * item.quantity, 0)
  const deliveryFee = 5.0
  const selectedMethod = paymentMethods.find(method => method.id === selectedPayment)
  const paymentFee = selectedMethod?.fee || 0
  const finalTotal = cartTotal + deliveryFee + paymentFee
  const totalItems = hookCart.items.reduce((total, item) => total + item.quantity, 0)

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="px-4 py-4 pt-12">
          <div className="flex items-center justify-between mb-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => onScreenChange("schedule")}
              className="p-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-bold">Pagamento</h1>
            <div className="w-9" />
          </div>
          
          {/* Progress indicator */}
          <div className="flex items-center gap-2">
            <div className="flex-1 h-2 bg-orange-500 rounded-full"></div>
            <div className="flex-1 h-2 bg-orange-500 rounded-full"></div>
            <div className="flex-1 h-2 bg-orange-500 rounded-full"></div>
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
        {/* Title and subtitle */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Como você quer pagar?
          </h2>
          <p className="text-gray-600 text-sm">
            Escolha a forma de pagamento que preferir
          </p>
        </div>

        {/* Payment methods */}
        <div className="space-y-3">
          {paymentMethods.map((method) => (
            <div 
              key={method.id}
              className={`bg-white rounded-lg p-4 shadow-sm border-2 transition-all ${
                selectedPayment === method.id 
                  ? 'border-orange-500 bg-orange-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedPayment(method.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div className="p-2 bg-gray-50 rounded-lg">
                    {method.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 mb-1">
                      {method.name}
                    </h3>
                    {method.description && (
                      <p className="text-sm text-gray-600">
                        {method.description}
                      </p>
                    )}
                    {method.fee && method.fee > 0 && (
                      <p className="text-xs text-orange-600 mt-1">
                        Taxa: R$ {method.fee.toFixed(2)}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className={`w-5 h-5 border-2 rounded-full ${
                  selectedPayment === method.id 
                    ? 'border-orange-500 bg-orange-500' 
                    : 'border-gray-300'
                }`}>
                  {selectedPayment === method.id && (
                    <div className="w-2 h-2 bg-white rounded-full m-auto mt-0.5"></div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Security notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900 mb-1">
                Seus dados estão seguros
              </h4>
              <p className="text-sm text-blue-700">
                Utilizamos criptografia de ponta para proteger todas as suas informações de pagamento.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer with summary and finalize */}
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
          {paymentFee > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Taxa de pagamento</span>
              <span className="font-medium">R$ {paymentFee.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between text-lg font-bold pt-2 border-t">
            <span>Total</span>
            <span className="text-orange-600">R$ {finalTotal.toFixed(2)}</span>
          </div>
        </div>
        
        <Button
          className="w-full bg-orange-500 hover:bg-orange-600 text-white h-12 rounded-lg font-medium"
          onClick={() => onScreenChange("success")}
          disabled={!selectedPayment}
        >
          Finalizar pedido
          <ChevronRight className="w-5 h-5 ml-2" />
        </Button>
      </div>

      <ClientBottomNavigation onScreenChange={onScreenChange} />
    </div>
  )
}
