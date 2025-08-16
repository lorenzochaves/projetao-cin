import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { User, Feirante, Product, Category, Order, MarketerOrder, UserAddress, PaymentMethod, Favorite, Review, Finance } from './api/types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Chaves para localStorage
const STORAGE_KEYS = {
  USERS: 'feira_users',
  FEIRANTES: 'feira_feirantes',
  PRODUCTS: 'feira_products',
  CATEGORIES: 'feira_categories',
  ORDERS: 'feira_orders',
  MARKETER_ORDERS: 'feira_marketer_orders',
  ADDRESSES: 'feira_addresses',
  PAYMENT_METHODS: 'feira_payment_methods',
  FAVORITES: 'feira_favorites',
  REVIEWS: 'feira_reviews',
  FINANCES: 'feira_finances',
  CURRENT_USER: 'feira_current_user',
  AUTH_TOKEN: 'feira_auth_token',
  CART: 'feira_cart'
} as const

// Dados mockados iniciais com senhas
const INITIAL_DATA = {
  users: [
    {
      id: "1",
      name: "Marcela",
      surname: "Ribeiro",
      email: "marcela.ribeiro@email.com",
      password: "123456", // Senha para teste
      phone: "(81) 99999-9999",
      cpf: "123.456.789-00",
      type: "client" as const,
      createdAt: "2025-01-01T00:00:00Z",
      avatar: "https://api.dicebear.com/7.x/personas/svg?seed=Marcela&backgroundColor=c0aede,d1d4f9,ffd5dc&size=400"
    },
    {
      id: "2",
      name: "Lucas",
      surname: "Santos",
      email: "lucas.cliente@email.com",
      password: "123456", // Senha para teste
      phone: "(81) 97777-7777",
      cpf: "456.789.123-00",
      type: "client" as const,
      createdAt: "2024-12-15T00:00:00Z",
      avatar: "https://api.dicebear.com/7.x/personas/svg?seed=Lucas&backgroundColor=c0aede,d1d4f9,ffd5dc&size=400"
    },
    {
      id: "3",
      name: "João",
      surname: "Silva",
      email: "joao.feira@email.com",
      password: "123456", // Senha para teste
      phone: "(81) 98888-8888",
      cpf: "987.654.321-00",
      type: "marketer" as const,
      stallName: "João da Horta",
      createdAt: "2024-06-15T00:00:00Z",
      avatar: "https://api.dicebear.com/7.x/personas/svg?seed=Joao&backgroundColor=c0aede,d1d4f9,ffd5dc&size=400"
    },
    {
      id: "4",
      name: "Maria",
      surname: "Oliveira",
      email: "maria.frutas@email.com",
      password: "123456", // Senha para teste
      phone: "(81) 96666-6666",
      cpf: "555.333.111-00",
      type: "marketer" as const,
      stallName: "Maria das Frutas",
      createdAt: "2024-03-20T00:00:00Z",
      avatar: "https://api.dicebear.com/7.x/personas/svg?seed=Maria&backgroundColor=c0aede,d1d4f9,ffd5dc&size=400"
    },
    {
      id: "5",
      name: "Antonio",
      surname: "Costa",
      email: "antonio.carnes@email.com",
      password: "123456", // Senha para teste
      phone: "(81) 95555-5555",
      cpf: "777.888.999-00",
      type: "delivery" as const,
      createdAt: "2024-01-10T00:00:00Z",
      avatar: "https://api.dicebear.com/7.x/personas/svg?seed=Antonio&backgroundColor=c0aede,d1d4f9,ffd5dc&size=400"
    },
    {
      id: "6",
      name: "Carlos",
      surname: "Mendes",
      email: "carlos.carnes@email.com",
      password: "123456",
      phone: "(81) 94444-4444",
      cpf: "111.222.333-44",
      type: "marketer" as const,
      stallName: "Carnes do Carlos",
      createdAt: "2024-05-10T00:00:00Z",
      avatar: "https://api.dicebear.com/7.x/personas/svg?seed=Carlos&backgroundColor=c0aede,d1d4f9,ffd5dc&size=400"
    },
    {
      id: "7",
      name: "Ana",
      surname: "Peixoto",
      email: "ana.peixes@email.com",
      password: "123456",
      phone: "(81) 93333-3333",
      cpf: "222.333.444-55",
      type: "marketer" as const,
      stallName: "Peixaria da Ana",
      createdAt: "2024-04-15T00:00:00Z",
      avatar: "https://api.dicebear.com/7.x/personas/svg?seed=Ana&backgroundColor=c0aede,d1d4f9,ffd5dc&size=400"
    }
  ],
  feirantes: [
    {
      id: "1",
      userId: "3",
      name: "João da Horta",
      rating: 4.8,
      reviewCount: 120,
      time: "15-20 min",
      avatar: "https://api.dicebear.com/7.x/personas/svg?seed=JoaoHorta&backgroundColor=c0aede,d1d4f9,ffd5dc&size=400",
      description: "Especialista em verduras orgânicas há mais de 20 anos. Cultivo próprio sem agrotóxicos, direto da fazenda para sua mesa.",
      specialties: ["Verduras Orgânicas", "Temperos Frescos", "Folhas"],
      location: "Casa Amarela",
      isOpen: true,
      openingHours: "06:00-18:00",
      address: "Feira de Casa Amarela - Recife, PE"
    },
    {
      id: "2",
      userId: "4",
      name: "Maria das Frutas",
      rating: 4.9,
      reviewCount: 89,
      time: "10-15 min",
      avatar: "https://api.dicebear.com/7.x/personas/svg?seed=MariaFrutas&backgroundColor=c0aede,d1d4f9,ffd5dc&size=400",
      description: "Frutas selecionadas e sempre frescas. Trabalho com produtores locais para garantir a melhor qualidade.",
      specialties: ["Frutas Tropicais", "Frutas da Estação", "Sucos Naturais"],
      location: "Boa Viagem",
      isOpen: true,
      openingHours: "07:00-17:00",
      address: "Feira de Boa Viagem - Recife, PE"
    },
    {
      id: "3",
      userId: "6",
      name: "Carnes do Carlos",
      rating: 4.7,
      reviewCount: 95,
      time: "20-25 min",
      avatar: "https://api.dicebear.com/7.x/personas/svg?seed=CarlosCarnes&backgroundColor=c0aede,d1d4f9,ffd5dc&size=400",
      description: "Carnes selecionadas e frescas todos os dias. Cortes especiais e atendimento personalizado.",
      specialties: ["Carnes Bovinas", "Aves", "Suínos"],
      location: "Ipsep",
      isOpen: true,
      openingHours: "06:00-16:00",
      address: "Feira do Ipsep - Recife, PE"
    },
    {
      id: "4",
      userId: "7",
      name: "Peixaria da Ana",
      rating: 4.6,
      reviewCount: 67,
      time: "25-30 min",
      avatar: "https://api.dicebear.com/7.x/personas/svg?seed=AnaPeixes&backgroundColor=c0aede,d1d4f9,ffd5dc&size=400",
      description: "Peixes e frutos do mar frescos, chegados direto do mar. Qualidade garantida!",
      specialties: ["Peixes Frescos", "Camarão", "Frutos do Mar"],
      location: "Brasília Teimosa",
      isOpen: false,
      openingHours: "05:00-14:00",
      address: "Brasília Teimosa - Recife, PE"
    }
  ],
  products: [
    {
      id: "1",
      feiranteId: "1",
      name: "Alface Americana",
      price: 3.5,
      unit: "unidade",
      image: "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=400&h=400&fit=crop&crop=center",
      category: "folhas",
      description: "Alface fresca e crocante, ideal para saladas",
      stock: 25,
      isAvailable: true
    },
    {
      id: "2",
      feiranteId: "1",
      name: "Couve Manteiga",
      price: 2.8,
      unit: "maço",
      image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=400&fit=crop&crop=center",
      category: "folhas",
      description: "Couve orgânica, rica em nutrientes",
      stock: 30,
      isAvailable: true
    },
    {
      id: "3",
      feiranteId: "1",
      name: "Rúcula",
      price: 4.2,
      unit: "maço",
      image: "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?w=400&h=400&fit=crop&crop=center",
      category: "folhas",
      description: "Rúcula selvagem com sabor marcante",
      stock: 15,
      isAvailable: true
    },
    {
      id: "4",
      feiranteId: "2",
      name: "Banana Prata",
      price: 4.5,
      unit: "kg",
      image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=400&fit=crop&crop=center",
      category: "frutas",
      description: "Banana doce e nutritiva, rica em potássio",
      stock: 50,
      isAvailable: true
    },
    {
      id: "5",
      feiranteId: "2",
      name: "Maçã Gala",
      price: 8.9,
      unit: "kg",
      image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=400&fit=crop&crop=center",
      category: "frutas",
      description: "Maçã crocante e doce, perfeita para lanches",
      stock: 40,
      isAvailable: true
    },
    {
      id: "6",
      feiranteId: "2",
      name: "Laranja Lima",
      price: 3.2,
      unit: "kg",
      image: "https://images.unsplash.com/photo-1547514701-42782101795e?w=400&h=400&fit=crop&crop=center",
      category: "frutas",
      description: "Laranja doce e suculenta, ideal para sucos",
      stock: 60,
      isAvailable: true
    },
    {
      id: "7",
      feiranteId: "1",
      name: "Tomate Salada",
      price: 6.9,
      unit: "kg",
      image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&h=400&fit=crop&crop=center",
      category: "legumes",
      description: "Tomate maduro e saboroso",
      stock: 35,
      isAvailable: true
    },
    {
      id: "8",
      feiranteId: "2",
      name: "Manga Rosa",
      price: 5.8,
      unit: "kg",
      image: "https://images.unsplash.com/photo-1605027990121-3b2c6ed2bb34?w=400&h=400&fit=crop&crop=center",
      category: "frutas",
      description: "Manga doce e perfumada da estação",
      stock: 25,
      isAvailable: true
    },
    {
      id: "9",
      feiranteId: "3",
      name: "Picanha",
      price: 65.9,
      unit: "kg",
      image: "https://images.unsplash.com/photo-1588347818837-7b5d6896da8e?w=400&h=400&fit=crop&crop=center",
      category: "carnes",
      description: "Picanha macia e saborosa, corte especial",
      stock: 12,
      isAvailable: true
    },
    {
      id: "10",
      feiranteId: "3",
      name: "Frango Caipira",
      price: 18.5,
      unit: "kg",
      image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&h=400&fit=crop&crop=center",
      category: "carnes",
      description: "Frango caipira criado solto, mais saboroso",
      stock: 8,
      isAvailable: true
    },
    {
      id: "11",
      feiranteId: "4",
      name: "Pargo",
      price: 35.0,
      unit: "kg",
      image: "https://images.unsplash.com/photo-1544943910-4c1dc44aab44?w=400&h=400&fit=crop&crop=center",
      category: "peixes",
      description: "Pargo fresco pescado ontem",
      stock: 6,
      isAvailable: true
    },
    {
      id: "12",
      feiranteId: "4",
      name: "Camarão Médio",
      price: 42.0,
      unit: "kg",
      image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=400&h=400&fit=crop&crop=center",
      category: "peixes",
      description: "Camarão médio fresco e limpo",
      stock: 4,
      isAvailable: false
    }
  ],
  categories: [
    { id: "1", name: "Frutas", icon: "🍎" },
    { id: "2", name: "Folhas", icon: "🥬" },
    { id: "3", name: "Legumes", icon: "🥕" },
    { id: "4", name: "Carnes", icon: "🥩" },
    { id: "5", name: "Grãos", icon: "🌾" },
    { id: "6", name: "Tubérculos", icon: "🥔" },
    { id: "7", name: "Peixes", icon: "🐟" }
  ],
  orders: [],
  marketerOrders: [],
  addresses: [
    {
      id: "1",
      userId: "1",
      label: "Casa",
      street: "Rua das Flores, 123",
      neighborhood: "Boa Viagem",
      city: "Recife",
      state: "PE",
      zipCode: "51020-120",
      isPrimary: true
    },
    {
      id: "2",
      userId: "1",
      label: "Trabalho",
      street: "Av. Boa Viagem, 456",
      neighborhood: "Boa Viagem",
      city: "Recife",
      state: "PE",
      zipCode: "51021-000",
      isPrimary: false
    },
    {
      id: "3",
      userId: "2",
      label: "Casa",
      street: "Av. Conselheiro Aguiar, 789",
      neighborhood: "Boa Viagem",
      city: "Recife",
      state: "PE",
      zipCode: "51021-030",
      isPrimary: true
    }
  ],
  paymentMethods: [
    {
      id: "1",
      userId: "1",
      type: "credit" as const,
      brand: "visa" as const,
      lastFourDigits: "1234",
      holderName: "Marcela Ribeiro",
      expiryMonth: "12",
      expiryYear: "2027",
      isDefault: true
    },
    {
      id: "2",
      userId: "1",
      type: "debit" as const,
      brand: "mastercard" as const,
      lastFourDigits: "5678",
      holderName: "Marcela Ribeiro",
      expiryMonth: "08",
      expiryYear: "2026",
      isDefault: false
    },
    {
      id: "3",
      userId: "2",
      type: "credit" as const,
      brand: "visa" as const,
      lastFourDigits: "9999",
      holderName: "Lucas Santos",
      expiryMonth: "06",
      expiryYear: "2028",
      isDefault: true
    }
  ],
  favorites: [
    {
      id: "1",
      userId: "1",
      feiranteId: "2",
      createdAt: "2025-08-01T10:00:00Z"
    },
    {
      id: "2",
      userId: "2",
      feiranteId: "1",
      createdAt: "2025-08-05T15:30:00Z"
    }
  ],
  reviews: [
    {
      id: "1",
      feiranteId: "1",
      orderId: "1",
      clientId: "1",
      clientName: "Marcela R.",
      rating: 5,
      comment: "Verduras sempre fresquinhas e orgânicas! Atendimento excelente do João.",
      createdAt: "2025-08-05T12:00:00Z"
    },
    {
      id: "2",
      feiranteId: "2",
      orderId: "2",
      clientId: "2",
      clientName: "Lucas S.",
      rating: 4,
      comment: "Frutas de ótima qualidade, muito saborosas. Recomendo!",
      createdAt: "2025-08-08T16:30:00Z"
    }
  ],
  finances: [
    {
      id: "1",
      marketerId: "3",
      month: "2025-08",
      totalRevenue: 1850.50,
      totalOrders: 67,
      averageOrderValue: 27.62,
      topProducts: [
        {
          productId: "1",
          name: "Alface Americana",
          quantity: 45,
          revenue: 157.50
        },
        {
          productId: "2", 
          name: "Couve Manteiga",
          quantity: 38,
          revenue: 106.40
        }
      ]
    },
    {
      id: "2",
      marketerId: "4",
      month: "2025-08",
      totalRevenue: 2340.80,
      totalOrders: 89,
      averageOrderValue: 26.30,
      topProducts: [
        {
          productId: "4",
          name: "Banana Prata",
          quantity: 85,
          revenue: 382.50
        },
        {
          productId: "5",
          name: "Maçã Gala",
          quantity: 32,
          revenue: 284.80
        }
      ]
    }
  ]
}

