"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, CheckCircle, XCircle, Star, Truck, Package, ChevronRight, MoreVertical, MessageSquare } from "lucide-react"
import { Screen, CartItem } from "../../types"
import { ClientBottomNavigation } from "../../components/BottomNav"
import { Order } from "@/lib/api/types"
import { getUserOrders, getFeirantes } from "@/lib/utils"
import { ChatModal } from "@/components/ui/chat-modal"
import Image from "next/image"

interface OrdersPageProps {
  cart: CartItem[]
  onScreenChange: (screen: Screen) => void
  onSelectFeirante?: (feirante: any) => void
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'entregue':
      return 'text-green-600 bg-green-100'
    case 'preparando':
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
    case 'preparando':
      return 'Em preparo'
    case 'pendente':
      return 'Pendente'
    case 'cancelado':
      return 'Cancelado'
    default:
      return status
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'entregue':
      return <CheckCircle className="w-4 h-4 text-green-600" />
    case 'preparando':
      return <Clock className="w-4 h-4 text-blue-600" />
    case 'pendente':
      return <Package className="w-4 h-4 text-orange-600" />
    case 'cancelado':
      return <XCircle className="w-4 h-4 text-red-600" />
    default:
      return <Clock className="w-4 h-4 text-gray-600" />
  }
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)
  
  if (date.toDateString() === today.toDateString()) {
    return 'Hoje'
  } else if (date.toDateString() === yesterday.toDateString()) {
    return 'Ontem'
  } else {
    return date.toLocaleDateString('pt-BR', { 
      weekday: 'short', 
      day: 'numeric', 
      month: 'long',
      year: 'numeric'
    }).replace(/^\w/, c => c.toUpperCase())
  }
}

const groupOrdersByDate = (orders: Order[]) => {
  const groups: { [key: string]: Order[] } = {}
  
  orders.forEach(order => {
    const dateKey = formatDate(order.createdAt)
    if (!groups[dateKey]) {
      groups[dateKey] = []
    }
    groups[dateKey].push(order)
  })
  
  return groups
}

