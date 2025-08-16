"use client"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  ArrowLeft, 
  ChevronRight, 
  ShoppingBag, 
  User, 
  CreditCard, 
  MapPin, 
  Heart,
  Settings,
  HelpCircle 
} from "lucide-react"
import { Screen, CartItem } from "../types"
import { ClientBottomNavigation } from "../components/BottomNav"
import { getCurrentUser } from "@/lib/utils"
import { useEffect, useState } from "react"

interface ProfilePageProps {
  cart: CartItem[]
  onScreenChange: (screen: Screen) => void
}

export default function ProfilePage({ cart, onScreenChange }: ProfilePageProps) {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const currentUser = getCurrentUser()
    setUser(currentUser)
  }, [])

  if (!user) {
    return (
      <div className="min-h-screen bg-white pb-16 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando perfil...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white pb-16">
      <div className="p-4 pt-12">
        <div className="text-center mb-8">
          <Avatar className="w-20 h-20 mx-auto mb-4">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="text-2xl">
              {user.name?.charAt(0)}{user.surname?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <h1 className="text-2xl font-bold">{user.name} {user.surname}</h1>
          <p className="text-gray-600">Cliente desde {new Date(user.createdAt).getFullYear()}</p>
        </div>

        <div className="space-y-4">
          <button 
            onClick={() => onScreenChange("orders")}
            className="w-full flex items-center justify-between p-4 border-b hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-orange-600" />
              </div>
              <div className="text-left">
                <p className="font-medium">Pedidos</p>
                <p className="text-sm text-gray-600">Meus pedidos</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          <button 
            onClick={() => onScreenChange("account")}
            className="w-full flex items-center justify-between p-4 border-b hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-left">
                <p className="font-medium">Dados da conta</p>
                <p className="text-sm text-gray-600">Minhas informações</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          <button 
            onClick={() => onScreenChange("profilePayment")}
            className="w-full flex items-center justify-between p-4 border-b hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-left">
                <p className="font-medium">Pagamento</p>
                <p className="text-sm text-gray-600">Meus cartões</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          <button 
            onClick={() => onScreenChange("addresses")}
            className="w-full flex items-center justify-between p-4 border-b hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <MapPin className="w-5 h-5 text-purple-600" />
              </div>
              <div className="text-left">
                <p className="font-medium">Endereços</p>
                <p className="text-sm text-gray-600">Meus endereços</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          <button 
            onClick={() => onScreenChange("favorites")}
            className="w-full flex items-center justify-between p-4 border-b hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <Heart className="w-5 h-5 text-red-600" />
              </div>
              <div className="text-left">
                <p className="font-medium">Favoritos</p>
                <p className="text-sm text-gray-600">Meus feirantes favoritos</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="mt-8 pt-4 border-t space-y-4">
          <button 
            onClick={() => onScreenChange("home")}
            className="w-full flex items-center gap-3 p-2 hover:bg-gray-50 transition-colors rounded-lg"
          >
            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
              <Settings className="w-4 h-4 text-gray-600" />
            </div>
            <p className="font-medium text-gray-700">Configurações</p>
          </button>
          <button 
            onClick={() => onScreenChange("home")}
            className="w-full flex items-center gap-3 p-2 hover:bg-gray-50 transition-colors rounded-lg"
          >
            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
              <HelpCircle className="w-4 h-4 text-gray-600" />
            </div>
            <p className="text-gray-600">Suporte</p>
          </button>
        </div>
      </div>

      <ClientBottomNavigation 
        onScreenChange={onScreenChange} 
        currentScreen="profile" 
      />
    </div>
  )
}
