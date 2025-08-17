import { Order, MarketerOrder, OrderItem, Address } from './types'
import { 
  getFromStorage, 
  setToStorage, 
  getOrders, 
  getMarketerOrders,
  getProducts,
  getFeirantes,
  generateId,
  STORAGE_KEYS
} from '../utils'

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
  selectedVariation?: string
  selectedWeight?: number
}

export interface Cart {
  items: CartItem[]
  total: number
  itemCount: number
}

export const cartService = {
  // Get cart from localStorage
  getCart(): Cart {
    const cart = getFromStorage<Cart>(STORAGE_KEYS.CART)
    
    // Verificar se a estrutura está correta
    if (!cart || !Array.isArray(cart.items)) {
      console.log('Cart inválido, criando novo:', cart)
      const newCart = { items: [], total: 0, itemCount: 0 }
      this.saveCart(newCart)
      return newCart
    }
    
    // Verificar se há dados antigos que precisam ser migrados
    let needsUpdate = false
    const updatedItems = cart.items.map(item => {
      // Se o item não tem selectedWeight mas deveria ter (produtos por kg)
      if (!item.selectedWeight && item.unit === 'kg' && item.quantity > 0) {
        console.log('Migrando item antigo para novo formato:', item.name)
        needsUpdate = true
        return {
          ...item,
          selectedWeight: item.quantity * 0.25 // Converter quantity para peso
        }
      }
      return item
    })
    
    if (needsUpdate) {
      const migratedCart = {
        items: updatedItems,
        total: this.calculateTotal(updatedItems),
        itemCount: this.calculateItemCount(updatedItems)
      }
      console.log('Cart migrado:', migratedCart)
      this.saveCart(migratedCart)
      return migratedCart
    }
    
    return cart
  },

  // Save cart to localStorage
  saveCart(cart: Cart): void {
    console.log('💾 Salvando carrinho no localStorage:', cart)
    setToStorage(STORAGE_KEYS.CART, cart)
  },

  // Add item to cart
  addToCart(product: Omit<CartItem, 'quantity'>, quantity: number = 1): Cart {
    const cart = this.getCart()
    
    // Verificar se cart e cart.items existem
    if (!cart || !cart.items) {
      console.error('Cart ou cart.items é undefined:', cart)
      const newCart = { items: [], total: 0, itemCount: 0 }
      this.saveCart(newCart)
      return this.addToCart(product, quantity) // Tentar novamente
    }
    
    const existingItemIndex = cart.items.findIndex(
      item => item.productId === product.productId && item.feiranteName === product.feiranteName
    )

    let newItems: CartItem[]

    if (existingItemIndex >= 0) {
      // Update existing item - substituir completamente em vez de incrementar
      newItems = [...cart.items]
      newItems[existingItemIndex] = {
        ...product,
        quantity
      }
    } else {
      // Add new item
      newItems = [...cart.items, { ...product, quantity }]
    }

    const newCart = {
      items: newItems,
      total: this.calculateTotal(newItems),
      itemCount: this.calculateItemCount(newItems)
    }

    this.saveCart(newCart)
    return newCart
  },

  // Remove item from cart
  removeFromCart(productId: string): Cart {
    const cart = this.getCart()
    const newItems = cart.items.filter(item => item.productId !== productId)
    const newCart = {
      items: newItems,
      total: this.calculateTotal(newItems),
      itemCount: this.calculateItemCount(newItems)
    }

    this.saveCart(newCart)
    return newCart
  },

  // Update item quantity
  updateQuantity(productId: string, quantity: number): Cart {
    if (quantity <= 0) {
      return this.removeFromCart(productId)
    }

    const cart = this.getCart()
    const newItems = cart.items.map(item =>
      item.productId === productId ? { ...item, quantity } : item
    )
    const newCart = {
      items: newItems,
      total: this.calculateTotal(newItems),
      itemCount: this.calculateItemCount(newItems)
    }

    this.saveCart(newCart)
    return newCart
  },

  // Update item observation
  updateObservation(productId: string, observation: string): Cart {
    const cart = this.getCart()
    const newItems = cart.items.map(item =>
      item.productId === productId ? { ...item, observation } : item
    )
    const newCart = {
      ...cart,
      items: newItems
    }

    this.saveCart(newCart)
    return newCart
  },

  // Clear cart
  clearCart(): void {
    this.saveCart({ items: [], total: 0, itemCount: 0 })
  },

  // Get items grouped by feirante
  getItemsByFeirante(): Array<{
    feiranteId: string
    feiranteName: string
    items: CartItem[]
    total: number
  }> {
    const cart = this.getCart()
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
  },

  // Calculate total
  calculateTotal(items: CartItem[]): number {
    return items.reduce((sum, item) => {
      // Para produtos com selectedWeight, usar o peso real
      if (item.selectedWeight) {
        return sum + (item.price * item.selectedWeight)
      }
      // Para outros produtos, usar a quantidade normal
      return sum + (item.price * item.quantity)
    }, 0)
  },

  // Calculate item count (contar tipos de produtos, não quantidade total)
  calculateItemCount(items: CartItem[]): number {
    return items.length // Cada item único conta como 1
  }
}

