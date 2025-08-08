"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MarketerBottomNavigation } from "@/components/ui/bottom-navigation"

export default function AccountPage() {
  const [formData, setFormData] = useState({
    nome: "Marcela",
    sobrenome: "Silva Ribeiro",
    celular: "(81)xxxx-xxxx",
    dataNascimento: "08/03/1999",
    cpf: "xxx.xxx.xxx-xx",
    endereco: "Feira de Casa Amarela",
    email: "Marcela.SB@gmail.com"
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Account updated:", formData)
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
          <h1 className="text-xl font-bold">Minha Conta</h1>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="nome" className="text-base font-medium">Nome</Label>
            <Input
              id="nome"
              value={formData.nome}
              onChange={(e) => setFormData(prev => ({ ...prev, nome: e.target.value }))}
              className="mt-2 h-12 border-gray-300 rounded-lg"
            />
          </div>
          
          <div>
            <Label htmlFor="sobrenome" className="text-base font-medium">Sobrenome</Label>
            <Input
              id="sobrenome"
              value={formData.sobrenome}
              onChange={(e) => setFormData(prev => ({ ...prev, sobrenome: e.target.value }))}
              className="mt-2 h-12 border-gray-300 rounded-lg"
            />
          </div>
          
          <div>
            <Label htmlFor="celular" className="text-base font-medium">Celular</Label>
            <Input
              id="celular"
              value={formData.celular}
              onChange={(e) => setFormData(prev => ({ ...prev, celular: e.target.value }))}
              className="mt-2 h-12 border-gray-300 rounded-lg"
            />
          </div>
          
          <div>
            <Label htmlFor="dataNascimento" className="text-base font-medium">Data de Nascimento</Label>
            <Input
              id="dataNascimento"
              value={formData.dataNascimento}
              onChange={(e) => setFormData(prev => ({ ...prev, dataNascimento: e.target.value }))}
              className="mt-2 h-12 border-gray-300 rounded-lg"
            />
          </div>
          
          <div>
            <Label htmlFor="cpf" className="text-base font-medium">CPF</Label>
            <Input
              id="cpf"
              value={formData.cpf}
              onChange={(e) => setFormData(prev => ({ ...prev, cpf: e.target.value }))}
              className="mt-2 h-12 border-gray-300 rounded-lg"
            />
          </div>
          
          <div>
            <Label htmlFor="endereco" className="text-base font-medium">Endereços</Label>
            <Input
              id="endereco"
              value={formData.endereco}
              onChange={(e) => setFormData(prev => ({ ...prev, endereco: e.target.value }))}
              className="mt-2 h-12 border-gray-300 rounded-lg"
            />
          </div>
          
          <div>
            <Label htmlFor="email" className="text-base font-medium">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="mt-2 h-12 border-gray-300 rounded-lg"
            />
          </div>
          
          <div className="pt-6">
            <Button type="submit" className="w-full h-12 bg-gray-800 hover:bg-gray-900 rounded-lg">
              Atualizar
            </Button>
          </div>
        </form>
      </div>
      
      <MarketerBottomNavigation />
    </div>
  )
}
