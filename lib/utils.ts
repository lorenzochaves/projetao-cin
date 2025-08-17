import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { User, Feirante, Product, Category, Order, MarketerOrder, UserAddress, PaymentMethod, Favorite, Review, Finance, Chat, ChatMessage } from './api/types'

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
  CART: 'feira_cart',
  CHATS: 'feira_chats',
  CHAT_MESSAGES: 'feira_chat_messages'
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
      name: "Antônio",
      surname: "Silva",
      email: "antonio.tuberculos@email.com",
      password: "123456",
      phone: "(81) 93333-3333",
      cpf: "222.333.444-55",
      type: "marketer" as const,
      stallName: "Tubérculos do Antônio",
      createdAt: "2024-04-15T00:00:00Z",
      avatar: "https://api.dicebear.com/7.x/personas/svg?seed=Antonio&backgroundColor=c0aede,d1d4f9,ffd5dc&size=400"
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
      name: "Seu Antônio dos Tubérculos",
      rating: 4.6,
      reviewCount: 67,
      time: "25-30 min",
      avatar: "https://api.dicebear.com/7.x/personas/svg?seed=AntonioTuberculos&backgroundColor=c0aede,d1d4f9,ffd5dc&size=400",
      description: "Especialista em raízes, tubérculos e legumes frescos. Produtos selecionados direto da roça.",
      specialties: ["Tubérculos", "Raízes", "Legumes da Terra"],
      location: "Brasília Teimosa",
      isOpen: true,
      openingHours: "05:00-14:00",
      address: "Brasília Teimosa - Recife, PE"
    }
  ],
  products: [
    // FEIRANTE 1 - João da Horta (Especialista em verduras orgânicas)
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
      feiranteId: "1",
      name: "Espinafre",
      price: 3.8,
      unit: "maço",
      image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=400&fit=crop&crop=center",
      category: "folhas",
      description: "Espinafre tenro e nutritivo",
      stock: 20,
      isAvailable: true
    },
    {
      id: "5",
      feiranteId: "1",
      name: "Acelga",
      price: 3.2,
      unit: "maço",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=400&fit=crop&crop=center",
      category: "folhas",
      description: "Acelga fresca com talos brancos",
      stock: 18,
      isAvailable: true
    },
    {
      id: "6",
      feiranteId: "1",
      name: "Agrião",
      price: 4.5,
      unit: "maço",
      image: "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?w=400&h=400&fit=crop&crop=center",
      category: "folhas",
      description: "Agrião picante e refrescante",
      stock: 12,
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
      isAvailable: true,
      unitType: "kg",
      allowWeightSelection: true,
      minWeight: 0.25,
      maxWeight: 5,
      weightIncrement: 0.25,
      variations: [
        { id: "tomate-verde", name: "Mais verdes", description: "Tomates menos maduros, ideais para saladas" },
        { id: "tomate-maduro", name: "Mais maduros", description: "Tomates bem maduros, ideais para molhos" },
        { id: "tomate-medio", name: "Ponto médio", description: "Tomates no ponto ideal de maturação" }
      ]
    },
    {
      id: "8",
      feiranteId: "1",
      name: "Pepino Japonês",
      price: 4.8,
      unit: "kg",
      image: "https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=400&h=400&fit=crop&crop=center",
      category: "legumes",
      description: "Pepino crocante e refrescante",
      stock: 28,
      isAvailable: true
    },
    {
      id: "9",
      feiranteId: "1",
      name: "Abobrinha",
      price: 5.2,
      unit: "kg",
      image: "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?w=400&h=400&fit=crop&crop=center",
      category: "legumes",
      description: "Abobrinha tenra e versátil",
      stock: 22,
      isAvailable: true
    },
    {
      id: "10",
      feiranteId: "1",
      name: "Berinjela",
      price: 6.5,
      unit: "kg",
      image: "https://images.unsplash.com/photo-1564155733214-b80a66bde40c?w=400&h=400&fit=crop&crop=center",
      category: "legumes",
      description: "Berinjela roxa brilhante",
      stock: 18,
      isAvailable: true
    },
    {
      id: "11",
      feiranteId: "1",
      name: "Pimentão Verde",
      price: 7.8,
      unit: "kg",
      image: "https://images.unsplash.com/photo-1525607551316-4a8e16d1f9ba?w=400&h=400&fit=crop&crop=center",
      category: "legumes",
      description: "Pimentão verde doce",
      stock: 24,
      isAvailable: true
    },
    {
      id: "12",
      feiranteId: "1",
      name: "Pimentão Vermelho",
      price: 8.9,
      unit: "kg",
      image: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400&h=400&fit=crop&crop=center",
      category: "legumes",
      description: "Pimentão vermelho adocicado",
      stock: 20,
      isAvailable: true
    },
    {
      id: "13",
      feiranteId: "1",
      name: "Manjericão",
      price: 2.5,
      unit: "maço",
      image: "https://images.unsplash.com/photo-1618375569909-3c8616cf875d?w=400&h=400&fit=crop&crop=center",
      category: "temperos",
      description: "Manjericão aromático fresco",
      stock: 15,
      isAvailable: true,
      unitType: "maco",
      variations: [
        { id: "manjericao-pequeno", name: "Maço pequeno", description: "Maço menor, ideal para temperar pratos" },
        { id: "manjericao-grande", name: "Maço grande", description: "Maço generoso, perfeito para fazer pesto" },
        { id: "manjericao-selecionado", name: "Folhas selecionadas", description: "As melhores folhas, sem talos" }
      ]
    },
    {
      id: "14",
      feiranteId: "1",
      name: "Salsa",
      price: 2.0,
      unit: "maço",
      image: "https://images.unsplash.com/photo-1610485476004-e6821ad1bf4a?w=400&h=400&fit=crop&crop=center",
      category: "temperos",
      description: "Salsa lisa fresca",
      stock: 25,
      isAvailable: true
    },
    {
      id: "15",
      feiranteId: "1",
      name: "Cebolinha",
      price: 2.2,
      unit: "maço",
      image: "https://images.unsplash.com/photo-1609501676725-7186f3d37561?w=400&h=400&fit=crop&crop=center",
      category: "temperos",
      description: "Cebolinha verde aromática",
      stock: 22,
      isAvailable: true
    },

    // FEIRANTE 2 - Maria das Frutas (Especialista em frutas tropicais)
    {
      id: "16",
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
      id: "17",
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
      id: "18",
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
      id: "19",
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
      id: "20",
      feiranteId: "2",
      name: "Abacaxi Pérola",
      price: 4.5,
      unit: "unidade",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop&crop=center",
      category: "frutas",
      description: "Abacaxi doce e suculento",
      stock: 18,
      isAvailable: true
    },
    {
      id: "21",
      feiranteId: "2",
      name: "Mamão Papaya",
      price: 6.8,
      unit: "kg",
      image: "https://images.unsplash.com/photo-1557308536-ee471ef2c390?w=400&h=400&fit=crop&crop=center",
      category: "frutas",
      description: "Mamão maduro e doce",
      stock: 22,
      isAvailable: true
    },
    {
      id: "22",
      feiranteId: "2",
      name: "Melancia",
      price: 2.8,
      unit: "kg",
      image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=400&h=400&fit=crop&crop=center",
      category: "frutas",
      description: "Melancia doce e refrescante",
      stock: 30,
      isAvailable: true
    },
    {
      id: "23",
      feiranteId: "2",
      name: "Melão Amarelo",
      price: 4.2,
      unit: "kg",
      image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=400&h=400&fit=crop&crop=center",
      category: "frutas",
      description: "Melão doce e aromático",
      stock: 25,
      isAvailable: true
    },
    {
      id: "24",
      feiranteId: "2",
      name: "Uva Roxa",
      price: 12.9,
      unit: "kg",
      image: "https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=400&h=400&fit=crop&crop=center",
      category: "frutas",
      description: "Uva doce sem caroço",
      stock: 15,
      isAvailable: true
    },
    {
      id: "25",
      feiranteId: "2",
      name: "Pêra Williams",
      price: 11.5,
      unit: "kg",
      image: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400&h=400&fit=crop&crop=center",
      category: "frutas",
      description: "Pêra suculenta e perfumada",
      stock: 20,
      isAvailable: true
    },
    {
      id: "26",
      feiranteId: "2",
      name: "Morango",
      price: 8.9,
      unit: "bandeja",
      image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400&h=400&fit=crop&crop=center",
      category: "frutas",
      description: "Morango doce e perfumado",
      stock: 12,
      isAvailable: true
    },
    {
      id: "27",
      feiranteId: "2",
      name: "Limão Tahiti",
      price: 4.5,
      unit: "kg",
      image: "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=400&h=400&fit=crop&crop=center",
      category: "frutas",
      description: "Limão suculento para temperos",
      stock: 35,
      isAvailable: true
    },
    {
      id: "28",
      feiranteId: "2",
      name: "Kiwi",
      price: 15.8,
      unit: "kg",
      image: "https://images.unsplash.com/photo-1585059895524-72359e06133a?w=400&h=400&fit=crop&crop=center",
      category: "frutas",
      description: "Kiwi doce rico em vitamina C",
      stock: 10,
      isAvailable: true
    },
    {
      id: "29",
      feiranteId: "2",
      name: "Goiaba Vermelha",
      price: 6.2,
      unit: "kg",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop&crop=center",
      category: "frutas",
      description: "Goiaba doce e aromática",
      stock: 18,
      isAvailable: true
    },
    {
      id: "30",
      feiranteId: "2",
      name: "Coco Verde",
      price: 3.5,
      unit: "unidade",
      image: "https://images.unsplash.com/photo-1556908769-03a0abdaea41?w=400&h=400&fit=crop&crop=center",
      category: "frutas",
      description: "Coco verde gelado",
      stock: 25,
      isAvailable: true,
      unitType: "unidade",
      variations: [
        { id: "coco-pequeno", name: "Pequeno", description: "Coco menor, mais doce" },
        { id: "coco-medio", name: "Médio", description: "Tamanho padrão, equilibrado" },
        { id: "coco-grande", name: "Grande", description: "Coco grande, muito refrescante" }
      ]
    },

    // FEIRANTE 3 - Carlos do Açougue (Especialista em carnes)
    {
      id: "31",
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
      id: "32",
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
      id: "33",
      feiranteId: "3",
      name: "Alcatra",
      price: 42.9,
      unit: "kg",
      image: "https://images.unsplash.com/photo-1588347818837-7b5d6896da8e?w=400&h=400&fit=crop&crop=center",
      category: "carnes",
      description: "Alcatra macia para assados",
      stock: 15,
      isAvailable: true
    },
    {
      id: "34",
      feiranteId: "3",
      name: "Contrafilé",
      price: 38.9,
      unit: "kg",
      image: "https://images.unsplash.com/photo-1588347818837-7b5d6896da8e?w=400&h=400&fit=crop&crop=center",
      category: "carnes",
      description: "Contrafilé tenro e saboroso",
      stock: 18,
      isAvailable: true
    },
    {
      id: "35",
      feiranteId: "3",
      name: "Costela Bovina",
      price: 28.5,
      unit: "kg",
      image: "https://images.unsplash.com/photo-1588347818837-7b5d6896da8e?w=400&h=400&fit=crop&crop=center",
      category: "carnes",
      description: "Costela para churrasco",
      stock: 20,
      isAvailable: true
    },
    {
      id: "36",
      feiranteId: "3",
      name: "Coxa de Frango",
      price: 12.9,
      unit: "kg",
      image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&h=400&fit=crop&crop=center",
      category: "carnes",
      description: "Coxa de frango com osso",
      stock: 25,
      isAvailable: true
    },
    {
      id: "37",
      feiranteId: "3",
      name: "Peito de Frango",
      price: 16.8,
      unit: "kg",
      image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&h=400&fit=crop&crop=center",
      category: "carnes",
      description: "Peito de frango sem osso",
      stock: 22,
      isAvailable: true
    },
    {
      id: "38",
      feiranteId: "3",
      name: "Carne Moída",
      price: 24.9,
      unit: "kg",
      image: "https://images.unsplash.com/photo-1588347818837-7b5d6896da8e?w=400&h=400&fit=crop&crop=center",
      category: "carnes",
      description: "Carne moída especial",
      stock: 30,
      isAvailable: true
    },
    {
      id: "39",
      feiranteId: "3",
      name: "Linguiça Toscana",
      price: 19.9,
      unit: "kg",
      image: "https://images.unsplash.com/photo-1624300629298-e9de39c13253?w=400&h=400&fit=crop&crop=center",
      category: "carnes",
      description: "Linguiça artesanal temperada",
      stock: 15,
      isAvailable: true
    },
    {
      id: "40",
      feiranteId: "3",
      name: "Bacon Defumado",
      price: 32.8,
      unit: "kg",
      image: "https://images.unsplash.com/photo-1624300629298-e9de39c13253?w=400&h=400&fit=crop&crop=center",
      category: "carnes",
      description: "Bacon defumado artesanal",
      stock: 12,
      isAvailable: true
    },
    {
      id: "41",
      feiranteId: "3",
      name: "Costela Suína",
      price: 22.5,
      unit: "kg",
      image: "https://images.unsplash.com/photo-1624300629298-e9de39c13253?w=400&h=400&fit=crop&crop=center",
      category: "carnes",
      description: "Costela suína para churrasco",
      stock: 18,
      isAvailable: true
    },
    {
      id: "42",
      feiranteId: "3",
      name: "Lombo Suíno",
      price: 26.9,
      unit: "kg",
      image: "https://images.unsplash.com/photo-1624300629298-e9de39c13253?w=400&h=400&fit=crop&crop=center",
      category: "carnes",
      description: "Lombo suíno macio",
      stock: 14,
      isAvailable: true
    },
    {
      id: "43",
      feiranteId: "3",
      name: "Asa de Frango",
      price: 14.5,
      unit: "kg",
      image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&h=400&fit=crop&crop=center",
      category: "carnes",
      description: "Asa de frango temperada",
      stock: 20,
      isAvailable: true
    },
    {
      id: "44",
      feiranteId: "3",
      name: "Hambúrguer Artesanal",
      price: 28.9,
      unit: "kg",
      image: "https://images.unsplash.com/photo-1588347818837-7b5d6896da8e?w=400&h=400&fit=crop&crop=center",
      category: "carnes",
      description: "Hambúrguer artesanal 150g",
      stock: 25,
      isAvailable: true
    },
    {
      id: "45",
      feiranteId: "3",
      name: "Cupim",
      price: 35.5,
      unit: "kg",
      image: "https://images.unsplash.com/photo-1588347818837-7b5d6896da8e?w=400&h=400&fit=crop&crop=center",
      category: "carnes",
      description: "Cupim macio para churrasco",
      stock: 10,
      isAvailable: true
    },

    // FEIRANTE 4 - Seu Antônio dos Tubérculos (Especialista em raízes e tubérculos)
    {
      id: "46",
      feiranteId: "4",
      name: "Batata Inglesa",
      price: 3.8,
      unit: "kg",
      image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&h=400&fit=crop&crop=center",
      category: "tuberculos",
      description: "Batata inglesa para purê e frituras",
      stock: 50,
      isAvailable: true,
      unitType: "kg",
      allowWeightSelection: true,
      minWeight: 0.5,
      maxWeight: 10,
      weightIncrement: 0.5,
      variations: [
        { id: "batata-pequena", name: "Pequenas", description: "Batatas pequenas, ideais para cozinhar inteiras" },
        { id: "batata-media", name: "Médias", description: "Batatas médias, versáteis para todos os pratos" },
        { id: "batata-grande", name: "Grandes", description: "Batatas grandes, perfeitas para purê e massas" }
      ]
    },
    {
      id: "47",
      feiranteId: "4",
      name: "Batata Doce",
      price: 4.5,
      unit: "kg",
      image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400&h=400&fit=crop&crop=center",
      category: "tuberculos",
      description: "Batata doce roxa nutritiva",
      stock: 35,
      isAvailable: true
    },
    {
      id: "48",
      feiranteId: "4",
      name: "Cenoura",
      price: 4.2,
      unit: "kg",
      image: "https://images.unsplash.com/photo-1445282768818-728615cc910a?w=400&h=400&fit=crop&crop=center",
      category: "legumes",
      description: "Cenoura doce e crocante",
      stock: 40,
      isAvailable: true
    },
    {
      id: "49",
      feiranteId: "4",
      name: "Mandioca",
      price: 3.2,
      unit: "kg",
      image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400&h=400&fit=crop&crop=center",
      category: "tuberculos",
      description: "Mandioca fresca e macia",
      stock: 45,
      isAvailable: true,
      unitType: "kg",
      allowWeightSelection: true,
      minWeight: 0.5,
      maxWeight: 5,
      weightIncrement: 0.25,
      variations: [
        { id: "mandioca-fina", name: "Fina", description: "Mandioca mais fina, cozinha mais rápido" },
        { id: "mandioca-grossa", name: "Grossa", description: "Mandioca grossa, ideal para farofa" },
        { id: "mandioca-branca", name: "Bem branca", description: "Mandioca bem branca e macia" }
      ]
    },
    {
      id: "50",
      feiranteId: "4",
      name: "Inhame",
      price: 5.8,
      unit: "kg",
      image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400&h=400&fit=crop&crop=center",
      category: "tuberculos",
      description: "Inhame nutritivo e cremoso",
      stock: 25,
      isAvailable: true
    },
    {
      id: "51",
      feiranteId: "4",
      name: "Cará",
      price: 6.5,
      unit: "kg",
      image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400&h=400&fit=crop&crop=center",
      category: "tuberculos",
      description: "Cará roxo tradicional",
      stock: 20,
      isAvailable: true
    },
    {
      id: "52",
      feiranteId: "4",
      name: "Beterraba",
      price: 4.8,
      unit: "kg",
      image: "https://images.unsplash.com/photo-1593113616828-8af4ce6c4e99?w=400&h=400&fit=crop&crop=center",
      category: "legumes",
      description: "Beterraba roxa doce",
      stock: 30,
      isAvailable: true
    },
    {
      id: "53",
      feiranteId: "4",
      name: "Rabanete",
      price: 5.2,
      unit: "maço",
      image: "https://images.unsplash.com/photo-1593113616828-8af4ce6c4e99?w=400&h=400&fit=crop&crop=center",
      category: "legumes",
      description: "Rabanete picante",
      stock: 15,
      isAvailable: true
    },
    {
      id: "54",
      feiranteId: "4",
      name: "Nabo",
      price: 4.2,
      unit: "kg",
      image: "https://images.unsplash.com/photo-1593113616828-8af4ce6c4e99?w=400&h=400&fit=crop&crop=center",
      category: "legumes",
      description: "Nabo branco suave",
      stock: 18,
      isAvailable: true
    },
    {
      id: "55",
      feiranteId: "4",
      name: "Cebola Roxa",
      price: 6.8,
      unit: "kg",
      image: "https://images.unsplash.com/photo-1508313880080-c4bec2e3c80b?w=400&h=400&fit=crop&crop=center",
      category: "legumes",
      description: "Cebola roxa doce",
      stock: 35,
      isAvailable: true
    },
    {
      id: "56",
      feiranteId: "4",
      name: "Cebola Branca",
      price: 5.5,
      unit: "kg",
      image: "https://images.unsplash.com/photo-1508313880080-c4bec2e3c80b?w=400&h=400&fit=crop&crop=center",
      category: "legumes",
      description: "Cebola branca tradicional",
      stock: 40,
      isAvailable: true
    },
    {
      id: "57",
      feiranteId: "4",
      name: "Alho Roxo",
      price: 18.9,
      unit: "kg",
      image: "https://images.unsplash.com/photo-1508313880080-c4bec2e3c80b?w=400&h=400&fit=crop&crop=center",
      category: "temperos",
      description: "Alho roxo aromático",
      stock: 12,
      isAvailable: true
    },
    {
      id: "58",
      feiranteId: "4",
      name: "Gengibre",
      price: 12.5,
      unit: "kg",
      image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400&h=400&fit=crop&crop=center",
      category: "tuberculos",
      description: "Gengibre fresco picante",
      stock: 8,
      isAvailable: true
    },
    {
      id: "59",
      feiranteId: "4",
      name: "Maxixe",
      price: 6.8,
      unit: "kg",
      image: "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?w=400&h=400&fit=crop&crop=center",
      category: "legumes",
      description: "Maxixe do nordeste",
      stock: 22,
      isAvailable: true
    },
    {
      id: "60",
      feiranteId: "4",
      name: "Quiabo",
      price: 7.2,
      unit: "kg",
      image: "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?w=400&h=400&fit=crop&crop=center",
      category: "legumes",
      description: "Quiabo tenro",
      stock: 25,
      isAvailable: true
    }
  ],
  categories: [
    { id: "1", name: "Frutas", icon: "🍎" },
    { id: "2", name: "Folhas", icon: "🥬" },
    { id: "3", name: "Legumes", icon: "🥕" },
    { id: "4", name: "Carnes", icon: "🥩" },
    { id: "5", name: "Grãos", icon: "🌾" },
    { id: "6", name: "Tubérculos", icon: "🥔" },
    { id: "7", name: "Peixes", icon: "🐟" },
    { id: "8", name: "Temperos", icon: "🌿" }
  ],
  orders: [
    {
      id: "1",
      clientId: "1",
      feiranteId: "1",
      feiranteName: "João da Horta",
      items: [
        {
          productId: "1",
          name: "Alface Americana",
          price: 3.5,
          quantity: 2
        },
        {
          productId: "2",
          name: "Couve Manteiga",
          price: 2.8,
          quantity: 1
        }
      ],
      total: 14.8,
      status: "entregue" as const,
      createdAt: "2025-08-16T10:30:00Z",
      deliveredAt: "2025-08-16T12:15:00Z",
      estimatedDelivery: "2025-08-16T12:00:00Z",
      deliveryAddress: {
        street: "Rua das Flores, 123",
        neighborhood: "Boa Viagem",
        city: "Recife",
        state: "PE",
        zipCode: "51020-120"
      }
    },
    {
      id: "2",
      clientId: "1",
      feiranteId: "2",
      feiranteName: "Maria das Frutas",
      items: [
        {
          productId: "16",
          name: "Banana Prata",
          price: 4.5,
          quantity: 2
        },
        {
          productId: "17",
          name: "Maçã Gala",
          price: 8.9,
          quantity: 1
        }
      ],
      total: 22.9,
      status: "preparando" as const,
      createdAt: "2025-08-17T08:45:00Z",
      estimatedDelivery: "2025-08-17T10:30:00Z",
      deliveryAddress: {
        street: "Rua das Flores, 123",
        neighborhood: "Boa Viagem",
        city: "Recife",
        state: "PE",
        zipCode: "51020-120"
      }
    },
    {
      id: "3",
      clientId: "1",
      feiranteId: "3",
      feiranteName: "Carnes do Carlos",
      items: [
        {
          productId: "31",
          name: "Picanha",
          price: 65.9,
          quantity: 1
        }
      ],
      total: 70.9,
      status: "pendente" as const,
      createdAt: "2025-08-15T14:20:00Z",
      estimatedDelivery: "2025-08-15T16:00:00Z",
      deliveryAddress: {
        street: "Rua das Flores, 123",
        neighborhood: "Boa Viagem",
        city: "Recife",
        state: "PE",
        zipCode: "51020-120"
      }
    },
    {
      id: "4",
      clientId: "1",
      feiranteId: "1",
      feiranteName: "João da Horta",
      items: [
        {
          productId: "7",
          name: "Tomate Salada",
          price: 6.9,
          quantity: 2
        },
        {
          productId: "8",
          name: "Pepino Japonês",
          price: 4.8,
          quantity: 1
        }
      ],
      total: 23.6,
      status: "entregue" as const,
      createdAt: "2025-08-14T16:10:00Z",
      deliveredAt: "2025-08-14T18:30:00Z",
      estimatedDelivery: "2025-08-14T18:00:00Z",
      deliveryAddress: {
        street: "Rua das Flores, 123",
        neighborhood: "Boa Viagem",
        city: "Recife",
        state: "PE",
        zipCode: "51020-120"
      }
    }
  ],
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
    },
    {
      id: "100",
      feiranteId: "1",
      name: "Coentro",
      price: 2.5,
      unit: "maço",
      image: "https://images.unsplash.com/photo-1635325738730-8eacc6b73a6c?w=400&h=400&fit=crop&crop=center",
      category: "temperos",
      description: "Coentro fresco para temperos",
      stock: 20,
      isAvailable: true,
      unitType: "maco",
      variations: [
        { id: "coentro-pequeno", name: "Maço pequeno", description: "Maço pequeno com folhas novas" },
        { id: "coentro-grande", name: "Maço grande", description: "Maço grande com folhas desenvolvidas" }
      ]
    },
    {
      id: "101",
      feiranteId: "2",
      name: "Ovos Caipira",
      price: 18.0,
      unit: "bandeja",
      image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400&h=400&fit=crop&crop=center",
      category: "outros",
      description: "Ovos caipira frescos",
      stock: 15,
      isAvailable: true,
      unitType: "bandeja",
      variations: [
        { id: "ovos-12", name: "12 unidades", description: "Bandeja com 12 ovos" },
        { id: "ovos-24", name: "24 unidades", description: "Bandeja com 24 ovos" },
        { id: "ovos-30", name: "30 unidades", description: "Bandeja com 30 ovos" }
      ]
    },
    {
      id: "102",
      feiranteId: "1",
      name: "Banana Prata",
      price: 6.5,
      unit: "mão",
      image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=400&fit=crop&crop=center",
      category: "frutas",
      description: "Banana prata doce e saborosa",
      stock: 25,
      isAvailable: true,
      unitType: "mao",
      variations: [
        { id: "banana-verde", name: "Verdes", description: "Bananas verdes para cozinhar" },
        { id: "banana-madura", name: "Maduras", description: "Bananas maduras para consumo" },
        { id: "banana-passando", name: "Passando do ponto", description: "Bananas bem maduras, ideais para vitamina" }
      ]
    },
    {
      id: "103",
      feiranteId: "3",
      name: "Pimentão",
      price: 8.5,
      unit: "kg",
      image: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400&h=400&fit=crop&crop=center",
      category: "legumes",
      description: "Pimentão colorido fresco",
      stock: 18,
      isAvailable: true,
      unitType: "unidade",
      variations: [
        { id: "pimentao-verde", name: "Verde", description: "Pimentão verde tradicional" },
        { id: "pimentao-vermelho", name: "Vermelho", description: "Pimentão vermelho doce" },
        { id: "pimentao-amarelo", name: "Amarelo", description: "Pimentão amarelo suave" }
      ]
    }
  ],
  chats: [] as Chat[],
  chatMessages: [] as ChatMessage[]
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

