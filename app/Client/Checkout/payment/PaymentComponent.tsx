"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ArrowLeft, ChevronRight, CreditCard, Smartphone, DollarSign, Shield, Plus } from "lucide-react"
import { Screen, CartItem } from "../../types"
import { ClientBottomNavigation } from "../../components/BottomNav"
import { useCart } from "@/hooks/api/useCart"

interface PaymentPageProps {
  cart: CartItem[]
  onScreenChange: (screen: Screen) => void
}

interface SavedPaymentMethod {
  id: string
  type: 'credit' | 'debit'
  brand: 'visa' | 'mastercard' | 'elo'
  lastFourDigits: string
  holderName: string
  expiryMonth: string
  expiryYear: string
}

interface PaymentMethod {
  id: string
  type: 'pix' | 'credit' | 'debit' | 'cash'
  name: string
  description?: string
  icon: React.ReactNode
  fee?: number
  isCard?: boolean
  cardData?: SavedPaymentMethod
}

export default function PaymentPage({ cart, onScreenChange }: PaymentPageProps) {
  const [selectedPayment, setSelectedPayment] = useState<string>("pix")
  const [savedCards, setSavedCards] = useState<SavedPaymentMethod[]>([])
  const [isAddCardDialogOpen, setIsAddCardDialogOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const { cart: hookCart } = useCart()

  // Load saved cards from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('userPaymentMethods')
      if (stored) {
        setSavedCards(JSON.parse(stored))
      }
    }
  }, [])

  // Save cards to localStorage
  const saveCastomCards = (cards: SavedPaymentMethod[]) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('userPaymentMethods', JSON.stringify(cards))
      setSavedCards(cards)
    }
  }

  const handleAddCard = async (e: React.FormEvent<HTMLFormElement>) => {
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

    const newCard: SavedPaymentMethod = {
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

    const updatedCards = [...savedCards, newCard]
    saveCastomCards(updatedCards)
    
    setLoading(false)
    setIsAddCardDialogOpen(false)
    
    // Reset form
    ;(e.target as HTMLFormElement).reset()
  }

  const getCardIcon = (brand: string) => {
    const colors = {
      visa: "text-blue-600",
      mastercard: "text-red-600", 
      elo: "text-yellow-600"
    }
    return colors[brand as keyof typeof colors] || "text-gray-600"
  }

  const getBrandName = (brand: string) => {
    const names = {
      visa: "Visa",
      mastercard: "Mastercard",
      elo: "Elo"
    }
    return names[brand as keyof typeof names] || brand
  }

  const getCardType = (type: string) => {
    return type === 'credit' ? 'Crédito' : 'Débito'
  }

  // Build payment methods array including saved cards
  const buildPaymentMethods = (): PaymentMethod[] => {
    const baseMethod: PaymentMethod[] = [
      {
        id: 'pix',
        type: 'pix',
        name: 'PIX',
        description: 'Pagamento instantâneo',
        icon: <Smartphone className="w-6 h-6 text-purple-600" />,
      },
      {
        id: 'cash',
        type: 'cash',
        name: 'Dinheiro na Entrega',
        description: 'Pague ao receber o pedido',
        icon: <DollarSign className="w-6 h-6 text-yellow-600" />,
      }
    ]

    // Add saved cards as payment methods
    const cardMethods: PaymentMethod[] = savedCards.map(card => ({
      id: `card_${card.id}`,
      type: card.type,
      name: `${getBrandName(card.brand)} ${getCardType(card.type)}`,
      description: `•••• •••• •••• ${card.lastFourDigits}`,
      icon: <CreditCard className={`w-6 h-6 ${getCardIcon(card.brand)}`} />,
      fee: card.type === 'credit' ? 2.50 : 0,
      isCard: true,
      cardData: card
    }))

    return [...baseMethod, ...cardMethods]
  }

  const paymentMethods = buildPaymentMethods()

  const cartTotal = hookCart.items.reduce((total, item) => {
    // Para produtos com selectedWeight, usar o peso real
    if (item.selectedWeight) {
      return total + item.price * item.selectedWeight
    }
    // Para outros produtos, usar a quantidade normal
    return total + item.price * item.quantity
  }, 0)
  const deliveryFee = 5.0
  const selectedMethod = paymentMethods.find(method => method.id === selectedPayment)
  const paymentFee = selectedMethod?.fee || 0
  const finalTotal = cartTotal + deliveryFee + paymentFee
  const totalItems = hookCart.items.length // Contar tipos de produtos, não quantidade total

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="px-4 py-4 pt-12">
          <div className="flex items-center justify-between mb-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => onScreenChange("schedule")}
              className="p-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-bold">Pagamento</h1>
            <div className="w-9" />
          </div>
          
          {/* Progress indicator */}
          <div className="flex items-center gap-2">
            <div className="flex-1 h-2 bg-orange-500 rounded-full"></div>
            <div className="flex-1 h-2 bg-orange-500 rounded-full"></div>
            <div className="flex-1 h-2 bg-orange-500 rounded-full"></div>
          </div>
          <div className="flex justify-between text-xs text-gray-600 mt-1">
            <span>Carrinho</span>
            <span>Entrega</span>
            <span>Pagamento</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Title and subtitle */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Como você quer pagar?
          </h2>
          <p className="text-gray-600 text-sm">
            Escolha a forma de pagamento que preferir
          </p>
        </div>

        {/* Payment methods */}
        <div className="space-y-3">
          {paymentMethods.map((method) => (
            <div 
              key={method.id}
              className={`bg-white rounded-lg p-4 shadow-sm border-2 transition-all ${
                selectedPayment === method.id 
                  ? 'border-orange-500 bg-orange-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedPayment(method.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div className="p-2 bg-gray-50 rounded-lg">
                    {method.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 mb-1">
                      {method.name}
                    </h3>
                    {method.description && (
                      <p className="text-sm text-gray-600">
                        {method.description}
                      </p>
                    )}
                    {method.fee && method.fee > 0 && (
                      <p className="text-xs text-orange-600 mt-1">
                        Taxa: R$ {method.fee.toFixed(2)}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className={`w-5 h-5 border-2 rounded-full ${
                  selectedPayment === method.id 
                    ? 'border-orange-500 bg-orange-500' 
                    : 'border-gray-300'
                }`}>
                  {selectedPayment === method.id && (
                    <div className="w-2 h-2 bg-white rounded-full m-auto mt-0.5"></div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Add new card button */}
          <Dialog open={isAddCardDialogOpen} onOpenChange={setIsAddCardDialogOpen}>
            <DialogTrigger asChild>
              <div className="bg-white rounded-lg p-4 shadow-sm border-2 border-dashed border-gray-300 hover:border-gray-400 transition-all cursor-pointer">
                <div className="flex items-center justify-center gap-3">
                  <div className="p-2 bg-gray-50 rounded-lg">
                    <Plus className="w-6 h-6 text-gray-500" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-700">
                      Adicionar novo cartão
                    </h3>
                    <p className="text-sm text-gray-500">
                      Salve um cartão para pagamentos futuros
                    </p>
                  </div>
                </div>
              </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md max-w-[90vw] rounded-2xl p-6">
              <DialogHeader>
                <DialogTitle>Adicionar Cartão</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddCard} className="space-y-4">
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
                    onClick={() => setIsAddCardDialogOpen(false)}
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
        </div>

        {/* Security notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900 mb-1">
                Seus dados estão seguros
              </h4>
              <p className="text-sm text-blue-700">
                Utilizamos criptografia de ponta para proteger todas as suas informações de pagamento.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer with summary and finalize */}
      <div className="bg-white border-t p-4 mb-16 shadow-lg">
        <div className="space-y-3 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal ({totalItems} itens)</span>
            <span className="font-medium">R$ {cartTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Taxa de entrega</span>
            <span className="font-medium">R$ {deliveryFee.toFixed(2)}</span>
          </div>
          {paymentFee > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Taxa de pagamento</span>
              <span className="font-medium">R$ {paymentFee.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between text-lg font-bold pt-2 border-t">
            <span>Total</span>
            <span className="text-orange-600">R$ {finalTotal.toFixed(2)}</span>
          </div>
        </div>
        
        <Button
          className="w-full bg-orange-500 hover:bg-orange-600 text-white h-12 rounded-lg font-medium"
          onClick={() => onScreenChange("success")}
          disabled={!selectedPayment}
        >
          Finalizar pedido
          <ChevronRight className="w-5 h-5 ml-2" />
        </Button>
      </div>

      <ClientBottomNavigation onScreenChange={onScreenChange} />
    </div>
  )
}
