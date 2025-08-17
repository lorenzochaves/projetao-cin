"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Trash2, Plus, Minus, X, ChevronRight, ShoppingBasket, MapPin, Star } from "lucide-react"
import { Screen, CartItem } from "../types"
import { ClientBottomNavigation } from "../components/BottomNav"
import { useCart } from "@/contexts/CartContext"
import Image from "next/image"
import { getFeirantes } from "@/lib/utils"

interface CartPageProps {
  cart: CartItem[]
  onScreenChange: (screen: Screen) => void
  onUpdateQuantity?: (id: string, feirante: string, change: number) => void
  onRemoveFromCart?: (id: string, feirante: string) => void
  onClearCart?: () => void
}

export default function CartPage({ 
  cart: propCart, 
  onScreenChange, 
  onUpdateQuantity, 
  onRemoveFromCart, 
  onClearCart 
}: CartPageProps) {
  const { cart: hookCart, updateQuantity, removeFromCart, clearCart } = useCart()
  
  // Usar o cart do hook diretamente em vez do prop
  const cart = hookCart.items.map(item => ({
    id: item.productId,
    name: item.name,
    price: item.price,
    unit: item.unit,
    image: item.image,
    category: 'geral',
    quantity: item.quantity,
    feirante: item.feiranteName,
    observation: item.observation
  }))
  
  console.log('🛒 CartComponent - hookCart:', hookCart)
  console.log('🛒 CartComponent - cart convertido:', cart)
  
  // Usar as funções do useCart hook em vez das props
  const handleUpdateQuantity = (productId: string, feiranteName: string, change: number) => {
    console.log('🔄 CartComponent.handleUpdateQuantity:', { productId, feiranteName, change })
    const cartItem = cart.find(item => item.id === productId && item.feirante === feiranteName)
    console.log('🔍 Item encontrado:', cartItem)
    if (cartItem) {
      const newQuantity = Math.max(0, cartItem.quantity + change)
      console.log('➕ Nova quantidade:', newQuantity)
      // Usar o productId que corresponde ao hookCart (que usa productId, não id)
      updateQuantity(productId, newQuantity)
    }
  }

  const handleRemoveFromCart = (productId: string) => {
    console.log('🗑️ CartComponent.handleRemoveFromCart:', productId)
    removeFromCart(productId)
  }

  const handleClearCart = () => {
    console.log('🗑️ CartComponent.handleClearCart')
    clearCart()
  }

  // Agrupar itens por feirante para melhor organização
  const groupedItems = cart.reduce((groups, item) => {
    const feiranteName = item.feirante
    if (!groups[feiranteName]) {
      groups[feiranteName] = []
    }
    groups[feiranteName].push(item)
    return groups
  }, {} as Record<string, typeof cart>)

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  const deliveryFee = 5.0
  const finalTotal = cartTotal + deliveryFee
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0)

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="px-4 py-4 pt-12">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold">Meu Carrinho</h1>
            {cart.length > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleClearCart}
                className="text-red-600 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Limpar
              </Button>
            )}
          </div>
          
          {/* Progress indicator */}
          <div className="flex items-center gap-2">
            <div className="flex-1 h-2 bg-orange-500 rounded-full"></div>
            <div className="flex-1 h-2 bg-gray-200 rounded-full"></div>
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
      <div className="flex-1">
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-4">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <ShoppingBasket className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Seu carrinho está vazio</h3>
            <p className="text-gray-600 text-center mb-6">
              Que tal adicionar alguns produtos frescos da feira?
            </p>
            <Button 
              onClick={() => onScreenChange("home")}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8"
            >
              Começar a comprar
            </Button>
          </div>
        ) : (
          <div className="p-4 space-y-4">
            {/* Items counter */}
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-gray-600">
                  {totalItems} {totalItems === 1 ? 'item' : 'itens'} no carrinho
                </p>
                <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                  {Object.keys(groupedItems).length} {Object.keys(groupedItems).length === 1 ? 'feirante' : 'feirantes'}
                </Badge>
              </div>
            </div>

            {/* Items by feirante */}
            {Object.entries(groupedItems).map(([feiranteName, items]) => {
              const feiranteTotal = items.reduce((total, item) => total + item.price * item.quantity, 0)
              // Buscar dados reais do feirante
              const allFeirantes = getFeirantes()
              const feiranteData = allFeirantes.find(f => f.name === feiranteName)
              
              return (
                <div key={feiranteName} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  {/* Feirante header */}
                  <div className="p-4 bg-gray-50 border-b">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {feiranteData?.avatar ? (
                          <div className="w-10 h-10 rounded-full overflow-hidden">
                            <Image
                              src={feiranteData.avatar}
                              alt={feiranteName}
                              width={40}
                              height={40}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-medium text-sm">
                              {feiranteName.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        )}
                        <div>
                          <h3 className="font-medium text-gray-900">{feiranteName}</h3>
                          <div className="flex items-center gap-1 text-xs text-gray-600">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            <span>{feiranteData?.rating || '4.8'}</span>
                            <span>•</span>
                            <MapPin className="w-3 h-3" />
                            <span>{feiranteData?.location || 'Central do Recife'}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">R$ {feiranteTotal.toFixed(2)}</p>
                        <p className="text-xs text-gray-600">{items.length} {items.length === 1 ? 'item' : 'itens'}</p>
                      </div>
                    </div>
                  </div>

                  {/* Items list */}
                  <div className="divide-y divide-gray-100">
                    {items.map((item, index) => (
                      <div key={`${item.id}-${index}`} className="p-4">
                        <div className="flex gap-3">
                          {/* Product image */}
                          <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                              src={item.image || '/placeholder.jpg'}
                              alt={item.name}
                              width={64}
                              height={64}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          {/* Product info */}
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-gray-900 mb-1">{item.name}</h4>
                            <p className="text-sm text-gray-600 mb-2">R$ {item.price.toFixed(2)} / {item.unit}</p>
                            {item.observation && (
                              <p className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded">
                                {item.observation}
                              </p>
                            )}
                          </div>

                          {/* Quantity controls */}
                          <div className="flex flex-col items-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveFromCart(item.id)}
                              className="p-1 h-auto text-gray-400 hover:text-red-600"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                            
                            <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleUpdateQuantity(item.id, item.feirante, -1)}
                                className="w-8 h-8 p-0 hover:bg-white"
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="w-3 h-3" />
                              </Button>
                              <span className="min-w-[2rem] text-center text-sm font-medium">
                                {item.quantity}
                              </span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleUpdateQuantity(item.id, item.feirante, 1)}
                                className="w-8 h-8 p-0 hover:bg-white"
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}

            {/* Continue shopping */}
            <Button 
              variant="outline" 
              className="w-full border-dashed border-gray-300 text-gray-600 hover:bg-gray-50"
              onClick={() => onScreenChange("home")}
            >
              <Plus className="w-4 h-4 mr-2" />
              Adicionar mais produtos
            </Button>
          </div>
        )}
      </div>

      {/* Footer with summary and checkout */}
      {cart.length > 0 && (
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
            onClick={() => onScreenChange("delivery")}
          >
            Continuar para entrega
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      )}

      <ClientBottomNavigation 
        onScreenChange={onScreenChange} 
        currentScreen="cart" 
      />
    </div>
  )
}
