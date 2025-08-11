import { apiClient } from './client'
import { User, UserAddress, PaymentMethod, Order, Favorite, Feirante } from './types'

export const userService = {
  // Get user profile
  async getProfile(userId: string): Promise<User> {
    return apiClient.get<User>(`/users/${userId}`)
  },

  // Update user profile
  async updateProfile(userId: string, data: Partial<User>): Promise<User> {
    return apiClient.patch<User>(`/users/${userId}`, data)
  },

  // Get user orders
  async getOrders(userId: string): Promise<Order[]> {
    return apiClient.get<Order[]>(`/orders?clientId=${userId}&_sort=createdAt&_order=desc`)
  },

  // Get user addresses
  async getAddresses(userId: string): Promise<UserAddress[]> {
    return apiClient.get<UserAddress[]>(`/addresses?userId=${userId}`)
  },

  // Add new address
  async addAddress(address: Omit<UserAddress, 'id'>): Promise<UserAddress> {
    return apiClient.post<UserAddress>('/addresses', address)
  },

  // Update address
  async updateAddress(addressId: string, data: Partial<UserAddress>): Promise<UserAddress> {
    return apiClient.patch<UserAddress>(`/addresses/${addressId}`, data)
  },

  // Delete address
  async deleteAddress(addressId: string): Promise<void> {
    return apiClient.delete(`/addresses/${addressId}`)
  },

  // Get payment methods
  async getPaymentMethods(userId: string): Promise<PaymentMethod[]> {
    return apiClient.get<PaymentMethod[]>(`/paymentMethods?userId=${userId}`)
  },

  // Add payment method
  async addPaymentMethod(paymentMethod: Omit<PaymentMethod, 'id'>): Promise<PaymentMethod> {
    return apiClient.post<PaymentMethod>('/paymentMethods', paymentMethod)
  },

  // Delete payment method
  async deletePaymentMethod(paymentMethodId: string): Promise<void> {
    return apiClient.delete(`/paymentMethods/${paymentMethodId}`)
  },

  // Get user favorites
  async getFavorites(userId: string): Promise<Feirante[]> {
    const favorites = await apiClient.get<Favorite[]>(`/favorites?userId=${userId}`)
    const feiranteIds = favorites.map(f => f.feiranteId)
    
    if (feiranteIds.length === 0) return []
    
    const feirantes = await apiClient.get<Feirante[]>(`/feirantes?id=${feiranteIds.join('&id=')}`)
    return feirantes
  },

  // Add to favorites
  async addFavorite(userId: string, feiranteId: string): Promise<Favorite> {
    return apiClient.post<Favorite>('/favorites', { userId, feiranteId })
  },

  // Remove from favorites
  async removeFavorite(userId: string, feiranteId: string): Promise<void> {
    const favorites = await apiClient.get<Favorite[]>(`/favorites?userId=${userId}&feiranteId=${feiranteId}`)
    if (favorites.length > 0) {
      return apiClient.delete(`/favorites/${favorites[0].id}`)
    }
  }
}

export const feiranteService = {
  // Get all feirantes
  async getAll(): Promise<Feirante[]> {
    return apiClient.get<Feirante[]>('/feirantes')
  },

  // Get feirante by id
  async getById(id: string): Promise<Feirante> {
    return apiClient.get<Feirante>(`/feirantes/${id}`)
  },

  // Search feirantes
  async search(query: string): Promise<Feirante[]> {
    return apiClient.get<Feirante[]>(`/feirantes?name_like=${query}`)
  }
}
