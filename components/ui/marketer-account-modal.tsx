"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Store, Phone, Mail, MapPin, Calendar, Camera, Save, Edit } from "lucide-react"

interface MarketerAccountModalProps {
  isOpen: boolean
  onClose: () => void
}

export function MarketerAccountModal({ isOpen, onClose }: MarketerAccountModalProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: "João Silva",
    email: "joao.feira@email.com",
    phone: "(81) 98888-8888",
    cpf: "987.654.321-00",
    storeName: "João da Horta",
    storeDescription: "Especialista em verduras orgânicas há mais de 20 anos. Cultivo próprio sem agrotóxicos, direto da fazenda para sua mesa.",
    address: "Feira de Casa Amarela",
    neighborhood: "Casa Amarela",
    city: "Recife",
    state: "PE",
    zipCode: "52070-000",
    bankAccount: "Banco do Brasil - Ag: 3456-7 / CC: 67890-1",
    profileImage: "https://media.gettyimages.com/id/1369521370/pt/foto/portrait-of-a-seller-at-a-street-market.jpg?s=612x612&w=0&k=20&c=69d5S9_4FICYD7PlYYxhpLhPU7gt-isY9mEE21theoM="
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSave = () => {
    // Aqui você salvaria os dados
    console.log("Dados salvos:", formData)
    setIsEditing(false)
    // Feedback visual seria bom aqui
  }

  const handleCancel = () => {
    // Reverter mudanças se necessário
    setIsEditing(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm w-[90%] h-[80vh] flex flex-col p-0 rounded-2xl fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <DialogHeader className="px-4 py-4 border-b bg-white rounded-t-2xl">
          <DialogTitle className="text-lg font-semibold flex items-center gap-2">
            <User className="h-5 w-5 text-orange-600" />
            Informações da Conta
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 px-4 py-4 overflow-y-auto bg-gray-50">
          <div className="space-y-4">
          {/* Personal Information */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <User className="h-4 w-4 text-orange-600" />
                Informações Pessoais
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 px-4">
              <div className="grid grid-cols-1 gap-3">
                <div>
                  <Label htmlFor="name" className="text-sm">Nome Completo</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    disabled={!isEditing}
                    className={!isEditing ? "bg-gray-50 text-sm" : "text-sm"}
                  />
                </div>
                
                <div>
                  <Label htmlFor="email" className="text-sm">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    disabled={!isEditing}
                    className={!isEditing ? "bg-gray-50" : ""}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Telefone</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      disabled={!isEditing}
                      className={!isEditing ? "bg-gray-50" : ""}
                    />
                  </div>
                  <div>
                    <Label htmlFor="cpf">CPF</Label>
                    <Input
                      id="cpf"
                      value={formData.cpf}
                      disabled={true}
                      className="bg-gray-50"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Store Information */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-base flex items-center gap-2">
                <Store className="h-4 w-4 text-orange-600" />
                Informações da Loja
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 px-6">
              <div>
                <Label htmlFor="storeName">Nome da Loja</Label>
                <Input
                  id="storeName"
                  value={formData.storeName}
                  onChange={(e) => handleInputChange('storeName', e.target.value)}
                  disabled={!isEditing}
                  className={!isEditing ? "bg-gray-50" : ""}
                />
              </div>
              
              <div>
                <Label htmlFor="storeDescription">Descrição da Loja</Label>
                <textarea
                  id="storeDescription"
                  value={formData.storeDescription}
                  onChange={(e) => handleInputChange('storeDescription', e.target.value)}
                  disabled={!isEditing}
                  className={`w-full p-2 border border-gray-200 rounded-md resize-none h-20 ${!isEditing ? "bg-gray-50" : ""}`}
                  maxLength={200}
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formData.storeDescription.length}/200 caracteres
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Address Information */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-base flex items-center gap-2">
                <MapPin className="h-4 w-4 text-orange-600" />
                Endereço da Loja
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 px-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Label htmlFor="address">Endereço</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    disabled={!isEditing}
                    className={!isEditing ? "bg-gray-50" : ""}
                  />
                </div>
                
                <div>
                  <Label htmlFor="neighborhood">Bairro</Label>
                  <Input
                    id="neighborhood"
                    value={formData.neighborhood}
                    onChange={(e) => handleInputChange('neighborhood', e.target.value)}
                    disabled={!isEditing}
                    className={!isEditing ? "bg-gray-50" : ""}
                  />
                </div>
                
                <div>
                  <Label htmlFor="zipCode">CEP</Label>
                  <Input
                    id="zipCode"
                    value={formData.zipCode}
                    onChange={(e) => handleInputChange('zipCode', e.target.value)}
                    disabled={!isEditing}
                    className={!isEditing ? "bg-gray-50" : ""}
                  />
                </div>
                
                <div>
                  <Label htmlFor="city">Cidade</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    disabled={!isEditing}
                    className={!isEditing ? "bg-gray-50" : ""}
                  />
                </div>
                
                <div>
                  <Label htmlFor="state">Estado</Label>
                  <Input
                    id="state"
                    value={formData.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    disabled={!isEditing}
                    className={!isEditing ? "bg-gray-50" : ""}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bank Information */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Dados Bancários</CardTitle>
              <CardDescription className="text-sm">Para recebimento dos pagamentos</CardDescription>
            </CardHeader>
            <CardContent className="px-4">
              <div>
                <Label htmlFor="bankAccount" className="text-sm">Conta Bancária</Label>
                <Input
                  id="bankAccount"
                  value={formData.bankAccount}
                  onChange={(e) => handleInputChange('bankAccount', e.target.value)}
                  disabled={!isEditing}
                  className={!isEditing ? "bg-gray-50 text-sm" : "text-sm"}
                  placeholder="Banco - Agência / Conta"
                />
              </div>
            </CardContent>
          </Card>
          </div>
        </div>

        {/* Footer com botões */}
        <div className="px-4 py-3 border-t bg-white rounded-b-2xl">
          <div className="flex gap-2">
            {!isEditing ? (
              <Button
                onClick={() => setIsEditing(true)}
                className="flex-1 bg-orange-600 hover:bg-orange-700 text-white"
              >
                <Edit className="h-4 w-4 mr-2" />
                Editar
              </Button>
            ) : (
              <>
                <Button
                  onClick={handleCancel}
                  variant="outline"
                  className="flex-1 border-gray-300"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleSave}
                  className="flex-1 bg-orange-600 hover:bg-orange-700 text-white"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Salvar
                </Button>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
