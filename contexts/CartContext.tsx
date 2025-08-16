'use client'

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'
import { cartService, CartItem, Cart } from '../lib/api/orderService'

interface CartContextType {
  cart: Cart
  addToCart: (product: Omit<CartItem, 'quantity'>, quantity?: number) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  updateObservation: (productId: string, observation: string) => void
  clearCart: () => void
  getItemsByFeirante: () => { feiranteId: string; feiranteName: string; items: CartItem[]; total: number; }[]
}

const CartContext = createContext<CartContextType | undefined>(undefined)

interface CartProviderProps {
  children: ReactNode
}

export function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<Cart>({
    items: [],
    total: 0,
    itemCount: 0
  })

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = cartService.getCart()
    setCart(savedCart)
  }, [])

  const addToCart = useCallback((product: Omit<CartItem, 'quantity'>, quantity: number = 1) => {
    console.log('CartContext.addToCart chamado com:', { product, quantity })
    const newCart = cartService.addToCart(product, quantity)
    console.log('Novo carrinho após adicionar:', newCart)
    setCart(newCart)
  }, [])

  const removeFromCart = useCallback((productId: string) => {
    const newCart = cartService.removeFromCart(productId)
    setCart(newCart)
  }, [])

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    const newCart = cartService.updateQuantity(productId, quantity)
    setCart(newCart)
  }, [])

  const updateObservation = useCallback((productId: string, observation: string) => {
    const newCart = cartService.updateObservation(productId, observation)
    setCart(newCart)
  }, [])

  const clearCart = useCallback(() => {
    cartService.clearCart()
    setCart({ items: [], total: 0, itemCount: 0 })
  }, [])

  const getItemsByFeirante = useCallback(() => {
    return cartService.getItemsByFeirante()
  }, [cart.items])

  const value: CartContextType = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    updateObservation,
    clearCart,
    getItemsByFeirante
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
