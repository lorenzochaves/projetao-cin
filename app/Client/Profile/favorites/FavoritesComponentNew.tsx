"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Star, Heart, Trash2 } from "lucide-react"
import { Screen, CartItem, Feirante } from "../../types"
import { ClientBottomNavigation } from "../../components/BottomNav"

interface FavoriteFeirante {
  id: string
  name: string
  avatar: string
  rating: number
  specialty: string
  location: string
  addedAt: string
}

interface FavoritesPageProps {
  cart: CartItem[]
  onScreenChange: (screen: Screen) => void
}

export default function FavoritesPage({ cart, onScreenChange }: FavoritesPageProps) {
  const [favorites, setFavorites] = useState<FavoriteFeirante[]>([])

  // Load favorites from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('userFavorites')
    if (stored) {
      setFavorites(JSON.parse(stored))
    }
  }, [])

  // Save favorites to localStorage
  const saveFavorites = (favoritesList: FavoriteFeirante[]) => {
    localStorage.setItem('userFavorites', JSON.stringify(favoritesList))
    setFavorites(favoritesList)
  }

  const handleRemoveFavorite = (feiranteId: string) => {
    const updatedFavorites = favorites.filter(fav => fav.id !== feiranteId)
    saveFavorites(updatedFavorites)
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  return (
    <div className="min-h-screen bg-white pb-16">
      {/* Header */}
      <div className="flex items-center p-4 pt-12 border-b">
        <Button variant="ghost" size="sm" onClick={() => onScreenChange("profile")}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-xl font-bold ml-2">Favoritos</h1>
      </div>

      <div className="p-4">
        {/* Favorites list */}
        {favorites.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p className="text-lg font-medium text-gray-900 mb-2">Nenhum favorito ainda</p>
            <p className="text-gray-600">Adicione feirantes aos seus favoritos para encontrá-los facilmente</p>
          </div>
        ) : (
          <div className="space-y-3">
            {favorites.map((feirante) => (
              <div key={feirante.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center flex-1">
                    <Avatar className="w-12 h-12 mr-3">
                      <AvatarImage src={feirante.avatar} />
                      <AvatarFallback className="text-sm">
                        {getInitials(feirante.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 mb-1">{feirante.name}</p>
                      <div className="flex items-center gap-1 mb-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs text-gray-600">{feirante.rating.toFixed(1)}</span>
                      </div>
                      <p className="text-xs text-gray-600 mb-1">{feirante.specialty}</p>
                      <p className="text-xs text-gray-500">{feirante.location}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveFavorite(feirante.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <ClientBottomNavigation cart={cart} onScreenChange={onScreenChange} />
    </div>
  )
}
