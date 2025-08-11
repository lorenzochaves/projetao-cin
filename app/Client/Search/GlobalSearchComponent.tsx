"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, X, Star } from "lucide-react"
import { Feirante, Screen, CartItem } from "../types"
import { ClientBottomNavigation } from "../components/BottomNav"
import { feiranteService } from "@/lib/api/userService"
import { useProducts } from "@/hooks/api/useProducts"
import { useState, useEffect } from "react"
import { Skeleton } from "@/components/ui/skeleton"

interface GlobalSearchPageProps {
  cart: CartItem[]
  searchQuery: string
  showSearchHistory: boolean
  searchHistory: string[]
  onScreenChange: (screen: Screen) => void
  onSelectFeirante: (feirante: Feirante) => void
  onSearchChange: (query: string) => void
  onShowSearchHistoryChange: (show: boolean) => void
  onRemoveFromSearchHistory: (term: string) => void
}

export default function GlobalSearchPage({ 
  cart, 
  searchQuery, 
  showSearchHistory,
  searchHistory,
  onScreenChange, 
  onSelectFeirante, 
  onSearchChange,
  onShowSearchHistoryChange,
  onRemoveFromSearchHistory
}: GlobalSearchPageProps) {
  const { products } = useProducts()
  const [feirantes, setFeirantes] = useState<Feirante[]>([])
  const [categories, setCategories] = useState<Array<{id: string, name: string, icon: string}>>([])
  const [loading, setLoading] = useState(true)
  
  // Load feirantes and categories
  useEffect(() => {
    async function loadData() {
      try {
        const feirantesData = await feiranteService.getAll()
        setFeirantes(feirantesData)
        
        // Extract unique categories from products
        const uniqueCategories = [...new Set(products.map(p => p.category))]
        const categoriesData = uniqueCategories.map(category => ({
          id: category,
          name: getCategoryDisplayName(category),
          icon: getCategoryIcon(category)
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

  return (
    <div className="min-h-screen bg-white pb-16">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 pt-12">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Pesquise feirantes, produtos..."
            className="pl-10 rounded-full bg-gray-100 border-0"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onFocus={() => onShowSearchHistoryChange(true)}
            onBlur={() => setTimeout(() => onShowSearchHistoryChange(false), 200)}
          />
        </div>
        <Button variant="ghost" size="sm" onClick={() => onScreenChange("home")}>
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
          {categories.slice(0, 4).map(category => (
            <Badge key={category.id} variant="outline" className="whitespace-nowrap">
              {category.name}
            </Badge>
          ))}
        </div>
      </div>

      {/* Histórico de Busca */}
      {showSearchHistory && searchHistory.length > 0 && (
        <div className="px-4 mb-6">
          <h3 className="font-bold text-lg mb-3">Buscas recentes</h3>
          <div className="space-y-3">
            {searchHistory.slice(0, 5).map((term, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-gray-700">{term}</span>
                <Button variant="ghost" size="sm" onClick={() => onRemoveFromSearchHistory(term)}>
                  <X className="w-4 h-4 text-gray-400" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Search Results */}
      {searchQuery && !showSearchHistory && (
        <div className="px-4">
          {/* Feirantes Results */}
          {filteredFeirantes.length > 0 && (
            <div className="mb-6">
              <h3 className="font-bold text-lg mb-3">Feirantes</h3>
              <div className="grid grid-cols-2 gap-4">
                {filteredFeirantes.slice(0, 6).map((feirante) => (
                  <Card 
                    key={feirante.id} 
                    className="p-3 cursor-pointer hover:shadow-md transition-shadow"
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
              <h3 className="font-bold text-lg mb-3">Produtos</h3>
              <div className="grid grid-cols-3 gap-4">
                {filteredProducts.slice(0, 9).map((product) => (
                  <Card key={product.id} className="p-2 cursor-pointer hover:shadow-md transition-shadow">
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
      )}

      {/* Default Content (when no search) */}
      {!searchQuery && !showSearchHistory && (
        <>
          {/* Loading state */}
          {loading && (
            <div className="px-4">
              <div className="mb-6">
                <Skeleton className="h-6 w-48 mb-3" />
                <div className="grid grid-cols-2 gap-4">
                  {[1, 2].map((i) => (
                    <Card key={i} className="p-3">
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
            <div className="px-4 mb-6">
              <h3 className="font-bold text-lg mb-3">Feirantes em destaque</h3>
              <div className="grid grid-cols-2 gap-4">
                {feirantes
                  .filter(f => f.isOpen)
                  .slice(0, 2)
                  .map((feirante) => (
                  <Card 
                    key={feirante.id} 
                    className="p-3 cursor-pointer hover:shadow-md transition-shadow"
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
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Categorias */}
          {!loading && categories.length > 0 && (
            <div className="px-4 mb-6">
              <h3 className="font-bold text-lg mb-3">Categorias</h3>
              <div className="grid grid-cols-2 gap-4">
                {categories.map((category) => (
                  <Card key={category.id} className="p-4 text-center cursor-pointer hover:bg-gray-50">
                    <div className="text-3xl mb-2">{category.icon}</div>
                    <p className="font-medium">{category.name}</p>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      <ClientBottomNavigation cart={cart} onScreenChange={onScreenChange} />
    </div>
  )
}
