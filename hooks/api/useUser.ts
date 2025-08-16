'use client'

import { useState, useEffect, useCallback } from 'react'
import { User, UserAddress, PaymentMethod, Order, Favorite, Feirante } from '../../lib/api/types'
import { userService } from '../../lib/api/userService'
import { getCurrentUser, setCurrentUser, logout as logoutUser, getUsers } from '../../lib/utils'

export function useUser() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const currentUser = getCurrentUser()
    setUser(currentUser)
    setLoading(false)
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    try {
      setLoading(true)
      // Simular login - buscar usuário por email
      const users = getUsers()
      const foundUser = users.find((u: User) => u.email === email)
      
      if (!foundUser) {
        throw new Error('Usuário não encontrado')
      }

      // Em um sistema real, aqui seria feita validação de senha
      // Por enquanto, aceitamos qualquer senha para usuários existentes
      setCurrentUser(foundUser)
      setUser(foundUser)
      return foundUser
    } catch (error) {
      throw error
    } finally {
      setLoading(false)
    }
  }, [])

  const logout = useCallback(() => {
    logoutUser()
    setUser(null)
  }, [])

  const updateProfile = useCallback(async (data: Partial<User>) => {
    if (!user) throw new Error('Usuário não autenticado')
    
    try {
      const updatedUser = await userService.updateProfile(user.id, data)
      setCurrentUser(updatedUser)
      setUser(updatedUser)
      return updatedUser
    } catch (error) {
      throw error
    }
  }, [user])

  return {
    user,
    loading,
    login,
    logout,
    updateProfile,
    isAuthenticated: !!user
  }
}

// Hook para perfil de usuário específico
export function useUserProfile(userId: string) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchUser() {
      try {
        setLoading(true)
        const userData = await userService.getProfile(userId)
        setUser(userData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar usuário')
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [userId])

  const updateProfile = async (data: Partial<User>) => {
    try {
      const updatedUser = await userService.updateProfile(userId, data)
      setUser(updatedUser)
      return updatedUser
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao atualizar perfil')
      throw err
    }
  }

  return { user, loading, error, updateProfile }
}

// Hook para pedidos do usuário
export function useUserOrders(userId: string) {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchOrders() {
      try {
        setLoading(true)
        const ordersData = await userService.getOrders(userId)
        setOrders(ordersData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar pedidos')
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [userId])

  return { orders, loading, error }
}

// Hook para endereços do usuário
export function useUserAddresses(userId: string) {
  const [addresses, setAddresses] = useState<UserAddress[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchAddresses() {
      try {
        setLoading(true)
        const addressesData = await userService.getAddresses(userId)
        setAddresses(addressesData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar endereços')
      } finally {
        setLoading(false)
      }
    }

    fetchAddresses()
  }, [userId])

  const addAddress = async (address: Omit<UserAddress, 'id'>) => {
    try {
      const newAddress = await userService.addAddress(address)
      setAddresses(prev => [...prev, newAddress])
      return newAddress
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao adicionar endereço')
      throw err
    }
  }

  const updateAddress = async (addressId: string, data: Partial<UserAddress>) => {
    try {
      const updatedAddress = await userService.updateAddress(addressId, data)
      setAddresses(prev => prev.map(addr => 
        addr.id === addressId ? updatedAddress : addr
      ))
      return updatedAddress
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao atualizar endereço')
      throw err
    }
  }

  const deleteAddress = async (addressId: string) => {
    try {
      await userService.deleteAddress(addressId)
      setAddresses(prev => prev.filter(addr => addr.id !== addressId))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao deletar endereço')
      throw err
    }
  }

  return { 
    addresses, 
    loading, 
    error, 
    addAddress, 
    updateAddress, 
    deleteAddress 
  }
}

// Hook para métodos de pagamento do usuário
export function useUserPaymentMethods(userId: string) {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPaymentMethods() {
      try {
        setLoading(true)
        const paymentMethodsData = await userService.getPaymentMethods(userId)
        setPaymentMethods(paymentMethodsData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar métodos de pagamento')
      } finally {
        setLoading(false)
      }
    }

    fetchPaymentMethods()
  }, [userId])

  const addPaymentMethod = async (paymentMethod: Omit<PaymentMethod, 'id'>) => {
    try {
      const newPaymentMethod = await userService.addPaymentMethod(paymentMethod)
      setPaymentMethods(prev => [...prev, newPaymentMethod])
      return newPaymentMethod
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao adicionar método de pagamento')
      throw err
    }
  }

  const deletePaymentMethod = async (paymentMethodId: string) => {
    try {
      await userService.deletePaymentMethod(paymentMethodId)
      setPaymentMethods(prev => prev.filter(pm => pm.id !== paymentMethodId))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao deletar método de pagamento')
      throw err
    }
  }

  return { 
    paymentMethods, 
    loading, 
    error, 
    addPaymentMethod, 
    deletePaymentMethod 
  }
}

// Hook para favoritos do usuário
export function useUserFavorites(userId: string) {
  const [favorites, setFavorites] = useState<Feirante[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchFavorites() {
      try {
        setLoading(true)
        const favoritesData = await userService.getFavorites(userId)
        setFavorites(favoritesData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar favoritos')
      } finally {
        setLoading(false)
      }
    }

    fetchFavorites()
  }, [userId])

  const addFavorite = async (feiranteId: string) => {
    try {
      await userService.addFavorite(userId, feiranteId)
      // Recarregar favoritos
      const updatedFavorites = await userService.getFavorites(userId)
      setFavorites(updatedFavorites)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao adicionar favorito')
      throw err
    }
  }

  const removeFavorite = async (feiranteId: string) => {
    try {
      await userService.removeFavorite(userId, feiranteId)
      setFavorites(prev => prev.filter(f => f.id !== feiranteId))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao remover favorito')
      throw err
    }
  }

  return { 
    favorites, 
    loading, 
    error, 
    addFavorite, 
    removeFavorite 
  }
}
