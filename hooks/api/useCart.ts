'use client'

import { useState, useEffect, useCallback } from 'react'
import { cartService, CartItem, Cart } from '../../lib/api/orderService'

export function useCart() {
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
    const newCart = cartService.addToCart(product, quantity)
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

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    updateObservation,
    clearCart,
    getItemsByFeirante
  }
}
