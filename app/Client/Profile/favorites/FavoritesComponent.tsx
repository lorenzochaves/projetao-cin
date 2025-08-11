"use client"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Star, Heart } from "lucide-react"
import { Screen, CartItem } from "../../types"
import { ClientBottomNavigation } from "../../components/BottomNav"
import { useUserFavorites } from "@/hooks/api/useUser"
import { Skeleton } from "@/components/ui/skeleton"

interface FavoritesPageProps {
  cart: CartItem[]
  onScreenChange: (screen: Screen) => void
}

export default function FavoritesPage({ cart, onScreenChange }: FavoritesPageProps) {
  const { favorites, loading, error, removeFavorite } = useUserFavorites("1")

  const handleRemoveFavorite = async (feiranteId: string) => {
    try {
      await removeFavorite(feiranteId)
    } catch (err) {
      console.error('Error removing favorite:', err)
    }
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
        <h1 className="text-xl font-bold ml-2">Meus Favoritos</h1>
      </div>

      <div className="p-4">
        {/* Error state */}
        {error && (
          <div className="text-center py-8">
            <p className="text-red-600 mb-4">Erro ao carregar favoritos</p>
            <p className="text-sm text-gray-600">{error}</p>
          </div>
        )}

        {/* Loading state */}
        {loading && (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Skeleton className="w-12 h-12 rounded-full mr-3" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-3 w-32" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                  </div>
                  <Skeleton className="w-8 h-8" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Favorites list */}
        {!loading && !error && (
          <div className="space-y-4">
            {favorites.length === 0 ? (
              <div className="text-center py-12">
                <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">Nenhum favorito ainda</h3>
                <p className="text-gray-500">Adicione feirantes aos seus favoritos para vê-los aqui</p>
              </div>
            ) : (
              favorites.map((feirante) => (
                <div key={feirante.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Avatar className="w-12 h-12 mr-3">
                        <AvatarImage src={feirante.avatar} alt={feirante.name} />
                        <AvatarFallback>{getInitials(feirante.name)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{feirante.name}</h3>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm text-gray-600 ml-1">
                            {feirante.rating} ({feirante.reviewCount} avaliações)
                          </span>
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          {feirante.specialties.slice(0, 2).map((specialty, index) => (
                            <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded">
                              {specialty}
                            </span>
                          ))}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{feirante.location}</p>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleRemoveFavorite(feirante.id)}
                    >
                      <Heart className="w-5 h-5 text-red-500 fill-current" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      <ClientBottomNavigation cart={cart} onScreenChange={onScreenChange} />
    </div>
  )
}
