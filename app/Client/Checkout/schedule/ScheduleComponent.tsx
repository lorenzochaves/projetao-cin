"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ChevronRight, Clock, Calendar } from "lucide-react"
import { Screen, CartItem } from "../../types"
import { ClientBottomNavigation } from "../../components/BottomNav"
import { useCart } from "@/hooks/api/useCart"

interface SchedulePageProps {
  cart: CartItem[]
  onScreenChange: (screen: Screen) => void
}

interface TimeSlot {
  id: string
  date: string
  displayDate: string
  period: string
  time: string
  available: boolean
}

const generateTimeSlots = (): TimeSlot[] => {
  const slots: TimeSlot[] = []
  const today = new Date()
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() + i)
    
    const dateStr = date.toISOString().split('T')[0]
    const displayDate = date.toLocaleDateString('pt-BR', { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'short' 
    })
    
    // Adicionar turnos do dia
    if (i > 0) { // Não incluir hoje para delivery
      slots.push(
        {
          id: `${dateStr}-morning`,
          date: dateStr,
          displayDate: displayDate.charAt(0).toUpperCase() + displayDate.slice(1),
          period: "Manhã",
          time: "08:00 - 12:00",
          available: true
        },
        {
          id: `${dateStr}-afternoon`,
          date: dateStr,
          displayDate: displayDate.charAt(0).toUpperCase() + displayDate.slice(1),
          period: "Tarde", 
          time: "14:00 - 18:00",
          available: Math.random() > 0.2 // 80% de chance de estar disponível
        },
        {
          id: `${dateStr}-evening`,
          date: dateStr,
          displayDate: displayDate.charAt(0).toUpperCase() + displayDate.slice(1),
          period: "Noite",
          time: "18:00 - 22:00",
          available: i < 5 // Apenas nos primeiros 5 dias
        }
      )
    }
  }
  
  return slots.slice(0, 12) // Limitar a 12 slots
}

export default function SchedulePage({ cart, onScreenChange }: SchedulePageProps) {
  const [selectedSlot, setSelectedSlot] = useState<string>("")
  const [timeSlots] = useState<TimeSlot[]>(generateTimeSlots())
  const { cart: hookCart } = useCart()

  const cartTotal = hookCart.items.reduce((total, item) => {
    // Para produtos com selectedWeight, usar o peso real
    if (item.selectedWeight) {
      return total + item.price * item.selectedWeight
    }
    // Para outros produtos, usar a quantidade normal
    return total + item.price * item.quantity
  }, 0)
  const deliveryFee = 5.0
  const finalTotal = cartTotal + deliveryFee
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
              onClick={() => onScreenChange("delivery")}
              className="p-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-bold">Agendamento</h1>
            <div className="w-9" />
          </div>
          
          {/* Progress indicator */}
          <div className="flex items-center gap-2">
            <div className="flex-1 h-2 bg-orange-500 rounded-full"></div>
            <div className="flex-1 h-2 bg-orange-500 rounded-full"></div>
            <div className="flex-1 h-2 bg-gray-200 rounded-full"></div>
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
            Quando será feita a entrega?
          </h2>
          <p className="text-gray-600 text-sm">
            Selecione o melhor horário para receber seus produtos frescos da feira
          </p>
        </div>

        {/* Time slots */}
        <div className="space-y-3">
          {timeSlots.map((slot) => (
            <div 
              key={slot.id}
              className={`bg-white rounded-lg p-4 shadow-sm border-2 transition-all ${
                !slot.available 
                  ? 'border-gray-200 bg-gray-50 opacity-60' 
                  : selectedSlot === slot.id 
                    ? 'border-orange-500 bg-orange-50' 
                    : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => slot.available && setSelectedSlot(slot.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div className="flex flex-col items-center">
                    <Calendar className={`w-5 h-5 ${
                      slot.available ? 'text-orange-500' : 'text-gray-400'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-medium ${
                      slot.available ? 'text-gray-900' : 'text-gray-500'
                    }`}>
                      {slot.displayDate}
                    </h3>
                    <div className="flex items-center gap-1 mt-1">
                      <Clock className={`w-4 h-4 ${
                        slot.available ? 'text-gray-500' : 'text-gray-400'
                      }`} />
                      <span className={`text-sm ${
                        slot.available ? 'text-gray-600' : 'text-gray-400'
                      }`}>
                        {slot.period} - {slot.time}
                      </span>
                    </div>
                  </div>
                </div>
                
                {slot.available ? (
                  <div className={`w-5 h-5 border-2 rounded-full ${
                    selectedSlot === slot.id 
                      ? 'border-orange-500 bg-orange-500' 
                      : 'border-gray-300'
                  }`}>
                    {selectedSlot === slot.id && (
                      <div className="w-2 h-2 bg-white rounded-full m-auto mt-0.5"></div>
                    )}
                  </div>
                ) : (
                  <span className="text-xs text-gray-400 font-medium">
                    Indisponível
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer with summary and continue */}
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
          <div className="flex justify-between text-lg font-bold pt-2 border-t">
            <span>Total</span>
            <span className="text-orange-600">R$ {finalTotal.toFixed(2)}</span>
          </div>
        </div>
        
        <Button
          className="w-full bg-orange-500 hover:bg-orange-600 text-white h-12 rounded-lg font-medium"
          onClick={() => onScreenChange("payment")}
          disabled={!selectedSlot}
        >
          Continuar para pagamento
          <ChevronRight className="w-5 h-5 ml-2" />
        </Button>
      </div>

      <ClientBottomNavigation onScreenChange={onScreenChange} />
    </div>
  )
}
