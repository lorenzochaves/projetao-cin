export interface User {
  id: string
  name: string
  surname: string
  email: string
  password: string
  phone: string
  cpf: string
  type: 'client' | 'marketer' | 'delivery'
  stallName?: string
  createdAt: string
  avatar?: string
}

export interface Feirante {
  id: string
  userId: string
  name: string
  rating: number
  reviewCount: number
  time: string
  avatar: string
  description: string
  specialties: string[]
  location: string
  isOpen: boolean
  openingHours: string
  address: string
}

export interface Product {
  id: string
  feiranteId: string
  name: string
  price: number
  unit: string
  image: string
  category: string
  description: string
  stock: number
  isAvailable: boolean
}

export interface Category {
  id: string
  name: string
  icon: string
}

export interface OrderItem {
  productId: string
  name: string
  price: number
  quantity: number
  observation?: string
}

export interface Address {
  street: string
  neighborhood: string
  city: string
  state: string
  zipCode: string
}

export interface Order {
  id: string
  clientId: string
  feiranteId: string
  feiranteName: string
  items: OrderItem[]
  total: number
  status: 'pendente' | 'preparando' | 'entregue' | 'cancelado'
  createdAt: string
  deliveredAt?: string
  estimatedDelivery?: string
  deliveryAddress: Address
}

export interface MarketerOrder {
  id: string
  marketerId: string
  orderId: string
  clientId: string
  clientName: string
  items: OrderItem[]
  total: number
  status: 'pendente' | 'preparando' | 'entregue' | 'cancelado'
  createdAt: string
  deliveredAt?: string
  clientPhone: string
  deliveryAddress: Address
}

export interface UserAddress {
  id: string
  userId: string
  label: string
  street: string
  neighborhood: string
  city: string
  state: string
  zipCode: string
  isPrimary: boolean
}

export interface PaymentMethod {
  id: string
  userId: string
  type: 'credit' | 'debit'
  brand: 'visa' | 'mastercard' | 'elo'
  lastFourDigits: string
  holderName: string
  expiryMonth: string
  expiryYear: string
  isDefault: boolean
}

export interface Favorite {
  id: string
  userId: string
  feiranteId: string
  createdAt: string
}

export interface Review {
  id: string
  feiranteId: string
  orderId: string
  clientId: string
  clientName: string
  rating: number
  comment: string
  createdAt: string
}

export interface Finance {
  id: string
  marketerId: string
  month: string
  totalRevenue: number
  totalOrders: number
  averageOrderValue: number
  topProducts: {
    productId: string
    name: string
    quantity: number
    revenue: number
  }[]
}

export interface ChatMessage {
  id: string
  chatId: string
  senderId: string
  senderName: string
  senderType: 'client' | 'marketer'
  message: string
  timestamp: string
  read: boolean
}

export interface Chat {
  id: string
  clientId: string
  feiranteId: string
  clientName: string
  feiranteName: string
  lastMessage?: string
  lastMessageTime?: string
  unreadCount: number
  createdAt: string
}