// Funções utilitárias para localStorage
export function initializeLocalStorage() {
  if (typeof window === 'undefined') return

  console.log('🔄 Inicializando localStorage...')

  // Força a limpeza e reinicialização dos dados
  Object.entries(STORAGE_KEYS).forEach(([key, storageKey]) => {
    if (key !== 'CURRENT_USER' && key !== 'AUTH_TOKEN' && key !== 'CART') {
      localStorage.removeItem(storageKey)
    }
  })

  // Agora salva todos os dados
  Object.entries(STORAGE_KEYS).forEach(([key, storageKey]) => {
    if (key !== 'CURRENT_USER' && key !== 'AUTH_TOKEN' && key !== 'CART') {
      const dataKey = key.toLowerCase() as keyof typeof INITIAL_DATA
      if (INITIAL_DATA[dataKey]) {
        console.log(`💾 Salvando ${key}:`, INITIAL_DATA[dataKey])
        localStorage.setItem(storageKey, JSON.stringify(INITIAL_DATA[dataKey]))
      }
    }
  })

  console.log('✅ localStorage inicializado!')
  console.log('👥 Usuários salvos:', getUsers())
}

// Função para forçar reinicialização
export function forceInitializeData() {
  if (typeof window === 'undefined') return
  
  console.log('🔄 Forçando reinicialização dos dados...')
  
  // Limpar TODOS os dados existentes
  Object.entries(STORAGE_KEYS).forEach(([key, storageKey]) => {
    localStorage.removeItem(storageKey)
  })
  
  // Reinicializar
  initializeLocalStorage()
  
  console.log('✅ Dados reinicializados com avatares reais!')
}

