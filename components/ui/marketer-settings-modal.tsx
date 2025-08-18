"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Store, Bell, Smartphone, Mail, Clock, Shield, CreditCard, BarChart } from "lucide-react"

interface MarketerSettingsModalProps {
  isOpen: boolean
  onClose: () => void
}

export function MarketerSettingsModal({ isOpen, onClose }: MarketerSettingsModalProps) {
  const [notifications, setNotifications] = useState({
    newOrders: true,
    orderUpdates: true,
    paymentReceived: true,
    lowStock: true,
    customerMessages: true,
    promotions: false,
    weeklyReport: true,
    appUpdates: false
  })

  const [preferences, setPreferences] = useState({
    autoAcceptOrders: false,
    showStoreOffline: false,
    vacationMode: false,
    instantNotifications: true
  })

  const handleNotificationToggle = (key: string) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }))
  }

  const handlePreferenceToggle = (key: string) => {
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm w-[90%] h-[80vh] flex flex-col p-0 rounded-2xl fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <DialogHeader className="px-4 py-4 border-b bg-white rounded-t-2xl">
          <DialogTitle className="text-lg font-semibold flex items-center gap-2">
            <Store className="h-5 w-5 text-orange-600" />
            Configurações do Vendedor
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 px-4 py-4 overflow-y-auto bg-gray-50">
        <div className="space-y-4">
          {/* Notifications Section */}
          <Card className="border-orange-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Bell className="h-4 w-4 text-orange-600" />
                Notificações
              </CardTitle>
              <CardDescription className="text-sm">
                Gerencie quando e como você quer ser notificado
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 px-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="text-sm font-medium">Novos pedidos</div>
                  <div className="text-xs text-gray-500">Receber quando chegarem novos pedidos</div>
                </div>
                <Switch
                  checked={notifications.newOrders}
                  onCheckedChange={() => handleNotificationToggle('newOrders')}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="text-sm font-medium">Atualizações de pedidos</div>
                  <div className="text-xs text-gray-500">Status de entrega e cancelamentos</div>
                </div>
                <Switch
                  checked={notifications.orderUpdates}
                  onCheckedChange={() => handleNotificationToggle('orderUpdates')}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="text-sm font-medium">Pagamentos recebidos</div>
                  <div className="text-xs text-gray-500">Confirmação de recebimento de valores</div>
                </div>
                <Switch
                  checked={notifications.paymentReceived}
                  onCheckedChange={() => handleNotificationToggle('paymentReceived')}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="text-sm font-medium">Estoque baixo</div>
                  <div className="text-xs text-gray-500">Aviso quando produtos estão acabando</div>
                </div>
                <Switch
                  checked={notifications.lowStock}
                  onCheckedChange={() => handleNotificationToggle('lowStock')}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="text-sm font-medium">Mensagens de clientes</div>
                  <div className="text-xs text-gray-500">Chat e avaliações recebidas</div>
                </div>
                <Switch
                  checked={notifications.customerMessages}
                  onCheckedChange={() => handleNotificationToggle('customerMessages')}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="text-sm font-medium">Relatório semanal</div>
                  <div className="text-xs text-gray-500">Resumo de vendas e desempenho</div>
                </div>
                <Switch
                  checked={notifications.weeklyReport}
                  onCheckedChange={() => handleNotificationToggle('weeklyReport')}
                />
              </div>
            </CardContent>
          </Card>

          {/* Store Preferences */}
          <Card className="border-orange-200">
            <CardHeader className="pb-4">
              <CardTitle className="text-base flex items-center gap-2">
                <Store className="h-4 w-4 text-orange-600" />
                Preferências da Loja
              </CardTitle>
              <CardDescription>
                Configure o comportamento da sua loja
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 px-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="text-sm font-medium">Aceitar pedidos automaticamente</div>
                  <div className="text-xs text-gray-500">Confirma pedidos sem aprovação manual</div>
                </div>
                <Switch
                  checked={preferences.autoAcceptOrders}
                  onCheckedChange={() => handlePreferenceToggle('autoAcceptOrders')}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="text-sm font-medium">Modo férias</div>
                  <div className="text-xs text-gray-500">Pausar temporariamente novos pedidos</div>
                </div>
                <Switch
                  checked={preferences.vacationMode}
                  onCheckedChange={() => handlePreferenceToggle('vacationMode')}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="text-sm font-medium">Mostrar loja offline</div>
                  <div className="text-xs text-gray-500">Exibir loja mesmo quando fechada</div>
                </div>
                <Switch
                  checked={preferences.showStoreOffline}
                  onCheckedChange={() => handlePreferenceToggle('showStoreOffline')}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="text-sm font-medium">Notificações instantâneas</div>
                  <div className="text-xs text-gray-500">Receber alertas em tempo real</div>
                </div>
                <Switch
                  checked={preferences.instantNotifications}
                  onCheckedChange={() => handlePreferenceToggle('instantNotifications')}
                />
              </div>
            </CardContent>
          </Card>

          {/* Account Information */}
          <Card className="border-orange-200">
            <CardHeader className="pb-4">
              <CardTitle className="text-base flex items-center gap-2">
                <Shield className="h-4 w-4 text-orange-600" />
                Informações da Conta
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 px-6">              
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Taxa por venda:</span>
                <span className="font-medium text-green-600">Gratuito</span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Limite de produtos:</span>
                <span className="font-medium">Ilimitado</span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Vendas este mês:</span>
                <span className="font-medium text-green-600">R$ 2.847,50</span>
              </div>

              <Separator className="my-2" />
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Versão do app:</span>
                <span className="font-medium">2.1.0</span>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-3">
            <Button 
              variant="outline" 
              className="flex items-center gap-2 border-orange-300 text-orange-700 hover:bg-orange-50"
            >
              <BarChart className="h-4 w-4" />
              Relatórios
            </Button>
            
            <Button 
              variant="outline" 
              className="flex items-center gap-2 border-orange-300 text-orange-700 hover:bg-orange-50"
            >
              <CreditCard className="h-4 w-4" />
              Financeiro
            </Button>
          </div>
        </div>
        </div>

        {/* Footer com botão */}
        <div className="px-4 py-3 border-t bg-white rounded-b-2xl">
          <Button
            onClick={onClose}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white"
          >
            Salvar Configurações
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}