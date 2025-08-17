'use client'

import { useState, useEffect, useCallback } from 'react'
import { getFromStorage, setToStorage, STORAGE_KEYS } from '@/lib/utils'

export interface MarketerProduct {
  id: string
  name: string
  price: number
  unit: string
  image: string
  category: string
  description?: string
  feiranteId: string
  feiranteName: string
  stock: number
  isAvailable: boolean
  unitType?: 'kg' | 'unidade' | 'maco' | 'mao' | 'bandeja' | 'cabeca'
  allowWeightSelection?: boolean
  minWeight?: number
  maxWeight?: number
  weightIncrement?: number
  variations?: Array<{id: string, name: string, description: string}>
  createdAt: string
  updatedAt: string
}

export interface MarketerStats {
  totalProducts: number
  totalOrders: number
  totalClients: number
  revenue: number
  todayOrders: number
  pendingOrders: number
  completedOrders: number
  monthlyRevenue: number
}

export interface MarketerOrder {
  id: string
  clientId: string
  clientName: string
  items: Array<{
    productId: string
    name: string
    price: number
    quantity: number
    selectedWeight?: number
    observation?: string
  }>
  total: number
  status: 'pendente' | 'preparando' | 'pronto' | 'entregue' | 'cancelado'
  createdAt: string
  estimatedDelivery?: string
  deliveryAddress: {
    street: string
    neighborhood: string
    city: string
    state: string
    zipCode: string
  }
  paymentMethod?: string
  observations?: string
}

