"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useMarketer } from "@/hooks/api/useMarketer"
import { 
  Package, 
  ShoppingCart, 
  Users, 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Plus,
  Eye,
  BarChart3,
  Bell,
  Store,
  Settings,
  Heart
} from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, AreaChart, Area } from 'recharts'

// Mock data para o gráfico - em uma implementação real, viria do hook
const salesDataToday = [
  { day: '6h', orders: 5, revenue: 120 },
  { day: '9h', orders: 12, revenue: 280 },
  { day: '12h', orders: 18, revenue: 420 },
  { day: '15h', orders: 25, revenue: 650 },
  { day: '18h', orders: 15, revenue: 380 },
  { day: '21h', orders: 8, revenue: 190 },
]

const salesDataWeekly = [
  { day: 'S', orders: 40, revenue: 800 },
  { day: 'M', orders: 25, revenue: 600 },
  { day: 'T', orders: 55, revenue: 1100 },
  { day: 'W', orders: 20, revenue: 400 },
  { day: 'T', orders: 65, revenue: 1300 },
  { day: 'F', orders: 40, revenue: 800 },
  { day: 'S', orders: 18, revenue: 360 },
]

const salesDataMonthly = [
  { day: 'S1', orders: 180, revenue: 4200 },
  { day: 'S2', orders: 220, revenue: 5100 },
  { day: 'S3', orders: 160, revenue: 3800 },
  { day: 'S4', orders: 250, revenue: 5900 },
]

interface MarketerHomepageProps {
  onScreenChange?: (screen: string) => void
}

