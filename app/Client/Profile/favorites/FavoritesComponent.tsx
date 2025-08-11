"use client"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ArrowLeft, Star, Heart } from "lucide-react"
import { Screen, CartItem } from "../../types"
import { ClientBottomNavigation } from "../../components/BottomNav"

interface FavoritesPageProps {
  cart: CartItem[]
  onScreenChange: (screen: Screen) => void
}

export default function FavoritesPage({ cart, onScreenChange }: FavoritesPageProps) {
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
        {/* Mock favorites list */}
        <div className="space-y-4">
          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Avatar className="w-12 h-12 mr-3">
                  <AvatarFallback>JF</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">João da Feira</h3>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm text-gray-600 ml-1">4.8 (120 avaliações)</span>
                  </div>
                  <p className="text-sm text-gray-600">Frutas e Verduras</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <Heart className="w-5 h-5 text-red-500 fill-current" />
              </Button>
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Avatar className="w-12 h-12 mr-3">
                  <AvatarFallback>MV</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">Maria das Verduras</h3>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm text-gray-600 ml-1">4.6 (85 avaliações)</span>
                  </div>
                  <p className="text-sm text-gray-600">Verduras Orgânicas</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <Heart className="w-5 h-5 text-red-500 fill-current" />
              </Button>
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Avatar className="w-12 h-12 mr-3">
                  <AvatarFallback>SA</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">Seu Antônio</h3>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm text-gray-600 ml-1">4.9 (200 avaliações)</span>
                  </div>
                  <p className="text-sm text-gray-600">Carnes e Frios</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <Heart className="w-5 h-5 text-red-500 fill-current" />
              </Button>
            </div>
          </div>
        </div>

        {/* Empty state message */}
        {/* <div className="text-center py-12">
          <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-600 mb-2">Nenhum favorito ainda</h3>
          <p className="text-gray-500">Adicione feirantes aos seus favoritos para vê-los aqui</p>
        </div> */}
      </div>

      <ClientBottomNavigation cart={cart} onScreenChange={onScreenChange} />
    </div>
  )
}
