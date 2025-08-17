"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageCircle, Search, Star, MapPin, Plus, Minus } from "lucide-react"
import { Feirante, Product, Screen, CartItem } from "../types"
import { ClientBottomNavigation } from "../components/BottomNav"
import { useProducts } from "@/hooks/api/useProducts"
import { useCart } from "@/contexts/CartContext"
import { Skeleton } from "@/components/ui/skeleton"
import { useState, useEffect } from "react"
import { getCurrentUser, addToFavorites, removeFromFavorites, isFavorite } from "@/lib/utils"
import ProductVariationModal from "@/components/ui/product-variation-modal"

interface FeirantePageProps {
  selectedFeirante: Feirante
  cart: CartItem[]
  searchQuery: string
  onScreenChange: (screen: Screen) => void
  onSelectProduct: (product: Product) => void
  onSearchChange: (query: string) => void
}

export default function FeirantePage({ 
  selectedFeirante, 
  cart: propCart, 
  searchQuery, 
  onScreenChange, 
  onSelectProduct, 
  onSearchChange 
}: FeirantePageProps) {
  const { products, loading, error } = useProducts()
  const { cart: hookCart, addToCart, updateQuantity } = useCart()
  const [isFavorited, setIsFavorited] = useState(false)
  const [showVariationModal, setShowVariationModal] = useState(false)
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null)
  const currentUser = getCurrentUser()

  useEffect(() => {
    if (currentUser) {
      setIsFavorited(isFavorite(currentUser.id, selectedFeirante.id))
    }
  }, [currentUser, selectedFeirante.id])

  const handleToggleFavorite = () => {
    if (!currentUser) return

    if (isFavorited) {
      const success = removeFromFavorites(currentUser.id, selectedFeirante.id)
      if (success) setIsFavorited(false)
    } else {
      const success = addToFavorites(currentUser.id, selectedFeirante.id)
      if (success) setIsFavorited(true)
    }
  }

  const handleAddToCartClick = (product: Product) => {
    setSelectedProductForModal(product)
    setShowVariationModal(true)
  }

  const handleConfirmAddToCart = (variation: string, quantity: number, observation: string) => {
    if (!selectedProductForModal) return

    // Calcular peso selecionado para produtos por kg
    let selectedWeight: number | undefined
    const type = selectedProductForModal.unitType || (selectedProductForModal.unit === "kg" ? "kg" : "unidade")
    if (type === "kg") {
      selectedWeight = quantity * 0.25
    }

    console.log('Adicionando ao carrinho:', {
      product: selectedProductForModal,
      variation,
      quantity,
      selectedWeight,
      observation
    })

    addToCart({
      productId: selectedProductForModal.id,
      name: selectedProductForModal.name,
      price: selectedProductForModal.price,
      unit: selectedProductForModal.unit,
      feiranteId: selectedFeirante.id,
      feiranteName: selectedFeirante.name,
      image: selectedProductForModal.image,
      observation,
      selectedVariation: variation,
      selectedWeight
    }, quantity)

    setShowVariationModal(false)
    setSelectedProductForModal(null)
  }

  // Usar o cart do hook em vez do prop para ter sempre os dados mais atualizados
  const cart = hookCart.items.map(item => ({
    id: item.productId,
    name: item.name,
    price: item.price,
    unit: item.unit,
    image: item.image,
    category: 'geral',
    quantity: item.quantity,
    feirante: item.feiranteName,
    observation: item.observation
  }))
  
  // Filter products by current feirante
  const feiranteProducts = products.filter(p => p.feiranteId === selectedFeirante.id)
  
  // Group products by category
  const groupedProducts = feiranteProducts.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = []
    }
    acc[product.category].push(product)
    return acc
  }, {} as Record<string, Product[]>)

  // Get category display name
  const getCategoryDisplayName = (category: string) => {
    const categoryNames: Record<string, string> = {
      'frutas': 'Frutas',
      'verduras': 'Verduras',
      'legumes': 'Legumes',
      'carnes': 'Carnes',
      'folhas': 'Folhas',
      'tuberculos': 'Tubérculos',
      'temperos': 'Temperos',
      'peixes': 'Peixes'
    }
    return categoryNames[category] || category.charAt(0).toUpperCase() + category.slice(1)
  }

  return (
    <div className="min-h-screen bg-white pb-16">
      {/* Feirante Info */}
      <div className="p-4 pt-12">
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
          <div className="flex-1">
            <h1 className="text-xl font-bold">{selectedFeirante.name}</h1>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm">{selectedFeirante.rating}</span>
              </div>
              <span className="text-gray-300">•</span>
              <span className="text-sm text-gray-600">{selectedFeirante.time}</span>
            </div>
            <div className="flex items-center gap-1 mt-1">
              <MapPin className="w-3 h-3 text-gray-500" />
              <span className="text-xs text-gray-500">{selectedFeirante.location}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => onScreenChange("chat")}
              className="text-orange-600 hover:bg-orange-50"
            >
              <MessageCircle className="w-5 h-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleToggleFavorite}
              className={isFavorited ? "text-red-600 hover:bg-red-50" : "text-gray-600 hover:bg-gray-50"}
            >
              <Heart className={`w-5 h-5 ${isFavorited ? "fill-current" : ""}`} />
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Pesquisa"
            className="pl-10 rounded-full bg-gray-100 border-0"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onClick={() => onScreenChange("feirante-search")}
          />
        </div>
      </div>

      {/* Products */}
      <div className="px-4">
        {/* Error state */}
        {error && (
          <div className="text-center py-8">
            <p className="text-red-600 mb-4">Erro ao carregar produtos</p>
            <p className="text-sm text-gray-600">{error}</p>
          </div>
        )}

        {/* Loading state */}
        {loading && (
          <div className="space-y-8">
            {[1, 2].map((category) => (
              <div key={category}>
                <Skeleton className="h-6 w-24 mb-4" />
                <div className="grid grid-cols-3 gap-4">
                  {[1, 2, 3].map((item) => (
                    <Card key={item} className="p-3">
                      <div className="text-center">
                        <Skeleton className="w-16 h-16 rounded-lg mx-auto mb-2" />
                        <Skeleton className="h-4 w-12 mx-auto mb-1" />
                        <Skeleton className="h-3 w-16 mx-auto" />
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Products by category */}
        {!loading && !error && (
          <>
            {Object.keys(groupedProducts).length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  📦
                </div>
                <p className="text-gray-600 mb-2">Nenhum produto disponível</p>
                <p className="text-sm text-gray-500">Este feirante ainda não tem produtos cadastrados</p>
              </div>
            ) : (
              Object.entries(groupedProducts).map(([category, categoryProducts]) => (
                <div key={category} className="mb-8">
                  <h2 className="text-xl font-bold mb-4">{getCategoryDisplayName(category)}</h2>
                  <div className="grid grid-cols-2 gap-3">
                    {categoryProducts.map((product) => {
                      // Verificar se o produto já está no carrinho
                      const cartItem = cart.find(item => item.id === product.id && item.feirante === selectedFeirante.name)
                      const quantity = cartItem?.quantity || 0
                      
                      return (
                        <div
                          key={product.id}
                          className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
                          onClick={() => {
                            onSelectProduct(product)
                            onScreenChange("product")
                          }}
                        >
                          {/* Imagem do produto */}
                          <div className="relative h-32 bg-gray-100">
                            <img 
                              src={product.image} 
                              alt={product.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement
                                target.style.display = 'none'
                                target.parentElement!.classList.add('flex', 'items-center', 'justify-center', 'text-4xl')
                                target.parentElement!.innerHTML = '📦'
                              }}
                            />
                            
                            {/* Avatar do feirante no canto inferior esquerdo */}
                            <div className="absolute bottom-2 left-2">
                              <img
                                src={selectedFeirante.avatar}
                                alt={selectedFeirante.name}
                                className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                              />
                            </div>
                            
                            {/* Controles de quantidade no canto superior direito */}
                            <div className="absolute top-2 right-2">
                              {quantity > 0 ? (
                                <div className="flex items-center gap-1 bg-white rounded-full px-2 py-1 shadow-md">
                                  <button
                                    onClick={(e) => {
                                      e.preventDefault()
                                      e.stopPropagation()
                                      updateQuantity(product.id, quantity - 1)
                                    }}
                                    className="w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center text-sm hover:bg-red-600 transition-colors"
                                  >
                                    <Minus className="w-3 h-3" />
                                  </button>
                                  <span className="text-xs font-medium text-gray-900 px-1">{quantity}</span>
                                  <button
                                    onClick={(e) => {
                                      e.preventDefault()
                                      e.stopPropagation()
                                      handleAddToCartClick(product)
                                    }}
                                    className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center text-sm hover:bg-green-600 transition-colors"
                                  >
                                    <Plus className="w-3 h-3" />
                                  </button>
                                </div>
                              ) : (
                                <button
                                  onClick={(e) => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                    handleAddToCartClick(product)
                                  }}
                                  className="w-8 h-8 rounded-full bg-white text-green-600 flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors"
                                >
                                  <Plus className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                            
                            {/* Badge de indisponível */}
                            {!product.isAvailable && (
                              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
                                  Indisponível
                                </span>
                              </div>
                            )}
                          </div>
                          
                          {/* Informações do produto */}
                          <div className="p-3">
                            {/* Preço */}
                            <div className="text-lg font-bold text-gray-900 mb-1">
                              R$ {product.price.toFixed(2)}
                            </div>
                            
                            {/* Nome do produto */}
                            <div className="font-medium text-gray-900 text-sm mb-2 line-clamp-2">
                              {product.name}
                            </div>
                            
                            {/* Informações do feirante */}
                            <div className="flex items-center justify-between text-xs text-gray-600">
                              <div className="flex items-center gap-1">
                                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                <span>{selectedFeirante.rating}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span>Grátis</span>
                                <span>•</span>
                                <span>{selectedFeirante.time}</span>
                              </div>
                            </div>
                            
                            {/* Estoque baixo */}
                            {product.stock !== undefined && product.stock < 10 && product.isAvailable && (
                              <div className="mt-2">
                                <span className="text-xs text-orange-500 font-medium">Últimas unidades</span>
                              </div>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))
            )}
          </>
        )}
      </div>
      
      {/* Modal de Variações */}
      <ProductVariationModal
        isOpen={showVariationModal}
        onClose={() => setShowVariationModal(false)}
        product={selectedProductForModal}
        onConfirm={handleConfirmAddToCart}
        feirante={{ id: selectedFeirante.id, name: selectedFeirante.name }}
      />
      
      <ClientBottomNavigation onScreenChange={onScreenChange} />
    </div>
  )
}