export default function MarketerHomepage({ onScreenChange }: MarketerHomepageProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<'today' | 'weekly' | 'monthly'>('weekly')
  const [selectedProductPeriod, setSelectedProductPeriod] = useState<'today' | 'weekly' | 'monthly'>('weekly')
  const [showNotifications, setShowNotifications] = useState(false)
  const { stats, products, orders, getTopProducts } = useMarketer("1") // Mock feirante ID
  
  const getTopProductsWithGrowth = useCallback((period: 'today' | 'weekly' | 'monthly') => {
    // Calculate sales for each product based on orders and add growth data
    const productSales = products.map((product, index) => {
      const sales = orders.reduce((total, order) => {
        const orderItem = order.items.find(item => item.productId === product.id)
        return orderItem ? total + orderItem.quantity : total
      }, 0)
      
      const revenue = orders.reduce((total, order) => {
        const orderItem = order.items.find(item => item.productId === product.id)
        return orderItem ? total + (orderItem.price * orderItem.quantity) : total
      }, 0)

      // Generate realistic growth data based on period
      let growthData;
      switch (period) {
        case 'today':
          growthData = [12, -5, 8, 15, -2, 18, 25, 6, -8, 14][index] || 10
          break
        case 'weekly':
          growthData = [25, 18, -12, 35, 8, 45, -5, 22, 15, 30][index] || 20
          break
        case 'monthly':
          growthData = [85, 120, 65, 145, 98, 175, 55, 110, 78, 135][index] || 95
          break
        default:
          growthData = 0
      }

      return {
        ...product,
        totalSales: sales || Math.floor(Math.random() * 50) + 10, // Mock sales if no real orders
        totalRevenue: revenue || (Math.floor(Math.random() * 500) + 100), // Mock revenue
        growth: growthData
      }
    })

    return productSales
      .sort((a, b) => b.totalSales - a.totalSales)
      .slice(0, 5)
  }, [products, orders])

  const topProducts = getTopProductsWithGrowth(selectedProductPeriod)

  // Generate notifications from recent orders
  const getNotifications = useCallback(() => {
    const today = new Date()
    const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000)
    
    // Get recent orders (last 24 hours) for notifications
    const recentOrders = orders.filter(order => {
      const orderDate = new Date(order.createdAt)
      return orderDate >= yesterday
    })

    return recentOrders.map(order => ({
      id: order.id,
      title: "Novo pedido",
      message: `${order.clientName} fez um pedido`,
      time: new Date(order.createdAt).toLocaleTimeString('pt-BR', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      status: order.status,
      orderId: order.id
    }))
  }, [orders])

  const notifications = getNotifications()

  const handleNotificationClick = (orderId: string) => {
    setShowNotifications(false)
    if (onScreenChange) {
      onScreenChange('orders')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm border-b px-4 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Painel de Controle</h1>
            <p className="text-gray-600">Bem-vindo de volta, João Silva</p>
          </div>
          <div className="flex items-center gap-3">
            <DropdownMenu open={showNotifications} onOpenChange={setShowNotifications}>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="relative">
                  <Bell className="w-4 h-4" />
                  {notifications.length > 0 && (
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <div className="p-3 border-b">
                  <h3 className="font-semibold text-gray-900">Notificações</h3>
                  <p className="text-sm text-gray-500">{notifications.length} nova(s) notificação(ões)</p>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <DropdownMenuItem
                        key={notification.id}
                        className="p-3 cursor-pointer hover:bg-gray-50"
                        onClick={() => handleNotificationClick(notification.orderId)}
                      >
                        <div className="flex items-start gap-3 w-full">
                          <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-900 text-sm">{notification.title}</p>
                            <p className="text-sm text-gray-600 truncate">{notification.message}</p>
                            <span className="text-xs text-gray-500">{notification.time}</span>
                          </div>
                        </div>
                      </DropdownMenuItem>
                    ))
                  ) : (
                    <div className="p-6 text-center text-gray-500">
                      <Bell className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                      <p className="text-sm">Nenhuma notificação</p>
                    </div>
                  )}
                </div>
                {notifications.length > 0 && (
                  <div className="p-3 border-t">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full text-orange-600 hover:text-orange-700"
                      onClick={() => handleNotificationClick('')}
                    >
                      Ver todos os pedidos
                    </Button>
                  </div>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              variant="ghost"
              size="sm"
              className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center p-0 hover:bg-orange-600"
              onClick={() => onScreenChange && onScreenChange('orders')}
            >
              <Store className="w-5 h-5 text-white" />
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4">
          {/* Total Products Card */}
          <Card className="bg-gradient-to-br from-gray-900 to-gray-700 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Package className="w-6 h-6 text-gray-300" />
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold">{stats.totalProducts}</p>
                <p className="text-sm text-gray-300">Total de Produtos</p>
                <Progress value={30} className="h-1 bg-gray-600" />
              </div>
            </CardContent>
          </Card>

          {/* Total Orders Card */}
          <Card className="bg-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <ShoppingCart className="w-6 h-6 text-gray-400" />
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
                <p className="text-sm text-gray-500">Total de Pedidos</p>
                <Progress value={70} className="h-1" />
              </div>
            </CardContent>
          </Card>

          {/* Total Clients Card */}
          <Card className="bg-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Users className="w-6 h-6 text-gray-400" />
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-gray-900">{stats.totalClients}</p>
                <p className="text-sm text-gray-500">Total de Clientes</p>
                <Progress value={70} className="h-1" />
              </div>
            </CardContent>
          </Card>

          {/* Revenue Card */}
          <Card className="bg-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <DollarSign className="w-6 h-6 text-gray-400" />
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-gray-900">R$ {(stats.revenue / 1000).toFixed(1)}k</p>
                <p className="text-sm text-gray-500">Receita</p>
                <Progress value={70} className="h-1" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Ações Rápidas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <Link href="/Marketer/MarketerStall/add-product">
                <Button className="h-14 flex-col gap-2 bg-orange-500 hover:bg-orange-600 w-full">
                  <Plus className="w-5 h-5" />
                  <span className="text-sm">Adicionar Produto</span>
                </Button>
              </Link>
              <Button 
                onClick={() => onScreenChange?.("orders")}
                variant="outline" 
                className="h-14 flex-col gap-2 w-full relative"
              >
                {stats.pendingOrders > 0 && (
                  <Badge variant="destructive" className="absolute top-1 right-1 text-xs w-5 h-5 rounded-full p-0 flex items-center justify-center">
                    {stats.pendingOrders}
                  </Badge>
                )}
                <Eye className="w-5 h-5" />
                <span className="text-sm">Ver Pedidos</span>
              </Button>
            </div>
            
            {/* Botão de Ajuda em destaque */}
            <Button 
              onClick={() => onScreenChange?.("help")}
              variant="outline" 
              className="h-12 w-full flex items-center gap-3 border-orange-200 hover:bg-orange-50 text-orange-700 hover:text-orange-800"
            >
              <Heart className="w-5 h-5 text-orange-500" />
              <span className="font-medium">Precisa de Ajuda? Estamos aqui!</span>
            </Button>
          </CardContent>
        </Card>

        {/* Revenue Chart */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Receita</CardTitle>
              <div className="flex gap-1">
                {(['monthly', 'weekly', 'today'] as const).map((period) => (
                  <Button
                    key={period}
                    variant={selectedPeriod === period ? "default" : "ghost"}
                    size="sm"
                    className={`h-8 px-3 text-xs ${
                      selectedPeriod === period ? 'bg-orange-600 text-white' : 'text-gray-600'
                    }`}
                    onClick={() => setSelectedPeriod(period)}
                  >
                    {period === 'monthly' ? 'Mensal' : period === 'weekly' ? 'Semanal' : 'Hoje'}
                  </Button>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={
                  selectedPeriod === 'today' ? salesDataToday :
                  selectedPeriod === 'weekly' ? salesDataWeekly :
                  salesDataMonthly
                }>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="day" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#666' }}
                  />
                  <YAxis hide />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#ea580c" 
                    strokeWidth={2}
                    fill="url(#gradient)" 
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ea580c" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#ea580c" stopOpacity={0.05}/>
                    </linearGradient>
                  </defs>
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Produtos Mais Vendidos</CardTitle>
              <div className="flex gap-1">
                {(['monthly', 'weekly', 'today'] as const).map((period) => (
                  <Button
                    key={period}
                    variant={selectedProductPeriod === period ? "default" : "ghost"}
                    size="sm"
                    className={`h-8 px-3 text-xs ${
                      selectedProductPeriod === period ? 'bg-orange-600 text-white' : 'text-gray-600'
                    }`}
                    onClick={() => setSelectedProductPeriod(period)}
                  >
                    {period === 'monthly' ? 'Mensal' : period === 'weekly' ? 'Semanal' : 'Hoje'}
                  </Button>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {topProducts.length > 0 ? (
              topProducts.map((product, index) => (
                <div key={product.id} className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{product.name}</h4>
                    <p className="text-sm text-gray-500">R$ {product.price.toFixed(2)}/{product.unit}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{product.totalSales} vendas</p>
                    <div className="flex items-center gap-1">
                      <TrendingUp className={`w-3 h-3 ${product.growth >= 0 ? 'text-green-500' : 'text-red-500'}`} />
                      <span className={`text-xs font-medium ${product.growth >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {product.growth >= 0 ? '+' : ''}{product.growth}%
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Package className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>Nenhum produto cadastrado</p>
                <p className="text-sm">Adicione produtos para ver as estatísticas</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
