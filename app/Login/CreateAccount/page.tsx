"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function CreateUserPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    cpfCnpj: "",
    birthDate: "",
    marketRegistration: "",
    market: "",
    marketRegistrationBank: "",
    bankName: "",
    bankNumber: ""
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="px-4 py-6 pb-24">
        <h1 className="text-xl font-bold text-center mb-8">Crie sua conta</h1>
        
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-4">Dados pessoais</h2>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="fullName" className="text-sm font-medium">Nome completo</Label>
                <Input
                  id="fullName"
                  placeholder="xxxxxx xxxx xxxxxx"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  className="mt-1 border-gray-300 rounded-lg"
                />
              </div>
              
              <div>
                <Label htmlFor="phone" className="text-sm font-medium">Telefone</Label>
                <Input
                  id="phone"
                  placeholder="(81) xxxxx-xxxx"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="mt-1 border-gray-300 rounded-lg"
                />
              </div>
              
              <div>
                <Label htmlFor="email" className="text-sm font-medium">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="xxxxxxxxxxxx@gmail.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="mt-1 border-gray-300 rounded-lg"
                />
              </div>
              
              <div>
                <Label htmlFor="cpfCnpj" className="text-sm font-medium">CPF/CNPJ</Label>
                <Input
                  id="cpfCnpj"
                  placeholder="999.999.999-99"
                  value={formData.cpfCnpj}
                  onChange={(e) => handleInputChange("cpfCnpj", e.target.value)}
                  className="mt-1 border-gray-300 rounded-lg"
                />
              </div>
              
              <div>
                <Label htmlFor="birthDate" className="text-sm font-medium">Data de nascimento</Label>
                <Input
                  id="birthDate"
                  placeholder="xx/xx/xxxx"
                  value={formData.birthDate}
                  onChange={(e) => handleInputChange("birthDate", e.target.value)}
                  className="mt-1 border-gray-300 rounded-lg"
                />
              </div>
              
              <div>
                <Label htmlFor="marketRegistration" className="text-sm font-medium">Nº de cadastro no mercado</Label>
                <Input
                  id="marketRegistration"
                  placeholder="xxxxxx"
                  value={formData.marketRegistration}
                  onChange={(e) => handleInputChange("marketRegistration", e.target.value)}
                  className="mt-1 border-gray-300 rounded-lg"
                />
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-lg font-semibold mb-4">Dados da sua banca</h2>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="market" className="text-sm font-medium">Mercado</Label>
                <Input
                  id="market"
                  placeholder="Mercado de Casa Amarela"
                  value={formData.market}
                  onChange={(e) => handleInputChange("market", e.target.value)}
                  className="mt-1 border-gray-300 rounded-lg"
                />
              </div>
              
              <div>
                <Label htmlFor="marketRegistrationBank" className="text-sm font-medium">Nº de cadastro no mercado</Label>
                <Input
                  id="marketRegistrationBank"
                  placeholder="xxxxxx"
                  value={formData.marketRegistrationBank}
                  onChange={(e) => handleInputChange("marketRegistrationBank", e.target.value)}
                  className="mt-1 border-gray-300 rounded-lg"
                />
              </div>
              
              <div>
                <Label htmlFor="bankName" className="text-sm font-medium">Nome da banca</Label>
                <Input
                  id="bankName"
                  placeholder="xxxxxx"
                  value={formData.bankName}
                  onChange={(e) => handleInputChange("bankName", e.target.value)}
                  className="mt-1 border-gray-300 rounded-lg"
                />
              </div>
              
              <div>
                <Label htmlFor="bankNumber" className="text-sm font-medium">Número da banca</Label>
                <Input
                  id="bankNumber"
                  placeholder="xxxxxx"
                  value={formData.bankNumber}
                  onChange={(e) => handleInputChange("bankNumber", e.target.value)}
                  className="mt-1 border-gray-300 rounded-lg"
                />
              </div>
            </div>
          </div>
          
          <div className="pt-6">
            <Button className="w-full h-12 bg-gray-800 hover:bg-gray-900 rounded-lg">
              Criar conta
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
