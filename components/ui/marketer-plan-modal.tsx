"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Check, Crown, Star, TrendingUp, Zap, Shield, CreditCard, Calendar, Package, Users, BarChart3 } from "lucide-react"

interface MarketerPlanModalProps {
  isOpen: boolean
  onClose: () => void
}

export function MarketerPlanModal({ isOpen, onClose }: MarketerPlanModalProps) {
  const [selectedPlan, setSelectedPlan] = useState<'basic' | 'pro' | 'premium'>('pro')

  const currentPlan = {
    name: "Vendedor Pro",
    price: 29.90,
    billingCycle: "mensal",
    nextBilling: "2025-09-17",
    status: "ativo",
    daysUntilRenewal: 31
  }

  const usageStats = {
    products: { current: 32, limit: "Ilimitado" },
    orders: { current: 245, limit: "Ilimitado" },
    commission: 3.5,
    support: "Prioritário"
  }

  const plans = [
    {
      id: 'basic',
      name: 'Vendedor Básico',
      price: 0,
      period: 'Grátis',
      description: 'Ideal para começar a vender',
      features: [
        'Até 20 produtos',
        'Comissão de 5%',
        'Suporte por email',
        'Relatórios básicos'
      ],
      limitations: [
        'Limite de 20 produtos',
        'Comissão mais alta',
        'Suporte limitado'
      ],
      color: 'bg-gray-100 text-gray-800',
      icon: <Package className="w-5 h-5" />
    },
    {
      id: 'pro',
      name: 'Vendedor Pro',
      price: 29.90,
      period: '/mês',
      description: 'Para vendedores em crescimento',
      features: [
        'Produtos ilimitados',
        'Comissão de 3,5%',
        'Suporte prioritário',
        'Relatórios avançados',
        'Promoções destacadas',
        'Chat com clientes'
      ],
      popular: true,
      color: 'bg-orange-100 text-orange-800',
      icon: <Star className="w-5 h-5" />
    },
    {
      id: 'premium',
      name: 'Vendedor Premium',
      price: 59.90,
      period: '/mês',
      description: 'Para vendedores profissionais',
      features: [
        'Tudo do Pro +',
        'Comissão de 2,5%',
        'Suporte 24/7',
        'Analytics detalhados',
        'Marketing automático',
        'API personalizada',
        'Gerente de conta dedicado'
      ],
      color: 'bg-purple-100 text-purple-800',
      icon: <Crown className="w-5 h-5" />
    }
  ]

  const handlePlanChange = (planId: 'basic' | 'pro' | 'premium') => {
    setSelectedPlan(planId)
    // Aqui você implementaria a lógica de mudança de plano
    console.log('Mudança de plano para:', planId)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold flex items-center gap-2">
            <Crown className="h-5 w-5 text-orange-600" />
            Plano e Assinatura
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Current Plan Status */}
          <Card className="border-orange-200 bg-orange-50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Star className="h-4 w-4 text-orange-600" />
                    Plano Atual: {currentPlan.name}
                  </CardTitle>
                  <CardDescription>
                    Próxima cobrança: {formatDate(currentPlan.nextBilling)}
                  </CardDescription>
                </div>
                <Badge className="bg-green-100 text-green-800">
                  {currentPlan.status.toUpperCase()}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span>Renovação em {currentPlan.daysUntilRenewal} dias</span>
                <span className="font-medium">R$ {currentPlan.price.toFixed(2)}/{currentPlan.billingCycle}</span>
              </div>
              <Progress value={(31 - currentPlan.daysUntilRenewal) / 31 * 100} className="h-2" />
            </CardContent>
          </Card>

          {/* Usage Statistics */}
          <Card className="border-orange-200">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-orange-600" />
                Uso Atual
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{usageStats.products.current}</div>
                  <div className="text-sm text-gray-600">Produtos cadastrados</div>
                  <div className="text-xs text-gray-500">Limite: {usageStats.products.limit}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{usageStats.orders.current}</div>
                  <div className="text-sm text-gray-600">Pedidos no mês</div>
                  <div className="text-xs text-gray-500">Limite: {usageStats.orders.limit}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{usageStats.commission}%</div>
                  <div className="text-sm text-gray-600">Taxa por venda</div>
                  <div className="text-xs text-gray-500">Atual</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    <Shield className="h-6 w-6 mx-auto" />
                  </div>
                  <div className="text-sm text-gray-600">Suporte</div>
                  <div className="text-xs text-gray-500">{usageStats.support}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Available Plans */}
          <div>
            <h3 className="font-medium text-gray-900 mb-4">Planos Disponíveis</h3>
            <div className="space-y-3">
              {plans.map((plan) => (
                <Card 
                  key={plan.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedPlan === plan.id ? 'ring-2 ring-orange-500 border-orange-300' : 'border-gray-200'
                  } ${plan.popular ? 'border-orange-300' : ''}`}
                  onClick={() => setSelectedPlan(plan.id as 'basic' | 'pro' | 'premium')}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-orange-500">{plan.icon}</div>
                        <div>
                          <CardTitle className="text-base flex items-center gap-2">
                            {plan.name}
                            {plan.popular && (
                              <Badge className="bg-orange-100 text-orange-800 text-xs">
                                POPULAR
                              </Badge>
                            )}
                          </CardTitle>
                          <CardDescription className="text-sm">{plan.description}</CardDescription>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold">
                          {plan.price === 0 ? 'Grátis' : `R$ ${plan.price.toFixed(2)}`}
                        </div>
                        <div className="text-xs text-gray-500">{plan.period}</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-2">
                      {plan.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <Check className="h-3 w-3 text-green-500" />
                          <span>{feature}</span>
                        </div>
                      ))}
                      {plan.limitations && plan.limitations.map((limitation, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm text-gray-500">
                          <div className="h-3 w-3 rounded-full bg-gray-300" />
                          <span>{limitation}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Billing Information */}
          <Card className="border-orange-200">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-orange-600" />
                Forma de Pagamento
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <CreditCard className="h-5 w-5 text-gray-600" />
                <div className="flex-1">
                  <p className="font-medium">•••• •••• •••• 4532</p>
                  <p className="text-sm text-gray-600">Vence em 12/2027</p>
                </div>
                <Button variant="outline" size="sm">
                  Alterar
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            {selectedPlan !== 'pro' && (
              <Button
                onClick={() => handlePlanChange(selectedPlan)}
                className="flex-1 bg-orange-600 hover:bg-orange-700 text-white"
              >
                {selectedPlan === 'basic' ? 'Fazer Downgrade' : 'Fazer Upgrade'}
              </Button>
            )}
            
            <Button
              variant="outline"
              onClick={onClose}
              className={selectedPlan === 'pro' ? 'flex-1' : 'px-6'}
            >
              {selectedPlan === 'pro' ? 'Fechar' : 'Cancelar'}
            </Button>
          </div>

          {/* Additional Info */}
          <div className="text-xs text-gray-500 space-y-1">
            <p>• Mudanças de plano entram em vigor imediatamente</p>
            <p>• Downgrades são aplicados no próximo ciclo de cobrança</p>
            <p>• Todos os planos incluem suporte técnico básico</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
