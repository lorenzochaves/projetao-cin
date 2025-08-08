'use client'

import { useSearchParams } from 'next/navigation'
import Link from "next/link"
import { ChevronLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { MarketerBottomNavigation } from "@/components/ui/bottom-navigation"

export default function OrderDetailPage() {
  const searchParams = useSearchParams()
  const status = searchParams.get('status') || 'pendente'

  const handleAcceptOrder = () => {
    // Navigate to separacao state
    window.location.href = '/MarketerOrders/order-detail?status=separacao'
  }

  const handleReadyForDelivery = () => {
    // Navigate to entrega state  
    window.location.href = '/MarketerOrders/order-detail?status=entrega'
  }

  const handleOrderReady = () => {
    // Navigate to pronto state
    window.location.href = '/MarketerOrders/order-detail?status=pronto'
  }

  // Replace the entire content div with state-based rendering:
  const renderContent = () => {
    switch (status) {
      case 'separacao':
        return (
          <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
            <p className="text-center text-lg mb-8">
              O entregador Leonardo José está indo até a sua banca para retirar o pedido!
            </p>
            <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center mb-8">
              <span className="text-gray-500">Ilustração da etapa</span>
            </div>
            <Button 
              onClick={handleOrderReady}
              className="w-full max-w-xs h-12 bg-gray-800 hover:bg-gray-900 rounded-full"
            >
              Já deixei com o entregador
            </Button>
          </div>
        )
      
      case 'entrega':
        return (
          <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
            <p className="text-center text-lg mb-8">
              O pedido está indo até o seu cliente
            </p>
            <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center">
              <span className="text-gray-500">Ilustração da etapa</span>
            </div>
          </div>
        )
      
      case 'entregue':
        return (
          <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
            <p className="text-center text-lg mb-8">
              Eba! Seu cliente já recebeu o pedido
            </p>
            <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center">
              <span className="text-gray-500">Ilustração da etapa</span>
            </div>
          </div>
        )
      
      case 'pronto':
        return (
          <div className="space-y-6">
            {/* Product list - same as pendente */}
            <div>
              <h2 className="text-lg font-bold mb-4">Produtos</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">Banana prata</h3>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Madura</span>
                    <span>2kg</span>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold">Batata inglesa</h3>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Pequena</span>
                    <span>1kg</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Grande</span>
                    <span>1,5kg</span>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold">Alface roxa</h3>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span></span>
                    <span>2 un.</span>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold">Mamão havaí</h3>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Maduro</span>
                    <span>2 un.</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Verde</span>
                    <span>3 un.</span>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold">Ovos</h3>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Bj. 12 ovos brancos</span>
                    <span>1 un.</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Bj. 6 ovos caipiras</span>
                    <span>1 un.</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center py-6">
              <p className="text-sm text-gray-600 mb-2">Algum problema?</p>
              <p className="text-sm text-gray-600 mb-6">Fale com o cliente</p>
              
              <Button 
                onClick={handleReadyForDelivery}
                className="w-full max-w-xs h-12 bg-gray-800 hover:bg-gray-900 rounded-full"
              >
                Pedido pronto
              </Button>
            </div>
          </div>
        )
      
      default: // pendente
        return (
          <div className="space-y-6">
            {/* Original order detail content */}
            <div>
              <h2 className="text-lg font-bold mb-4">Produtos</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">Banana prata</h3>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Madura</span>
                    <span>2kg</span>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold">Batata inglesa</h3>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Pequena</span>
                    <span>1kg</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Grande</span>
                    <span>1,5kg</span>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold">Alface roxa</h3>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span></span>
                    <span>2 un.</span>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold">Mamão havaí</h3>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Maduro</span>
                    <span>2 un.</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Verde</span>
                    <span>3 un.</span>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold">Ovos</h3>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Bj. 12 ovos brancos</span>
                    <span>1 un.</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Bj. 6 ovos caipiras</span>
                    <span>1 un.</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">Valor total</span>
                <span className="text-lg font-bold">R$ XX</span>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Cliente</h3>
              <p className="text-gray-700">Marcela Silva</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Entrega</h3>
              <p className="text-gray-700">xx/xx - manhã</p>
            </div>
            
            <div className="text-center py-6">
              <p className="text-sm text-gray-600 mb-2">Algum problema?</p>
              <p className="text-sm text-gray-600 mb-6">Fale com o cliente</p>
              
              <Button 
                onClick={handleAcceptOrder}
                className="w-full max-w-xs h-12 bg-gray-800 hover:bg-gray-900 rounded-full"
              >
                Aceitar pedido
              </Button>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="px-4 py-4 pb-24">
        <div className="flex items-center mb-6">
          <Link href="/MarketerOrders">
            <Button variant="ghost" size="icon" className="mr-2">
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">Pedido nº xxx</h1>
        </div>
        
        {renderContent()}
      </div>
      
      <MarketerBottomNavigation />
    </div>
  )
}
