"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, Plus, CreditCard } from "lucide-react"
import { Screen, CartItem } from "../../types"
import { ClientBottomNavigation } from "../../components/BottomNav"
import { useUserPaymentMethods } from "@/hooks/api/useUser"
import { Skeleton } from "@/components/ui/skeleton"

interface PaymentPageProps {
  cart: CartItem[]
  onScreenChange: (screen: Screen) => void
}

export default function PaymentPage({ cart, onScreenChange }: PaymentPageProps) {
  const { paymentMethods, loading, error, deletePaymentMethod } = useUserPaymentMethods("1")

  const getCardIcon = (brand: string) => {
    const colors = {
      visa: "text-blue-600",
      mastercard: "text-red-600", 
      elo: "text-yellow-600"
    }
    return colors[brand as keyof typeof colors] || "text-gray-600"
  }

  const getCardType = (type: string) => {
    return type === 'credit' ? 'Crédito' : 'Débito'
  }

  const getBrandName = (brand: string) => {
    const names = {
      visa: "Visa",
      mastercard: "Mastercard",
      elo: "Elo"
    }
    return names[brand as keyof typeof names] || brand
  }

  const handleDeletePaymentMethod = async (paymentMethodId: string) => {
    try {
      await deletePaymentMethod(paymentMethodId)
    } catch (err) {
      console.error('Error deleting payment method:', err)
    }
  }

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

        {/* Error state */}
        {error && (
          <div className="text-center py-8">
            <p className="text-red-600 mb-4">Erro ao carregar cartões</p>
            <p className="text-sm text-gray-600">{error}</p>
          </div>
        )}

        {/* Loading state */}
        {loading && (
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="border rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <Skeleton className="w-8 h-8 mr-3" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
                <Skeleton className="h-8 w-16" />
              </div>
            ))}
          </div>
        )}

        {/* Payment methods list */}
        {!loading && !error && (
          <div className="space-y-4">
            {paymentMethods.length === 0 ? (
              <div className="text-center py-8">
                <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">Nenhum cartão cadastrado</p>
                <p className="text-sm text-gray-500">Adicione um cartão para facilitar seus pagamentos</p>
              </div>
            ) : (
              paymentMethods.map((paymentMethod) => (
                <div key={paymentMethod.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <CreditCard className={`w-8 h-8 mr-3 ${getCardIcon(paymentMethod.brand)}`} />
                      <div>
                        <p className="font-medium">**** **** **** {paymentMethod.lastFourDigits}</p>
                        <p className="text-sm text-gray-600">
                          {getBrandName(paymentMethod.brand)} • {getCardType(paymentMethod.type)}
                        </p>
                        <p className="text-xs text-gray-500">
                          {paymentMethod.holderName} • {paymentMethod.expiryMonth}/{paymentMethod.expiryYear}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      {paymentMethod.isDefault && (
                        <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">Padrão</span>
                      )}
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-red-600"
                        onClick={() => handleDeletePaymentMethod(paymentMethod.id)}
                      >
                        Remover
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      <ClientBottomNavigation cart={cart} onScreenChange={onScreenChange} />
    </div>
  )
}
