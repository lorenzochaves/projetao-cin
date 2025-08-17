"use client"

import { useState } from "react"
import { ChevronLeft, ChevronDown, ChevronRight, Clock, MapPin, Phone, User, Store, BarChart3, Settings } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useMarketer, MarketerOrder } from "@/hooks/api/useMarketer"
import { toast } from "sonner"

interface MarketerOrdersPageProps {
  onScreenChange?: (screen: string) => void
}

export default function MarketerOrdersPage({ onScreenChange }: MarketerOrdersPageProps) {
  const { orders, stats, updateOrderStatus, getOrdersByStatus } = useMarketer("1")
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    pendente: true
  })

  const handleStatusUpdate = async (orderId: string, newStatus: MarketerOrder['status']) => {
    try {
      updateOrderStatus(orderId, newStatus)
      
      const statusMessages: Record<string, string> = {
        preparando: "Pedido aceito e em preparação",
        pronto: "Pedido marcado como pronto",
        entregue: "Pedido marcado como entregue",
        cancelado: "Pedido cancelado"
      }
      
      toast.success(statusMessages[newStatus] || "Status atualizado")
    } catch (error) {
      console.error('Erro ao atualizar status:', error)
      toast.error("Erro ao atualizar status do pedido")
    }
  }

  const toggleSection = (status: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [status]: !prev[status]
    }))
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusColor = (status: MarketerOrder['status']) => {
    switch (status) {
      case 'pendente': return 'bg-red-50 border-red-200'
      case 'preparando': return 'bg-yellow-50 border-yellow-200'
      case 'pronto': return 'bg-blue-50 border-blue-200'
      case 'entregue': return 'bg-green-50 border-green-200'
      case 'cancelado': return 'bg-gray-50 border-gray-200'
      default: return 'bg-gray-50 border-gray-200'
    }
  }

  const getNextStatus = (currentStatus: MarketerOrder['status']): MarketerOrder['status'] | null => {
    switch (currentStatus) {
      case 'pendente': return 'preparando'
      case 'preparando': return 'pronto'
      case 'pronto': return 'entregue'
      default: return null
    }
  }

  const getNextStatusLabel = (currentStatus: MarketerOrder['status']): string => {
    switch (currentStatus) {
      case 'pendente': return 'Aceitar pedido'
      case 'preparando': return 'Marcar como pronto'
      case 'pronto': return 'Marcar como entregue'
      default: return ''
    }
  }

  const statusSections = [
    { key: 'pendente', label: 'Pedidos Pendentes', orders: getOrdersByStatus('pendente'), priority: true },
    { key: 'preparando', label: 'Em Preparação', orders: getOrdersByStatus('preparando'), priority: true },
    { key: 'pronto', label: 'Prontos para Entrega', orders: getOrdersByStatus('pronto'), priority: true },
    { key: 'entregue', label: 'Entregues', orders: getOrdersByStatus('entregue'), priority: false },
    { key: 'cancelado', label: 'Cancelados', orders: getOrdersByStatus('cancelado'), priority: false }
  ]

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="px-4 py-4">
          <div className="flex items-center mb-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="mr-2"
              onClick={() => onScreenChange?.("home")}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <h1 className="text-xl font-bold">Pedidos</h1>
          </div>
          
          {/* Quick Stats */}
          <div className="flex gap-6 text-center">
            <div>
              <p className="text-2xl font-bold text-red-600">{getOrdersByStatus('pendente').length}</p>
              <p className="text-xs text-gray-600">Pendentes</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-yellow-600">{getOrdersByStatus('preparando').length}</p>
              <p className="text-xs text-gray-600">Preparando</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600">{getOrdersByStatus('pronto').length}</p>
              <p className="text-xs text-gray-600">Prontos</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">{getOrdersByStatus('entregue').length}</p>
              <p className="text-xs text-gray-600">Entregues</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-4">
        {statusSections.map((section) => (
          <Card key={section.key} className={section.priority ? getStatusColor(section.key as MarketerOrder['status']) : ''}>
            <Collapsible 
              open={expandedSections[section.key]} 
              onOpenChange={() => toggleSection(section.key)}
            >
              <CollapsibleTrigger className="w-full">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      {section.label}
                      <Badge variant={section.priority ? "destructive" : "secondary"}>
                        {section.orders.length}
                      </Badge>
                    </CardTitle>
                    <ChevronDown className={`h-5 w-5 transition-transform ${expandedSections[section.key] ? 'rotate-180' : ''}`} />
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              
              <CollapsibleContent>
                <CardContent className="pt-0">
                  {section.orders.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">Nenhum pedido {section.label.toLowerCase()}</p>
                  ) : (
                    <div className="space-y-3">
                      {section.orders.map((order) => (
                        <Card key={order.id} className="bg-white border shadow-sm">
                          <CardContent className="p-4">
                            <div className="space-y-3">
                              {/* Order Header */}
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <h3 className="font-semibold">
                                    Pedido #{order.id.slice(-8).toUpperCase()}
                                  </h3>
                                  <Badge variant="outline">
                                    R$ {order.total.toFixed(2)}
                                  </Badge>
                                </div>
                                <div className="text-xs text-gray-500">
                                  {formatDate(order.createdAt)}
                                </div>
                              </div>

                              {/* Customer Info */}
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <User className="h-4 w-4" />
                                <span>Cliente: {order.clientName || `Cliente ${order.clientId}`}</span>
                              </div>

                              {/* Delivery Address */}
                              <div className="flex items-start gap-2 text-sm text-gray-600">
                                <MapPin className="h-4 w-4 mt-0.5" />
                                <div>
                                  <p>{order.deliveryAddress.street}</p>
                                  <p>{order.deliveryAddress.neighborhood}, {order.deliveryAddress.city}</p>
                                </div>
                              </div>

                              {/* Estimated Delivery */}
                              {order.estimatedDelivery && (
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                  <Clock className="h-4 w-4" />
                                  <span>Entrega prevista: {formatDate(order.estimatedDelivery)}</span>
                                </div>
                              )}

                              {/* Items */}
                              <div className="bg-gray-50 rounded-lg p-3">
                                <h4 className="font-medium text-sm mb-2">Itens do pedido:</h4>
                                <div className="space-y-1">
                                  {order.items.map((item, index) => (
                                    <div key={index} className="flex justify-between text-sm">
                                      <span>
                                        {item.selectedWeight ? 
                                          `${item.selectedWeight}kg ${item.name}` : 
                                          `${item.quantity}x ${item.name}`
                                        }
                                        {item.observation && (
                                          <span className="text-gray-500 text-xs block">
                                            Obs: {item.observation}
                                          </span>
                                        )}
                                      </span>
                                      <span>
                                        R$ {(item.selectedWeight ? 
                                          item.price * item.selectedWeight : 
                                          item.price * item.quantity
                                        ).toFixed(2)}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Action Buttons */}
                              <div className="flex gap-2 pt-2">
                                {getNextStatus(order.status) && (
                                  <Button
                                    size="sm"
                                    className="flex-1 bg-orange-500 hover:bg-orange-600"
                                    onClick={() => handleStatusUpdate(order.id, getNextStatus(order.status)!)}
                                  >
                                    {getNextStatusLabel(order.status)}
                                  </Button>
                                )}
                                
                                {order.status === 'pendente' && (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="text-red-600 border-red-300 hover:bg-red-50"
                                    onClick={() => handleStatusUpdate(order.id, 'cancelado')}
                                  >
                                    Recusar
                                  </Button>
                                )}

                                <Button size="sm" variant="outline" className="px-3">
                                  <Phone className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        ))}

        {/* Empty State */}
        {orders.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum pedido ainda</h3>
              <p className="text-gray-600">Os pedidos dos clientes aparecerão aqui</p>
              <p className="text-sm text-gray-500 mt-2">
                Certifique-se de ter produtos cadastrados para receber pedidos
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
