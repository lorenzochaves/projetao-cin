"use client"

import { useState } from "react"
import { ChevronLeft, ChevronDown } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, BarChart, Bar } from 'recharts'

interface MarketerFinancePageProps {
  onScreenChange?: (screen: string) => void
}

const dailyData = [
  { name: 'Seg', value: 400 },
  { name: 'Ter', value: 300 },
  { name: 'Qua', value: 600 },
  { name: 'Qui', value: 800 },
  { name: 'Sex', value: 700 },
  { name: 'Sáb', value: 900 },
  { name: 'Dom', value: 500 },
]

const weeklyData = [
  { name: 'S1', value: 2000 },
  { name: 'S2', value: 2500 },
  { name: 'S3', value: 1800 },
  { name: 'S4', value: 3200 },
]

const monthlyData = [
  { name: 'Jan', value: 8000 },
  { name: 'Fev', value: 9500 },
  { name: 'Mar', value: 7200 },
  { name: 'Abr', value: 10800 },
]

const comparativeData = [
  { period: '01/12', profit: 1200 },
  { period: '02/12', profit: 1500 },
  { period: '03/12', profit: 980 },
  { period: '04/12', profit: 1800 },
]

export default function MarketerFinancePage({ onScreenChange }: MarketerFinancePageProps) {
  const [selectedCard, setSelectedCard] = useState('hoje')
  const [historyPeriod, setHistoryPeriod] = useState('hoje')
  const [profitPeriod, setProfitPeriod] = useState('mes')

  const getFinancialData = (period: string) => {
    switch (period) {
      case 'dia':
        return {
          receita: 245,
          custos: 122,
          taxas: 25,
          lucro: 98
        }
      case 'semana':
        return {
          receita: 1890,
          custos: 945,
          taxas: 189,
          lucro: 756
        }
      case 'mes':
        return {
          receita: 7450,
          custos: 3720,
          taxas: 750,
          lucro: 2980
        }
      default:
        return {
          receita: 7450,
          custos: 3720,
          taxas: 750,
          lucro: 2980
        }
    }
  }

  const getProfitChartData = (period: string) => {
    switch (period) {
      case 'dia':
        return [
          { period: '6h', profit: 15 },
          { period: '12h', profit: 42 },
          { period: '18h', profit: 28 },
          { period: '24h', profit: 13 }
        ]
      case 'semana':
        return [
          { period: 'Seg', profit: 95 },
          { period: 'Ter', profit: 125 },
          { period: 'Qua', profit: 110 },
          { period: 'Qui', profit: 98 },
          { period: 'Sex', profit: 145 },
          { period: 'Sáb', profit: 183 },
          { period: 'Dom', profit: 0 }
        ]
      case 'mes':
        return [
          { period: 'S1', profit: 580 },
          { period: 'S2', profit: 780 },
          { period: 'S3', profit: 650 },
          { period: 'S4', profit: 970 }
        ]
      default:
        return [
          { period: 'S1', profit: 580 },
          { period: 'S2', profit: 780 },
          { period: 'S3', profit: 650 },
          { period: 'S4', profit: 970 }
        ]
    }
  }

  const getChartData = () => {
    switch (selectedCard) {
      case 'semana': return dailyData
      case 'mes': return weeklyData
      default: return dailyData
    }
  }

  const getHistoryData = () => {
    switch (historyPeriod) {
      case 'hoje':
        return [
          { period: 'Manhã', orders: '4 pedidos', value: 'R$ 85,50' },
          { period: 'Tarde', orders: '6 pedidos', value: 'R$ 142,30' },
          { period: 'Noite', orders: '2 pedidos', value: 'R$ 47,20' },
        ]
      case 'semana':
        return [
          { period: 'Segunda', orders: '8 pedidos', value: 'R$ 195,40' },
          { period: 'Terça', orders: '12 pedidos', value: 'R$ 287,80' },
          { period: 'Quarta', orders: '15 pedidos', value: 'R$ 346,70' },
          { period: 'Quinta', orders: '10 pedidos', value: 'R$ 234,50' },
          { period: 'Sexta', orders: '18 pedidos', value: 'R$ 425,90' },
          { period: 'Sábado', orders: '22 pedidos', value: 'R$ 512,30' },
          { period: 'Domingo', orders: '9 pedidos', value: 'R$ 178,20' },
        ]
      case 'mes':
        return [
          { period: 'Semana 1', orders: '45 pedidos', value: 'R$ 1.245,80' },
          { period: 'Semana 2', orders: '52 pedidos', value: 'R$ 1.567,40' },
          { period: 'Semana 3', orders: '48 pedidos', value: 'R$ 1.398,60' },
          { period: 'Semana 4', orders: '38 pedidos', value: 'R$ 1.089,30' },
        ]
      default:
        return []
    }
  }

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="px-4 py-6">
        {/* Financial Cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Card 
            className={`p-4 cursor-pointer transition-all duration-200 border-2 ${
              selectedCard === 'hoje' 
                ? 'bg-orange-50 border-orange-200 shadow-sm' 
                : 'bg-white border-gray-100 hover:border-gray-200'
            }`}
            onClick={() => setSelectedCard('hoje')}
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600 mb-1">R$ 245</div>
              <div className="text-sm text-gray-600">Vendas Hoje</div>
              <div className="text-xs text-gray-500 mt-1">12 pedidos</div>
            </div>
          </Card>
          
          <Card 
            className={`p-4 cursor-pointer transition-all duration-200 border-2 ${
              selectedCard === 'semana' 
                ? 'bg-orange-50 border-orange-200 shadow-sm' 
                : 'bg-white border-gray-100 hover:border-gray-200'
            }`}
            onClick={() => setSelectedCard('semana')}
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600 mb-1">R$ 1.890</div>
              <div className="text-sm text-gray-600">Esta Semana</div>
              <div className="text-xs text-gray-500 mt-1">68 pedidos</div>
            </div>
          </Card>
          
          <Card 
            className={`p-4 cursor-pointer transition-all duration-200 border-2 ${
              selectedCard === 'mes' 
                ? 'bg-orange-50 border-orange-200 shadow-sm' 
                : 'bg-white border-gray-100 hover:border-gray-200'
            }`}
            onClick={() => setSelectedCard('mes')}
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600 mb-1">R$ 7.450</div>
              <div className="text-sm text-gray-600">Este Mês</div>
              <div className="text-xs text-gray-500 mt-1">285 pedidos</div>
            </div>
          </Card>
          
          <Card 
            className={`p-4 cursor-pointer transition-all duration-200 border-2 ${
              selectedCard === 'lucro' 
                ? 'bg-orange-50 border-orange-200 shadow-sm' 
                : 'bg-white border-gray-100 hover:border-gray-200'
            }`}
            onClick={() => setSelectedCard('lucro')}
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">
                R$ {selectedCard === 'lucro' ? getFinancialData(profitPeriod).lucro.toLocaleString() : '2.980'}
              </div>
              <div className="text-sm text-gray-600">Lucro Líquido</div>
              <div className="text-xs text-gray-500 mt-1">
                {selectedCard === 'lucro' && profitPeriod === 'dia' ? 'Hoje' : 
                 selectedCard === 'lucro' && profitPeriod === 'semana' ? 'Esta semana' : 'Este mês'}
              </div>
            </div>
          </Card>
        </div>

        {/* Profit Breakdown - Only show when Lucro estimado is selected */}
        {selectedCard === 'lucro' && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Detalhamento Financeiro</h3>
              <Select value={profitPeriod} onValueChange={setProfitPeriod}>
                <SelectTrigger className="w-24 h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dia">Dia</SelectItem>
                  <SelectItem value="semana">Semana</SelectItem>
                  <SelectItem value="mes">Mês</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-gray-700">Receita bruta</span>
                <span className="font-semibold text-gray-900">R$ {getFinancialData(profitPeriod).receita.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-gray-700">Custos dos produtos</span>
                <span className="font-semibold text-red-600">- R$ {getFinancialData(profitPeriod).custos.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-gray-700">Taxas da plataforma</span>
                <span className="font-semibold text-red-600">- R$ {getFinancialData(profitPeriod).taxas.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center py-3 bg-green-50 px-3 rounded-lg">
                <span className="font-bold text-green-800">Lucro Líquido</span>
                <span className="font-bold text-green-800 text-lg">R$ {getFinancialData(profitPeriod).lucro.toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}
        
        {/* Chart Section */}
        <div className="bg-white rounded-lg border border-gray-100 p-4 mb-6">
          <h3 className="font-semibold text-gray-900 mb-4">
            {selectedCard === 'lucro' ? 'Evolução do Lucro' : 'Vendas no Período'}
          </h3>
          
          <div className="h-48 w-full">
            {selectedCard === 'lucro' ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={getProfitChartData(profitPeriod)}>
                  <XAxis dataKey="period" axisLine={false} tickLine={false} />
                  <YAxis hide />
                  <Bar dataKey="profit" fill="#ea580c" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={getChartData()}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis hide />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#ea580c" 
                    strokeWidth={3} 
                    dot={{ fill: '#ea580c', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, fill: '#ea580c' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Additional Bar Chart for Profit Breakdown */}
        {selectedCard === 'lucro' && (
          <div className="bg-white rounded-lg border border-gray-100 p-4 mb-6">
            <h3 className="font-semibold text-gray-900 mb-4">Composição do Lucro</h3>
            
            <div className="h-40 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={[{
                    name: 'Financeiro',
                    receita: getFinancialData(profitPeriod).receita,
                    custos: getFinancialData(profitPeriod).custos,
                    taxas: getFinancialData(profitPeriod).taxas,
                    lucro: getFinancialData(profitPeriod).lucro
                  }]}
                  layout="horizontal"
                >
                  <XAxis type="number" hide />
                  <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} width={60} />
                  <Bar dataKey="receita" stackId="a" fill="#10b981" name="Receita" />
                  <Bar dataKey="custos" stackId="a" fill="#ef4444" name="Custos" />
                  <Bar dataKey="taxas" stackId="a" fill="#f59e0b" name="Taxas" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="flex justify-center gap-6 mt-3 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span>Receita</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-red-500 rounded"></div>
                <span>Custos</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                <span>Taxas</span>
              </div>
            </div>
          </div>
        )}

        {/* History Section - Don't show when Lucro estimado is selected */}
        {selectedCard !== 'lucro' && (
          <div className="bg-white rounded-lg border border-gray-100 p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Histórico Detalhado</h3>
              <Select value={historyPeriod} onValueChange={setHistoryPeriod}>
                <SelectTrigger className="w-28 h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hoje">Hoje</SelectItem>
                  <SelectItem value="semana">Semana</SelectItem>
                  <SelectItem value="mes">Mês</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-3">
              {getHistoryData().map((item, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                  <div>
                    <span className="font-medium text-gray-900">{item.period}</span>
                    <span className="text-sm text-gray-500 ml-2">{item.orders}</span>
                  </div>
                  <span className="font-semibold text-orange-600">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