// Funções de Chat
export function getChats(): Chat[] {
  return getFromStorage<Chat[]>(STORAGE_KEYS.CHATS) || []
}

export function getChatMessages(): ChatMessage[] {
  return getFromStorage<ChatMessage[]>(STORAGE_KEYS.CHAT_MESSAGES) || []
}

export function createOrGetChat(clientId: string, feiranteId: string, clientName: string, feiranteName: string): Chat {
  const chats = getChats()
  const existingChat = chats.find(c => c.clientId === clientId && c.feiranteId === feiranteId)
  
  if (existingChat) {
    return existingChat
  }
  
  const newChat: Chat = {
    id: Date.now().toString(),
    clientId,
    feiranteId,
    clientName,
    feiranteName,
    unreadCount: 0,
    createdAt: new Date().toISOString()
  }
  
  chats.push(newChat)
  setToStorage(STORAGE_KEYS.CHATS, chats)
  return newChat
}

export function sendMessage(chatId: string, senderId: string, senderName: string, senderType: 'client' | 'marketer', message: string): ChatMessage {
  const messages = getChatMessages()
  const chats = getChats()
  
  const newMessage: ChatMessage = {
    id: Date.now().toString(),
    chatId,
    senderId,
    senderName,
    senderType,
    message,
    timestamp: new Date().toISOString(),
    read: false
  }
  
  messages.push(newMessage)
  setToStorage(STORAGE_KEYS.CHAT_MESSAGES, messages)
  
  // Atualizar chat com última mensagem
  const chat = chats.find(c => c.id === chatId)
  if (chat) {
    chat.lastMessage = message
    chat.lastMessageTime = newMessage.timestamp
    if (senderType === 'client') {
      chat.unreadCount += 1
    }
    setToStorage(STORAGE_KEYS.CHATS, chats)
  }
  
  return newMessage
}

