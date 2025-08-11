import { useState, useEffect } from 'react'
import { userService } from '@/lib/api/userService'
import { User, Order, UserAddress, PaymentMethod, Feirante } from '@/lib/api/types'

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
        setError(err instanceof Error ? err.message : 'Failed to fetch user')
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
      setError(err instanceof Error ? err.message : 'Failed to update profile')
      throw err
    }
  }

  return { user, loading, error, updateProfile }
}

export function useUserOrders(userId: string) {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchOrders = async () => {
    try {
      setLoading(true)
      const ordersData = await userService.getOrders(userId)
      setOrders(ordersData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch orders')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [userId])

  return { orders, loading, error, refetch: fetchOrders }
}

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
        setError(err instanceof Error ? err.message : 'Failed to fetch addresses')
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
      setError(err instanceof Error ? err.message : 'Failed to add address')
      throw err
    }
  }

  const deleteAddress = async (addressId: string) => {
    try {
      await userService.deleteAddress(addressId)
      setAddresses(prev => prev.filter(addr => addr.id !== addressId))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete address')
      throw err
    }
  }

  return { addresses, loading, error, addAddress, deleteAddress }
}

export function useUserPaymentMethods(userId: string) {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPaymentMethods() {
      try {
        setLoading(true)
        const paymentData = await userService.getPaymentMethods(userId)
        setPaymentMethods(paymentData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch payment methods')
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
      setError(err instanceof Error ? err.message : 'Failed to add payment method')
      throw err
    }
  }

  const deletePaymentMethod = async (paymentMethodId: string) => {
    try {
      await userService.deletePaymentMethod(paymentMethodId)
      setPaymentMethods(prev => prev.filter(pm => pm.id !== paymentMethodId))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete payment method')
      throw err
    }
  }

  return { paymentMethods, loading, error, addPaymentMethod, deletePaymentMethod }
}

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
        setError(err instanceof Error ? err.message : 'Failed to fetch favorites')
      } finally {
        setLoading(false)
      }
    }

    fetchFavorites()
  }, [userId])

  const addFavorite = async (feiranteId: string) => {
    try {
      await userService.addFavorite(userId, feiranteId)
      // Refetch favorites
      const favoritesData = await userService.getFavorites(userId)
      setFavorites(favoritesData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add favorite')
      throw err
    }
  }

  const removeFavorite = async (feiranteId: string) => {
    try {
      await userService.removeFavorite(userId, feiranteId)
      setFavorites(prev => prev.filter(f => f.id !== feiranteId))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to remove favorite')
      throw err
    }
  }

  return { favorites, loading, error, addFavorite, removeFavorite }
}
