import { Feirante, Product, Category } from './types'

export const feirantes: Feirante[] = [
  {
    id: "1",
    name: "João da Horta",
    rating: 4.8,
    time: "5h às 16h",
    avatar: "/placeholder.svg?height=80&width=80&text=JH",
    description:
      "Especialista em verduras orgânicas há mais de 20 anos. Cultivo próprio sem agrotóxicos, direto da fazenda para sua mesa.",
    specialties: ["Verduras Orgânicas", "Temperos Frescos", "Folhas"],
    location: "Zona Sul - SP",
    isOpen: true,
  },
  {
    id: "2",
    name: "Maria das Frutas",
    rating: 4.9,
    time: "6h às 15h",
    avatar: "/placeholder.svg?height=80&width=80&text=MF",
    description:
      "Frutas selecionadas e sempre frescas. Trabalho com produtores locais para garantir a melhor qualidade.",
    specialties: ["Frutas Tropicais", "Frutas da Estação", "Sucos Naturais"],
    location: "Centro - SP",
    isOpen: true,
  },
  {
    id: "3",
    name: "Seu Antônio",
    rating: 4.7,
    time: "7h às 17h",
    avatar: "/placeholder.svg?height=80&width=80&text=SA",
    description: "Tradição familiar de 3 gerações. Legumes e tubérculos frescos, direto do produtor.",
    specialties: ["Legumes", "Tubérculos", "Raízes"],
    location: "Zona Norte - SP",
    isOpen: false,
  },
  {
    id: "4",
    name: "Dona Rosa",
    rating: 4.6,
    time: "5h às 14h",
    avatar: "/placeholder.svg?height=80&width=80&text=DR",
    description: "Especializada em produtos orgânicos certificados. Qualidade premium para sua família.",
    specialties: ["Orgânicos", "Grãos", "Cereais"],
    location: "Zona Oeste - SP",
    isOpen: true,
  },
]