export function getChatMessages_ByChat(chatId: string): ChatMessage[] {
  const messages = getChatMessages()
  return messages.filter(m => m.chatId === chatId).sort((a, b) => 
    new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  )
}

export function markMessagesAsRead(chatId: string, userId: string) {
  const messages = getChatMessages()
  const chats = getChats()
  
  messages.forEach(message => {
    if (message.chatId === chatId && message.senderId !== userId) {
      message.read = true
    }
  })
  
  setToStorage(STORAGE_KEYS.CHAT_MESSAGES, messages)
  
  // Reset unread count
  const chat = chats.find(c => c.id === chatId)
  if (chat) {
    chat.unreadCount = 0
    setToStorage(STORAGE_KEYS.CHATS, chats)
  }
}

// Funções de Favoritos
export function addToFavorites(userId: string, feiranteId: string): boolean {
  const favorites = getFavorites()
  const exists = favorites.find(f => f.userId === userId && f.feiranteId === feiranteId)
  
  if (exists) return false
  
  const newFavorite: Favorite = {
    id: Date.now().toString(),
    userId,
    feiranteId,
    createdAt: new Date().toISOString()
  }
  
  favorites.push(newFavorite)
  setToStorage(STORAGE_KEYS.FAVORITES, favorites)
  return true
}