export const orderService = {
  // Create order from cart items
  async createOrder(
    clientId: string, 
    feiranteId: string, 
    items: CartItem[], 
    deliveryAddress: Address
  ): Promise<Order> {
    const orders = getOrders()
    const marketerOrders = getMarketerOrders()
    const feirantes = getFeirantes()
    
    const feirante = feirantes.find(f => f.id === feiranteId)
    if (!feirante) {
      throw new Error('Feirante não encontrado')
    }

    const orderId = generateId()
    const now = new Date().toISOString()

    // Create order items
    const orderItems: OrderItem[] = items.map(item => ({
      productId: item.productId,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      observation: item.observation
    }))

    // Calculate total
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)

    // Create order
    const newOrder: Order = {
      id: orderId,
      clientId,
      feiranteId,
      feiranteName: feirante.name,
      items: orderItems,
      total,
      status: 'pendente',
      createdAt: now,
      deliveryAddress
    }

    // Create marketer order
    const newMarketerOrder: MarketerOrder = {
      id: generateId(),
      marketerId: feirante.userId,
      orderId,
      clientId,
      clientName: 'Cliente', // TODO: Get from user service
      items: orderItems,
      total,
      status: 'pendente',
      createdAt: now,
      clientPhone: '', // TODO: Get from user service
      deliveryAddress
    }

    // Save both orders
    orders.push(newOrder)
    marketerOrders.push(newMarketerOrder)
    
    setToStorage(STORAGE_KEYS.ORDERS, orders)
    setToStorage(STORAGE_KEYS.MARKETER_ORDERS, marketerOrders)

    return newOrder
  },

  // Get order by id
  async getOrderById(orderId: string): Promise<Order> {
    const orders = getOrders()
    const order = orders.find(o => o.id === orderId)
    if (!order) {
      throw new Error('Pedido não encontrado')
    }
    return order
  },

  // Update order status
  async updateOrderStatus(orderId: string, status: Order['status']): Promise<Order> {
    const orders = getOrders()
    const marketerOrders = getMarketerOrders()
    
    const orderIndex = orders.findIndex(o => o.id === orderId)
    if (orderIndex === -1) {
      throw new Error('Pedido não encontrado')
    }

    const updatedOrder = { ...orders[orderIndex], status }
    if (status === 'entregue') {
      updatedOrder.deliveredAt = new Date().toISOString()
    }
    
    orders[orderIndex] = updatedOrder
    setToStorage(STORAGE_KEYS.ORDERS, orders)

    // Also update marketer order
    const marketerOrderIndex = marketerOrders.findIndex(mo => mo.orderId === orderId)
    if (marketerOrderIndex !== -1) {
      marketerOrders[marketerOrderIndex] = {
        ...marketerOrders[marketerOrderIndex],
        status
      }
      setToStorage(STORAGE_KEYS.MARKETER_ORDERS, marketerOrders)
    }

    return updatedOrder
  }
}
