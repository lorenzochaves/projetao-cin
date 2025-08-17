export type Screen =
  | "home"
  | "feirante"
  | "feirante-profile"
  | "feirante-search"
  | "product"
  | "search"
  | "global-search"
  | "cart"
  | "delivery"
  | "schedule"
  | "payment"
  | "success"
  | "profile"
  | "orders"
  | "account"
  | "profilePayment"
  | "addresses"
  | "favorites"
  | "chat"

export interface ProductVariation {
  id: string
  name: string
  description?: string
}

export interface Product {
  id: string
  name: string
  price: number
  unit: string
  image: string
  category: string
  description?: string
  feiranteId?: string
  stock?: number
  isAvailable?: boolean
  unitType?: 'kg' | 'unidade' | 'maco' | 'mao' | 'bandeja'
  variations?: ProductVariation[]
  allowWeightSelection?: boolean
  minWeight?: number
  maxWeight?: number
  weightIncrement?: number
}

export interface CartItem extends Product {
  quantity: number
  feirante: string
  observation?: string
  selectedVariation?: string
  selectedWeight?: number
}

export interface Feirante {
  id: string
  userId?: string
  name: string
  rating: number
  reviewCount?: number
  time: string
  avatar: string
  description: string
  specialties: string[]
  location: string
  isOpen: boolean
  openingHours?: string
  address?: string
}

export interface Category {
  id: string
  name: string
  icon: string
}
