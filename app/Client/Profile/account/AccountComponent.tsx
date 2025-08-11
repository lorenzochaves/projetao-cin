"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from "lucide-react"
import { Screen, CartItem } from "../../types"
import { ClientBottomNavigation } from "../../components/BottomNav"

interface AccountPageProps {
  cart: CartItem[]
  onScreenChange: (screen: Screen) => void
}

export default function AccountPage({ cart, onScreenChange }: AccountPageProps) {
  return (
    <div className="min-h-screen bg-white pb-16">
      {/* Header */}
      <div className="flex items-center p-4 pt-12 border-b">
        <Button variant="ghost" size="sm" onClick={() => onScreenChange("profile")}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-xl font-bold ml-2">Dados da Conta</h1>
      </div>

      <div className="p-4">
        <form className="space-y-6">
          <div>
            <Label htmlFor="name" className="text-base font-medium">Nome</Label>
            <Input
              id="name"
              defaultValue="Marcela"
              className="mt-2 h-12 border-gray-300 rounded-lg"
            />
          </div>
          
          <div>
            <Label htmlFor="surname" className="text-base font-medium">Sobrenome</Label>
            <Input
              id="surname"
              defaultValue="Ribeiro"
              className="mt-2 h-12 border-gray-300 rounded-lg"
            />
          </div>
          
          <div>
            <Label htmlFor="email" className="text-base font-medium">Email</Label>
            <Input
              id="email"
              type="email"
              defaultValue="marcela.ribeiro@email.com"
              className="mt-2 h-12 border-gray-300 rounded-lg"
            />
          </div>
          
          <div>
            <Label htmlFor="phone" className="text-base font-medium">Celular</Label>
            <Input
              id="phone"
              defaultValue="(81) 99999-9999"
              className="mt-2 h-12 border-gray-300 rounded-lg"
            />
          </div>
          
          <div>
            <Label htmlFor="cpf" className="text-base font-medium">CPF</Label>
            <Input
              id="cpf"
              defaultValue="123.456.789-00"
              className="mt-2 h-12 border-gray-300 rounded-lg"
            />
          </div>
          
          <div className="pt-6">
            <Button className="w-full h-12 bg-gray-800 hover:bg-gray-900 rounded-lg">
              Salvar Alterações
            </Button>
          </div>
        </form>
      </div>

      <ClientBottomNavigation cart={cart} onScreenChange={onScreenChange} />
    </div>
  )
}
