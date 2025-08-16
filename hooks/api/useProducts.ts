'use client'

import { useState, useEffect, useCallback } from 'react'
import { Product, Category } from '../../lib/api/types'
import { productService, categoryService } from '../../lib/api/productService'

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const allProducts = await productService.getAll()
      setProducts(allProducts)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar produtos')
    } finally {
      setLoading(false)
    }
  }, [])

  const searchProducts = useCallback(async (query: string) => {
    try {
      setLoading(true)
      setError(null)
      const results = await productService.search(query)
      setProducts(results)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro na busca')
    } finally {
      setLoading(false)
    }
  }, [])

  const getProductsByCategory = useCallback(async (category: string) => {
    try {
      setLoading(true)
      setError(null)
      const results = await productService.getByCategory(category)
      setProducts(results)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao filtrar por categoria')
    } finally {
      setLoading(false)
    }
  }, [])

  const getProductsByFeirante = useCallback(async (feiranteId: string) => {
    try {
      setLoading(true)
      setError(null)
      const results = await productService.getByFeirante(feiranteId)
      setProducts(results)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar produtos do feirante')
    } finally {
      setLoading(false)
    }
  }, [])

  const getProductById = useCallback(async (id: string) => {
    try {
      setError(null)
      return await productService.getById(id)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar produto')
      throw err
    }
  }, [])

  return {
    products,
    loading,
    error,
    loadProducts,
    searchProducts,
    getProductsByCategory,
    getProductsByFeirante,
    getProductById
  }
}

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const allCategories = await categoryService.getAll()
      setCategories(allCategories)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar categorias')
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    categories,
    loading,
    error,
    loadCategories
  }
}
