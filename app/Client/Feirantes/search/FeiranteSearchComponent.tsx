"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Search, X } from "lucide-react"
import { Feirante, Product, Screen, CartItem } from "../../types"
import { products } from "../../data"
import { ClientBottomNavigation } from "../../components/BottomNav"

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
            placeholder="Pesquisa"
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
            <Card 
              key={product.id} 
              className="p-3 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => {
                onSelectProduct(product)
                onScreenChange("product")
              }}
            >
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

      <ClientBottomNavigation cart={cart} onScreenChange={onScreenChange} />
    </div>
  )
}
