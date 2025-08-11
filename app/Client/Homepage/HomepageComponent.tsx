"use client"

import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"
import { Feirante, Screen } from "../types"
import { ClientBottomNavigation } from "../components/BottomNav"
import { CartItem } from "../types"
import { useState, useEffect } from "react"
import { feiranteService } from "@/lib/api/userService"
import { Skeleton } from "@/components/ui/skeleton"

interface HomePageProps {
  cart: CartItem[]
  onScreenChange: (screen: Screen) => void
  onSelectFeirante: (feirante: Feirante) => void
}

export default function HomePage({ cart, onScreenChange, onSelectFeirante }: HomePageProps) {
  const [feirantes, setFeirantes] = useState<Feirante[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadFeirantes() {
      try {
        setLoading(true)
        const feirantesData = await feiranteService.getAll()
        setFeirantes(feirantesData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load feirantes')
      } finally {
        setLoading(false)
      }
    }

    loadFeirantes()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <div className="bg-white p-4 pt-12">
        <h1 className="text-2xl font-bold mb-4">Olá, Marcela!</h1>

        {/* Banner de oferta melhorado */}
        <Card className="bg-gradient-to-r from-green-500 to-green-600 p-6 mb-6 rounded-xl text-white">
          <div className="text-center">
            <h3 className="text-lg font-bold mb-2">🥬 Oferta Especial!</h3>
            <p className="text-green-100 mb-2">Verduras orgânicas com 20% OFF</p>
            <p className="text-sm text-green-200">Válido até domingo</p>
            <div className="flex justify-center mt-3 gap-1">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <div className="w-2 h-2 bg-green-300 rounded-full"></div>
            </div>
          </div>
        </Card>

        <h2 className="text-lg font-semibold mb-4">
          Com quem você deseja
          <br />
          pedir sua feira hoje?
        </h2>
      </div>

      {/* Grid de feirantes melhorado */}
      <div className="px-4">
        {/* Error state */}
        {error && (
          <div className="text-center py-8">
            <p className="text-red-600 mb-4">Erro ao carregar feirantes</p>
            <p className="text-sm text-gray-600">{error}</p>
          </div>
        )}

        {/* Loading state */}
        {loading && (
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="p-4 bg-white">
                <div className="text-center">
                  <Skeleton className="w-16 h-16 rounded-full mx-auto mb-3" />
                  <Skeleton className="h-4 w-20 mx-auto mb-1" />
                  <Skeleton className="h-3 w-16 mx-auto mb-1" />
                  <Skeleton className="w-2 h-2 rounded-full mx-auto" />
                  <Skeleton className="h-3 w-12 mx-auto mt-1" />
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Feirantes grid */}
        {!loading && !error && (
          <div className="grid grid-cols-2 gap-4">
            {feirantes.length === 0 ? (
              <div className="col-span-2 text-center py-8">
                <p className="text-gray-600 mb-2">Nenhum feirante disponível</p>
                <p className="text-sm text-gray-500">Tente novamente mais tarde</p>
              </div>
            ) : (
              feirantes.map((feirante) => (
                <Card
                  key={feirante.id}
                  className="p-4 bg-white cursor-pointer hover:shadow-md transition-all duration-200"
                  onClick={() => {
                    onSelectFeirante(feirante)
                    onScreenChange("feirante")
                  }}
                >
                  <div className="text-center">
                    <Avatar className="w-16 h-16 mx-auto mb-3">
                      <AvatarImage src={feirante.avatar} />
                      <AvatarFallback>
                        {feirante.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <p className="font-medium mb-1 truncate">{feirante.name}</p>
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs text-gray-600">{feirante.rating}</span>
                    </div>
                    <div
                      className={`w-2 h-2 rounded-full mx-auto ${feirante.isOpen ? "bg-green-500" : "bg-red-500"}`}
                    ></div>
                    <p className="text-xs text-gray-500 mt-1">{feirante.isOpen ? "Aberto" : "Fechado"}</p>
                    <p className="text-xs text-gray-400 mt-1">{feirante.time}</p>
                  </div>
                </Card>
              ))
            )}
          </div>
        )}
      </div>

      <ClientBottomNavigation cart={cart} onScreenChange={onScreenChange} />
    </div>
  )
}