export const products: Product[] = [
  {
    id: "1",
    name: "Alface Americana",
    price: 3.5,
    unit: "unidade",
    unitType: "unit",
    image: "🥬",
    category: "folhas",
    description: "Alface fresca e crocante, ideal para saladas",
  },
  {
    id: "2",
    name: "Couve Manteiga",
    price: 2.8,
    unit: "maço",
    unitType: "bunch",
    image: "🥬",
    category: "folhas",
    description: "Couve orgânica, rica em nutrientes",
  },
  {
    id: "3",
    name: "Rúcula",
    price: 4.2,
    unit: "maço",
    unitType: "bunch",
    image: "🥬",
    category: "folhas",
    description: "Rúcula selvagem com sabor marcante",
  },
  {
    id: "4",
    name: "Banana Prata",
    price: 4.5,
    unit: "kg",
    unitType: "kg",
    image: "🍌",
    category: "frutas",
    description: "Banana doce e nutritiva, rica em potássio",
    minWeight: 250,
    maxWeight: 2000,
    weightStep: 250,
    variations: [
      { id: "v4-1", name: "Mais verdes (menos maduras)" },
      { id: "v4-2", name: "Maduras (prontas para consumo)" },
      { id: "v4-3", name: "Bem maduras (para vitamina)" }
    ]
  },
  {
    id: "5",
    name: "Maçã Gala",
    price: 8.9,
    unit: "kg",
    unitType: "kg",
    image: "🍎",
    category: "frutas",
    description: "Maçã crocante e doce, perfeita para lanches",
    minWeight: 250,
    maxWeight: 2000,
    weightStep: 250,
    variations: [
      { id: "v5-1", name: "Pequenas" },
      { id: "v5-2", name: "Médias" },
      { id: "v5-3", name: "Grandes" }
    ]
  },
  {
    id: "6",
    name: "Laranja Lima",
    price: 3.2,
    unit: "kg",
    unitType: "kg",
    image: "🍊",
    category: "frutas",
    description: "Laranja doce e suculenta, ideal para sucos",
    minWeight: 250,
    maxWeight: 2000,
    weightStep: 250,
    variations: [
      { id: "v6-1", name: "Para consumo (mais doces)" },
      { id: "v6-2", name: "Para suco (mais suculentas)" }
    ]
  },
  {
    id: "7",
    name: "Tomate Salada",
    price: 6.9,
    unit: "kg",
    unitType: "kg",
    image: "🍅",
    category: "legumes",
    description: "Tomate maduro e saboroso",
    minWeight: 250,
    maxWeight: 2000,
    weightStep: 250,
    variations: [
      { id: "v7-1", name: "Mais verdes (firmes)" },
      { id: "v7-2", name: "Maduros (prontos para consumo)" },
      { id: "v7-3", name: "Bem maduros (para molho)" }
    ]
  },
  {
    id: "8",
    name: "Cenoura",
    price: 4.2,
    unit: "kg",
    unitType: "kg",
    image: "🥕",
    category: "legumes",
    description: "Cenoura doce e crocante",
    minWeight: 250,
    maxWeight: 2000,
    weightStep: 250,
    variations: [
      { id: "v8-1", name: "Pequenas (baby)" },
      { id: "v8-2", name: "Médias" },
      { id: "v8-3", name: "Grandes" }
    ]
  },
  {
    id: "9",
    name: "Batata Inglesa",
    price: 3.8,
    unit: "kg",
    unitType: "kg",
    image: "🥔",
    category: "tuberculos",
    description: "Batata de qualidade premium",
    minWeight: 250,
    maxWeight: 5000,
    weightStep: 250,
    variations: [
      { id: "v9-1", name: "Pequenas (para fritar)" },
      { id: "v9-2", name: "Médias (uso geral)" },
      { id: "v9-3", name: "Grandes (para assar)" }
    ]
  },
  {
    id: "10",
    name: "Macaxeira",
    price: 5.2,
    unit: "kg",
    unitType: "kg",
    image: "🍠",
    category: "tuberculos",
    description: "Macaxeira fresca e saborosa",
    minWeight: 500,
    maxWeight: 3000,
    weightStep: 250,
    variations: [
      { id: "v10-1", name: "Pequenos pedaços" },
      { id: "v10-2", name: "Pedaços médios" },
      { id: "v10-3", name: "Pedaços grandes" }
    ]
  },
  {
    id: "11",
    name: "Abóbora Cabotiá",
    price: 4.8,
    unit: "kg",
    unitType: "kg",
    image: "🎃",
    category: "legumes",
    description: "Abóbora doce e nutritiva",
    minWeight: 500,
    maxWeight: 2000,
    weightStep: 250,
    variations: [
      { id: "v11-1", name: "Em fatias" },
      { id: "v11-2", name: "Em cubos" },
      { id: "v11-3", name: "Abóbora inteira pequena" }
    ]
  },
  {
    id: "12",
    name: "Ovos Caipira",
    price: 18.0,
    unit: "bandeja (30 unidades)",
    unitType: "bandeja",
    image: "🥚",
    category: "ovos",
    description: "Ovos frescos de galinha caipira",
    variations: [
      { id: "v12-1", name: "Bandeja com 12 ovos", price: 8.0 },
      { id: "v12-2", name: "Bandeja com 18 ovos", price: 12.0 },
      { id: "v12-3", name: "Bandeja com 30 ovos" }
    ]
  },
  {
    id: "13",
    name: "Manjericão",
    price: 3.5,
    unit: "maço",
    unitType: "bunch",
    image: "🌿",
    category: "temperos",
    description: "Manjericão fresco e aromático",
  },
  {
    id: "14",
    name: "Salsa",
    price: 2.5,
    unit: "maço",
    unitType: "bunch",
    image: "🌿",
    category: "temperos",
    description: "Salsa fresquinha para temperos",
  }
]

export const categories: Category[] = [
  { id: "frutas", name: "Frutas", icon: "🍎" },
  { id: "folhas", name: "Folhas", icon: "🥬" },
  { id: "tuberculos", name: "Tubérculos", icon: "🥔" },
  { id: "legumes", name: "Legumes", icon: "🥕" },
  { id: "ovos", name: "Ovos", icon: "🥚" },
  { id: "graos", name: "Grãos", icon: "🌾" },
  { id: "temperos", name: "Temperos", icon: "🌿" },
]
