"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Heart, Info, Search, Star, MapPin } from "lucide-react"
import { Feirante, Product, Screen, CartItem } from "../types"
import { products } from "../data"
import { ClientBottomNavigation } from "../components/BottomNav"

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
  const folhas = products.filter((p) => p.category === "folhas")
  const frutas = products.filter((p) => p.category === "frutas")

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
        {/* Folhas */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Folhas</h2>
          <div className="grid grid-cols-3 gap-4">
            {folhas.map((product) => (
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
                  onSelectProduct(product)
                  onScreenChange("product")
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

      <ClientBottomNavigation cart={cart} onScreenChange={onScreenChange} />
    </div>
  )
}
