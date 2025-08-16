"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Check, ShoppingBasket, MessageSquare, MapPin, Info } from "lucide-react"
import { Feirante, Screen } from "../types"
import { ClientBottomNavigation } from "../components/BottomNav"
import { CartItem } from "../types"
import { useState, useEffect } from "react"
import { feiranteService } from "@/lib/api/userService"
import { Skeleton } from "@/components/ui/skeleton"
import { getCurrentUser } from "@/lib/utils"

interface HomePageProps {
  cart: CartItem[]
  onScreenChange: (screen: Screen) => void
  onSelectFeirante: (feirante: Feirante) => void
  currentScreen?: Screen
}

export default function HomePage({ 
  cart, 
  onScreenChange, 
  onSelectFeirante, 
  currentScreen = "home" 
}: HomePageProps) {
  const [feirantes, setFeirantes] = useState<Feirante[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const currentUser = getCurrentUser()
    setUser(currentUser)
  }, [])

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
        <h1 className="text-2xl font-bold mb-4">
          Olá, {user?.name || 'Cliente'}!
        </h1>

        {/* Descrição de feira finalizada — explicação do app e funcionalidades */}
        <Card className="p-5 mb-6">
          <div className="flex items-center gap-2">
            <Check className="h-5 w-5" />
            <h2 className="text-lg font-semibold">Descrição de feira finalizada</h2>
            <Badge variant="secondary" className="ml-1">Beta</Badge>
          </div>

          <p className="mt-3 text-sm text-muted-foreground">
            O Feirou conecta você a feirantes locais para montar sua feira de forma rápida e personalizada.
            Você escolhe o feirante, conversa no chat, monta a lista, confirma o pagamento e acompanha a entrega.
            Ao final, esta seção mostra um resumo da sua compra.
          </p>

          <ul className="mt-4 grid gap-2 text-sm">
            <li className="flex items-center gap-2">
              <ShoppingBasket className="h-4 w-4" />
              <span><strong>Catálogo & Pedido:</strong> veja produtos, adicione/remova itens e acompanhe totais em tempo real.</span>
            </li>
            <li className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <span><strong>Chat com o feirante:</strong> tire dúvidas, combine substituições e personalize sua feira.</span>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span><strong>Entrega/Retirada:</strong> acompanhe previsão de entrega ou combine retirada no ponto.</span>
            </li>
          </ul>

          <div className="mt-4 rounded-md bg-muted p-3 text-xs text-muted-foreground flex gap-2">
            <Info className="h-4 w-4 mt-0.5 shrink-0" />
            <p>
              Após concluir um pedido, aqui aparece o resumo da <em>feira finalizada</em>:
              itens comprados, subtotal, taxa de entrega/descontos, total pago, endereço e observações.
            </p>
          </div>
        </Card>

        {/* Banner de oferta */}
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

      {/* Grid de feirantes */}
      <div className="px-4">
        {error && (
          <div className="text-center py-8">
            <p className="text-red-600 mb-4">Erro ao carregar feirantes</p>
            <p className="text-sm text-gray-600">{error}</p>
          </div>
        )}

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

      <ClientBottomNavigation 
        cart={cart} 
        onScreenChange={onScreenChange} 
        currentScreen={currentScreen} 
      />
    </div>
  )
}
