import { Product, Category } from './types'
import { 
  getFromStorage, 
  setToStorage, 
  getProducts, 
  getCategories,
  generateId,
  STORAGE_KEYS
} from '../utils'

export const productService = {
  // Get all products
  async getAll(): Promise<Product[]> {
    return getProducts()
  },

  // Get products by feirante
  async getByFeirante(feiranteId: string): Promise<Product[]> {
    const products = getProducts()
    return products.filter(product => product.feiranteId === feiranteId)
  },

  // Get product by id
  async getById(id: string): Promise<Product> {
    const products = getProducts()
    const product = products.find(p => p.id === id)
    if (!product) {
      throw new Error('Produto não encontrado')
    }
    return product
  },

  // Search products
  async search(query: string): Promise<Product[]> {
    const products = getProducts()
    const lowerQuery = query.toLowerCase()
    return products.filter(product => 
      product.name.toLowerCase().includes(lowerQuery) ||
      product.description.toLowerCase().includes(lowerQuery) ||
      product.category.toLowerCase().includes(lowerQuery)
    )
  },

  // Get products by category
  async getByCategory(category: string): Promise<Product[]> {
    const products = getProducts()
    return products.filter(product => product.category === category)
  },

  // Add new product (for marketers)
  async create(product: Omit<Product, 'id'>): Promise<Product> {
    const products = getProducts()
    const newProduct: Product = {
      ...product,
      id: generateId()
    }
    
    products.push(newProduct)
    setToStorage(STORAGE_KEYS.PRODUCTS, products)
    
    return newProduct
  },

  // Update product
  async update(id: string, product: Partial<Product>): Promise<Product> {
    const products = getProducts()
    const productIndex = products.findIndex(p => p.id === id)
    if (productIndex === -1) {
      throw new Error('Produto não encontrado')
    }
    
    const updatedProduct = { ...products[productIndex], ...product }
    products[productIndex] = updatedProduct
    setToStorage(STORAGE_KEYS.PRODUCTS, products)
    
    return updatedProduct
  },

  // Delete product
  async delete(id: string): Promise<void> {
    const products = getProducts()
    const filteredProducts = products.filter(p => p.id !== id)
    setToStorage(STORAGE_KEYS.PRODUCTS, filteredProducts)
  }
}

export const categoryService = {
  // Get all categories
  async getAll(): Promise<Category[]> {
    return getCategories()
  }
}
