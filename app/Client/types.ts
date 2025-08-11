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

export interface Product {
  id: string
  name: string
  price: number
  unit: string
  image: string
  category: string
  description?: string
}

export interface CartItem extends Product {
  quantity: number
  feirante: string
  observation?: string
}

export interface Feirante {
  id: string
  name: string
  rating: number
  time: string
  avatar: string
  description: string
  specialties: string[]
  location: string
  isOpen: boolean
}

export interface Category {
  id: string
  name: string
  icon: string
}
