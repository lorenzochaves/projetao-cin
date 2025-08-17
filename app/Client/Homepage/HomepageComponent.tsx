"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Check, ShoppingBasket, MessageSquare, MapPin, Info, X } from "lucide-react"
import { Feirante, Screen } from "../types"
import { ClientBottomNavigation } from "../components/BottomNav"
import { CartItem } from "../types"
import { useState, useEffect, useRef } from "react"
import { feiranteService } from "@/lib/api/userService"
import { Skeleton } from "@/components/ui/skeleton"
import { getCurrentUser } from "@/lib/utils"
import Image from "next/image"

interface HomePageProps {
  cart: CartItem[]
  onScreenChange: (screen: Screen) => void
  onSelectFeirante: (feirante: Feirante) => void
  currentScreen?: Screen
}

interface Notification {
  id: string
  message: string
  date: string
  read: boolean
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    message: "Seu pedido #1234 foi entregue com sucesso!",
    date: "16/08",
    read: false
  },
  {
    id: "2", 
    message: "João da Horta tem novos produtos orgânicos disponíveis",
    date: "15/08",
    read: false
  },
  {
    id: "3",
    message: "Promoção especial: 20% off em frutas da Maria",
    date: "14/08", 
    read: true
  },
  {
    id: "4",
    message: "Lembrete: Seu pedido #1230 será entregue hoje às 18h",
    date: "13/08",
    read: true
  },
  {
    id: "5",
    message: "Avalie seu último pedido e ganhe desconto na próxima compra",
    date: "12/08",
    read: true
  }
]

