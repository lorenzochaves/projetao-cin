"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
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
  Settings
} from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, AreaChart, Area } from 'recharts'

// Mock data para o gráfico - em uma implementação real, viria do hook
const salesData = [
  { day: 'S', orders: 40, revenue: 800 },
  { day: 'M', orders: 25, revenue: 600 },
  { day: 'T', orders: 55, revenue: 1100 },
  { day: 'W', orders: 20, revenue: 400 },
  { day: 'T', orders: 65, revenue: 1300 },
  { day: 'F', orders: 40, revenue: 800 },
  { day: 'S', orders: 18, revenue: 360 },
]

interface MarketerHomepageProps {
  onScreenChange?: (screen: string) => void
}

export default function MarketerHomepage({ onScreenChange }: MarketerHomepageProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<'today' | 'weekly' | 'monthly'>('weekly')
  const { stats, products, orders, getTopProducts } = useMarketer("1") // Mock feirante ID

  const topProducts = getTopProducts()

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
            <Button variant="outline" size="sm" className="relative">
              <Bell className="w-4 h-4" />
              {stats.pendingOrders > 0 && (
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
              )}
            </Button>
            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
              <Store className="w-5 h-5 text-white" />
            </div>
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
                <span className="text-sm text-gray-300">0%</span>
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
                <span className="text-sm text-gray-500">0%</span>
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
                <span className="text-sm text-gray-500">0%</span>
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
                <span className="text-sm text-gray-500">0%</span>
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
              <Link href="/Marketer/MarketerOrders">
                <Button variant="outline" className="h-14 flex-col gap-2 w-full">
                  <Eye className="w-5 h-5" />
                  <span className="text-sm">Ver Pedidos</span>
                  {stats.pendingOrders > 0 && (
                    <Badge variant="destructive" className="ml-1 text-xs">
                      {stats.pendingOrders}
                    </Badge>
                  )}
                </Button>
              </Link>
            </div>
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
                      selectedPeriod === period ? 'bg-black text-white' : 'text-gray-600'
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
                <AreaChart data={salesData}>
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
                    stroke="#000" 
                    strokeWidth={2}
                    fill="url(#gradient)" 
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#000" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#000" stopOpacity={0.05}/>
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
                    variant={selectedPeriod === period ? "default" : "ghost"}
                    size="sm"
                    className={`h-8 px-3 text-xs ${
                      selectedPeriod === period ? 'bg-black text-white' : 'text-gray-600'
                    }`}
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
                    <p className="font-semibold text-gray-900">{product.totalSales}</p>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-3 h-3 text-blue-500" />
                      <span className="text-xs font-medium text-blue-500">
                        R$ {product.totalRevenue.toFixed(0)}
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

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex items-center justify-around">
          <Button variant="ghost" className="flex-col gap-1 h-auto py-2">
            <Store className="w-5 h-5" />
            <span className="text-xs">Início</span>
          </Button>
          <Button variant="ghost" className="flex-col gap-1 h-auto py-2 text-gray-400">
            <BarChart3 className="w-5 h-5" />
            <span className="text-xs">Análises</span>
          </Button>
          <Link href="/Marketer/MarketerOrders">
            <Button variant="ghost" className="flex-col gap-1 h-auto py-2 text-gray-400 relative">
              <ShoppingCart className="w-5 h-5" />
              <span className="text-xs">Pedidos</span>
              {stats.pendingOrders > 0 && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                  {stats.pendingOrders}
                </div>
              )}
            </Button>
          </Link>
          <Link href="/Marketer/Settings">
            <Button variant="ghost" className="flex-col gap-1 h-auto py-2 text-gray-400">
              <Settings className="w-5 h-5" />
              <span className="text-xs">Configurações</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