export function removeFromFavorites(userId: string, feiranteId: string): boolean {
  const favorites = getFavorites()
  const index = favorites.findIndex(f => f.userId === userId && f.feiranteId === feiranteId)
  
  if (index === -1) return false
  
  favorites.splice(index, 1)
  setToStorage(STORAGE_KEYS.FAVORITES, favorites)
  return true
}

export function isFavorite(userId: string, feiranteId: string): boolean {
  const favorites = getFavorites()
  return favorites.some(f => f.userId === userId && f.feiranteId === feiranteId)
}

// Funções de Pedidos
export function saveOrder(order: Order): Order {
  const orders = getOrders()
  orders.push(order)
  setToStorage(STORAGE_KEYS.ORDERS, orders)
  return order
}

export function getUserOrders(userId: string): Order[] {
  const orders = getOrders()
  return orders.filter(order => order.clientId === userId)
}

export function updateOrderStatus(orderId: string, status: Order['status']): boolean {
  const orders = getOrders()
  const order = orders.find(o => o.id === orderId)
  
  if (!order) return false
  
  order.status = status
  if (status === 'entregue') {
    order.deliveredAt = new Date().toISOString()
  }
  
  setToStorage(STORAGE_KEYS.ORDERS, orders)
  return true
}

export { STORAGE_KEYS, INITIAL_DATA }
