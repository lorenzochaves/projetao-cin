"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Clock, Package, TrendingUp, User, LogOut } from "lucide-react"
import { useRouter } from "next/navigation"
import { logout } from "@/lib/utils"

export default function DeliveryHomePage() {
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white p-4 pt-12">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Área do Entregador</h1>
          <Button onClick={handleLogout} variant="outline" size="sm">
            <LogOut className="h-4 w-4 mr-2" />
            Sair
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="p-4 text-center">
            <Package className="h-8 w-8 mx-auto mb-2 text-blue-600" />
            <h3 className="font-semibold">Pedidos Ativos</h3>
            <p className="text-2xl font-bold text-blue-600">0</p>
          </Card>

          <Card className="p-4 text-center">
            <TrendingUp className="h-8 w-8 mx-auto mb-2 text-green-600" />
            <h3 className="font-semibold">Entregas Hoje</h3>
            <p className="text-2xl font-bold text-green-600">0</p>
          </Card>
        </div>

        <Card className="p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Status Atual</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-gray-500" />
              <span className="text-gray-700">Localização: Recife, PE</span>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-gray-500" />
              <span className="text-gray-700">Disponível para entregas</span>
            </div>
            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-gray-500" />
              <span className="text-gray-700">Entregador ativo</span>
            </div>
          </div>
        </Card>

        <div className="space-y-4">
          <Button className="w-full" size="lg">
            <Package className="h-5 w-5 mr-2" />
            Ver Pedidos Disponíveis
          </Button>
          
          <Button variant="outline" className="w-full" size="lg">
            <MapPin className="h-5 w-5 mr-2" />
            Atualizar Localização
          </Button>
          
          <Button variant="outline" className="w-full" size="lg">
            <Clock className="h-5 w-5 mr-2" />
            Definir Disponibilidade
          </Button>
        </div>
      </div>
    </div>
  )
}
