"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, Trash2, Plus, Minus, X, ChevronRight, ShoppingBasket } from "lucide-react"
import { Screen, CartItem } from "../types"
import { ClientBottomNavigation } from "../components/BottomNav"
import { useCart } from "@/hooks/api/useCart"

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

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  const deliveryFee = 5.0
  const finalTotal = cartTotal + deliveryFee

  return (
    <div className="min-h-screen bg-white pb-16">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pt-12 border-b">
        <Button variant="ghost" size="sm" onClick={() => onScreenChange("home")}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-lg font-bold">Minha feira</h1>
        <Button variant="ghost" size="sm" onClick={handleClearCart}>
          <Trash2 className="w-5 h-5" />
        </Button>
      </div>

      {/* Progress */}
      <div className="px-4 py-6">
        <div className="flex items-center gap-2 mb-6">
          <div className="flex-1 h-1 bg-black rounded"></div>
          <div className="flex-1 h-1 bg-gray-200 rounded"></div>
          <div className="flex-1 h-1 bg-gray-200 rounded"></div>
        </div>
      </div>

      {/* Cart Items */}
      <div className="px-4">
        {cart.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingBasket className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Sua feira está vazia</p>
          </div>
        ) : (
          <>
            {cart.map((item, index) => (
              <div key={`${item.id}-${item.feirante}-${index}`}>
                {index === 0 || cart[index - 1].feirante !== item.feirante ? (
                  <h3 className="font-bold text-lg mb-3 mt-6 first:mt-0">{item.feirante}</h3>
                ) : null}

                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    {item.observation && <p className="text-xs text-gray-500 mt-1">Obs: {item.observation}</p>}
                  </div>
                  <div className="flex items-center gap-3">
                    <Button variant="ghost" size="sm" onClick={() => handleUpdateQuantity(item.id, item.feirante, -1)}>
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button variant="ghost" size="sm" onClick={() => handleUpdateQuantity(item.id, item.feirante, 1)}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="w-16 text-right">
                    <p className="text-sm">R$ {(item.price * item.quantity).toFixed(2)}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveFromCart(item.id)}
                      className="p-0 h-auto"
                    >
                      <X className="w-3 h-3 text-gray-400" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}

            <Button variant="link" className="text-blue-500 mt-4 p-0">
              Esqueceu de algo?
            </Button>

            {/* Resumo */}
            <div className="mt-8 space-y-2">
              <h3 className="font-bold text-lg mb-4">Resumo</h3>
              <div className="flex justify-between">
                <span>Feira</span>
                <span>R$ {cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxa de entrega</span>
                <span>R$ {deliveryFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t">
                <span>Total</span>
                <span>R$ {finalTotal.toFixed(2)}</span>
              </div>
            </div>

            <Button
              className="w-full mt-8 bg-black text-white rounded-full py-3"
              onClick={() => onScreenChange("delivery")}
            >
              Ir para entrega
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </>
        )}
      </div>

      <ClientBottomNavigation 
        cart={cart}
        onScreenChange={onScreenChange} 
        currentScreen="cart" 
      />
    </div>
  )
}
