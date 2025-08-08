"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, X, Star } from "lucide-react"
import { Feirante, Screen, CartItem } from "../types"
import { feirantes, categories } from "../data"
import { ClientBottomNavigation } from "../components/BottomNav"

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
                <Button variant="ghost" size="sm" onClick={() => onRemoveFromSearchHistory(term)}>
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

      <ClientBottomNavigation cart={cart} onScreenChange={onScreenChange} />
    </div>
  )
}