export function getFromStorage<T>(key: string): T | null {
  if (typeof window === 'undefined') return null
  
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : null
  } catch (error) {
    console.error(`Error reading from localStorage key "${key}":`, error)
    return null
  }
}

export function setToStorage<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error(`Error writing to localStorage key "${key}":`, error)
  }
}

export function removeFromStorage(key: string): void {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.error(`Error removing from localStorage key "${key}":`, error)
  }
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

export function generateToken(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

// Sistema de autenticação
export function getCurrentUser(): User | null {
  return getFromStorage<User>(STORAGE_KEYS.CURRENT_USER)
}

export function setCurrentUser(user: User | null): void {
  setToStorage(STORAGE_KEYS.CURRENT_USER, user)
}

export function getAuthToken(): string | null {
  return getFromStorage<string>(STORAGE_KEYS.AUTH_TOKEN)
}

export function setAuthToken(token: string | null): void {
  setToStorage(STORAGE_KEYS.AUTH_TOKEN, token)
}

export function isAuthenticated(): boolean {
  return !!(getCurrentUser() && getAuthToken())
}

export function getUserType(): 'client' | 'marketer' | 'delivery' | null {
  const user = getCurrentUser()
  return user ? user.type : null
}

export function logout(): void {
  removeFromStorage(STORAGE_KEYS.CURRENT_USER)
  removeFromStorage(STORAGE_KEYS.AUTH_TOKEN)
  removeFromStorage(STORAGE_KEYS.CART)
}

// Função de login
export function login(email: string, password: string): User | null {
  const users = getUsers()
  console.log('🔍 Tentativa de login:', { email, password })
  console.log('👥 Usuários disponíveis:', users)
  
  const user = users.find(u => u.email === email && u.password === password)
  
  if (user) {
    console.log('✅ Usuário encontrado:', user)
    const token = generateToken()
    setCurrentUser(user)
    setAuthToken(token)
    return user
  }
  
  console.log('❌ Usuário não encontrado ou senha incorreta')
  return null
}

// Função de debug temporária
export function debugStorage() {
  if (typeof window === 'undefined') return
  
  console.log('🔍 === DEBUG STORAGE ===')
  console.log('USERS:', getUsers())
  console.log('FEIRANTES:', getFeirantes())
  console.log('PRODUCTS:', getProducts())
  console.log('🔍 === FIM DEBUG ===')
}

// Funções específicas para cada entidade
export function getUsers(): User[] {
  return getFromStorage<User[]>(STORAGE_KEYS.USERS) || []
}

export function getFeirantes(): Feirante[] {
  return getFromStorage<Feirante[]>(STORAGE_KEYS.FEIRANTES) || []
}

export function getProducts(): Product[] {
  return getFromStorage<Product[]>(STORAGE_KEYS.PRODUCTS) || []
}

export function getCategories(): Category[] {
  return getFromStorage<Category[]>(STORAGE_KEYS.CATEGORIES) || []
}

export function getOrders(): Order[] {
  return getFromStorage<Order[]>(STORAGE_KEYS.ORDERS) || []
}

export function getMarketerOrders(): MarketerOrder[] {
  return getFromStorage<MarketerOrder[]>(STORAGE_KEYS.MARKETER_ORDERS) || []
}

export function getAddresses(): UserAddress[] {
  return getFromStorage<UserAddress[]>(STORAGE_KEYS.ADDRESSES) || []
}

export function getPaymentMethods(): PaymentMethod[] {
  return getFromStorage<PaymentMethod[]>(STORAGE_KEYS.PAYMENT_METHODS) || []
}

export function getFavorites(): Favorite[] {
  return getFromStorage<Favorite[]>(STORAGE_KEYS.FAVORITES) || []
}

export function getReviews(): Review[] {
  return getFromStorage<Review[]>(STORAGE_KEYS.REVIEWS) || []
}

export function getFinances(): Finance[] {
  return getFromStorage<Finance[]>(STORAGE_KEYS.FINANCES) || []
}

export { STORAGE_KEYS, INITIAL_DATA }
