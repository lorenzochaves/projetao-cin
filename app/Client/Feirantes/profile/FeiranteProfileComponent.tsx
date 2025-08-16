"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Heart, Star, MapPin, Clock } from "lucide-react"
import { Feirante, Screen, CartItem } from "../../types"
import { ClientBottomNavigation } from "../../components/BottomNav"
import { useProducts } from "@/hooks/api/useProducts"
import { useState, useEffect, useMemo } from "react"
import { Skeleton } from "@/components/ui/skeleton"

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
  const { products, loading } = useProducts()
  const [isFavorite, setIsFavorite] = useState(false)
  
  // Check if feirante is already favorited
  useEffect(() => {
    const stored = localStorage.getItem('userFavorites')
    if (stored) {
      const favorites = JSON.parse(stored)
      setIsFavorite(favorites.some((fav: any) => fav.id === selectedFeirante.id))
    }
  }, [selectedFeirante.id])

  // Toggle favorite
  const toggleFavorite = () => {
    const stored = localStorage.getItem('userFavorites')
    let favorites = stored ? JSON.parse(stored) : []
    
    if (isFavorite) {
      // Remove from favorites
      favorites = favorites.filter((fav: any) => fav.id !== selectedFeirante.id)
    } else {
      // Add to favorites
      const newFavorite = {
        id: selectedFeirante.id,
        name: selectedFeirante.name,
        avatar: selectedFeirante.avatar,
        rating: selectedFeirante.rating,
        specialty: selectedFeirante.specialties?.[0] || 'Produtos variados',
        location: selectedFeirante.location,
        addedAt: new Date().toISOString()
      }
      favorites.push(newFavorite)
    }
    
    localStorage.setItem('userFavorites', JSON.stringify(favorites))
    setIsFavorite(!isFavorite)
  }
  
  // Get categories from products of this feirante
  const feiranteCategories = useMemo(() => {
    const feiranteProducts = products.filter(p => p.feiranteId === selectedFeirante.id)
    const uniqueCategories = [...new Set(feiranteProducts.map(p => p.category))]
    
    return uniqueCategories.map(category => ({
      id: category,
      name: getCategoryDisplayName(category),
      icon: getCategoryIcon(category)
    }))
  }, [products, selectedFeirante.id])

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

  return (
    <div className="min-h-screen bg-white pb-16">
      {/* Profile */}
      <div className="p-4 pt-12">
        <div className="text-center mb-6">
          <Avatar className="w-24 h-24 mx-auto mb-4">
            <AvatarImage src={selectedFeirante.avatar} />
            <AvatarFallback className="text-2xl">
              {selectedFeirante.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <h1 className="text-2xl font-bold mb-2">{selectedFeirante.name}</h1>
          
          {/* Favorite and Info buttons */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleFavorite}
              className={`${isFavorite ? 'bg-red-50 border-red-200 text-red-600' : ''}`}
            >
              <Heart className={`w-4 h-4 mr-2 ${isFavorite ? 'fill-current text-red-600' : ''}`} />
              {isFavorite ? 'Favoritado' : 'Favoritar'}
            </Button>
            <Button variant="outline" size="sm">
              <span className="text-sm">ℹ️ Info</span>
            </Button>
          </div>
          
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm">{selectedFeirante.rating}</span>
            </div>
          </div>
          
          {/* Status and time */}
          <div className="flex items-center justify-center gap-4 mb-2">
            <div className="flex items-center gap-1">
              <div className={`w-2 h-2 rounded-full ${selectedFeirante.isOpen ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className="text-sm text-gray-600">
                {selectedFeirante.isOpen ? 'Aberto' : 'Fechado'}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-gray-500" />
              <span className="text-sm text-gray-600">{selectedFeirante.time}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-center gap-1 mb-4">
            <MapPin className="w-4 h-4 text-gray-500" />
            <p className="text-sm text-gray-600">{selectedFeirante.location}</p>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-gray-700 leading-relaxed">{selectedFeirante.description}</p>
        </div>

        {/* Loading state for categories */}
        {loading && (
          <div className="mb-6">
            <Skeleton className="h-6 w-48 mb-3" />
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="text-center">
                  <Skeleton className="w-16 h-16 rounded-full mx-auto mb-2" />
                  <Skeleton className="h-4 w-16 mx-auto" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Categories that this feirante sells */}
        {!loading && feiranteCategories.length > 0 && (
          <div className="mb-6">
            <h3 className="font-bold text-lg mb-3">{selectedFeirante.name} vende:</h3>
            <div className="grid grid-cols-3 gap-4">
              {feiranteCategories.map((category) => (
                <div key={category.id} className="text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-2 flex items-center justify-center text-2xl">
                    {category.icon}
                  </div>
                  <p className="text-sm font-medium">{category.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Specialties */}
        <div className="mb-6">
          <h3 className="font-bold text-lg mb-3">Especialidades:</h3>
          <div className="flex flex-wrap gap-2">
            {selectedFeirante.specialties.map((specialty, index) => (
              <Badge key={index} variant="secondary" className="text-sm">
                {specialty}
              </Badge>
            ))}
          </div>
        </div>

        {/* Additional info */}
        <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Tempo de entrega:</span>
            <span className="text-sm font-medium">{selectedFeirante.time}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Localização:</span>
            <span className="text-sm font-medium">{selectedFeirante.location}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Avaliação:</span>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{selectedFeirante.rating}/5</span>
            </div>
          </div>
        </div>
      </div>

      <ClientBottomNavigation onScreenChange={onScreenChange} />
    </div>
  )
}
