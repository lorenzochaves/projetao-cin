"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { 
  Bell, 
  Moon, 
  Shield, 
  ChevronRight,
  Volume2,
  Smartphone
} from "lucide-react"

interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const [notifications, setNotifications] = useState({
    orders: true,
    promotions: false,
    delivery: true,
    chat: true
  })
  
  const [preferences, setPreferences] = useState({
    darkMode: false,
    sounds: true,
    language: 'pt-BR'
  })

  const settingsSections = [
    {
      title: "Notificações",
      icon: <Bell className="w-5 h-5 text-orange-500" />,
      items: [
        {
          key: "orders",
          label: "Atualizações de pedidos",
          description: "Status de preparação, entrega e chegada",
          value: notifications.orders,
          onChange: (value: boolean) => setNotifications(prev => ({ ...prev, orders: value }))
        },
        {
          key: "delivery",
          label: "Notificações de entrega",
          description: "Quando o entregador estiver próximo",
          value: notifications.delivery,
          onChange: (value: boolean) => setNotifications(prev => ({ ...prev, delivery: value }))
        },
        {
          key: "chat",
          label: "Mensagens dos vendedores",
          description: "Novas mensagens no chat",
          value: notifications.chat,
          onChange: (value: boolean) => setNotifications(prev => ({ ...prev, chat: value }))
        },
        {
          key: "promotions",
          label: "Promoções e ofertas",
          description: "Descontos e produtos em destaque",
          value: notifications.promotions,
          onChange: (value: boolean) => setNotifications(prev => ({ ...prev, promotions: value }))
        }
      ]
    },
    {
      title: "Preferências",
      icon: <Smartphone className="w-5 h-5 text-orange-500" />,
      items: [
        {
          key: "darkMode",
          label: "Modo escuro",
          description: "Interface com cores escuras",
          value: preferences.darkMode,
          onChange: (value: boolean) => setPreferences(prev => ({ ...prev, darkMode: value }))
        },
        {
          key: "sounds",
          label: "Sons do aplicativo",
          description: "Sons de notificação e feedback",
          value: preferences.sounds,
          onChange: (value: boolean) => setPreferences(prev => ({ ...prev, sounds: value }))
        }
      ]
    }
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm w-[90%] h-[80vh] flex flex-col p-0 rounded-2xl fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        {/* Header */}
        <DialogHeader className="px-4 py-4 border-b bg-white rounded-t-2xl">
          <div>
            <DialogTitle className="text-lg font-semibold">Configurações</DialogTitle>
            <p className="text-sm text-gray-600">Personalize sua experiência</p>
          </div>
        </DialogHeader>

        {/* Content */}
        <div className="flex-1 px-3 py-4 overflow-y-auto bg-gray-50">
          <div className="space-y-6">
            
            {/* Seções de configurações com toggles */}
            {settingsSections.map((section) => (
              <div key={section.title} className="space-y-3">
                <div className="flex items-center gap-2">
                  {section.icon}
                  <h3 className="font-medium text-gray-900">{section.title}</h3>
                </div>
                
                <div className="bg-white rounded-lg shadow-sm divide-y">
                  {section.items.map((item) => (
                    <div key={item.key} className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{item.label}</h4>
                          <p className="text-xs text-gray-600 mt-1">{item.description}</p>
                        </div>
                        <Switch
                          checked={item.value}
                          onCheckedChange={item.onChange}
                          className="data-[state=checked]:bg-orange-500"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Informações do app */}
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h3 className="font-medium text-gray-900 mb-3">Sobre o App</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Versão</span>
                  <span>1.0.0</span>
                </div>
                <div className="flex justify-between">
                  <span>Última atualização</span>
                  <span>17/08/2025</span>
                </div>
              </div>
            </div>

            {/* Botão de logout */}
            <Button
              variant="outline"
              className="w-full text-red-600 border-red-200 hover:bg-red-50"
              onClick={() => console.log("Logout")}
            >
              Sair da Conta
            </Button>

          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