export default function HomePage({ 
  cart, 
  onScreenChange, 
  onSelectFeirante, 
  currentScreen = "home" 
}: HomePageProps) {
  const [feirantes, setFeirantes] = useState<Feirante[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [user, setUser] = useState<any>(null)
  const [showNotifications, setShowNotifications] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>([])
  const notificationRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const currentUser = getCurrentUser()
    setUser(currentUser)
    
    // Carregar notificações do localStorage
    if (typeof window !== 'undefined') {
      const savedNotifications = localStorage.getItem('feira_notifications')
      console.log('🔔 Notificações salvas:', savedNotifications)
      
      if (savedNotifications) {
        try {
          const parsed = JSON.parse(savedNotifications)
          console.log('🔔 Notificações carregadas:', parsed)
          setNotifications(parsed)
        } catch (error) {
          console.error('Erro ao carregar notificações:', error)
          setNotifications(mockNotifications)
          localStorage.setItem('feira_notifications', JSON.stringify(mockNotifications))
        }
      } else {
        console.log('🔔 Primeira vez - usando mockNotifications')
        setNotifications(mockNotifications)
        localStorage.setItem('feira_notifications', JSON.stringify(mockNotifications))
      }
    }
  }, [])

  // Salvar notificações no localStorage sempre que mudarem (mas não na primeira renderização)
  useEffect(() => {
    if (notifications.length > 0 && typeof window !== 'undefined') {
      console.log('🔔 Salvando notificações:', notifications)
      localStorage.setItem('feira_notifications', JSON.stringify(notifications))
    }
  }, [notifications])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    async function loadFeirantes() {
      try {
        setLoading(true)
        const feirantesData = await feiranteService.getAll()
        setFeirantes(feirantesData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load feirantes')
      } finally {
        setLoading(false)
      }
    }

    loadFeirantes()
  }, [])

  const unreadCount = notifications.filter(n => !n.read).length

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications)
  }

  const markAsRead = (id: string) => {
    console.log('🔔 Marcando como lida:', id)
    setNotifications(prev => {
      const updated = prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
      console.log('🔔 Notificações atualizadas:', updated)
      return updated
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <div className="bg-white p-4 pt-12 relative">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">
            Olá, {user?.name || 'Cliente'}!
          </h1>
          
          {/* Notifications */}
          <div className="relative" ref={notificationRef}>
            <button 
              onClick={toggleNotifications}
              className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Image
                src="/notifications.svg"
                alt="Notificações"
                width={24}
                height={24}
                className="w-6 h-6"
              />
              {unreadCount > 0 && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-white">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                </div>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-gray-50 rounded-lg shadow-lg border border-gray-200 z-50 max-h-96 overflow-y-auto">
                <div className="p-4 border-b border-gray-200 bg-white rounded-t-lg">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">Notificações</h3>
                    <button
                      onClick={() => setShowNotifications(false)}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <X className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                </div>
                
                <div className="py-2">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`px-4 py-3 border-b border-gray-100 last:border-b-0 cursor-pointer hover:bg-gray-100 transition-colors ${
                        !notification.read ? 'bg-blue-50' : ''
                      }`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex justify-between items-start">
                        <p className={`text-sm flex-1 pr-2 ${
                          !notification.read ? 'font-medium text-gray-900' : 'text-gray-600'
                        }`}>
                          {notification.message}
                        </p>
                        <span className="text-xs text-gray-500 whitespace-nowrap">
                          {notification.date}
                        </span>
                      </div>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-1"></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Descrição de feira finalizada — explicação do app e funcionalidades */}
        <Card className="p-5 mb-6">
          <div className="flex items-center gap-2">
            <Check className="h-5 w-5" />
            <h2 className="text-lg font-semibold">Descrição de feira finalizada</h2>
            <Badge variant="secondary" className="ml-1">Beta</Badge>
          </div>

          <p className="mt-3 text-sm text-muted-foreground">
            O Feirou conecta você a feirantes locais para montar sua feira de forma rápida e personalizada.
            Você escolhe o feirante, conversa no chat, monta a lista, confirma o pagamento e acompanha a entrega.
            Ao final, esta seção mostra um resumo da sua compra.
          </p>

          <ul className="mt-4 grid gap-2 text-sm">
            <li className="flex items-center gap-2">
              <ShoppingBasket className="h-4 w-4" />
              <span><strong>Catálogo & Pedido:</strong> veja produtos, adicione/remova itens e acompanhe totais em tempo real.</span>
            </li>
            <li className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <span><strong>Chat com o feirante:</strong> tire dúvidas, combine substituições e personalize sua feira.</span>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span><strong>Entrega/Retirada:</strong> acompanhe previsão de entrega ou combine retirada no ponto.</span>
            </li>
          </ul>

          <div className="mt-4 rounded-md bg-muted p-3 text-xs text-muted-foreground flex gap-2">
            <Info className="h-4 w-4 mt-0.5 shrink-0" />
            <p>
              Após concluir um pedido, aqui aparece o resumo da <em>feira finalizada</em>:
              itens comprados, subtotal, taxa de entrega/descontos, total pago, endereço e observações.
            </p>
          </div>
        </Card>

        {/* Banner de oferta */}
        <Card className="bg-gradient-to-r from-green-500 to-green-600 p-6 mb-6 rounded-xl text-white">
          <div className="text-center">
            <h3 className="text-lg font-bold mb-2">🥬 Oferta Especial!</h3>
            <p className="text-green-100 mb-2">Verduras orgânicas com 20% OFF</p>
            <p className="text-sm text-green-200">Válido até domingo</p>
            <div className="flex justify-center mt-3 gap-1">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <div className="w-2 h-2 bg-green-300 rounded-full"></div>
            </div>
          </div>
        </Card>

        <h2 className="text-lg font-semibold mb-4">
          Com quem você deseja
          <br />
          pedir sua feira hoje?
        </h2>
      </div>

      {/* Grid de feirantes */}
      <div className="px-4">
        {error && (
          <div className="text-center py-8">
            <p className="text-red-600 mb-4">Erro ao carregar feirantes</p>
            <p className="text-sm text-gray-600">{error}</p>
          </div>
        )}

        {loading && (
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="p-4 bg-white">
                <div className="text-center">
                  <Skeleton className="w-16 h-16 rounded-full mx-auto mb-3" />
                  <Skeleton className="h-4 w-20 mx-auto mb-1" />
                  <Skeleton className="h-3 w-16 mx-auto mb-1" />
                  <Skeleton className="w-2 h-2 rounded-full mx-auto" />
                  <Skeleton className="h-3 w-12 mx-auto mt-1" />
                </div>
              </Card>
            ))}
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-2 gap-4">
            {feirantes.length === 0 ? (
              <div className="col-span-2 text-center py-8">
                <p className="text-gray-600 mb-2">Nenhum feirante disponível</p>
                <p className="text-sm text-gray-500">Tente novamente mais tarde</p>
              </div>
            ) : (
              feirantes.map((feirante) => (
                <Card
                  key={feirante.id}
                  className="p-4 bg-white cursor-pointer hover:shadow-md transition-all duration-200"
                  onClick={() => {
                    onSelectFeirante(feirante)
                    onScreenChange("feirante")
                  }}
                >
                  <div className="text-center">
                    <Avatar className="w-16 h-16 mx-auto mb-3">
                      <AvatarImage src={feirante.avatar} />
                      <AvatarFallback>
                        {feirante.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <p className="font-medium mb-1 truncate">{feirante.name}</p>
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs text-gray-600">{feirante.rating}</span>
                    </div>
                    <div
                      className={`w-2 h-2 rounded-full mx-auto ${feirante.isOpen ? "bg-green-500" : "bg-red-500"}`}
                    ></div>
                    <p className="text-xs text-gray-500 mt-1">{feirante.isOpen ? "Aberto" : "Fechado"}</p>
                    <p className="text-xs text-gray-400 mt-1">{feirante.time}</p>
                  </div>
                </Card>
              ))
            )}
          </div>
        )}
      </div>

      <ClientBottomNavigation 
        onScreenChange={onScreenChange} 
        currentScreen={currentScreen} 
      />
    </div>
  )
}
