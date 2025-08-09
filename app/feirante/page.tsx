"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { AuthGuard, useAuth } from "@/hooks/use-auth"
import { Store, Package, DollarSign, Users, LogOut } from "lucide-react"

function FeirantePage() {
  const { user, logout } = useAuth()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white p-4 pt-12 border-b">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Olá, {user?.name}!</h1>
            <p className="text-gray-600">Área do Feirante</p>
          </div>
          <Button variant="ghost" size="sm" onClick={logout}>
            <LogOut className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold">24</p>
                <p className="text-sm text-gray-600">Produtos</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold">R$ 450</p>
                <p className="text-sm text-gray-600">Hoje</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-gray-600">Pedidos</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                <Store className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold">4.8</p>
                <p className="text-sm text-gray-600">Avaliação</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="text-center py-12">
          <Store className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">Painel do Feirante</h2>
          <p className="text-gray-600 mb-6">
            Esta é a área do feirante. Aqui você poderá gerenciar seus produtos, 
            visualizar pedidos e acompanhar suas vendas.
          </p>
          <p className="text-sm text-gray-500">
            💡 Esta funcionalidade será desenvolvida em breve!
          </p>
        </div>
      </div>
    </div>
  )
}

export default function FeintePage() {
  return (
    <AuthGuard>
      <FeirantePage />
    </AuthGuard>
  )
}
