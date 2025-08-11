"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Search, X } from "lucide-react"
import { Feirante, Product, Screen, CartItem } from "../../types"
import { ClientBottomNavigation } from "../../components/BottomNav"
import { useProducts } from "@/hooks/api/useProducts"
import { Skeleton } from "@/components/ui/skeleton"
import { useMemo } from "react"

interface FeiranteSearchPageProps {
  selectedFeirante: Feirante
  cart: CartItem[]
  searchQuery: string
  showSearchHistory: boolean
  onScreenChange: (screen: Screen) => void
  onSelectProduct: (product: Product) => void
  onSearchChange: (query: string) => void
  onShowSearchHistoryChange: (show: boolean) => void
}

export default function FeiranteSearchPage({ 
  selectedFeirante, 
  cart, 
  searchQuery, 
  showSearchHistory,
  onScreenChange, 
  onSelectProduct, 
  onSearchChange,
  onShowSearchHistoryChange
}: FeiranteSearchPageProps) {
  const { products, loading, error } = useProducts()
  
  // Filter products by current feirante
  const feiranteProducts = useMemo(() => 
    products.filter(p => p.feiranteId === selectedFeirante.id),
    [products, selectedFeirante.id]
  )
  
  // Filter products by search query
  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return feiranteProducts
    
    return feiranteProducts.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [feiranteProducts, searchQuery])
  
  // Get top 4 products as suggestions
  const suggestedProducts = useMemo(() => 
    feiranteProducts.slice(0, 4),
    [feiranteProducts]
  )

  return (
    <div className="min-h-screen bg-white pb-16">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 pt-12">
        <Button variant="ghost" size="sm" onClick={() => onScreenChange("feirante")}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Pesquise produtos..."
            className="pl-10 rounded-full bg-gray-100 border-0"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onFocus={() => onShowSearchHistoryChange(true)}
          />
        </div>
        <Button variant="ghost" size="sm" onClick={() => onScreenChange("feirante")}>
          <X className="w-5 h-5" />
        </Button>
      </div>

      {/* Error state */}
      {error && (
        <div className="px-4 text-center py-8">
          <p className="text-red-600 mb-4">Erro ao carregar produtos</p>
          <p className="text-sm text-gray-600">{error}</p>
        </div>
      )}

      {/* Loading state */}
      {loading && (
        <div className="px-4">
          <div className="mb-6">
            <Skeleton className="h-4 w-48 mb-3" />
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-6 w-20 rounded-full" />
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="p-3">
                <div className="text-center">
                  <Skeleton className="w-16 h-16 rounded-lg mx-auto mb-2" />
                  <Skeleton className="h-4 w-16 mx-auto mb-1" />
                  <Skeleton className="h-3 w-20 mx-auto" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Content */}
      {!loading && !error && (
        <>
          {/* Sugestões do Feirante */}
          {!searchQuery && suggestedProducts.length > 0 && (
            <div className="px-4 mb-6">
              <p className="text-sm text-gray-600 mb-3">Sugestões de {selectedFeirante.name}</p>
              <div className="flex flex-wrap gap-2">
                {suggestedProducts.map((product) => (
                  <Badge 
                    key={product.id}
                    variant="secondary" 
                    className="rounded-full cursor-pointer hover:bg-gray-200"
                    onClick={() => onSearchChange(product.name)}
                  >
                    {product.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Produtos do Feirante */}
          <div className="px-4">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                {searchQuery ? (
                  <>
                    <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">Nenhum produto encontrado</p>
                    <p className="text-sm text-gray-500">Tente buscar por outros termos</p>
                  </>
                ) : (
                  <>
                    <div className="w-16 h-16 bg-gray-100 rounded-lg mx-auto mb-4 flex items-center justify-center text-3xl">
                      📦
                    </div>
                    <p className="text-gray-600 mb-2">Nenhum produto disponível</p>
                    <p className="text-sm text-gray-500">Este feirante ainda não tem produtos cadastrados</p>
                  </>
                )}
              </div>
            ) : (
              <>
                {searchQuery && (
                  <p className="text-sm text-gray-600 mb-4">
                    {filteredProducts.length} resultado{filteredProducts.length !== 1 ? 's' : ''} para "{searchQuery}"
                  </p>
                )}
                <div className="grid grid-cols-2 gap-4">
                  {filteredProducts.map((product) => (
                    <Card 
                      key={product.id} 
                      className="p-3 cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => {
                        onSelectProduct(product)
                        onScreenChange("product")
                      }}
                    >
                      <div className="text-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-lg mx-auto mb-2 overflow-hidden">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement
                              target.style.display = 'none'
                              target.parentElement!.classList.add('flex', 'items-center', 'justify-center', 'text-2xl')
                              target.parentElement!.innerHTML = '📦'
                            }}
                          />
                        </div>
                        <p className="text-sm font-medium">R$ {product.price.toFixed(2)}/{product.unit}</p>
                        <p className="text-xs text-gray-600 truncate">{product.name}</p>
                        {product.stock !== undefined && product.stock < 10 && product.isAvailable && (
                          <p className="text-xs text-orange-500">Últimas unidades</p>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              </>
            )}
          </div>
        </>
      )}

      <ClientBottomNavigation cart={cart} onScreenChange={onScreenChange} />
    </div>
  )
}
