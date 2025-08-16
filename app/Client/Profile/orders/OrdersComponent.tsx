"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { Screen, CartItem } from "../../types"
import { ClientBottomNavigation } from "../../components/BottomNav"
import { useUserOrders } from "@/hooks/api/useUser"

interface OrdersPageProps {
  cart: CartItem[]
  onScreenChange: (screen: Screen) => void
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'entregue':
      return 'text-green-600 bg-green-100'
    case 'em_preparo':
      return 'text-blue-600 bg-blue-100'
    case 'pendente':
      return 'text-orange-600 bg-orange-100'
    case 'cancelado':
      return 'text-red-600 bg-red-100'
    default:
      return 'text-gray-600 bg-gray-100'
  }
}

const getStatusText = (status: string) => {
  switch (status) {
    case 'entregue':
      return 'Entregue'
    case 'em_preparo':
      return 'Em preparo'
    case 'pendente':
      return 'Pendente'
    case 'cancelado':
      return 'Cancelado'
    default:
      return status
  }
}

export default function OrdersPage({ cart, onScreenChange }: OrdersPageProps) {
  // Mock user ID - in a real app, this would come from auth context
  const userId = "1"
  const { orders, loading, error } = useUserOrders(userId)

  return (
    <div className="min-h-screen bg-white pb-16">
      <div className="p-4 pt-12">
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="border rounded-lg p-4 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/3 mb-1"></div>
                <div className="h-3 bg-gray-200 rounded w-1/4"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-red-600">Erro ao carregar pedidos: {error}</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Você ainda não fez nenhum pedido</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium">Pedido #{order.id}</h3>
                  <span className={`text-sm px-2 py-1 rounded ${getStatusColor(order.status)}`}>
                    {getStatusText(order.status)}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">Feirante: {order.feiranteName}</p>
                <p className="text-sm text-gray-600 mb-2">
                  Data: {new Date(order.createdAt).toLocaleDateString('pt-BR')}
                </p>
                <div className="text-sm text-gray-600 mb-2">
                  <p>Itens:</p>
                  <ul className="ml-4">
                    {order.items.map((item, index) => (
                      <li key={index}>
                        {item.quantity}x {item.name} - R$ {(item.price * item.quantity).toFixed(2)}
                        {item.observation && <span className="text-xs text-gray-500"> ({item.observation})</span>}
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="font-medium">Total: R$ {order.total.toFixed(2)}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <ClientBottomNavigation 
        onScreenChange={onScreenChange} 
        currentScreen="orders" 
      />
    </div>
  )
}
