"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Star, Heart, Trash2 } from "lucide-react"
import { Screen, CartItem, Feirante } from "../../types"
import { ClientBottomNavigation } from "../../components/BottomNav"
import { getCurrentUser, getFavorites, getFeirantes, removeFromFavorites } from "@/lib/utils"

interface FavoritesPageProps {
  cart: CartItem[]
  onScreenChange: (screen: Screen) => void
  onSelectFeirante?: (feirante: Feirante) => void
}

export default function FavoritesPage({ cart, onScreenChange, onSelectFeirante }: FavoritesPageProps) {
  const [favoritesFeirantes, setFavoritesFeirantes] = useState<Feirante[]>([])
  const [loading, setLoading] = useState(true)

  // Load favorites from localStorage
  const loadFavorites = () => {
    const currentUser = getCurrentUser()
    if (!currentUser) {
      setLoading(false)
      return
    }

    const favorites = getFavorites()
    const feirantes = getFeirantes()
    
    // Filter feirantes that are favorited by current user
    const userFavorites = favorites.filter(fav => fav.userId === currentUser.id)
    const favoriteFeirantes = feirantes.filter(feirante => 
      userFavorites.some(fav => fav.feiranteId === feirante.id)
    )
    
    setFavoritesFeirantes(favoriteFeirantes)
    setLoading(false)
  }

  useEffect(() => {
    loadFavorites()
  }, [])

  // Refresh favorites when component becomes visible
  useEffect(() => {
    const handleFocus = () => {
      loadFavorites()
    }

    window.addEventListener('focus', handleFocus)
    return () => window.removeEventListener('focus', handleFocus)
  }, [])

  const handleRemoveFavorite = (feiranteId: string) => {
    const currentUser = getCurrentUser()
    if (!currentUser) return
    
    const success = removeFromFavorites(currentUser.id, feiranteId)
    if (success) {
      setFavoritesFeirantes(prev => prev.filter(feirante => feirante.id !== feiranteId))
    }
  }

  const handleSelectFeirante = (feirante: Feirante) => {
    // Usar a função callback se disponível, senão navegar para a tela genérica
    if (onSelectFeirante) {
      onSelectFeirante(feirante)
    }
    onScreenChange("feirante")
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
        {/* Loading state */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Carregando favoritos...</p>
          </div>
        ) : (
          <>
            {/* Favorites list */}
            {favoritesFeirantes.length === 0 ? (
              <div className="text-center py-12">
                <Heart className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p className="text-lg font-medium text-gray-900 mb-2">Nenhum favorito ainda</p>
                <p className="text-gray-600">Adicione feirantes aos seus favoritos para encontrá-los facilmente</p>
              </div>
            ) : (
              <div className="space-y-3">
                {favoritesFeirantes.map((feirante) => (
                  <div key={feirante.id} className="border rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div 
                        className="flex items-center flex-1"
                        onClick={() => handleSelectFeirante(feirante)}
                      >
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
                            {feirante.reviewCount && (
                              <span className="text-xs text-gray-500">({feirante.reviewCount})</span>
                            )}
                          </div>
                          <p className="text-xs text-gray-600 mb-1">{feirante.specialties.join(", ")}</p>
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
          </>
        )}
      </div>

      <ClientBottomNavigation onScreenChange={onScreenChange} />
    </div>
  )
}
