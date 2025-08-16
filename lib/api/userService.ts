import { User, UserAddress, PaymentMethod, Order, Favorite, Feirante } from './types'
import { 
  getFromStorage, 
  setToStorage, 
  getUsers, 
  getFeirantes, 
  getAddresses, 
  getPaymentMethods, 
  getFavorites, 
  getOrders,
  generateId,
  STORAGE_KEYS
} from '../utils'

export const userService = {
  // Get user profile
  async getProfile(userId: string): Promise<User> {
    const users = getUsers()
    const user = users.find(u => u.id === userId)
    if (!user) {
      throw new Error('Usuário não encontrado')
    }
    return user
  },

  // Update user profile
  async updateProfile(userId: string, data: Partial<User>): Promise<User> {
    const users = getUsers()
    const userIndex = users.findIndex(u => u.id === userId)
    if (userIndex === -1) {
      throw new Error('Usuário não encontrado')
    }
    
    const updatedUser = { ...users[userIndex], ...data }
    users[userIndex] = updatedUser
    setToStorage(STORAGE_KEYS.USERS, users)
    
    return updatedUser
  },

  // Get user orders
  async getOrders(userId: string): Promise<Order[]> {
    const orders = getOrders()
    return orders
      .filter(order => order.clientId === userId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  },

  // Get user addresses
  async getAddresses(userId: string): Promise<UserAddress[]> {
    const addresses = getAddresses()
    return addresses.filter(addr => addr.userId === userId)
  },

  // Add new address
  async addAddress(address: Omit<UserAddress, 'id'>): Promise<UserAddress> {
    const addresses = getAddresses()
    const newAddress: UserAddress = {
      ...address,
      id: generateId()
    }
    
    addresses.push(newAddress)
    setToStorage(STORAGE_KEYS.ADDRESSES, addresses)
    
    return newAddress
  },

  // Update address
  async updateAddress(addressId: string, data: Partial<UserAddress>): Promise<UserAddress> {
    const addresses = getAddresses()
    const addressIndex = addresses.findIndex(addr => addr.id === addressId)
    if (addressIndex === -1) {
      throw new Error('Endereço não encontrado')
    }
    
    const updatedAddress = { ...addresses[addressIndex], ...data }
    addresses[addressIndex] = updatedAddress
    setToStorage(STORAGE_KEYS.ADDRESSES, addresses)
    
    return updatedAddress
  },

  // Delete address
  async deleteAddress(addressId: string): Promise<void> {
    const addresses = getAddresses()
    const filteredAddresses = addresses.filter(addr => addr.id !== addressId)
    setToStorage(STORAGE_KEYS.ADDRESSES, filteredAddresses)
  },

  // Get payment methods
  async getPaymentMethods(userId: string): Promise<PaymentMethod[]> {
    const paymentMethods = getPaymentMethods()
    return paymentMethods.filter(pm => pm.userId === userId)
  },

  // Add payment method
  async addPaymentMethod(paymentMethod: Omit<PaymentMethod, 'id'>): Promise<PaymentMethod> {
    const paymentMethods = getPaymentMethods()
    const newPaymentMethod: PaymentMethod = {
      ...paymentMethod,
      id: generateId()
    }
    
    paymentMethods.push(newPaymentMethod)
    setToStorage(STORAGE_KEYS.PAYMENT_METHODS, paymentMethods)
    
    return newPaymentMethod
  },

  // Delete payment method
  async deletePaymentMethod(paymentMethodId: string): Promise<void> {
    const paymentMethods = getPaymentMethods()
    const filteredPaymentMethods = paymentMethods.filter(pm => pm.id !== paymentMethodId)
    setToStorage(STORAGE_KEYS.PAYMENT_METHODS, filteredPaymentMethods)
  },

  // Get user favorites
  async getFavorites(userId: string): Promise<Feirante[]> {
    const favorites = getFavorites()
    const feirantes = getFeirantes()
    
    const favoriteFeiranteIds = favorites
      .filter(f => f.userId === userId)
      .map(f => f.feiranteId)
    
    return feirantes.filter(f => favoriteFeiranteIds.includes(f.id))
  },

  // Add to favorites
  async addFavorite(userId: string, feiranteId: string): Promise<Favorite> {
    const favorites = getFavorites()
    const newFavorite: Favorite = {
      id: generateId(),
      userId,
      feiranteId,
      createdAt: new Date().toISOString()
    }
    
    favorites.push(newFavorite)
    setToStorage(STORAGE_KEYS.FAVORITES, favorites)
    
    return newFavorite
  },

  // Remove from favorites
  async removeFavorite(userId: string, feiranteId: string): Promise<void> {
    const favorites = getFavorites()
    const filteredFavorites = favorites.filter(
      f => !(f.userId === userId && f.feiranteId === feiranteId)
    )
    setToStorage(STORAGE_KEYS.FAVORITES, filteredFavorites)
  }
}

export const feiranteService = {
  // Get all feirantes
  async getAll(): Promise<Feirante[]> {
    return getFeirantes()
  },

  // Get feirante by id
  async getById(id: string): Promise<Feirante> {
    const feirantes = getFeirantes()
    const feirante = feirantes.find(f => f.id === id)
    if (!feirante) {
      throw new Error('Feirante não encontrado')
    }
    return feirante
  },

  // Search feirantes
  async search(query: string): Promise<Feirante[]> {
    const feirantes = getFeirantes()
    const lowerQuery = query.toLowerCase()
    return feirantes.filter(f => 
      f.name.toLowerCase().includes(lowerQuery) ||
      f.description.toLowerCase().includes(lowerQuery) ||
      f.specialties.some(s => s.toLowerCase().includes(lowerQuery))
    )
  }
}
