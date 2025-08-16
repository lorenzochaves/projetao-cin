"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ArrowLeft, Plus, CreditCard, Trash2 } from "lucide-react"
import { Screen, CartItem } from "../../types"
import { ClientBottomNavigation } from "../../components/BottomNav"

interface PaymentMethod {
  id: string
  type: 'credit' | 'debit'
  brand: 'visa' | 'mastercard' | 'elo'
  lastFourDigits: string
  holderName: string
  expiryMonth: string
  expiryYear: string
}

interface PaymentPageProps {
  cart: CartItem[]
  onScreenChange: (screen: Screen) => void
}

export default function PaymentPage({ cart, onScreenChange }: PaymentPageProps) {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  // Load payment methods from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('userPaymentMethods')
    if (stored) {
      setPaymentMethods(JSON.parse(stored))
    }
  }, [])

  // Save payment methods to localStorage
  const savePaymentMethods = (methods: PaymentMethod[]) => {
    localStorage.setItem('userPaymentMethods', JSON.stringify(methods))
    setPaymentMethods(methods)
  }

  const handleAddPaymentMethod = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const cardNumber = formData.get('cardNumber') as string
    
    // Get card brand from number
    const getBrandFromNumber = (number: string): 'visa' | 'mastercard' | 'elo' => {
      if (number.startsWith('4')) return 'visa'
      if (number.startsWith('5') || number.startsWith('2')) return 'mastercard'
      return 'elo'
    }

    const newPaymentMethod: PaymentMethod = {
      id: Date.now().toString(),
      type: formData.get('type') as 'credit' | 'debit',
      brand: getBrandFromNumber(cardNumber),
      lastFourDigits: cardNumber.slice(-4),
      holderName: formData.get('holderName') as string,
      expiryMonth: formData.get('expiryMonth') as string,
      expiryYear: formData.get('expiryYear') as string,
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    const updatedMethods = [...paymentMethods, newPaymentMethod]
    savePaymentMethods(updatedMethods)
    
    setLoading(false)
    setIsDialogOpen(false)
    
    // Reset form
    ;(e.target as HTMLFormElement).reset()
  }

  const handleDeletePaymentMethod = (paymentMethodId: string) => {
    const updatedMethods = paymentMethods.filter(method => method.id !== paymentMethodId)
    savePaymentMethods(updatedMethods)
  }

  const getCardIcon = (brand: string) => {
    const colors = {
      visa: "text-blue-600",
      mastercard: "text-red-600", 
      elo: "text-yellow-600"
    }
    return colors[brand as keyof typeof colors] || "text-gray-600"
  }

  const getCardType = (type: string) => {
    return type === 'credit' ? 'Crédito' : 'Débito'
  }

  const getBrandName = (brand: string) => {
    const names = {
      visa: "Visa",
      mastercard: "Mastercard",
      elo: "Elo"
    }
    return names[brand as keyof typeof names] || brand
  }

  return (
    <div className="min-h-screen bg-white pb-16">
      {/* Header */}
      <div className="flex items-center p-4 pt-12 border-b">
        <Button variant="ghost" size="sm" onClick={() => onScreenChange("profile")}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-xl font-bold ml-2">Meus Cartões</h1>
      </div>

      <div className="p-4">
        {/* Add new card button */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full h-12 mb-6 border-2 border-dashed border-gray-300 bg-transparent text-gray-600 hover:bg-gray-50">
              <Plus className="w-5 h-5 mr-2" />
              Adicionar novo cartão
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Adicionar Cartão</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddPaymentMethod} className="space-y-4">
              <div>
                <Label htmlFor="holderName">Nome do Portador</Label>
                <Input
                  id="holderName"
                  name="holderName"
                  placeholder="João Silva"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="cardNumber">Número do Cartão</Label>
                <Input
                  id="cardNumber"
                  name="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  required
                />
              </div>
              
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <Label htmlFor="expiryMonth">Mês</Label>
                  <Select name="expiryMonth" required>
                    <SelectTrigger>
                      <SelectValue placeholder="MM" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({length: 12}, (_, i) => (
                        <SelectItem key={i+1} value={String(i+1).padStart(2, '0')}>
                          {String(i+1).padStart(2, '0')}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="expiryYear">Ano</Label>
                  <Select name="expiryYear" required>
                    <SelectTrigger>
                      <SelectValue placeholder="AA" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({length: 10}, (_, i) => (
                        <SelectItem key={i} value={String(2024 + i).slice(-2)}>
                          {String(2024 + i).slice(-2)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="type">Tipo</Label>
                  <Select name="type" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="credit">Crédito</SelectItem>
                      <SelectItem value="debit">Débito</SelectItem>
                    </SelectContent>
                  </Select>
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

        {/* Payment methods list */}
        {paymentMethods.length === 0 ? (
          <div className="text-center py-12">
            <CreditCard className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p className="text-lg font-medium text-gray-900 mb-2">Nenhum cartão cadastrado</p>
            <p className="text-gray-600">Adicione um cartão para facilitar seus pagamentos</p>
          </div>
        ) : (
          <div className="space-y-3">
            {paymentMethods.map((paymentMethod) => (
              <div key={paymentMethod.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <CreditCard className={`w-8 h-8 mr-3 ${getCardIcon(paymentMethod.brand)}`} />
                    <div>
                      <p className="font-medium text-gray-900">
                        {getBrandName(paymentMethod.brand)} {getCardType(paymentMethod.type)}
                      </p>
                      <p className="text-sm text-gray-600">
                        •••• •••• •••• {paymentMethod.lastFourDigits}
                      </p>
                      <p className="text-xs text-gray-500">
                        {paymentMethod.holderName} - {paymentMethod.expiryMonth}/{paymentMethod.expiryYear}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeletePaymentMethod(paymentMethod.id)}
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

      <ClientBottomNavigation onScreenChange={onScreenChange} />
    </div>
  )
}
