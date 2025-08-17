"use client"

import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, X, Star, Clock, Plus, Minus } from "lucide-react"
import { Feirante, Screen } from "../types"
import { ClientBottomNavigation } from "../components/BottomNav"
import { feiranteService } from "@/lib/api/userService"
import { useProducts } from "@/hooks/api/useProducts"
import { useCart } from "@/contexts/CartContext"
import { useState, useEffect } from "react"
import { Skeleton } from "@/components/ui/skeleton"

interface GlobalSearchPageProps {
  searchQuery: string
  showSearchHistory: boolean
  searchHistory: string[]
  onScreenChange: (screen: Screen) => void
  onSelectFeirante: (feirante: Feirante) => void
  onSelectProduct?: (product: any) => void
  onSearchChange: (query: string) => void
  onShowSearchHistoryChange: (show: boolean) => void
  onRemoveFromSearchHistory: (term: string) => void
}

export default function GlobalSearchPage({ 
  searchQuery, 
  showSearchHistory,
  searchHistory,
  onScreenChange, 
  onSelectFeirante, 
  onSelectProduct,
  onSearchChange,
  onShowSearchHistoryChange,
  onRemoveFromSearchHistory
}: GlobalSearchPageProps) {
  const { products } = useProducts()
  const { cart, addToCart, updateQuantity } = useCart()
  const [feirantes, setFeirantes] = useState<Feirante[]>([])
  const [categories, setCategories] = useState<Array<{id: string, name: string, icon: string, color: string}>>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("todo")
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  
  const tabs = [
    { id: "todo", name: "Todo o Feirou" },
    { id: "feirantes", name: "Feirantes" },
    { id: "mercados", name: "Folhas" },
    { id: "farmacia", name: "Frutas" }
  ]

  const highlightedItems = [
    "Batata doce",
    "Morango", 
    "Açaí",
    "Maracujá",
    "Camarão"
  ]
  
  // Load feirantes and categories
  useEffect(() => {
    async function loadData() {
      try {
        const feirantesData = await feiranteService.getAll()
        setFeirantes(feirantesData)
        
        // Extract unique categories from products with colors
        const uniqueCategories = [...new Set(products.map(p => p.category))]
        const categoriesData = uniqueCategories.map(category => ({
          id: category,
          name: getCategoryDisplayName(category),
          icon: getCategoryIcon(category),
          color: getCategoryColor(category)
        }))
        setCategories(categoriesData)
      } catch (error) {
        console.error('Error loading data:', error)
      } finally {
        setLoading(false)
      }
    }
    
    if (products.length > 0) {
      loadData()
    }
  }, [products])

  const getCategoryDisplayName = (category: string) => {
    const categoryNames: Record<string, string> = {
      'frutas': 'Frutas',
      'verduras': 'Verduras', 
      'legumes': 'Legumes',
      'carnes': 'Carnes',
      'folhas': 'Folhas'
    }
    return categoryNames[category] || category.charAt(0).toUpperCase() + category.slice(1)
  }

  const getCategoryIcon = (category: string) => {
    const categoryIcons: Record<string, string> = {
      'frutas': '🍎',
      'verduras': '🥬',
      'legumes': '🥕', 
      'carnes': '🥩',
      'folhas': '🥬'
    }
    return categoryIcons[category] || '📦'
  }

  const getCategoryColor = (category: string) => {
    const categoryColors: Record<string, string> = {
      'frutas': 'from-red-400 to-pink-500',
      'verduras': 'from-green-400 to-emerald-500',
      'legumes': 'from-orange-400 to-yellow-500',
      'carnes': 'from-red-500 to-red-600',
      'folhas': 'from-green-300 to-green-400'
    }
    return categoryColors[category] || 'from-gray-400 to-gray-500'
  }

  // Filter data based on search query
  const filteredFeirantes = feirantes.filter(feirante => 
    feirante.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    feirante.specialties.some(specialty => 
      specialty.toLowerCase().includes(searchQuery.toLowerCase())
    )
  )

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Adicionar ao histórico apenas quando enviar
      const newHistory = [searchQuery, ...searchHistory.filter(h => h !== searchQuery)].slice(0, 10)
      localStorage.setItem('feira_search_history', JSON.stringify(newHistory))
      setIsSearchFocused(false)
    }
  }

  const handleSearchFocus = () => {
    setIsSearchFocused(true)
    onShowSearchHistoryChange(true)
  }

  return (
    <div className="min-h-screen bg-gray-100 pb-16">
      {/* Barra de busca */}
      <div className="bg-white pt-12 pb-4 px-4 border-b">
        <form onSubmit={handleSearchSubmit} className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-600" />
          <Input
            placeholder="O que vai pedir hoje?"
            className="pl-10 pr-16 rounded-full bg-gray-100 border-0 h-12 text-sm placeholder:text-gray-400 placeholder:text-sm"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onFocus={handleSearchFocus}
          />
          {(isSearchFocused || searchQuery) && (
            <Button 
              type="button" 
              variant="ghost" 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red-500 text-sm"
              onClick={() => {
                onSearchChange("")
                setIsSearchFocused(false)
                onShowSearchHistoryChange(false)
              }}
            >
              Cancelar
            </Button>
          )}
        </form>
      </div>

      {/* Interface de busca ativa */}
      {(isSearchFocused || showSearchHistory) && (
        <div className="bg-white">
          {/* Abas horizontais */}
          <div className="px-4 py-3 border-b">
            <div className="flex gap-4 overflow-x-auto scrollbar-hide">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    setActiveTab(tab.id)
                  }}
                  className={`whitespace-nowrap px-3 py-2 text-sm font-medium rounded-full transition-colors ${
                    activeTab === tab.id 
                      ? 'bg-black text-white' 
                      : 'text-gray-600 hover:text-black'
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </div>
          </div>

          {/* Conteúdo das abas */}
          <div className="px-4 py-4">
            {/* Se está digitando - mostrar resultados em tempo real */}
            {searchQuery.trim() ? (
              <div>
                <h3 className="font-medium text-lg mb-4">Você procura por</h3>
                
                {/* Resultados de Feirantes */}
                {filteredFeirantes.length > 0 && (
                  <div className="mb-6">
                    {filteredFeirantes.slice(0, 3).map((feirante) => (
                      <div 
                        key={feirante.id}
                        className="flex items-center gap-3 py-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 -mx-4 px-4"
                        onClick={() => {
                          onSelectFeirante(feirante)
                          onScreenChange("feirante")
                        }}
                      >
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={feirante.avatar} />
                          <AvatarFallback>
                            {feirante.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{feirante.name}</p>
                          <p className="text-sm text-gray-500">Feirante</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Resultados de Produtos */}
                {filteredProducts.length > 0 && (
                  <div className="mb-6">
                    <div className="grid grid-cols-2 gap-3">
                      {filteredProducts.slice(0, 6).map((product) => {
                        // Buscar o feirante real deste produto
                        const productFeirante = feirantes.find(f => f.id === product.feiranteId)
                        
                        // Verificar se o produto já está no carrinho
                        const cartItem = cart?.items?.find(item => item.productId === product.id)
                        const quantity = cartItem?.quantity || 0
                        
                        return (
                          <div 
                            key={product.id}
                            className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
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
                              {productFeirante && (
                                <div className="absolute bottom-2 left-2">
                                  <img
                                    src={productFeirante.avatar}
                                    alt={productFeirante.name}
                                    className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                                  />
                                </div>
                              )}
                              
                              {/* Controles de quantidade no canto superior direito */}
                              <div className="absolute top-2 right-2">
                                {quantity > 0 ? (
                                  <div className="flex items-center gap-1 bg-white rounded-full px-2 py-1 shadow-md">
                                    <button
                                      onClick={(e) => {
                                        e.preventDefault()
                                        e.stopPropagation()
                                        console.log('🔄 GlobalSearch - Decrementar:', { productId: product.id, currentQuantity: quantity, newQuantity: quantity - 1 })
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
                                        console.log('🔄 GlobalSearch - Incrementar:', { productId: product.id, currentQuantity: quantity, newQuantity: quantity + 1 })
                                        updateQuantity(product.id, quantity + 1)
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
                                      
                                      if (!productFeirante) {
                                        console.error('Feirante não encontrado para o produto:', product)
                                        return
                                      }
                                      
                                      console.log('Adicionando produto ao carrinho:', {
                                        productId: product.id,
                                        name: product.name,
                                        feiranteId: product.feiranteId,
                                        feiranteName: productFeirante.name
                                      })
                                      
                                      addToCart({
                                        productId: product.id,
                                        name: product.name,
                                        price: product.price,
                                        unit: product.unit,
                                        feiranteId: product.feiranteId!,
                                        feiranteName: productFeirante.name,
                                        image: product.image
                                      }, 1)
                                    }}
                                    className="w-8 h-8 rounded-full bg-white text-green-600 flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors"
                                  >
                                    <Plus className="w-4 h-4" />
                                  </button>
                                )}
                              </div>
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
                              {productFeirante && (
                                <div className="flex items-center justify-between text-xs text-gray-600">
                                  <div className="flex items-center gap-1">
                                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                    <span>{productFeirante.rating}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span>Grátis</span>
                                    <span>•</span>
                                    <span>{productFeirante.time}</span>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* Busca por categorias */}
                {categories.filter(cat => 
                  cat.name.toLowerCase().includes(searchQuery.toLowerCase())
                ).length > 0 && (
                  <div className="mb-6">
                    {categories
                      .filter(cat => cat.name.toLowerCase().includes(searchQuery.toLowerCase()))
                      .slice(0, 3)
                      .map((category) => (
                      <div 
                        key={category.id}
                        className="flex items-center gap-3 py-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 -mx-4 px-4"
                      >
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                          <span className="text-2xl">{category.icon}</span>
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{category.name}</p>
                          <p className="text-sm text-gray-500">Categoria</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Nenhum resultado */}
                {filteredFeirantes.length === 0 && filteredProducts.length === 0 && 
                 categories.filter(cat => cat.name.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <p>Nenhum resultado encontrado para "{searchQuery}"</p>
                  </div>
                )}
              </div>
            ) : (
              // Se não está digitando - mostrar Em Alta e Buscas Recentes
              <>
                {/* Em Alta */}
                <div className="mb-6">
                  <h3 className="font-medium text-lg mb-3">Em Alta</h3>
                  <div className="flex flex-wrap gap-2">
                    {highlightedItems.map((item, index) => (
                      <button
                        key={index}
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          onSearchChange(item)
                          // Manter a interface aberta, só mudar o conteúdo
                        }}
                        className="px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-700 hover:bg-gray-200 transition-colors"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Buscas Recentes */}
                {searchHistory.length > 0 && (
                  <div>
                    <h3 className="font-medium text-lg mb-3">Buscas Recentes</h3>
                    <div className="space-y-3">
                      {searchHistory.slice(0, 5).map((term, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <button
                            onClick={(e) => {
                              e.preventDefault()
                              e.stopPropagation()
                              onSearchChange(term)
                              // Manter a interface aberta, só mudar o conteúdo
                            }}
                            className="flex items-center gap-3 flex-1 text-left"
                          >
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-700">{term}</span>
                          </button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={(e) => {
                              e.preventDefault()
                              e.stopPropagation()
                              onRemoveFromSearchHistory(term)
                            }}
                          >
                            <X className="w-4 h-4 text-gray-400" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {/* Resultados da busca - só aparece quando tem busca e não está focado */}
      {searchQuery && !isSearchFocused && !showSearchHistory && (
        <div className="px-2">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            {/* Feirantes Results */}
            {filteredFeirantes.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold text-base mb-3">Feirantes</h3>
                <div className="grid grid-cols-2 gap-4">
                  {filteredFeirantes.slice(0, 6).map((feirante) => (
                    <Card 
                      key={feirante.id} 
                      className="p-3 cursor-pointer hover:shadow-md transition-shadow border-0"
                      onClick={() => {
                        onSelectFeirante(feirante)
                        onScreenChange("feirante")
                      }}
                    >
                      <div className="text-center">
                        <Avatar className="w-12 h-12 mx-auto mb-2">
                          <AvatarImage src={feirante.avatar} />
                          <AvatarFallback>
                            {feirante.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <p className="text-sm font-medium truncate">{feirante.name}</p>
                        <div className="flex items-center justify-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs text-gray-600">{feirante.rating}</span>
                        </div>
                        <div className="mt-1">
                          <span className={`inline-block w-2 h-2 rounded-full ${feirante.isOpen ? 'bg-green-500' : 'bg-red-500'}`}></span>
                          <span className="text-xs text-gray-500 ml-1">
                            {feirante.isOpen ? 'Aberto' : 'Fechado'}
                          </span>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Products Results */}
            {filteredProducts.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold text-base mb-3">Produtos</h3>
                <div className="grid grid-cols-3 gap-4">
                  {filteredProducts.slice(0, 9).map((product) => (
                    <Card 
                      key={product.id} 
                      className="p-2 cursor-pointer hover:shadow-md transition-shadow border-0"
                      onClick={() => {
                        if (onSelectProduct) {
                          // Encontrar o feirante correspondente ao produto
                          const productFeirante = feirantes.find(f => f.id === product.feiranteId)
                          if (productFeirante) {
                            // Primeiro selecionar o feirante
                            onSelectFeirante(productFeirante)
                            // Depois selecionar o produto
                            onSelectProduct(product)
                            onScreenChange("product")
                          }
                        }
                      }}
                    >
                      <div className="text-center">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg mx-auto mb-1 overflow-hidden">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement
                              target.style.display = 'none'
                              target.parentElement!.classList.add('flex', 'items-center', 'justify-center', 'text-lg')
                              target.parentElement!.innerHTML = '📦'
                            }}
                          />
                        </div>
                        <p className="text-xs font-medium">R$ {product.price.toFixed(2)}</p>
                        <p className="text-xs text-gray-600 truncate">{product.name}</p>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* No Results */}
            {filteredFeirantes.length === 0 && filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">Nenhum resultado encontrado</h3>
                <p className="text-gray-500">Tente buscar por outros termos</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Conteúdo padrão - quando não há busca e não está focado */}
      {!searchQuery && !isSearchFocused && !showSearchHistory && (
        <div className="px-2">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            {/* Loading state */}
            {loading && (
              <div>
                <div className="mb-6">
                  <Skeleton className="h-6 w-48 mb-3" />
                  <div className="grid grid-cols-2 gap-4">
                    {[1, 2].map((i) => (
                      <Card key={i} className="p-3 border-0">
                        <div className="text-center">
                          <Skeleton className="w-12 h-12 rounded-full mx-auto mb-2" />
                          <Skeleton className="h-4 w-20 mx-auto mb-1" />
                          <Skeleton className="h-3 w-16 mx-auto" />
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Feirantes em Destaque */}
            {!loading && feirantes.length > 0 && (
              <div className="mb-8">
                <h3 className="font-medium text-lg mb-4">Feirantes em destaque</h3>
                <div className="grid grid-cols-2 gap-4">
                  {feirantes
                    .filter(f => f.isOpen)
                    .slice(0, 4)
                    .map((feirante) => (
                    <Card 
                      key={feirante.id} 
                      className="p-3 cursor-pointer hover:shadow-md transition-shadow border-0"
                      onClick={() => {
                        onSelectFeirante(feirante)
                        onScreenChange("feirante")
                      }}
                    >
                      <div className="text-center">
                        <Avatar className="w-12 h-12 mx-auto mb-2">
                          <AvatarImage src={feirante.avatar} />
                          <AvatarFallback>
                            {feirante.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <p className="text-sm font-medium truncate">{feirante.name}</p>
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs text-gray-600">{feirante.rating}</span>
                        </div>
                        <div className="flex items-center justify-center gap-1">
                          <span className={`inline-block w-2 h-2 rounded-full ${feirante.isOpen ? 'bg-green-500' : 'bg-red-500'}`}></span>
                          <span className="text-xs text-gray-500">
                            {feirante.isOpen ? 'Aberto' : 'Fechado'}
                          </span>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Categorias */}
            {!loading && categories.length > 0 && (
              <div>
                <h3 className="font-medium text-lg mb-4">Categorias</h3>
                <div className="grid grid-cols-2 gap-4">
                  {categories.map((category) => (
                    <Card 
                      key={category.id} 
                      className="p-4 text-center cursor-pointer hover:shadow-md transition-shadow border-0 overflow-hidden relative"
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-10`}></div>
                      <div className="relative">
                        <div className="text-2xl mb-2 font-bold flex items-center justify-center">{category.icon}</div>
                        <p className="font-medium text-gray-800">{category.name}</p>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <ClientBottomNavigation 
        onScreenChange={onScreenChange} 
        currentScreen="global-search" 
      />
    </div>
  )
}