export default function OrdersPage({ cart, onScreenChange, onSelectFeirante }: OrdersPageProps) {
  const [orders, setOrders] = useState<Order[]>([])
  const [activeTab, setActiveTab] = useState<'ongoing' | 'history'>('ongoing')
  const [loading, setLoading] = useState(true)
  const [feirantes, setFeirantes] = useState<any[]>([])
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)
  const [chatModal, setChatModal] = useState<{
    isOpen: boolean
    feiranteId: string
    feiranteName: string
  }>({
    isOpen: false,
    feiranteId: '',
    feiranteName: ''
  })

  const openChatModal = (feiranteId: string, feiranteName: string) => {
    setChatModal({
      isOpen: true,
      feiranteId,
      feiranteName
    })
  }

  const closeChatModal = () => {
    setChatModal({
      isOpen: false,
      feiranteId: '',
      feiranteName: ''
    })
  }

  const toggleOrderDetails = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId)
  }

  useEffect(() => {
    // Mock user ID - in a real app, this would come from auth context
    const userId = "1"
    try {
      const userOrders = getUserOrders(userId)
      const allFeirantes = getFeirantes()
      setOrders(userOrders)
      setFeirantes(allFeirantes)
    } catch (error) {
      console.error('Erro ao carregar pedidos:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  const ongoingOrders = orders.filter(order => 
    order.status === 'pendente' || order.status === 'preparando'
  )
  
  const historyOrders = orders.filter(order => 
    order.status === 'entregue' || order.status === 'cancelado'
  ).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  const groupedHistoryOrders = groupOrdersByDate(historyOrders)

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pb-16">
        <div className="bg-white border-b">
          <div className="px-4 py-4 pt-12">
            <h1 className="text-xl font-bold text-center">MEUS PEDIDOS</h1>
          </div>
        </div>
        <div className="p-4 space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white border rounded-lg p-4 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/3 mb-1"></div>
              <div className="h-3 bg-gray-200 rounded w-1/4"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="px-4 py-4 pt-12">
          <h1 className="text-xl font-bold text-center tracking-wider">MEUS PEDIDOS</h1>
        </div>
        
        {/* Tabs */}
        <div className="px-4">
          <div className="flex border-b">
            <button
              className={`flex-1 py-3 text-center font-medium transition-colors ${
                activeTab === 'ongoing'
                  ? 'text-orange-600 border-b-2 border-orange-600'
                  : 'text-gray-600'
              }`}
              onClick={() => setActiveTab('ongoing')}
            >
              Em Andamento
            </button>
            <button
              className={`flex-1 py-3 text-center font-medium transition-colors ${
                activeTab === 'history'
                  ? 'text-orange-600 border-b-2 border-orange-600'
                  : 'text-gray-600'
              }`}
              onClick={() => setActiveTab('history')}
            >
              Histórico
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {activeTab === 'ongoing' ? (
          <div className="space-y-4">
            {ongoingOrders.length === 0 ? (
              <div className="bg-white rounded-lg p-8 text-center">
                <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Nenhum pedido em andamento
                </h3>
                <p className="text-gray-600 mb-4">
                  Quando você fizer um pedido, ele aparecerá aqui
                </p>
                <Button 
                  onClick={() => onScreenChange("home")}
                  className="bg-orange-500 hover:bg-orange-600 text-white"
                >
                  Fazer pedido
                </Button>
              </div>
            ) : (
              ongoingOrders.map((order) => {
                // Buscar dados reais do feirante
                const feiranteData = feirantes.find(f => f.name === order.feiranteName)
                
                return (
                <div key={order.id} className="bg-white rounded-lg shadow-sm p-4">
                  {/* Header com feirante */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {feiranteData?.avatar ? (
                        <div className="w-12 h-12 rounded-lg overflow-hidden">
                          <Image
                            src={feiranteData.avatar}
                            alt={order.feiranteName}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                          <span className="text-2xl">🏪</span>
                        </div>
                      )}
                      <div>
                        <h4 className="font-medium text-gray-900">{order.feiranteName}</h4>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="p-2"
                      onClick={() => {
                        if (onSelectFeirante && feiranteData) {
                          onSelectFeirante(feiranteData)
                        }
                        onScreenChange("feirante")
                      }}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Status com entregador */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-5 h-5 flex items-center justify-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    </div>
                    <span className="text-sm text-gray-600">
                      Em trânsito com Carlos Entregador
                    </span>
                    <span className="text-sm text-gray-400">• N° {order.id}</span>
                  </div>
                  
                  {/* Lista de itens */}
                  <div className="space-y-2 mb-3">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-4 h-4 bg-gray-100 rounded flex items-center justify-center">
                          <span className="text-xs font-semibold text-gray-700">
                            {item.quantity}
                          </span>
                        </div>
                        <span className="text-sm text-gray-600 flex-1">
                          {item.name}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Informações de entrega */}
                  <div className="pt-3 border-t">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Previsão de entrega</span>
                      <span className="text-sm font-medium text-orange-600">
                        {order.estimatedDelivery ? 
                          new Date(order.estimatedDelivery).toLocaleTimeString('pt-BR', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          }) : '18:30'
                        }
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Total do pedido</span>
                      <span className="text-sm font-bold text-gray-900">R$ {order.total.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  {/* Ações */}
                  <div className="pt-4 border-t">
                    <div className="flex gap-32">
                      <button 
                        className="text-orange-500 font-medium text-sm py-2 pl-12"
                        onClick={() => toggleOrderDetails(order.id)}
                      >
                        {expandedOrder === order.id ? 'Ocultar' : 'Detalhes'}
                      </button>
                      <button 
                        className="text-orange-500 font-medium text-sm py-2 flex items-center gap-2"
                        onClick={() => openChatModal(feiranteData?.id || order.feiranteName, order.feiranteName)}
                      >
                        <MessageSquare className="w-5 h-5" />
                        Chat
                      </button>
                    </div>
                  </div>

                  {/* Dropdown com detalhes expandidos */}
                  {expandedOrder === order.id && (
                    <div className="mt-4 pt-4 border-t bg-gray-50 -mx-4 px-4 pb-4 rounded-b-lg">
                      <h5 className="font-medium text-gray-900 mb-3">Detalhes do pedido</h5>
                      
                      {/* Itens detalhados */}
                      <div className="space-y-3 mb-4">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex items-center justify-between py-2 border-b border-gray-200 last:border-b-0">
                            <div className="flex-1">
                              <p className="font-medium text-gray-900">{item.name}</p>
                              {item.observation && (
                                <p className="text-xs text-orange-600">{item.observation}</p>
                              )}
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium">
                                {item.quantity}x × R$ {item.price.toFixed(2)}
                              </p>
                              <p className="text-sm font-bold text-orange-600">
                                R$ {(item.price * item.quantity).toFixed(2)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Resumo financeiro */}
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Subtotal</span>
                          <span>R$ {(order.total - 5).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Taxa de entrega</span>
                          <span>R$ 5,00</span>
                        </div>
                        <div className="flex justify-between font-bold text-base pt-2 border-t">
                          <span>Total</span>
                          <span className="text-orange-600">R$ {order.total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                )
              })
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {Object.keys(groupedHistoryOrders).length === 0 ? (
              <div className="bg-white rounded-lg p-8 text-center">
                <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Nenhum pedido no histórico
                </h3>
                <p className="text-gray-600">
                  Seus pedidos anteriores aparecerão aqui
                </p>
              </div>
            ) : (
              Object.entries(groupedHistoryOrders).map(([dateGroup, groupOrders]) => (
                <div key={dateGroup}>
                  {/* Date header */}
                  <h3 className="text-sm font-medium text-gray-600 mb-3">
                    {dateGroup}
                  </h3>
                  
                  {/* Orders for this date */}
                  <div className="space-y-3">
                    {groupOrders.map((order) => {
                      // Buscar dados reais do feirante
                      const feiranteData = feirantes.find(f => f.name === order.feiranteName)
                      
                      return (
                      <div key={order.id} className="bg-white rounded-lg shadow-sm p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            {feiranteData?.avatar ? (
                              <div className="w-12 h-12 rounded-lg overflow-hidden">
                                <Image
                                  src={feiranteData.avatar}
                                  alt={order.feiranteName}
                                  width={48}
                                  height={48}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            ) : (
                              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                                <span className="text-2xl">🏪</span>
                              </div>
                            )}
                            <div>
                              <h4 className="font-medium text-gray-900">{order.feiranteName}</h4>
                            </div>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="p-2"
                            onClick={() => {
                              if (onSelectFeirante && feiranteData) {
                                onSelectFeirante(feiranteData)
                              }
                              onScreenChange("feirante")
                            }}
                          >
                            <ChevronRight className="w-4 h-4" />
                          </Button>
                        </div>
                        
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-5 h-5 flex items-center justify-center">
                            <Image
                              src="/check-icon.svg"
                              alt="Pedido concluído"
                              width={20}
                              height={20}
                              className="w-5 h-5"
                            />
                          </div>
                          <span className="text-sm text-gray-600">
                            {order.status === 'entregue' ? 'Pedido concluído' : getStatusText(order.status)}
                          </span>
                          <span className="text-sm text-gray-400">• N° {order.id}</span>
                        </div>
                        
                        <div className="space-y-1 mb-3">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex items-center gap-3">
                              <div className="w-4 h-4 bg-gray-100 rounded flex items-center justify-center">
                                <span className="text-xs font-semibold text-gray-700">
                                  {item.quantity}
                                </span>
                              </div>
                              <span className="text-sm text-gray-600 flex-1">
                                {item.name}
                              </span>
                            </div>
                          ))}
                        </div>
                        
                        <div className="pt-3 border-t">
                          <div className="mb-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm text-gray-600">Avaliação</span>
                              <span className="text-xs font-bold text-gray-800 cursor-pointer">
                                Avalie seu pedido →
                              </span>
                            </div>
                            <div className="flex gap-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className="w-4 h-4 text-gray-300 hover:text-yellow-400 cursor-pointer"
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="pt-4 border-t">
                          <div className="flex gap-20">
                            <button 
                              className="text-orange-500 font-medium text-sm py-2 pl-12"
                              onClick={() => toggleOrderDetails(order.id)}
                            >
                              {expandedOrder === order.id ? 'Ocultar' : 'Detalhes'}
                            </button>
                            <button 
                              className="text-orange-500 font-medium text-sm py-2"
                              onClick={() => openChatModal(feiranteData?.id || order.feiranteName, order.feiranteName)}
                            >
                              Falar com vendedor
                            </button>
                          </div>
                        </div>

                        {/* Dropdown com detalhes expandidos */}
                        {expandedOrder === order.id && (
                          <div className="mt-4 pt-4 border-t bg-gray-50 -mx-4 px-4 pb-4 rounded-b-lg">
                            <h5 className="font-medium text-gray-900 mb-3">Detalhes do pedido</h5>
                            
                            {/* Itens detalhados */}
                            <div className="space-y-3 mb-4">
                              {order.items.map((item, index) => (
                                <div key={index} className="flex items-center justify-between py-2 border-b border-gray-200 last:border-b-0">
                                  <div className="flex-1">
                                    <p className="font-medium text-gray-900">{item.name}</p>
                                    {item.observation && (
                                      <p className="text-xs text-orange-600">{item.observation}</p>
                                    )}
                                  </div>
                                  <div className="text-right">
                                    <p className="text-sm font-medium">
                                      {item.quantity}x × R$ {item.price.toFixed(2)}
                                    </p>
                                    <p className="text-sm font-bold text-orange-600">
                                      R$ {(item.price * item.quantity).toFixed(2)}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>

                            {/* Resumo financeiro */}
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-600">Subtotal</span>
                                <span>R$ {(order.total - 5).toFixed(2)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Taxa de entrega</span>
                                <span>R$ 5,00</span>
                              </div>
                              <div className="flex justify-between font-bold text-base pt-2 border-t">
                                <span>Total</span>
                                <span className="text-orange-600">R$ {order.total.toFixed(2)}</span>
                              </div>
                            </div>

                            {/* Data de entrega */}
                            {order.deliveredAt && (
                              <div className="mt-4 pt-3 border-t">
                                <div className="flex justify-between text-sm">
                                  <span className="text-gray-600">Entregue em</span>
                                  <span className="font-medium">
                                    {new Date(order.deliveredAt).toLocaleDateString('pt-BR', {
                                      day: '2-digit',
                                      month: '2-digit',
                                      year: 'numeric',
                                      hour: '2-digit',
                                      minute: '2-digit'
                                    })}
                                  </span>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                      )
                    })}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      <ClientBottomNavigation 
        onScreenChange={onScreenChange} 
        currentScreen="orders" 
      />

      {/* Chat Modal */}
      <ChatModal
        isOpen={chatModal.isOpen}
        onClose={closeChatModal}
        feiranteId={chatModal.feiranteId}
        feiranteName={chatModal.feiranteName}
      />
    </div>
  )
}
