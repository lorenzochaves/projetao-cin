"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, Plus, MapPin, Loader2 } from "lucide-react"
import { Screen, CartItem } from "../../types"
import { ClientBottomNavigation } from "../../components/BottomNav"
import { useUserAddresses } from "@/hooks/api/useUser"
import { Skeleton } from "@/components/ui/skeleton"

interface AddressesPageProps {
  cart: CartItem[]
  onScreenChange: (screen: Screen) => void
}

export default function AddressesPage({ cart, onScreenChange }: AddressesPageProps) {
  const { addresses, loading, error, deleteAddress } = useUserAddresses("1")

  const handleDeleteAddress = async (addressId: string) => {
    try {
      await deleteAddress(addressId)
    } catch (err) {
      console.error('Error deleting address:', err)
    }
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
        <Button className="w-full h-12 mb-6 border-2 border-dashed border-gray-300 bg-transparent text-gray-600 hover:bg-gray-50">
          <Plus className="w-5 h-5 mr-2" />
          Adicionar novo endereço
        </Button>

        {/* Error state */}
        {error && (
          <div className="text-center py-8">
            <p className="text-red-600 mb-4">Erro ao carregar endereços</p>
            <p className="text-sm text-gray-600">{error}</p>
          </div>
        )}

        {/* Loading state */}
        {loading && (
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-start">
                    <Skeleton className="w-5 h-5 mr-3 mt-1" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-3 w-32" />
                      <Skeleton className="h-3 w-28" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </div>
                  <Skeleton className="h-8 w-12" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Address list */}
        {!loading && !error && (
          <div className="space-y-4">
            {addresses.length === 0 ? (
              <div className="text-center py-8">
                <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">Nenhum endereço cadastrado</p>
                <p className="text-sm text-gray-500">Adicione um endereço para facilitar suas entregas</p>
              </div>
            ) : (
              addresses.map((address) => (
                <div key={address.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-start">
                      <MapPin className={`w-5 h-5 mr-3 mt-1 ${address.isPrimary ? 'text-blue-600' : 'text-gray-600'}`} />
                      <div>
                        <p className="font-medium">{address.label}</p>
                        <p className="text-sm text-gray-600">{address.street}</p>
                        <p className="text-sm text-gray-600">{address.neighborhood}, {address.city} - {address.state}</p>
                        <p className="text-sm text-gray-600">CEP: {address.zipCode}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="text-blue-600">
                      Editar
                    </Button>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    {address.isPrimary && (
                      <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">Principal</span>
                    )}
                    <div className={`flex ${address.isPrimary ? 'justify-end' : 'justify-end w-full'}`}>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-red-600"
                        onClick={() => handleDeleteAddress(address.id)}
                      >
                        Remover
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      <ClientBottomNavigation cart={cart} onScreenChange={onScreenChange} />
    </div>
  )
}
