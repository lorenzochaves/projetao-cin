import { apiClient } from './client'
import { Product, Category } from './types'

export const productService = {
  // Get all products
  async getAll(): Promise<Product[]> {
    return apiClient.get<Product[]>('/products')
  },

  // Get products by feirante
  async getByFeirante(feiranteId: string): Promise<Product[]> {
    return apiClient.get<Product[]>(`/products?feiranteId=${feiranteId}`)
  },

  // Get product by id
  async getById(id: string): Promise<Product> {
    return apiClient.get<Product>(`/products/${id}`)
  },

  // Search products
  async search(query: string): Promise<Product[]> {
    return apiClient.get<Product[]>(`/products?name_like=${query}`)
  },

  // Get products by category
  async getByCategory(category: string): Promise<Product[]> {
    return apiClient.get<Product[]>(`/products?category=${category}`)
  },

  // Add new product (for marketers)
  async create(product: Omit<Product, 'id'>): Promise<Product> {
    return apiClient.post<Product>('/products', product)
  },

  // Update product
  async update(id: string, product: Partial<Product>): Promise<Product> {
    return apiClient.patch<Product>(`/products/${id}`, product)
  },

  // Delete product
  async delete(id: string): Promise<void> {
    return apiClient.delete(`/products/${id}`)
  }
}

export const categoryService = {
  // Get all categories
  async getAll(): Promise<Category[]> {
    return apiClient.get<Category[]>('/categories')
  }
}
