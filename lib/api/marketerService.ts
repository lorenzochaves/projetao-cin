import { MarketerOrder, Finance, Review, Product, Order } from './types'
import { 
  getFromStorage, 
  setToStorage, 
  getMarketerOrders, 
  getFinances, 
  getReviews,
  getProducts,
  getOrders,
  generateId,
  STORAGE_KEYS
} from '../utils'

export const marketerService = {
  // Get marketer orders from client orders
  async getOrders(feiranteId: string): Promise<Order[]> {
    console.log('🔍 marketerService.getOrders: Getting orders for feirante:', feiranteId)
    const allOrders = getOrders()
    console.log('📚 marketerService.getOrders: All orders found:', allOrders.length)
    
    const feiranteOrders = allOrders
      .filter(order => order.feiranteId === feiranteId || order.feiranteName.includes('Feirante'))
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    
    console.log('📦 marketerService.getOrders: Filtered orders for feirante:', feiranteOrders.length)
    return feiranteOrders
  },

  // Update order status
  async updateOrderStatus(orderId: string, status: Order['status']): Promise<Order> {
    console.log('📝 marketerService.updateOrderStatus: Updating order', orderId, 'to status', status)
    const orders = getOrders()
    const orderIndex = orders.findIndex(o => o.id === orderId)
    if (orderIndex === -1) {
      throw new Error('Pedido não encontrado')
    }
    
    const updatedOrder = { ...orders[orderIndex], status }
    orders[orderIndex] = updatedOrder
    setToStorage(STORAGE_KEYS.ORDERS, orders)
    
    console.log('✅ marketerService.updateOrderStatus: Order updated successfully')
    return updatedOrder
  },

  // Get products for a specific feirante
  async getProducts(feiranteId: string): Promise<Product[]> {
    console.log('🔍 marketerService.getProducts: Getting products for feirante:', feiranteId)
    const allProducts = getProducts()
    const feiranteProducts = allProducts.filter(product => product.feiranteId === feiranteId)
    console.log('📦 marketerService.getProducts: Found products:', feiranteProducts.length)
    return feiranteProducts
  },

  // Add new product
  async addProduct(product: Omit<Product, 'id'>): Promise<Product> {
    console.log('➕ marketerService.addProduct: Adding new product:', product.name)
    const products = getProducts()
    const newProduct: Product = {
      ...product,
      id: generateId()
    }
    
    products.push(newProduct)
    setToStorage(STORAGE_KEYS.PRODUCTS, products)
    
    console.log('✅ marketerService.addProduct: Product added successfully with ID:', newProduct.id)
    return newProduct
  },

  // Update product
  async updateProduct(productId: string, updates: Partial<Product>): Promise<Product> {
    console.log('📝 marketerService.updateProduct: Updating product:', productId)
    const products = getProducts()
    const productIndex = products.findIndex(p => p.id === productId)
    
    if (productIndex === -1) {
      throw new Error('Produto não encontrado')
    }
    
    const updatedProduct = { ...products[productIndex], ...updates }
    products[productIndex] = updatedProduct
    setToStorage(STORAGE_KEYS.PRODUCTS, products)
    
    console.log('✅ marketerService.updateProduct: Product updated successfully')
    return updatedProduct
  },

  // Delete product
  async deleteProduct(productId: string): Promise<void> {
    console.log('🗑️ marketerService.deleteProduct: Deleting product:', productId)
    const products = getProducts()
    const filteredProducts = products.filter(p => p.id !== productId)
    setToStorage(STORAGE_KEYS.PRODUCTS, filteredProducts)
    console.log('✅ marketerService.deleteProduct: Product deleted successfully')
  },

  // Get finances data
  async getFinances(marketerId: string, month?: string): Promise<Finance[]> {
    const finances = getFinances()
    let filteredFinances = finances.filter(f => f.marketerId === marketerId)
    
    if (month) {
      filteredFinances = filteredFinances.filter(f => f.month === month)
    }
    
    return filteredFinances
  },

  // Calculate finances from orders
  async calculateFinances(feiranteId: string): Promise<Finance> {
    const orders = await this.getOrders(feiranteId)
    const currentMonth = new Date().toISOString().slice(0, 7) // YYYY-MM format
    
    const monthlyOrders = orders.filter(order => 
      order.createdAt.slice(0, 7) === currentMonth && 
      order.status === 'entregue'
    )
    
    const totalRevenue = monthlyOrders.reduce((sum, order) => sum + order.total, 0)
    const totalOrders = monthlyOrders.length
    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0
    
    // Calculate top products
    const productStats: Record<string, { name: string; quantity: number; revenue: number }> = {}
    
    monthlyOrders.forEach(order => {
      order.items.forEach(item => {
        if (!productStats[item.productId]) {
          productStats[item.productId] = {
            name: item.name,
            quantity: 0,
            revenue: 0
          }
        }
        productStats[item.productId].quantity += item.quantity
        productStats[item.productId].revenue += item.price * item.quantity
      })
    })
    
    const topProducts = Object.entries(productStats)
      .map(([productId, stats]) => ({ productId, ...stats }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5)
    
    return {
      id: generateId(),
      marketerId: feiranteId,
      month: currentMonth,
      totalRevenue,
      totalOrders,
      averageOrderValue,
      topProducts
    }
  },

  // Get reviews for marketer
  async getReviews(feiranteId: string): Promise<Review[]> {
    const reviews = getReviews()
    return reviews
      .filter(r => r.feiranteId === feiranteId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }
}