export function useMarketer(feiranteId: string = "1") {
  const [products, setProducts] = useState<MarketerProduct[]>([])
  const [orders, setOrders] = useState<MarketerOrder[]>([])
  const [stats, setStats] = useState<MarketerStats>({
    totalProducts: 0,
    totalOrders: 0,
    totalClients: 0,
    revenue: 0,
    todayOrders: 0,
    pendingOrders: 0,
    completedOrders: 0,
    monthlyRevenue: 0
  })

  // Load data from localStorage on mount
  useEffect(() => {
    loadProducts()
    loadOrders()
    // Initialize with sample data if empty
    initializeSampleData()
  }, [feiranteId])

  // Calculate stats when products or orders change
  useEffect(() => {
    calculateStats()
  }, [products, orders])

  const loadProducts = useCallback(() => {
    const allProducts = getFromStorage<MarketerProduct[]>('feira_marketer_products') || []
    const feiranteProducts = allProducts.filter(p => p.feiranteId === feiranteId)
    setProducts(feiranteProducts)
  }, [feiranteId])

  const loadOrders = useCallback(() => {
    const allOrders = getFromStorage<MarketerOrder[]>('feira_marketer_orders') || []
    const feiranteOrders = allOrders.filter(o => o.items.some(item => item.productId.startsWith(feiranteId)))
    setOrders(feiranteOrders)
  }, [feiranteId])

  const initializeSampleData = useCallback(() => {
    const existingProducts = getFromStorage<MarketerProduct[]>('feira_marketer_products') || []
    const feiranteProducts = existingProducts.filter(p => p.feiranteId === feiranteId)
    
    // Add sample products if none exist
    if (feiranteProducts.length === 0) {
      const sampleProducts: Omit<MarketerProduct, 'id' | 'createdAt' | 'updatedAt'>[] = [
        {
          name: "Tomate Cereja",
          price: 8.50,
          unit: "kg",
          image: "/placeholder.jpg",
          category: "Frutas",
          description: "Tomates cereja frescos e doces, perfeitos para saladas",
          feiranteId: feiranteId,
          feiranteName: "João Silva",
          stock: 25,
          isAvailable: true,
          unitType: 'kg',
          allowWeightSelection: true,
          minWeight: 0.5,
          maxWeight: 3.0,
          weightIncrement: 0.1
        },
        {
          name: "Alface Crespa",
          price: 3.20,
          unit: "unidade",
          image: "/placeholder.jpg",
          category: "Verduras",
          description: "Alface crespa fresca, ideal para saladas",
          feiranteId: feiranteId,
          feiranteName: "João Silva",
          stock: 15,
          isAvailable: true,
          unitType: 'unidade',
          allowWeightSelection: false
        },
        {
          name: "Banana Prata",
          price: 6.80,
          unit: "kg",
          image: "/placeholder.jpg",
          category: "Frutas",
          description: "Bananas prata maduras e doces",
          feiranteId: feiranteId,
          feiranteName: "João Silva",
          stock: 30,
          isAvailable: true,
          unitType: 'kg',
          allowWeightSelection: true,
          minWeight: 0.5,
          maxWeight: 5.0,
          weightIncrement: 0.1
        }
      ]

      sampleProducts.forEach(productData => {
        const product: MarketerProduct = {
          ...productData,
          id: `${feiranteId}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }

        // Add to marketer products
        existingProducts.push(product)
        
        // Add to global products for clients
        const globalProducts = getFromStorage<any[]>(STORAGE_KEYS.PRODUCTS) || []
        globalProducts.push({
          ...product,
          feirante: productData.feiranteName
        })
        setToStorage(STORAGE_KEYS.PRODUCTS, globalProducts)
      })

      setToStorage('feira_marketer_products', existingProducts)
      console.log('🌱 Sample products initialized for feirante', feiranteId)
    }
  }, [feiranteId])

  const calculateStats = useCallback(() => {
    const today = new Date().toDateString()
    const thisMonth = new Date().getMonth()
    const thisYear = new Date().getFullYear()

    const todayOrders = orders.filter(o => new Date(o.createdAt).toDateString() === today)
    const monthlyOrders = orders.filter(o => {
      const orderDate = new Date(o.createdAt)
      return orderDate.getMonth() === thisMonth && orderDate.getFullYear() === thisYear
    })

    const uniqueClients = new Set(orders.map(o => o.clientId)).size
    const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0)
    const monthlyRevenue = monthlyOrders.reduce((sum, o) => sum + o.total, 0)

    setStats({
      totalProducts: products.length,
      totalOrders: orders.length,
      totalClients: uniqueClients,
      revenue: totalRevenue,
      todayOrders: todayOrders.length,
      pendingOrders: orders.filter(o => o.status === 'pendente').length,
      completedOrders: orders.filter(o => o.status === 'entregue').length,
      monthlyRevenue
    })
  }, [products, orders])

  const addProduct = useCallback((productData: Omit<MarketerProduct, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newProduct: MarketerProduct = {
      ...productData,
      id: `${feiranteId}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      feiranteId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    const allProducts = getFromStorage<MarketerProduct[]>('feira_marketer_products') || []
    const updatedProducts = [...allProducts, newProduct]
    setToStorage('feira_marketer_products', updatedProducts)
    
    // Also add to global products list for clients
    const globalProducts = getFromStorage<any[]>(STORAGE_KEYS.PRODUCTS) || []
    const globalProduct = {
      ...newProduct,
      feirante: productData.feiranteName
    }
    globalProducts.push(globalProduct)
    setToStorage(STORAGE_KEYS.PRODUCTS, globalProducts)

    loadProducts()
    return newProduct
  }, [feiranteId, loadProducts])

  const updateProduct = useCallback((productId: string, updates: Partial<MarketerProduct>) => {
    const allProducts = getFromStorage<MarketerProduct[]>('feira_marketer_products') || []
    const updatedProducts = allProducts.map(p => 
      p.id === productId 
        ? { ...p, ...updates, updatedAt: new Date().toISOString() }
        : p
    )
    setToStorage('feira_marketer_products', updatedProducts)

    // Update global products list
    const globalProducts = getFromStorage<any[]>(STORAGE_KEYS.PRODUCTS) || []
    const updatedGlobalProducts = globalProducts.map(p => 
      p.id === productId 
        ? { ...p, ...updates, updatedAt: new Date().toISOString() }
        : p
    )
    setToStorage(STORAGE_KEYS.PRODUCTS, updatedGlobalProducts)

    loadProducts()
  }, [loadProducts])

  const deleteProduct = useCallback((productId: string) => {
    const allProducts = getFromStorage<MarketerProduct[]>('feira_marketer_products') || []
    const updatedProducts = allProducts.filter(p => p.id !== productId)
    setToStorage('feira_marketer_products', updatedProducts)

    // Remove from global products list
    const globalProducts = getFromStorage<any[]>(STORAGE_KEYS.PRODUCTS) || []
    const updatedGlobalProducts = globalProducts.filter(p => p.id !== productId)
    setToStorage(STORAGE_KEYS.PRODUCTS, updatedGlobalProducts)

    loadProducts()
  }, [loadProducts])

  const updateOrderStatus = useCallback((orderId: string, status: MarketerOrder['status']) => {
    const allOrders = getFromStorage<MarketerOrder[]>('feira_marketer_orders') || []
    const updatedOrders = allOrders.map(o => 
      o.id === orderId 
        ? { ...o, status }
        : o
    )
    setToStorage('feira_marketer_orders', updatedOrders)

    // Also update in global orders
    const globalOrders = getFromStorage<any[]>(STORAGE_KEYS.ORDERS) || []
    const updatedGlobalOrders = globalOrders.map(o => 
      o.id === orderId 
        ? { ...o, status }
        : o
    )
    setToStorage(STORAGE_KEYS.ORDERS, updatedGlobalOrders)

    loadOrders()
  }, [loadOrders])

  const getOrdersByStatus = useCallback((status: MarketerOrder['status']) => {
    return orders.filter(o => o.status === status)
  }, [orders])

  const getTopProducts = useCallback(() => {
    // Calculate sales for each product based on orders
    const productSales = products.map(product => {
      const sales = orders.reduce((total, order) => {
        const orderItem = order.items.find(item => item.productId === product.id)
        return orderItem ? total + orderItem.quantity : total
      }, 0)
      
      const revenue = orders.reduce((total, order) => {
        const orderItem = order.items.find(item => item.productId === product.id)
        return orderItem ? total + (orderItem.price * orderItem.quantity) : total
      }, 0)

      return {
        ...product,
        totalSales: sales,
        totalRevenue: revenue
      }
    })

    return productSales
      .sort((a, b) => b.totalSales - a.totalSales)
      .slice(0, 5)
  }, [products, orders])

  const toggleProductAvailability = useCallback((productId: string) => {
    const product = products.find(p => p.id === productId)
    if (!product) return

    updateProduct(productId, { isAvailable: !product.isAvailable })
  }, [products, updateProduct])

  return {
    products,
    orders,
    stats,
    addProduct,
    updateProduct,
    deleteProduct,
    toggleProductAvailability,
    updateOrderStatus,
    getOrdersByStatus,
    getTopProducts,
    refreshData: () => {
      loadProducts()
      loadOrders()
    }
  }
}
