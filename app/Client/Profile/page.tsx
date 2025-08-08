"use client"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ArrowLeft, ChevronRight } from "lucide-react"
import { Screen, CartItem } from "../types"
import { BottomNav } from "../components/BottomNav"

interface ProfilePageProps {
  cart: CartItem[]
  onScreenChange: (screen: Screen) => void
}

export default function ProfilePage({ cart, onScreenChange }: ProfilePageProps) {
  return (
    <div className="min-h-screen bg-white pb-16">
      {/* Header */}
      <div className="flex items-center p-4 pt-12 border-b">
        <Button variant="ghost" size="sm" onClick={() => onScreenChange("home")}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
      </div>

      <div className="p-4">
        <div className="text-center mb-8">
          <Avatar className="w-20 h-20 mx-auto mb-4">
            <AvatarFallback className="text-2xl">MR</AvatarFallback>
          </Avatar>
          <h1 className="text-2xl font-bold">Marcela Ribeiro</h1>
          <p className="text-gray-600">Cliente desde 2025</p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
              <div>
                <p className="font-medium">Pedidos</p>
                <p className="text-sm text-gray-600">Meus pedidos</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>

          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
              <div>
                <p className="font-medium">Dados da conta</p>
                <p className="text-sm text-gray-600">Minhas informações</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>

          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
              <div>
                <p className="font-medium">Pagamento</p>
                <p className="text-sm text-gray-600">Meus cartões</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>

          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
              <div>
                <p className="font-medium">Endereços</p>
                <p className="text-sm text-gray-600">Meus endereços</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>

          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
              <div>
                <p className="font-medium">Favoritos</p>
                <p className="text-sm text-gray-600">Meus feirantes favoritos</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </div>

        <div className="mt-8 pt-4 border-t">
          <p className="font-medium mb-2">Configurações</p>
          <p className="text-gray-600">Suporte</p>
        </div>
      </div>

      <BottomNav cart={cart} onScreenChange={onScreenChange} />
    </div>
  )
}
