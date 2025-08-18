"use client"

import { useState } from "react"
import { ChevronLeft, Clock, MapPin, MessageSquare, Truck, User, CheckCircle, AlertCircle, Package, Phone } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { useMarketer, MarketerOrder } from "@/hooks/api/useMarketer"
import { toast } from "sonner"

interface MarketerOrdersPageProps {
  onScreenChange?: (screen: string) => void
}

export default function MarketerOrdersPage({ onScreenChange }: MarketerOrdersPageProps) {
  const { orders, updateOrderStatus, getOrdersByStatus } = useMarketer("1")
  const [selectedCard, setSelectedCard] = useState('pendente')
  const [showChatModal, setShowChatModal] = useState(false)
  const [showDeliveryModal, setShowDeliveryModal] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<MarketerOrder | null>(null)
  const [chatMessage, setChatMessage] = useState('')

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

  const openChatModal = (order: MarketerOrder) => {
    setSelectedOrder(order)
    setShowChatModal(true)
  }

  const openDeliveryModal = (order: MarketerOrder) => {
    setSelectedOrder(order)
    setShowDeliveryModal(true)
  }

  const handleSendMessage = () => {
    if (chatMessage.trim() && selectedOrder) {
      toast.success("Mensagem enviada para o cliente!")
      setChatMessage('')
      setShowChatModal(false)
    }
  }

  const handleRequestDelivery = () => {
    if (selectedOrder) {
      toast.success("Entregador solicitado! Em breve ele entrará em contato.")
      setShowDeliveryModal(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusColor = (status: MarketerOrder['status']) => {
    switch (status) {
      case 'pendente': return 'text-red-600'
      case 'preparando': return 'text-yellow-600'
      case 'pronto': return 'text-blue-600'
      case 'entregue': return 'text-green-600'
      default: return 'text-gray-600'
    }
  }

  const getStatusIcon = (status: MarketerOrder['status']) => {
    switch (status) {
      case 'pendente': return <AlertCircle className="w-4 h-4" />
      case 'preparando': return <Clock className="w-4 h-4" />
      case 'pronto': return <Package className="w-4 h-4" />
      case 'entregue': return <CheckCircle className="w-4 h-4" />
      default: return <Clock className="w-4 h-4" />
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
      case 'pendente': return 'Aceitar Pedido'
      case 'preparando': return 'Marcar como Pronto'
      case 'pronto': return 'Marcar como Entregue'
      default: return ''
    }
  }

  const filteredOrders = selectedCard === 'todos' ? orders : getOrdersByStatus(selectedCard as MarketerOrder['status'])

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="px-4 py-6 pt-12">
          <div className="flex items-center mb-6">
            <Button 
              variant="ghost" 
              size="icon" 
              className="mr-2"
              onClick={() => onScreenChange?.("home")}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <h1 className="text-xl font-bold">Meus Pedidos</h1>
          </div>
          
          {/* Status Cards */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <Card 
              className={`p-4 cursor-pointer transition-all duration-200 border-2 ${
                selectedCard === 'pendente' 
                  ? 'bg-orange-50 border-orange-200 shadow-sm' 
                  : 'bg-white border-gray-100 hover:border-gray-200'
              }`}
              onClick={() => setSelectedCard('pendente')}
            >
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <AlertCircle className="w-6 h-6 text-red-500" />
                </div>
                <div className="text-2xl font-bold text-red-600 mb-1">
                  {getOrdersByStatus('pendente').length}
                </div>
                <div className="text-sm text-gray-600">Pendentes</div>
              </div>
            </Card>
            
            <Card 
              className={`p-4 cursor-pointer transition-all duration-200 border-2 ${
                selectedCard === 'preparando' 
                  ? 'bg-orange-50 border-orange-200 shadow-sm' 
                  : 'bg-white border-gray-100 hover:border-gray-200'
              }`}
              onClick={() => setSelectedCard('preparando')}
            >
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Clock className="w-6 h-6 text-yellow-500" />
                </div>
                <div className="text-2xl font-bold text-yellow-600 mb-1">
                  {getOrdersByStatus('preparando').length}
                </div>
                <div className="text-sm text-gray-600">Preparando</div>
              </div>
            </Card>
            
            <Card 
              className={`p-4 cursor-pointer transition-all duration-200 border-2 ${
                selectedCard === 'pronto' 
                  ? 'bg-orange-50 border-orange-200 shadow-sm' 
                  : 'bg-white border-gray-100 hover:border-gray-200'
              }`}
              onClick={() => setSelectedCard('pronto')}
            >
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Package className="w-6 h-6 text-blue-500" />
                </div>
                <div className="text-2xl font-bold text-blue-600 mb-1">
                  {getOrdersByStatus('pronto').length}
                </div>
                <div className="text-sm text-gray-600">Prontos</div>
              </div>
            </Card>
            
            <Card 
              className={`p-4 cursor-pointer transition-all duration-200 border-2 ${
                selectedCard === 'entregue' 
                  ? 'bg-orange-50 border-orange-200 shadow-sm' 
                  : 'bg-white border-gray-100 hover:border-gray-200'
              }`}
              onClick={() => setSelectedCard('entregue')}
            >
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                </div>
                <div className="text-2xl font-bold text-green-600 mb-1">
                  {getOrdersByStatus('entregue').length}
                </div>
                <div className="text-sm text-gray-600">Entregues</div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="px-4 py-6">
        {filteredOrders.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Nenhum pedido {selectedCard === 'todos' ? '' : selectedCard}
              </h3>
              <p className="text-gray-600">
                {selectedCard === 'pendente' 
                  ? 'Novos pedidos aparecerão aqui' 
                  : 'Os pedidos desta categoria aparecerão aqui'
                }
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <Card key={order.id} className="bg-white shadow-sm">
                <CardContent className="p-4">
                  {/* Header do pedido */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                        <User className="w-6 h-6 text-orange-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {order.clientName || `Cliente ${order.clientId.slice(-4)}`}
                        </h4>
                        <p className="text-sm text-gray-500">
                          Pedido #{order.id.slice(-8).toUpperCase()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`flex items-center gap-1 mb-1 ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        <span className="text-sm font-medium capitalize">
                          {order.status}
                        </span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        R$ {order.total.toFixed(2)}
                      </Badge>
                    </div>
                  </div>

                  {/* Informações do pedido */}
                  <div className="space-y-3 mb-4">
                    {/* Horário */}
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>Pedido feito: {formatDate(order.createdAt)}</span>
                      {order.status === 'pendente' && (
                        <Badge variant="destructive" className="ml-auto text-xs">
                          Novo
                        </Badge>
                      )}
                    </div>

                    {/* Endereço */}
                    <div className="flex items-start gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <div>
                        <p>{order.deliveryAddress.street}</p>
                        <p>{order.deliveryAddress.neighborhood}, {order.deliveryAddress.city}</p>
                      </div>
                    </div>

                    {/* Previsão de entrega */}
                    {order.estimatedDelivery && (
                      <div className="flex items-center gap-2 text-sm text-orange-600">
                        <Truck className="w-4 h-4" />
                        <span>Entregar até: {formatDate(order.estimatedDelivery)}</span>
                      </div>
                    )}

                    {/* Status de pagamento */}
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Status do pagamento:</span>
                      <Badge variant="default">
                        Pago
                      </Badge>
                    </div>
                  </div>

                  {/* Itens do pedido */}
                  <div className="bg-gray-50 rounded-lg p-3 mb-4">
                    <h5 className="font-medium text-sm mb-2 text-gray-900">
                      Itens do pedido ({order.items.length}):
                    </h5>
                    <div className="space-y-2">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="w-6 h-6 bg-white rounded flex items-center justify-center border">
                            <span className="text-xs font-semibold text-gray-700">
                              {item.selectedWeight ? 
                                `${item.selectedWeight}kg` : 
                                `${item.quantity}x`
                              }
                            </span>
                          </div>
                          <div className="flex-1">
                            <span className="text-sm text-gray-900">{item.name}</span>
                            {item.observation && (
                              <p className="text-xs text-orange-600 mt-1">
                                Obs: {item.observation}
                              </p>
                            )}
                          </div>
                          <span className="text-sm font-medium text-gray-900">
                            R$ {(item.selectedWeight ? 
                              item.price * item.selectedWeight : 
                              item.price * item.quantity
                            ).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Botões de ação */}
                  <div className="flex gap-2">
                    {getNextStatus(order.status) && (
                      <Button
                        size="sm"
                        className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
                        onClick={() => handleStatusUpdate(order.id, getNextStatus(order.status)!)}
                      >
                        {getNextStatusLabel(order.status)}
                      </Button>
                    )}
                    
                    <Button
                      size="sm"
                      variant="outline"
                      className="px-3"
                      onClick={() => openChatModal(order)}
                    >
                      <MessageSquare className="w-4 h-4" />
                    </Button>

                    {(order.status === 'pronto' || order.status === 'preparando') && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="px-3"
                        onClick={() => openDeliveryModal(order)}
                      >
                        <Truck className="w-4 h-4" />
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
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Modal de Chat */}
      <Dialog open={showChatModal} onOpenChange={setShowChatModal}>
        <DialogContent className="sm:max-w-md max-w-[90vw] rounded-2xl p-6">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-orange-500" />
              Chat com Cliente
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {selectedOrder && (
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-sm font-medium text-gray-900">
                  {selectedOrder.clientName || `Cliente ${selectedOrder.clientId.slice(-4)}`}
                </p>
                <p className="text-xs text-gray-500">
                  Pedido #{selectedOrder.id.slice(-8).toUpperCase()}
                </p>
              </div>
            )}
            
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Sua mensagem:
              </label>
              <Textarea
                placeholder="Digite aqui sua mensagem para o cliente..."
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                rows={4}
              />
            </div>
            
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                onClick={() => setShowChatModal(false)}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button 
                onClick={handleSendMessage}
                disabled={!chatMessage.trim()}
                className="flex-1 bg-orange-500 hover:bg-orange-600"
              >
                Enviar Mensagem
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de Solicitação de Entregador */}
      <Dialog open={showDeliveryModal} onOpenChange={setShowDeliveryModal}>
        <DialogContent className="sm:max-w-md max-w-[90vw] rounded-2xl p-6">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Truck className="w-5 h-5 text-orange-500" />
              Solicitar Entregador
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {selectedOrder && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Detalhes da entrega:</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Pedido:</span>
                    <span>#{selectedOrder.id.slice(-8).toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cliente:</span>
                    <span>{selectedOrder.clientName || `Cliente ${selectedOrder.clientId.slice(-4)}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Valor:</span>
                    <span className="font-medium">R$ {selectedOrder.total.toFixed(2)}</span>
                  </div>
                  <div className="pt-2 border-t">
                    <p className="text-gray-600 mb-1">Endereço:</p>
                    <p className="text-gray-900">{selectedOrder.deliveryAddress.street}</p>
                    <p className="text-gray-900">{selectedOrder.deliveryAddress.neighborhood}, {selectedOrder.deliveryAddress.city}</p>
                  </div>
                </div>
              </div>
            )}
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900 mb-1">
                    Como funciona?
                  </h4>
                  <p className="text-sm text-blue-700">
                    Um entregador parceiro entrará em contato em até 10 minutos para retirar o pedido.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                onClick={() => setShowDeliveryModal(false)}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button 
                onClick={handleRequestDelivery}
                className="flex-1 bg-orange-500 hover:bg-orange-600"
              >
                Solicitar Entregador
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
