'use client'

import { useState, useCallback } from 'react'

export interface CartItem {
  productId: string
  name: string
  price: number
  quantity: number
  unit: string
  feiranteId: string
  feiranteName: string
  image: string
  observation?: string
}

export interface Cart {
  items: CartItem[]
  total: number
  itemCount: number
}

export function useCart() {
  const [cart, setCart] = useState<Cart>({
    items: [],
    total: 0,
    itemCount: 0
  })

  const calculateTotal = useCallback((items: CartItem[]) => {
    return items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  }, [])

  const calculateItemCount = useCallback((items: CartItem[]) => {
    return items.reduce((sum, item) => sum + item.quantity, 0)
  }, [])

  const addToCart = useCallback((product: Omit<CartItem, 'quantity'>, quantity: number = 1) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.items.findIndex(
        item => item.productId === product.productId
      )

      let newItems: CartItem[]

      if (existingItemIndex >= 0) {
        // Update existing item
        newItems = [...prevCart.items]
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: newItems[existingItemIndex].quantity + quantity
        }
      } else {
        // Add new item
        newItems = [...prevCart.items, { ...product, quantity }]
      }

      return {
        items: newItems,
        total: calculateTotal(newItems),
        itemCount: calculateItemCount(newItems)
      }
    })
  }, [calculateTotal, calculateItemCount])

  const removeFromCart = useCallback((productId: string) => {
    setCart(prevCart => {
      const newItems = prevCart.items.filter(item => item.productId !== productId)
      return {
        items: newItems,
        total: calculateTotal(newItems),
        itemCount: calculateItemCount(newItems)
      }
    })
  }, [calculateTotal, calculateItemCount])

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }

    setCart(prevCart => {
      const newItems = prevCart.items.map(item =>
        item.productId === productId ? { ...item, quantity } : item
      )
      return {
        items: newItems,
        total: calculateTotal(newItems),
        itemCount: calculateItemCount(newItems)
      }
    })
  }, [calculateTotal, calculateItemCount, removeFromCart])

  const updateObservation = useCallback((productId: string, observation: string) => {
    setCart(prevCart => {
      const newItems = prevCart.items.map(item =>
        item.productId === productId ? { ...item, observation } : item
      )
      return {
        ...prevCart,
        items: newItems
      }
    })
  }, [])

  const clearCart = useCallback(() => {
    setCart({
      items: [],
      total: 0,
      itemCount: 0
    })
  }, [])

  const getItemsByFeirante = useCallback(() => {
    const grouped = cart.items.reduce((acc, item) => {
      if (!acc[item.feiranteId]) {
        acc[item.feiranteId] = {
          feiranteId: item.feiranteId,
          feiranteName: item.feiranteName,
          items: [],
          total: 0
        }
      }
      acc[item.feiranteId].items.push(item)
      acc[item.feiranteId].total += item.price * item.quantity
      return acc
    }, {} as Record<string, {
      feiranteId: string
      feiranteName: string
      items: CartItem[]
      total: number
    }>)

    return Object.values(grouped)
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
