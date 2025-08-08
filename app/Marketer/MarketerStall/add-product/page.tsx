"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronLeft, ChevronDown } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { StatusBar } from "@/components/ui/status-bar"

export default function MarketerAddProductPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    specifications: "",
    measurement: "",
    price: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically save the product
    router.push('/Marketer/MarketerStall/success')
  }

  return (
    <div className="min-h-screen bg-white">
      <StatusBar />
      
      <div className="px-4 py-4 pb-24">
        <div className="flex items-center mb-6">
          <Link href="/Marketer/MarketerStall/products">
            <Button variant="ghost" size="icon" className="mr-2">
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">Novo produto</h1>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="name" className="text-base font-medium">Nome do produto</Label>
            <Input
              id="name"
              placeholder="xxxxxxx"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="mt-2 h-12 border-gray-300 rounded-lg"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="specifications" className="text-base font-medium">Especificações do produto</Label>
            <Textarea
              id="specifications"
              placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidi."
              value={formData.specifications}
              onChange={(e) => setFormData(prev => ({ ...prev, specifications: e.target.value }))}
              className="mt-2 min-h-[100px] border-gray-300 rounded-lg resize-none"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="measurement" className="text-base font-medium">Medição</Label>
            <Select onValueChange={(value) => setFormData(prev => ({ ...prev, measurement: value }))}>
              <SelectTrigger className="mt-2 h-12 border-gray-300 rounded-lg">
                <SelectValue placeholder="Selecione uma opção" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="kg">Kg</SelectItem>
                <SelectItem value="mao">Mão/Mói</SelectItem>
                <SelectItem value="folha">Folha</SelectItem>
                <SelectItem value="unidade">Unidade</SelectItem>
                <SelectItem value="bandeja">Bandeja</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="price" className="text-base font-medium">Valor do produto</Label>
            <Input
              id="price"
              placeholder="R$ XX,XX"
              value={formData.price}
              onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
              className="mt-2 h-12 border-gray-300 rounded-lg w-40"
              required
            />
          </div>
          
          <div className="pt-6">
            <Button type="submit" className="w-full h-12 bg-gray-800 hover:bg-gray-900 rounded-lg">
              Salvar novo produto
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
