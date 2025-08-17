"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { CheckCircle, Clock, MapPin, Phone, ShoppingBag, ChevronRight } from "lucide-react"
import { Screen, CartItem } from "../../types"
import { ClientBottomNavigation } from "../../components/BottomNav"
import { useCart } from "@/hooks/api/useCart"
import { saveOrder, getFromStorage, setToStorage } from "@/lib/utils"

interface SuccessPageProps {
  cart: CartItem[]
  onScreenChange: (screen: Screen) => void
}

export default function SuccessPage({ cart, onScreenChange }: SuccessPageProps) {
  const { cart: hookCart, clearCart } = useCart()
  const [orderId, setOrderId] = useState<string>("")
  const [estimatedDelivery, setEstimatedDelivery] = useState<string>("")

  useEffect(() => {
    // Criar o pedido quando o componente for montado
    const createOrder = async () => {
      if (hookCart.items.length === 0) return

      console.log('🛒 SuccessPage: Creating order with cart items:', hookCart.items)

      // Agrupar itens por feirante
      const itemsByFeirante = hookCart.items.reduce((groups, item) => {
        const feiranteName = item.feiranteName // Use correct property name
        if (!groups[feiranteName]) {
          groups[feiranteName] = []
        }
        groups[feiranteName].push({
          productId: item.productId, // Use correct property name
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          selectedWeight: item.selectedWeight, // Include selectedWeight
          observation: item.observation
        })
        return groups
      }, {} as Record<string, any[]>)

      console.log('📊 SuccessPage: Items grouped by feirante:', itemsByFeirante)

      // Criar um pedido para cada feirante
      const orderPromises = Object.entries(itemsByFeirante).map(async ([feiranteName, items]) => {
        const total = items.reduce((sum, item) => {
          // Para produtos com selectedWeight, usar o peso real
          if (item.selectedWeight) {
            console.log(`💰 Calculating for ${item.name}: price=${item.price} * selectedWeight=${item.selectedWeight} = ${item.price * item.selectedWeight}`)
            return sum + item.price * item.selectedWeight
          }
          // Para outros produtos, usar a quantidade normal
          console.log(`💰 Calculating for ${item.name}: price=${item.price} * quantity=${item.quantity} = ${item.price * item.quantity}`)
          return sum + item.price * item.quantity
        }, 0)
        const deliveryFee = 5.0
        const finalTotal = total + deliveryFee

        console.log(`📦 Creating order for ${feiranteName}: subtotal=${total}, delivery=${deliveryFee}, total=${finalTotal}`)

        const order = {
          id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          clientId: "1", // Mock user ID
          feiranteId: items[0]?.productId?.split('-')[0] || "1", // Extract feirante ID from product ID
          feiranteName,
          items,
          total: finalTotal,
          status: 'pendente' as const,
          createdAt: new Date().toISOString(),
          estimatedDelivery: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24h from now
          deliveryAddress: {
            street: "Rua das Flores, 123",
            neighborhood: "Boa Viagem", 
            city: "Recife",
            state: "PE",
            zipCode: "51020-000"
          }
        }

        console.log('📝 SuccessPage: About to save order:', order)
        const savedOrder = saveOrder(order)
        
        // Also save to marketer orders for the feirante to see
        const marketerOrder = {
          id: order.id,
          clientId: order.clientId,
          clientName: "Cliente " + order.clientId, // Mock client name
          items: items.map(item => ({
            productId: item.productId,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            selectedWeight: item.selectedWeight,
            observation: item.observation
          })),
          total: finalTotal,
          status: 'pendente' as const,
          createdAt: order.createdAt,
          estimatedDelivery: order.estimatedDelivery,
          deliveryAddress: order.deliveryAddress,
          paymentMethod: 'PIX', // Mock payment method
          observations: ''
        }
        
        // Save to marketer orders
        const existingMarketerOrders = getFromStorage<any[]>('feira_marketer_orders') || []
        existingMarketerOrders.push(marketerOrder)
        setToStorage('feira_marketer_orders', existingMarketerOrders)
        console.log('📝 SuccessPage: Order also saved to marketer orders')
        
        return savedOrder
      })

      try {
        const savedOrders = await Promise.all(orderPromises)
        console.log('✅ SuccessPage: Orders saved successfully:', savedOrders)
        const firstOrder = savedOrders[0]
        if (firstOrder) {
          setOrderId(firstOrder.id)
          const deliveryDate = new Date(firstOrder.estimatedDelivery!)
          setEstimatedDelivery(deliveryDate.toLocaleDateString('pt-BR', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            hour: '2-digit',
            minute: '2-digit'
          }))
        }
        
        // Limpar carrinho após criar o pedido
        console.log('🧹 SuccessPage: Clearing cart')
        clearCart()
      } catch (error) {
        console.error('❌ SuccessPage: Error creating order:', error)
      }
    }

    createOrder()
  }, [hookCart.items, clearCart])

  const cartTotal = hookCart.items.reduce((total, item) => {
    // Para produtos com selectedWeight, usar o peso real
    if (item.selectedWeight) {
      return total + item.price * item.selectedWeight
    }
    // Para outros produtos, usar a quantidade normal
    return total + item.price * item.quantity
  }, 0)
  const deliveryFee = 5.0
  const finalTotal = cartTotal + deliveryFee
  const totalItems = hookCart.items.length // Contar tipos de produtos, não quantidade total

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Success Content */}
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md space-y-6">
          {/* Success Icon */}
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
          </div>

          {/* Success Message */}
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold text-gray-900">
              Pedido realizado com sucesso!
            </h1>
            <p className="text-gray-600">
              Seu pedido foi confirmado e está sendo preparado
            </p>
          </div>

          {/* Order Info */}
          <div className="bg-white rounded-lg p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-4 border-b">
              <span className="text-gray-600">Número do pedido</span>
              <span className="font-mono font-medium">#{orderId.slice(-8).toUpperCase()}</span>
            </div>
            
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-orange-500" />
              <div>
                <p className="font-medium text-gray-900">Previsão de entrega</p>
                <p className="text-sm text-gray-600">{estimatedDelivery}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-blue-500" />
              <div>
                <p className="font-medium text-gray-900">Endereço de entrega</p>
                <p className="text-sm text-gray-600">Rua das Flores, 123 - Boa Viagem</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <ShoppingBag className="w-5 h-5 text-green-500" />
              <div>
                <p className="font-medium text-gray-900">Total do pedido</p>
                <p className="text-sm text-gray-600">
                  {totalItems} {totalItems === 1 ? 'item' : 'itens'} - R$ {finalTotal.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-900 mb-1">
                  Precisa de ajuda?
                </h4>
                <p className="text-sm text-blue-700">
                  Entre em contato pelo WhatsApp: (81) 9 9999-9999
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              className="w-full bg-orange-500 hover:bg-orange-600 text-white h-12 rounded-lg font-medium"
              onClick={() => onScreenChange("orders")}
            >
              Ver meus pedidos
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
            
            <Button
              variant="outline"
              className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 h-12 rounded-lg font-medium"
              onClick={() => onScreenChange("home")}
            >
              Continuar comprando
            </Button>
          </div>
        </div>
      </div>

      <ClientBottomNavigation onScreenChange={onScreenChange} />
    </div>
  )
}
