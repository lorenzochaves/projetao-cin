"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Heart, Info, Search, Star, MapPin } from "lucide-react"
import { Feirante, Product, Screen, CartItem } from "../types"
import { ClientBottomNavigation } from "../components/BottomNav"
import { useProducts } from "@/hooks/api/useProducts"
import { Skeleton } from "@/components/ui/skeleton"

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
  cart, 
  searchQuery, 
  onScreenChange, 
  onSelectProduct, 
  onSearchChange 
}: FeirantePageProps) {
  const { products, loading, error } = useProducts()
  
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
      'folhas': 'Folhas'
    }
    return categoryNames[category] || category.charAt(0).toUpperCase() + category.slice(1)
  }

  return (
    <div className="min-h-screen bg-white pb-16">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pt-12 border-b">
        <Button variant="ghost" size="sm" onClick={() => onScreenChange("home")}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={() => onScreenChange("feirante-profile")}>
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
            <div className="flex items-center gap-1 mt-1">
              <MapPin className="w-3 h-3 text-gray-500" />
              <span className="text-xs text-gray-500">{selectedFeirante.location}</span>
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
                  <div className="grid grid-cols-3 gap-4">
                    {categoryProducts.map((product) => (
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
                                target.parentElement!.classList.add('flex', 'items-center', 'justify-center')
                                target.parentElement!.innerHTML = '📦'
                              }}
                            />
                          </div>
                          <div className="flex items-center justify-center gap-1 mb-1">
                            {!product.isAvailable && (
                              <span className="text-xs text-red-500">Indisponível</span>
                            )}
                          </div>
                          <p className="text-sm font-medium">
                            R$ {product.price.toFixed(2)}/{product.unit}
                          </p>
                          <p className="text-xs text-gray-600">{product.name}</p>
                          {product.stock !== undefined && product.stock < 10 && product.isAvailable && (
                            <p className="text-xs text-orange-500">Últimas unidades</p>
                          )}
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              ))
            )}
          </>
        )}
      </div>

      <ClientBottomNavigation cart={cart} onScreenChange={onScreenChange} />
    </div>
  )
}
