import { apiClient } from './client'
import { MarketerOrder, Finance, Review } from './types'

export const marketerService = {
  // Get marketer orders
  async getOrders(marketerId: string): Promise<MarketerOrder[]> {
    return apiClient.get<MarketerOrder[]>(`/marketerOrders?marketerId=${marketerId}&_sort=createdAt&_order=desc`)
  },

  // Update order status
  async updateOrderStatus(orderId: string, status: MarketerOrder['status']): Promise<MarketerOrder> {
    return apiClient.patch<MarketerOrder>(`/marketerOrders/${orderId}`, { status })
  },

  // Get finances data
  async getFinances(marketerId: string, month?: string): Promise<Finance[]> {
    const query = month ? `marketerId=${marketerId}&month=${month}` : `marketerId=${marketerId}`
    return apiClient.get<Finance[]>(`/finances?${query}`)
  },

  // Get reviews for marketer
  async getReviews(feiranteId: string): Promise<Review[]> {
    return apiClient.get<Review[]>(`/reviews?feiranteId=${feiranteId}&_sort=createdAt&_order=desc`)
  }
}
