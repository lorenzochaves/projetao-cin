import { MarketerOrder, Finance, Review } from './types'
import { 
  getFromStorage, 
  setToStorage, 
  getMarketerOrders, 
  getFinances, 
  getReviews,
  generateId,
  STORAGE_KEYS
} from '../utils'

export const marketerService = {
  // Get marketer orders
  async getOrders(marketerId: string): Promise<MarketerOrder[]> {
    const orders = getMarketerOrders()
    return orders
      .filter(order => order.marketerId === marketerId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  },

  // Update order status
  async updateOrderStatus(orderId: string, status: MarketerOrder['status']): Promise<MarketerOrder> {
    const orders = getMarketerOrders()
    const orderIndex = orders.findIndex(o => o.id === orderId)
    if (orderIndex === -1) {
      throw new Error('Pedido não encontrado')
    }
    
    const updatedOrder = { ...orders[orderIndex], status }
    orders[orderIndex] = updatedOrder
    setToStorage(STORAGE_KEYS.MARKETER_ORDERS, orders)
    
    return updatedOrder
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

  // Get reviews for marketer
  async getReviews(feiranteId: string): Promise<Review[]> {
    const reviews = getReviews()
    return reviews
      .filter(r => r.feiranteId === feiranteId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }
}
