"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Home,
  Search,
  ShoppingBasket,
  User,
  ArrowLeft,
  Heart,
  Star,
  MapPin,
  Plus,
  Minus,
  X,
  Check,
  ChevronRight,
  Info,
  Trash2,
} from "lucide-react"

type Screen =
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
  | "chat"

interface Product {
  id: string
  name: string
  price: number
  unit: string
  image: string
  category: string
  description?: string
}

interface CartItem extends Product {
  quantity: number
  feirante: string
  observation?: string
}

interface Feirante {
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

export default function FeiraDeliveryApp() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("home")
  const [selectedFeirante, setSelectedFeirante] = useState<Feirante | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [cart, setCart] = useState<CartItem[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [showObservationModal, setShowObservationModal] = useState(false)
  const [currentObservation, setCurrentObservation] = useState("")
  const [searchHistory, setSearchHistory] = useState([
    "Couve-folha",
    "Seu Nino",
    "Morango",
    "Alface",
    "Batata inglesa grande",
  ])
  const [showSearchHistory, setShowSearchHistory] = useState(false)

  const feirantes: Feirante[] = [
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

  const products: Product[] = [
    {
      id: "1",
      name: "Alface Americana",
      price: 3.5,
      unit: "unidade",
      image: "🥬",
      category: "folhas",
      description: "Alface fresca e crocante, ideal para saladas",
    },
    {
      id: "2",
      name: "Couve Manteiga",
      price: 2.8,
      unit: "maço",
      image: "🥬",
      category: "folhas",
      description: "Couve orgânica, rica em nutrientes",
    },
    {
      id: "3",
      name: "Rúcula",
      price: 4.2,
      unit: "maço",
      image: "🥬",
      category: "folhas",
      description: "Rúcula selvagem com sabor marcante",
    },
    {
      id: "4",
      name: "Banana Prata",
      price: 4.5,
      unit: "kg",
      image: "🍌",
      category: "frutas",
      description: "Banana doce e nutritiva, rica em potássio",
    },
    {
      id: "5",
      name: "Maçã Gala",
      price: 8.9,
      unit: "kg",
      image: "🍎",
      category: "frutas",
      description: "Maçã crocante e doce, perfeita para lanches",
    },
    {
      id: "6",
      name: "Laranja Lima",
      price: 3.2,
      unit: "kg",
      image: "🍊",
      category: "frutas",
      description: "Laranja doce e suculenta, ideal para sucos",
    },
    {
      id: "7",
      name: "Tomate Salada",
      price: 6.9,
      unit: "kg",
      image: "🍅",
      category: "legumes",
      description: "Tomate maduro e saboroso",
    },
    {
      id: "8",
      name: "Cenoura",
      price: 4.2,
      unit: "kg",
      image: "🥕",
      category: "legumes",
      description: "Cenoura doce e crocante",
    },
    {
      id: "9",
      name: "Batata Inglesa",
      price: 3.8,
      unit: "kg",
      image: "🥔",
      category: "tuberculos",
      description: "Batata de qualidade premium",
    },
  ]

  const categories = [
    { id: "frutas", name: "Frutas", icon: "🍎" },
    { id: "folhas", name: "Folhas", icon: "🥬" },
    { id: "tuberculos", name: "Tubérculos", icon: "🥔" },
    { id: "legumes", name: "Legumes", icon: "🥕" },
    { id: "ovos", name: "Ovos", icon: "🥚" },
    { id: "graos", name: "Grãos", icon: "🌾" },
  ]

  const addToCart = (product: Product, feirante: string, observation?: string) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id && item.feirante === feirante)
      if (existing) {
        return prev.map((item) =>
          item.id === product.id && item.feirante === feirante
            ? { ...item, quantity: item.quantity + 1, observation: observation || item.observation }
            : item,
        )
      }
      return [...prev, { ...product, quantity: 1, feirante, observation }]
    })
  }

  const updateQuantity = (id: string, feirante: string, change: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id && item.feirante === feirante
            ? { ...item, quantity: Math.max(0, item.quantity + change) }
            : item,
        )
        .filter((item) => item.quantity > 0),
    )
  }

  const removeFromCart = (id: string, feirante: string) => {
    setCart((prev) => prev.filter((item) => !(item.id === id && item.feirante === feirante)))
  }

  const clearCart = () => {
    setCart([])
  }

  const handleAddToCart = (product: Product, feirante: string) => {
    setSelectedProduct(product)
    setCurrentObservation("")
    setShowObservationModal(true)
  }

  const confirmAddToCart = () => {
    if (selectedProduct && selectedFeirante) {
      addToCart(selectedProduct, selectedFeirante.name, currentObservation)
      setShowObservationModal(false)
      setCurrentScreen("feirante")
    }
  }

  const addToSearchHistory = (term: string) => {
    if (term && !searchHistory.includes(term)) {
      setSearchHistory((prev) => [term, ...prev.slice(0, 4)])
    }
  }

  const removeFromSearchHistory = (term: string) => {
    setSearchHistory((prev) => prev.filter((item) => item !== term))
  }

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  const deliveryFee = 5.0
  const finalTotal = cartTotal + deliveryFee

  const BottomNav = () => (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 safe-area-pb">
      <div className="flex justify-around items-center max-w-md mx-auto">
        <Button
          variant="ghost"
          size="sm"
          className="flex flex-col items-center gap-1 p-2"
          onClick={() => setCurrentScreen("home")}
        >
          <Home className="w-5 h-5" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="flex flex-col items-center gap-1 p-2"
          onClick={() => setCurrentScreen("global-search")}
        >
          <Search className="w-5 h-5" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="flex flex-col items-center gap-1 p-2 relative"
          onClick={() => setCurrentScreen("cart")}
        >
          <ShoppingBasket className="w-5 h-5" />
          {cart.length > 0 && (
            <Badge className="absolute -top-1 -right-1 w-5 h-5 rounded-full p-0 flex items-center justify-center text-xs">
              {cart.length}
            </Badge>
          )}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="flex flex-col items-center gap-1 p-2"
          onClick={() => setCurrentScreen("profile")}
        >
          <User className="w-5 h-5" />
        </Button>
      </div>
    </div>
  )

  if (currentScreen === "home") {
    return (
      <div className="min-h-screen bg-gray-50 pb-16">
        <div className="bg-white p-4 pt-12">
          <h1 className="text-2xl font-bold mb-4">Olá, xxx!</h1>

          {/* Banner de oferta melhorado */}
          <Card className="bg-gradient-to-r from-green-500 to-green-600 p-6 mb-6 rounded-xl text-white">
            <div className="text-center">
              <h3 className="text-lg font-bold mb-2">🥬 Oferta Especial!</h3>
              <p className="text-green-100 mb-2">Verduras orgânicas com 20% OFF</p>
              <p className="text-sm text-green-200">Válido até domingo</p>
              <div className="flex justify-center mt-3 gap-1">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <div className="w-2 h-2 bg-green-300 rounded-full"></div>
                <div className="w-2 h-2 bg-green-300 rounded-full"></div>
              </div>
            </div>
          </Card>

          <h2 className="text-lg font-semibold mb-4">
            Com quem você deseja
            <br />
            pedir sua feira hoje?
          </h2>
        </div>

        {/* Grid de feirantes melhorado */}
        <div className="px-4">
          <div className="grid grid-cols-2 gap-4">
            {feirantes.map((feirante) => (
              <Card
                key={feirante.id}
                className="p-4 bg-white cursor-pointer hover:shadow-md transition-all duration-200"
                onClick={() => {
                  setSelectedFeirante(feirante)
                  setCurrentScreen("feirante")
                }}
              >
                <div className="text-center">
                  <Avatar className="w-16 h-16 mx-auto mb-3">
                    <AvatarImage src={feirante.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {feirante.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <p className="font-medium mb-1">{feirante.name}</p>
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs text-gray-600">{feirante.rating}</span>
                  </div>
                  <div
                    className={`w-2 h-2 rounded-full mx-auto ${feirante.isOpen ? "bg-green-500" : "bg-red-500"}`}
                  ></div>
                  <p className="text-xs text-gray-500 mt-1">{feirante.isOpen ? "Aberto" : "Fechado"}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <BottomNav />
      </div>
    )
  }

  if (currentScreen === "feirante" && selectedFeirante) {
    const folhas = products.filter((p) => p.category === "folhas")
    const frutas = products.filter((p) => p.category === "frutas")

    return (
      <div className="min-h-screen bg-white pb-16">
        {/* Header */}
        <div className="flex items-center justify-between p-4 pt-12 border-b">
          <Button variant="ghost" size="sm" onClick={() => setCurrentScreen("home")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={() => setCurrentScreen("feirante-profile")}>
              <Info className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm">
              <Heart className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Feirante Info */}
        <div className="p-4">
          <div className="flex items-center gap-3 mb-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src={selectedFeirante.avatar || "/placeholder.svg"} />
              <AvatarFallback>
                {selectedFeirante.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-xl font-bold">{selectedFeirante.name}</h1>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm">{selectedFeirante.rating}</span>
                </div>
                <span className="text-gray-300">•</span>
                <span className="text-sm text-gray-600">{selectedFeirante.time}</span>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Pesquisa"
              className="pl-10 rounded-full bg-gray-100 border-0"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onClick={() => setCurrentScreen("feirante-search")}
            />
          </div>
        </div>

        {/* Products */}
        <div className="px-4">
          {/* Folhas */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Folhas</h2>
            <div className="grid grid-cols-3 gap-4">
              {folhas.map((product) => (
                <Card
                  key={product.id}
                  className="p-3 cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => {
                    setSelectedProduct(product)
                    setCurrentScreen("product")
                  }}
                >
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg mx-auto mb-2 flex items-center justify-center text-2xl">
                      {product.image}
                    </div>
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <MapPin className="w-3 h-3 text-gray-400" />
                    </div>
                    <p className="text-sm font-medium">R$ {product.price.toFixed(2)}</p>
                    <p className="text-xs text-gray-600">{product.name}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Frutas */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Frutas</h2>
            <div className="grid grid-cols-3 gap-4">
              {frutas.map((product) => (
                <Card
                  key={product.id}
                  className="p-3 cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => {
                    setSelectedProduct(product)
                    setCurrentScreen("product")
                  }}
                >
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg mx-auto mb-2 flex items-center justify-center text-2xl">
                      {product.image}
                    </div>
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <MapPin className="w-3 h-3 text-gray-400" />
                    </div>
                    <p className="text-sm font-medium">R$ {product.price.toFixed(2)}</p>
                    <p className="text-xs text-gray-600">{product.name}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <BottomNav />
      </div>
    )
  }

  if (currentScreen === "feirante-profile" && selectedFeirante) {
    return (
      <div className="min-h-screen bg-white pb-16">
        {/* Header */}
        <div className="flex items-center justify-between p-4 pt-12 border-b">
          <Button variant="ghost" size="sm" onClick={() => setCurrentScreen("feirante")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="sm">
            <Heart className="w-5 h-5" />
          </Button>
        </div>

        {/* Profile */}
        <div className="p-4">
          <div className="text-center mb-6">
            <Avatar className="w-24 h-24 mx-auto mb-4">
              <AvatarImage src={selectedFeirante.avatar || "/placeholder.svg"} />
              <AvatarFallback className="text-2xl">
                {selectedFeirante.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <h1 className="text-2xl font-bold mb-2">{selectedFeirante.name}</h1>
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm">{selectedFeirante.rating}</span>
              </div>
              <span className="text-gray-300">•</span>
              <span className="text-sm text-gray-600">{selectedFeirante.time}</span>
            </div>
            <p className="text-sm text-gray-600 mb-4">{selectedFeirante.location}</p>
          </div>

          <div className="mb-6">
            <p className="text-gray-700 leading-relaxed">{selectedFeirante.description}</p>
          </div>

          <div className="mb-6">
            <h3 className="font-bold text-lg mb-3">{selectedFeirante.name} vende:</h3>
            <div className="grid grid-cols-3 gap-4">
              {categories.slice(0, 5).map((category) => (
                <div key={category.id} className="text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-2 flex items-center justify-center text-2xl">
                    {category.icon}
                  </div>
                  <p className="text-sm font-medium">{category.name}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            {selectedFeirante.specialties.map((specialty, index) => (
              <Badge key={index} variant="secondary" className="mr-2">
                {specialty}
              </Badge>
            ))}
          </div>
        </div>

        <BottomNav />
      </div>
    )
  }

  if (currentScreen === "feirante-search" && selectedFeirante) {
    return (
      <div className="min-h-screen bg-white pb-16">
        {/* Header */}
        <div className="flex items-center gap-3 p-4 pt-12">
          <Button variant="ghost" size="sm" onClick={() => setCurrentScreen("feirante")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Pesquisa"
              className="pl-10 rounded-full bg-gray-100 border-0"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setShowSearchHistory(true)}
            />
          </div>
          <Button variant="ghost" size="sm" onClick={() => setCurrentScreen("feirante")}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Sugestões do Feirante */}
        <div className="px-4 mb-6">
          <p className="text-sm text-gray-600 mb-3">Sugestões de {selectedFeirante.name}</p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="rounded-full">
              Banana prata
            </Badge>
            <Badge variant="secondary" className="rounded-full">
              Couve-flor
            </Badge>
            <Badge variant="secondary" className="rounded-full">
              Laranja mimo
            </Badge>
            <Badge variant="secondary" className="rounded-full">
              Alface americana
            </Badge>
          </div>
        </div>

        {/* Produtos do Feirante */}
        <div className="px-4">
          <div className="grid grid-cols-2 gap-4">
            {products.slice(0, 6).map((product) => (
              <Card key={product.id} className="p-3 cursor-pointer hover:shadow-md transition-shadow">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg mx-auto mb-2 flex items-center justify-center text-2xl">
                    {product.image}
                  </div>
                  <p className="text-sm font-medium">R$ {product.price.toFixed(2)}</p>
                  <p className="text-xs text-gray-600">{product.name}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <BottomNav />
      </div>
    )
  }

  if (currentScreen === "global-search") {
    return (
      <div className="min-h-screen bg-white pb-16">
        {/* Header */}
        <div className="flex items-center gap-3 p-4 pt-12">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Pesquisa"
              className="pl-10 rounded-full bg-gray-100 border-0"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setShowSearchHistory(true)}
              onBlur={() => setTimeout(() => setShowSearchHistory(false), 200)}
            />
          </div>
          <Button variant="ghost" size="sm" onClick={() => setCurrentScreen("home")}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Filtros */}
        <div className="px-4 mb-4">
          <div className="flex gap-2 overflow-x-auto pb-2">
            <Badge variant="outline" className="whitespace-nowrap">
              Destaques
            </Badge>
            <Badge variant="outline" className="whitespace-nowrap">
              Feirantes
            </Badge>
            <Badge variant="outline" className="whitespace-nowrap">
              Frutas
            </Badge>
            <Badge variant="outline" className="whitespace-nowrap">
              Folhas
            </Badge>
            <Badge variant="outline" className="whitespace-nowrap">
              Legumes
            </Badge>
            <Badge variant="outline" className="whitespace-nowrap">
              Verduras
            </Badge>
          </div>
        </div>

        {/* Histórico de Busca */}
        {showSearchHistory && (
          <div className="px-4 mb-6">
            <h3 className="font-bold text-lg mb-3">Buscas recentes</h3>
            <div className="space-y-3">
              {searchHistory.map((term, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-gray-700">{term}</span>
                  <Button variant="ghost" size="sm" onClick={() => removeFromSearchHistory(term)}>
                    <X className="w-4 h-4 text-gray-400" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Feirantes em Destaque */}
        <div className="px-4 mb-6">
          <h3 className="font-bold text-lg mb-3">Feirantes em destaque</h3>
          <div className="grid grid-cols-2 gap-4">
            {feirantes.slice(0, 2).map((feirante) => (
              <Card key={feirante.id} className="p-3 cursor-pointer hover:shadow-md transition-shadow">
                <div className="text-center">
                  <Avatar className="w-12 h-12 mx-auto mb-2">
                    <AvatarImage src={feirante.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {feirante.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <p className="text-sm font-medium">{feirante.name}</p>
                  <div className="flex items-center justify-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs text-gray-600">{feirante.rating}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Categorias */}
        <div className="px-4 mb-6">
          <div className="grid grid-cols-2 gap-4">
            {categories.map((category) => (
              <Card key={category.id} className="p-4 text-center cursor-pointer hover:bg-gray-50">
                <div className="text-3xl mb-2">{category.icon}</div>
                <p className="font-medium">{category.name}</p>
              </Card>
            ))}
          </div>
        </div>

        <BottomNav />
      </div>
    )
  }

  if (currentScreen === "product" && selectedProduct) {
    return (
      <div className="min-h-screen bg-white pb-16">
        {/* Header */}
        <div className="flex items-center justify-between p-4 pt-12">
          <Button variant="ghost" size="sm" onClick={() => setCurrentScreen("feirante")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </div>

        {/* Product */}
        <div className="px-4">
          <div className="text-center mb-8">
            <div className="w-32 h-32 bg-gray-100 rounded-lg mx-auto mb-4 flex items-center justify-center text-6xl">
              {selectedProduct.image}
            </div>
          </div>

          <h1 className="text-2xl font-bold mb-2">{selectedProduct.name}</h1>
          <p className="text-xl font-bold mb-1">
            R$ {selectedProduct.price.toFixed(2)} /{selectedProduct.unit}
          </p>
          <p className="text-gray-600 text-sm mb-6">
            {selectedProduct.description ||
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
          </p>

          <Button
            className="w-full mb-8 bg-gray-200 text-black hover:bg-gray-300 rounded-xl py-3"
            onClick={() => selectedFeirante && handleAddToCart(selectedProduct, selectedFeirante.name)}
          >
            Adicionar à feira
          </Button>

          {/* Peça também */}
          <div>
            <h2 className="text-lg font-bold mb-4">Peça também</h2>
            <div className="grid grid-cols-4 gap-4">
              {products.slice(0, 4).map((product) => (
                <Card key={product.id} className="p-2 cursor-pointer hover:shadow-md transition-shadow">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg mx-auto mb-1 flex items-center justify-center text-lg">
                      {product.image}
                    </div>
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <MapPin className="w-2 h-2 text-gray-400" />
                    </div>
                    <p className="text-xs font-medium">R$ {product.price.toFixed(2)}</p>
                    <p className="text-xs text-gray-600">{product.name}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Modal de Observação */}
        <Dialog open={showObservationModal} onOpenChange={setShowObservationModal}>
          <DialogContent className="max-w-sm mx-auto">
            <DialogHeader>
              <DialogTitle className="text-left">
                Você tem alguma
                <br />
                observação sobre o item?
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Textarea
                placeholder="Quero uma fruta mais madura..."
                value={currentObservation}
                onChange={(e) => setCurrentObservation(e.target.value)}
                className="bg-gray-100 border-0 resize-none"
                rows={3}
              />
              <Button onClick={confirmAddToCart} className="w-full bg-gray-200 text-black hover:bg-gray-300">
                Adicionar à feira
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <BottomNav />
      </div>
    )
  }

  if (currentScreen === "cart") {
    return (
      <div className="min-h-screen bg-white pb-16">
        {/* Header */}
        <div className="flex items-center justify-between p-4 pt-12 border-b">
          <Button variant="ghost" size="sm" onClick={() => setCurrentScreen("home")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-bold">Minha feira</h1>
          <Button variant="ghost" size="sm" onClick={clearCart}>
            <Trash2 className="w-5 h-5" />
          </Button>
        </div>

        {/* Progress */}
        <div className="px-4 py-6">
          <div className="flex items-center gap-2 mb-6">
            <div className="flex-1 h-1 bg-black rounded"></div>
            <div className="flex-1 h-1 bg-gray-200 rounded"></div>
            <div className="flex-1 h-1 bg-gray-200 rounded"></div>
          </div>
        </div>

        {/* Cart Items */}
        <div className="px-4">
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBasket className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Sua feira está vazia</p>
            </div>
          ) : (
            <>
              {cart.map((item, index) => (
                <div key={`${item.id}-${item.feirante}-${index}`}>
                  {index === 0 || cart[index - 1].feirante !== item.feirante ? (
                    <h3 className="font-bold text-lg mb-3 mt-6 first:mt-0">{item.feirante}</h3>
                  ) : null}

                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      {item.observation && <p className="text-xs text-gray-500 mt-1">Obs: {item.observation}</p>}
                    </div>
                    <div className="flex items-center gap-3">
                      <Button variant="ghost" size="sm" onClick={() => updateQuantity(item.id, item.feirante, -1)}>
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button variant="ghost" size="sm" onClick={() => updateQuantity(item.id, item.feirante, 1)}>
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="w-16 text-right">
                      <p className="text-sm">R$ {(item.price * item.quantity).toFixed(2)}</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromCart(item.id, item.feirante)}
                        className="p-0 h-auto"
                      >
                        <X className="w-3 h-3 text-gray-400" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}

              <Button variant="link" className="text-blue-500 mt-4 p-0">
                Esqueceu de algo?
              </Button>

              {/* Resumo */}
              <div className="mt-8 space-y-2">
                <h3 className="font-bold text-lg mb-4">Resumo</h3>
                <div className="flex justify-between">
                  <span>Feira</span>
                  <span>R$ {cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxa de entrega</span>
                  <span>R$ {deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t">
                  <span>Total</span>
                  <span>R$ {finalTotal.toFixed(2)}</span>
                </div>
              </div>

              <Button
                className="w-full mt-8 bg-black text-white rounded-full py-3"
                onClick={() => setCurrentScreen("delivery")}
              >
                Ir para entrega
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </>
          )}
        </div>

        <BottomNav />
      </div>
    )
  }

  // Resto das telas permanecem iguais...
  if (currentScreen === "delivery") {
    return (
      <div className="min-h-screen bg-white pb-16">
        {/* Header */}
        <div className="flex items-center p-4 pt-12 border-b">
          <Button variant="ghost" size="sm" onClick={() => setCurrentScreen("cart")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-bold ml-4">Entrega</h1>
        </div>

        <div className="p-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">Endereço 1</p>
              </div>
              <div className="w-4 h-4 border-2 border-black rounded-full bg-black"></div>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">Endereço 2</p>
              </div>
              <div className="w-4 h-4 border-2 border-gray-300 rounded-full"></div>
            </div>
          </div>

          <Button variant="link" className="text-blue-500 mt-4 p-0">
            <Plus className="w-4 h-4 mr-2" />
            Adicionar novo endereço
          </Button>

          <Button
            className="w-full mt-8 bg-gray-200 text-black rounded-full py-3"
            onClick={() => setCurrentScreen("schedule")}
          >
            Continuar
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        <BottomNav />
      </div>
    )
  }

  if (currentScreen === "schedule") {
    return (
      <div className="min-h-screen bg-white pb-16">
        {/* Header */}
        <div className="flex items-center p-4 pt-12 border-b">
          <Button variant="ghost" size="sm" onClick={() => setCurrentScreen("delivery")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-4">
          <h1 className="text-2xl font-bold mb-2">Quando será</h1>
          <h1 className="text-2xl font-bold mb-6">feita a entrega?</h1>
          <p className="text-gray-600 mb-6">Selecione uma opção abaixo.</p>

          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((item, index) => (
              <div key={item} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">Data</p>
                  <p className="text-sm text-gray-600">Turno</p>
                </div>
                <div
                  className={`w-4 h-4 border-2 rounded-full ${index === 1 ? "border-black bg-black" : "border-gray-300"}`}
                ></div>
              </div>
            ))}
          </div>

          <Button
            className="w-full mt-8 bg-gray-200 text-black rounded-full py-3"
            onClick={() => setCurrentScreen("payment")}
          >
            Continuar
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        <BottomNav />
      </div>
    )
  }

  if (currentScreen === "payment") {
    return (
      <div className="min-h-screen bg-white pb-16">
        {/* Header */}
        <div className="flex items-center p-4 pt-12 border-b">
          <Button variant="ghost" size="sm" onClick={() => setCurrentScreen("schedule")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-4">
          <h1 className="text-2xl font-bold mb-6">
            Selecione um meio
            <br />
            de pagamento
          </h1>

          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <p className="font-bold mb-2">Pix</p>
            </div>

            <div className="p-4 border rounded-lg">
              <p className="font-bold mb-2">Débito</p>
              <p className="text-sm text-gray-600">Cartão final xxxx</p>
            </div>

            <div className="p-4 border rounded-lg">
              <p className="font-bold mb-2">Crédito</p>
            </div>
          </div>

          <Button
            className="w-full mt-8 bg-gray-200 text-black rounded-full py-3"
            onClick={() => setCurrentScreen("success")}
          >
            Continuar
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        <BottomNav />
      </div>
    )
  }

  if (currentScreen === "success") {
    return (
      <div className="min-h-screen bg-white pb-16 flex flex-col items-center justify-center">
        <div className="text-center px-4">
          <div className="w-24 h-24 bg-black rounded-full flex items-center justify-center mx-auto mb-8">
            <Check className="w-12 h-12 text-white" />
          </div>

          <h1 className="text-3xl font-bold mb-2">Eba!</h1>
          <p className="text-xl mb-8">
            Sua feira foi pedida
            <br />
            com sucesso.
          </p>

          <Button variant="link" className="text-black underline" onClick={() => setCurrentScreen("home")}>
            Acompanhe seu pedido
          </Button>
        </div>

        <BottomNav />
      </div>
    )
  }

  if (currentScreen === "profile") {
    return (
      <div className="min-h-screen bg-white pb-16">
        {/* Header */}
        <div className="flex items-center p-4 pt-12 border-b">
          <Button variant="ghost" size="sm" onClick={() => setCurrentScreen("home")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-4">
          <div className="text-center mb-8">
            <Avatar className="w-20 h-20 mx-auto mb-4">
              <AvatarFallback className="text-2xl">MR</AvatarFallback>
            </Avatar>
            <h1 className="text-2xl font-bold">Marcela Ribeiro</h1>
            <p className="text-gray-600">Cliente desde 2025</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                <div>
                  <p className="font-medium">Pedidos</p>
                  <p className="text-sm text-gray-600">Meus pedidos</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>

            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                <div>
                  <p className="font-medium">Dados da conta</p>
                  <p className="text-sm text-gray-600">Minhas informações</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>

            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                <div>
                  <p className="font-medium">Pagamento</p>
                  <p className="text-sm text-gray-600">Meus cartões</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>

            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                <div>
                  <p className="font-medium">Endereços</p>
                  <p className="text-sm text-gray-600">Meus endereços</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>

            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                <div>
                  <p className="font-medium">Favoritos</p>
                  <p className="text-sm text-gray-600">Meus feirantes favoritos</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </div>

          <div className="mt-8 pt-4 border-t">
            <p className="font-medium mb-2">Configurações</p>
            <p className="text-gray-600">Suporte</p>
          </div>
        </div>

        <BottomNav />
      </div>
    )
  }

  return null
}
