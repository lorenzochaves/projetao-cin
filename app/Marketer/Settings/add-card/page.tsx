"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { MarketerBottomNavigation } from "@/components/ui/bottom-navigation"

export default function AddCardPage() {
  const [formData, setFormData] = useState({
    cardType: "debito",
    cardName: "Marcela Silva Ribeiro",
    cardNumber: "xxxx xxxx xxxx xxxx",
    validity: "xx/xx",
    cvv: "xxx"
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Card added:", formData)
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="px-4 py-4 pb-24">
        <div className="flex items-center mb-6">
          <Link href="/Marketer/Settings">
            <Button variant="ghost" size="icon" className="mr-2">
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">Adicionar novo cartão</h1>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label className="text-base font-medium">Tipo de cartão</Label>
            <RadioGroup 
              value={formData.cardType} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, cardType: value }))}
              className="flex gap-6 mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="debito" id="debito" />
                <Label htmlFor="debito">Débito</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="credito" id="credito" />
                <Label htmlFor="credito">Crédito</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div>
            <Label htmlFor="cardName" className="text-base font-medium">Nome no cartão</Label>
            <Input
              id="cardName"
              value={formData.cardName}
              onChange={(e) => setFormData(prev => ({ ...prev, cardName: e.target.value }))}
              className="mt-2 h-12 border-gray-300 rounded-lg"
            />
          </div>
          
          <div>
            <Label htmlFor="cardNumber" className="text-base font-medium">Número do cartão</Label>
            <Input
              id="cardNumber"
              value={formData.cardNumber}
              onChange={(e) => setFormData(prev => ({ ...prev, cardNumber: e.target.value }))}
              className="mt-2 h-12 border-gray-300 rounded-lg"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="validity" className="text-base font-medium">Validade</Label>
              <Input
                id="validity"
                value={formData.validity}
                onChange={(e) => setFormData(prev => ({ ...prev, validity: e.target.value }))}
                className="mt-2 h-12 border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <Label htmlFor="cvv" className="text-base font-medium">CVV</Label>
              <Input
                id="cvv"
                value={formData.cvv}
                onChange={(e) => setFormData(prev => ({ ...prev, cvv: e.target.value }))}
                className="mt-2 h-12 border-gray-300 rounded-lg"
              />
            </div>
          </div>
          
          <div className="pt-6">
            <Button type="submit" className="w-full h-12 bg-gray-800 hover:bg-gray-900 rounded-lg">
              Salvar alterações
            </Button>
          </div>
        </form>
      </div>
      
      <MarketerBottomNavigation />
    </div>
  )
}
