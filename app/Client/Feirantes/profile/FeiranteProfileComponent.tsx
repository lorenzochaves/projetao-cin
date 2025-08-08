"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Heart, Star } from "lucide-react"
import { Feirante, Screen, CartItem } from "../../types"
import { categories } from "../../data"
import { ClientBottomNavigation } from "../../components/BottomNav"

interface FeiranteProfilePageProps {
  selectedFeirante: Feirante
  cart: CartItem[]
  onScreenChange: (screen: Screen) => void
}

export default function FeiranteProfilePage({ 
  selectedFeirante, 
  cart, 
  onScreenChange 
}: FeiranteProfilePageProps) {
  return (
    <div className="min-h-screen bg-white pb-16">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pt-12 border-b">
        <Button variant="ghost" size="sm" onClick={() => onScreenChange("feirante")}>
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

      <ClientBottomNavigation cart={cart} onScreenChange={onScreenChange} />
    </div>
  )
}
