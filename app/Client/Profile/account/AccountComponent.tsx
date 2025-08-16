"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from "lucide-react"
import { Screen, CartItem } from "../../types"
import { ClientBottomNavigation } from "../../components/BottomNav"
import { useUserProfile } from "@/hooks/api/useUser"

interface AccountPageProps {
  cart: CartItem[]
  onScreenChange: (screen: Screen) => void
}

export default function AccountPage({ cart, onScreenChange }: AccountPageProps) {
  // Mock user ID - in a real app, this would come from auth context
  const userId = "1"
  const { user, loading, error, updateProfile } = useUserProfile(userId)
  const [saving, setSaving] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!user) return

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get('name') as string,
      surname: formData.get('surname') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      cpf: formData.get('cpf') as string,
    }

    try {
      setSaving(true)
      await updateProfile(data)
      // Show success message
    } catch (error) {
      console.error('Failed to update profile:', error)
      // Show error message
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white pb-16">
        <div className="p-4 pt-12">
          <div className="space-y-6 animate-pulse">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i}>
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                <div className="h-12 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
        <ClientBottomNavigation onScreenChange={onScreenChange} />
      </div>
    )
  }

  if (error || !user) {
    return (
      <div className="min-h-screen bg-white pb-16">
        <div className="flex items-center p-4 pt-12 border-b">
          <Button variant="ghost" size="sm" onClick={() => onScreenChange("profile")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold ml-2">Dados da Conta</h1>
        </div>
        <div className="p-4">
          <div className="text-center py-8">
            <p className="text-red-600">Erro ao carregar dados: {error}</p>
          </div>
        </div>
        <ClientBottomNavigation onScreenChange={onScreenChange} />
      </div>
    )
  }

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
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="name" className="text-base font-medium">Nome</Label>
            <Input
              id="name"
              name="name"
              defaultValue={user.name}
              className="mt-2 h-12 border-gray-300 rounded-lg"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="surname" className="text-base font-medium">Sobrenome</Label>
            <Input
              id="surname"
              name="surname"
              defaultValue={user.surname}
              className="mt-2 h-12 border-gray-300 rounded-lg"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="email" className="text-base font-medium">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              defaultValue={user.email}
              className="mt-2 h-12 border-gray-300 rounded-lg"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="phone" className="text-base font-medium">Celular</Label>
            <Input
              id="phone"
              name="phone"
              defaultValue={user.phone}
              className="mt-2 h-12 border-gray-300 rounded-lg"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="cpf" className="text-base font-medium">CPF</Label>
            <Input
              id="cpf"
              name="cpf"
              defaultValue={user.cpf}
              className="mt-2 h-12 border-gray-300 rounded-lg"
              required
            />
          </div>
          
          <div className="pt-6">
            <Button 
              type="submit" 
              className="w-full h-12 bg-gray-800 hover:bg-gray-900 rounded-lg"
              disabled={saving}
            >
              {saving ? 'Salvando...' : 'Salvar Alterações'}
            </Button>
          </div>
        </form>
      </div>

      <ClientBottomNavigation onScreenChange={onScreenChange} />
    </div>
  )
}
