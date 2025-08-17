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
          { period: 'Manhã', orders: 'x pedidos', value: 'R$ XX,00' },
          { period: 'Tarde', orders: 'x pedidos', value: 'R$ XX,00' },
          { period: 'Noite', orders: 'x pedidos', value: 'R$ XX,00' },
        ]
      case 'semana':
        return [
          { period: 'Segunda', orders: 'x pedidos', value: 'R$ XX,00' },
          { period: 'Terça', orders: 'x pedidos', value: 'R$ XX,00' },
          { period: 'Quarta', orders: 'x pedidos', value: 'R$ XX,00' },
          { period: 'Quinta', orders: 'x pedidos', value: 'R$ XX,00' },
          { period: 'Sexta', orders: 'x pedidos', value: 'R$ XX,00' },
          { period: 'Sábado', orders: 'x pedidos', value: 'R$ XX,00' },
          { period: 'Domingo', orders: 'x pedidos', value: 'R$ XX,00' },
        ]
      case 'mes':
        return [
          { period: 'Semana 1', orders: 'x pedidos', value: 'R$ XX,00' },
          { period: 'Segunda', orders: 'x pedidos', value: 'R$ XX,00' },
          { period: 'Terça', orders: 'x pedidos', value: 'R$ XX,00' },
          { period: 'Quarta', orders: 'x pedidos', value: 'R$ XX,00' },
        ]
      default:
        return []
    }
  }

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="px-4 py-4">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            size="icon" 
            className="mr-2"
            onClick={() => onScreenChange?.("home")}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-2xl font-bold">Resumo financeiro</h1>
        </div>
        
        {/* Financial Cards */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <Card 
            className={`aspect-square flex flex-col items-center justify-center cursor-pointer transition-colors ${
              selectedCard === 'hoje' ? 'bg-gray-400 text-white' : 'bg-gray-100'
            }`}
            onClick={() => setSelectedCard('hoje')}
          >
            <span className="text-sm font-medium text-center">Total de</span>
            <span className="text-sm font-medium text-center">Vendas Hoje</span>
            <span className="text-xs mt-2">(selecionado)</span>
          </Card>
          
          <Card 
            className={`aspect-square flex flex-col items-center justify-center cursor-pointer transition-colors ${
              selectedCard === 'semana' ? 'bg-gray-400 text-white' : 'bg-gray-100'
            }`}
            onClick={() => setSelectedCard('semana')}
          >
            <span className="text-sm font-medium text-center">Total na</span>
            <span className="text-sm font-medium text-center">Semana</span>
            {selectedCard === 'semana' && <span className="text-xs mt-2">(selecionado)</span>}
          </Card>
          
          <Card 
            className={`aspect-square flex flex-col items-center justify-center cursor-pointer transition-colors ${
              selectedCard === 'mes' ? 'bg-gray-400 text-white' : 'bg-gray-100'
            }`}
            onClick={() => setSelectedCard('mes')}
          >
            <span className="text-sm font-medium text-center">Total no</span>
            <span className="text-sm font-medium text-center">mês</span>
            {selectedCard === 'mes' && <span className="text-xs mt-2">(selecionado)</span>}
          </Card>
          
          <Card 
            className={`aspect-square flex flex-col items-center justify-center cursor-pointer transition-colors ${
              selectedCard === 'lucro' ? 'bg-gray-400 text-white' : 'bg-gray-100'
            }`}
            onClick={() => setSelectedCard('lucro')}
          >
            <span className="text-sm font-medium text-center">Lucro estimado</span>
            {selectedCard === 'lucro' && <span className="text-xs mt-2">(selecionado)</span>}
          </Card>
        </div>

        {/* Profit Breakdown - Only show when Lucro estimado is selected */}
        {selectedCard === 'lucro' && (
          <div className="mb-8">
            <Select defaultValue="mes">
              <SelectTrigger className="w-32 mb-6">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mes">Mês</SelectItem>
                <SelectItem value="semana">Semana</SelectItem>
                <SelectItem value="dia">Dia</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center">
                <span className="text-lg">Receita bruta</span>
                <span className="font-medium">R$ XX</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-lg">Custos</span>
                <span className="font-medium">R$ XX</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-lg">Taxas</span>
                <span className="font-medium">R$ XX</span>
              </div>
              <div className="flex justify-between items-center border-t pt-4">
                <span className="text-lg font-bold">Lucro estimado</span>
                <span className="font-bold">R$ XX</span>
              </div>
            </div>
          </div>
        )}
        
        {/* Chart Section */}
        <div className="mb-8">
          <h3 className="text-xl font-medium text-gray-600 mb-4">
            {selectedCard === 'lucro' ? 'Gráfico comparativo' : 'Gráfico'}
          </h3>
          
          <div className="h-64 w-full">
            {selectedCard === 'lucro' ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparativeData}>
                  <XAxis dataKey="period" />
                  <YAxis />
                  <Bar dataKey="profit" fill="#6b7280" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={getChartData()}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Line type="monotone" dataKey="value" stroke="#000" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
          
          <div className="text-right text-sm text-gray-500 mt-2">
            {selectedCard === 'hoje' && 'Período'}
            {selectedCard === 'semana' && 'Dias'}
            {selectedCard === 'mes' && 'Semanas'}
            {selectedCard === 'lucro' && 'Período'}
          </div>
        </div>

        {/* Comparative Data - Only show when Lucro estimado is selected */}
        {selectedCard === 'lucro' && (
          <div className="mb-8">
            <div className="space-y-2">
              {comparativeData.map((item, index) => (
                <div key={index} className="text-sm text-gray-600">
                  {item.period} - Lucro: R${item.profit}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* History Section - Don't show when Lucro estimado is selected */}
        {selectedCard !== 'lucro' && (
          <div>
            <Collapsible defaultOpen>
              <CollapsibleTrigger className="flex items-center justify-between w-full mb-4">
                <span className="text-xl font-medium">Histórico</span>
                <ChevronDown className="h-5 w-5" />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="mb-4">
                  <Select value={historyPeriod} onValueChange={setHistoryPeriod}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hoje">Hoje</SelectItem>
                      <SelectItem value="semana">Dias</SelectItem>
                      <SelectItem value="mes">Semana 1</SelectItem>
                    </SelectContent>
                  </Select>
                  {historyPeriod === 'semana' && (
                    <span className="text-sm text-gray-500 ml-2">(dd/mm - dd/mm)</span>
                  )}
                  {historyPeriod === 'mes' && (
                    <span className="text-sm text-gray-500 ml-2">(dd/mm - dd/mm)</span>
                  )}
                </div>
                
                <div className="space-y-3">
                  {getHistoryData().map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div className="flex items-center space-x-4">
                        <span className="font-medium">{item.period}</span>
                        <span className="text-gray-600">{item.orders}</span>
                      </div>
                      <span className="font-medium">{item.value}</span>
                    </div>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        )}
      </div>
    </div>
  )
}
