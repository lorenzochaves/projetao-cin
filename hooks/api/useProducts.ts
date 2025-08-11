import { useState, useEffect } from 'react'
import { productService } from '@/lib/api/productService'
import { feiranteService } from '@/lib/api/userService'
import { Product, Feirante } from '@/lib/api/types'

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true)
        const productsData = await productService.getAll()
        setProducts(productsData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch products')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return { products, loading, error }
}

export function useProductsByFeirante(feiranteId: string) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true)
        const productsData = await productService.getByFeirante(feiranteId)
        setProducts(productsData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch products')
      } finally {
        setLoading(false)
      }
    }

    if (feiranteId) {
      fetchProducts()
    }
  }, [feiranteId])

  return { products, loading, error }
}

export function useFeirantes() {
  const [feirantes, setFeirantes] = useState<Feirante[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchFeirantes() {
      try {
        setLoading(true)
        const feirantesData = await feiranteService.getAll()
        setFeirantes(feirantesData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch feirantes')
      } finally {
        setLoading(false)
      }
    }

    fetchFeirantes()
  }, [])

  return { feirantes, loading, error }
}
