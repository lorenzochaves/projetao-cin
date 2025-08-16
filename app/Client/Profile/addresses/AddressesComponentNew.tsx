"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ArrowLeft, Plus, MapPin, Trash2 } from "lucide-react"
import { Screen, CartItem } from "../../types"
import { ClientBottomNavigation } from "../../components/BottomNav"

interface Address {
  id: string
  label: string
  street: string
  number: string
  complement: string
  neighborhood: string
  city: string
  state: string
  zipCode: string
  isDefault?: boolean
}

interface AddressesPageProps {
  cart: CartItem[]
  onScreenChange: (screen: Screen) => void
}

export default function AddressesPage({ cart, onScreenChange }: AddressesPageProps) {
  const [addresses, setAddresses] = useState<Address[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  // Load addresses from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('userAddresses')
    if (stored) {
      setAddresses(JSON.parse(stored))
    }
  }, [])

  // Save addresses to localStorage
  const saveAddresses = (addressList: Address[]) => {
    localStorage.setItem('userAddresses', JSON.stringify(addressList))
    setAddresses(addressList)
  }

  const handleAddAddress = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    
    const newAddress: Address = {
      id: Date.now().toString(),
      label: formData.get('label') as string,
      street: formData.get('street') as string,
      number: formData.get('number') as string,
      complement: formData.get('complement') as string || '',
      neighborhood: formData.get('neighborhood') as string,
      city: formData.get('city') as string,
      state: formData.get('state') as string,
      zipCode: formData.get('zipCode') as string,
      isDefault: addresses.length === 0, // First address is default
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    const updatedAddresses = [...addresses, newAddress]
    saveAddresses(updatedAddresses)
    
    setLoading(false)
    setIsDialogOpen(false)
    
    // Reset form
    ;(e.target as HTMLFormElement).reset()
  }

  const handleDeleteAddress = (addressId: string) => {
    const updatedAddresses = addresses.filter(addr => addr.id !== addressId)
    saveAddresses(updatedAddresses)
  }

  return (
    <div className="min-h-screen bg-white pb-16">
      {/* Header */}
      <div className="flex items-center p-4 pt-12 border-b">
        <Button variant="ghost" size="sm" onClick={() => onScreenChange("profile")}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-xl font-bold ml-2">Meus Endereços</h1>
      </div>

      <div className="p-4">
        {/* Add new address button */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full h-12 mb-6 border-2 border-dashed border-gray-300 bg-transparent text-gray-600 hover:bg-gray-50">
              <Plus className="w-5 h-5 mr-2" />
              Adicionar novo endereço
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Adicionar Endereço</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddAddress} className="space-y-4">
              <div>
                <Label htmlFor="label">Nome do Endereço</Label>
                <Input
                  id="label"
                  name="label"
                  placeholder="Casa, Trabalho, etc."
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="zipCode">CEP</Label>
                <Input
                  id="zipCode"
                  name="zipCode"
                  placeholder="12345-678"
                  required
                />
              </div>
              
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <Label htmlFor="street">Rua</Label>
                  <Input
                    id="street"
                    name="street"
                    placeholder="Nome da rua"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="number">Número</Label>
                  <Input
                    id="number"
                    name="number"
                    placeholder="123"
                    required
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="complement">Complemento</Label>
                <Input
                  id="complement"
                  name="complement"
                  placeholder="Apto 45, Bloco B, etc."
                />
              </div>
              
              <div>
                <Label htmlFor="neighborhood">Bairro</Label>
                <Input
                  id="neighborhood"
                  name="neighborhood"
                  placeholder="Nome do bairro"
                  required
                />
              </div>
              
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <Label htmlFor="city">Cidade</Label>
                  <Input
                    id="city"
                    name="city"
                    placeholder="Nome da cidade"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="state">Estado</Label>
                  <Input
                    id="state"
                    name="state"
                    placeholder="PE"
                    maxLength={2}
                    required
                  />
                </div>
              </div>
              
              <div className="flex gap-3 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsDialogOpen(false)}
                  className="flex-1"
                >
                  Cancelar
                </Button>
                <Button 
                  type="submit" 
                  disabled={loading}
                  className="flex-1"
                >
                  {loading ? 'Salvando...' : 'Salvar'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Addresses list */}
        {addresses.length === 0 ? (
          <div className="text-center py-12">
            <MapPin className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p className="text-lg font-medium text-gray-900 mb-2">Nenhum endereço cadastrado</p>
            <p className="text-gray-600">Adicione um endereço para facilitar suas entregas</p>
          </div>
        ) : (
          <div className="space-y-3">
            {addresses.map((address) => (
              <div key={address.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 mt-1 mr-3 text-gray-600" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium text-gray-900">{address.label}</p>
                        {address.isDefault && (
                          <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">Padrão</span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">
                        {address.street}, {address.number}
                        {address.complement && `, ${address.complement}`}
                      </p>
                      <p className="text-sm text-gray-600">
                        {address.neighborhood}, {address.city} - {address.state}
                      </p>
                      <p className="text-sm text-gray-600">CEP: {address.zipCode}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteAddress(address.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <ClientBottomNavigation cart={cart} onScreenChange={onScreenChange} />
    </div>
  )
}
