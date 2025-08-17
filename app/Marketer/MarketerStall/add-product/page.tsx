"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronLeft, Camera, Package, Plus, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useMarketer } from "@/hooks/api/useMarketer"
import { toast } from "sonner"

export default function MarketerAddProductPage() {
  const router = useRouter()
  const { addProduct } = useMarketer("1") // Mock feirante ID
  const [isLoading, setIsLoading] = useState(false)
  const [variations, setVariations] = useState<Array<{id: string, name: string, description: string}>>([])
  const [newVariation, setNewVariation] = useState({ name: "", description: "" })
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    unitType: "unidade" as 'kg' | 'unidade' | 'maco' | 'mao' | 'bandeja' | 'cabeca',
    stock: "",
    allowWeightSelection: false,
    minWeight: "",
    maxWeight: "",
    weightIncrement: "",
    image: "/placeholder.jpg" // Mock image path
  })

  const categories = [
    "Frutas",
    "Verduras", 
    "Legumes",
    "Temperos",
    "Raízes",
    "Folhosos",
    "Outros"
  ]

  const unitTypes = [
    { value: "kg", label: "Quilograma (kg)", isWeight: true },
    { value: "unidade", label: "Unidade", isWeight: false },
    { value: "maco", label: "Maço", isWeight: false },
    { value: "mao", label: "Mão/Molho", isWeight: false },
    { value: "bandeja", label: "Bandeja", isWeight: false },
    { value: "cabeca", label: "Cabeça", isWeight: false }
  ]

  const getUnitLabel = (unitType: string) => {
    const unit = unitTypes.find(u => u.value === unitType)
    return unit ? unit.label : unitType
  }

  const isWeightUnit = (unitType: string) => {
    const unit = unitTypes.find(u => u.value === unitType)
    return unit ? unit.isWeight : false
  }

  const addVariation = () => {
    if (newVariation.name.trim()) {
      const variation = {
        id: `var-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name: newVariation.name.trim(),
        description: newVariation.description.trim()
      }
      setVariations([...variations, variation])
      setNewVariation({ name: "", description: "" })
    }
  }

  const removeVariation = (id: string) => {
    setVariations(variations.filter(v => v.id !== id))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const productData = {
        name: formData.name,
        description: formData.description,
        category: formData.category,
        price: parseFloat(formData.price.replace(/[^0-9.,]/g, '').replace(',', '.')),
        unit: getUnitLabel(formData.unitType), // Gerar unidade baseada no tipo
        unitType: formData.unitType,
        stock: isWeightUnit(formData.unitType) ? 
          parseFloat(formData.stock) : // Para kg, permite decimais
          parseInt(formData.stock), // Para unidades, apenas inteiros
        image: formData.image,
        feiranteId: "1", // Mock feirante ID
        feiranteName: "João Silva", // Mock feirante name
        isAvailable: true,
        allowWeightSelection: formData.allowWeightSelection,
        minWeight: formData.minWeight ? parseFloat(formData.minWeight) : undefined,
        maxWeight: formData.maxWeight ? parseFloat(formData.maxWeight) : undefined,
        weightIncrement: formData.weightIncrement ? parseFloat(formData.weightIncrement) : undefined,
        variations: variations.length > 0 ? variations : undefined
      }

      await addProduct(productData)
      
      toast.success("Produto adicionado com sucesso!")
      router.push('/Marketer/MarketerStall/products')
    } catch (error) {
      console.error('Error adding product:', error)
      toast.error("Erro ao adicionar produto")
    } finally {
      setIsLoading(false)
    }
  }

  const formatPrice = (value: string) => {
    // Remove tudo exceto números
    const numbers = value.replace(/[^0-9]/g, '')
    
    // Adiciona a formatação de moeda
    if (numbers.length === 0) return ""
    if (numbers.length === 1) return `R$ 0,0${numbers}`
    if (numbers.length === 2) return `R$ 0,${numbers}`
    
    const cents = numbers.slice(-2)
    const reais = numbers.slice(0, -2)
    return `R$ ${reais},${cents}`
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white shadow-sm border-b px-4 py-4">
        <div className="flex items-center">
          <Link href="/Marketer/MarketerStall">
            <Button variant="ghost" size="icon" className="mr-2">
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">Adicionar Produto</h1>
        </div>
      </div>

      <div className="p-4">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Image */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Imagem do Produto</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
                <div className="text-center">
                  <Camera className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">Adicionar foto</p>
                  <p className="text-xs text-gray-400">Toque para selecionar</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Informações Básicas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-sm font-medium">Nome do produto *</Label>
                <Input
                  id="name"
                  placeholder="Ex: Tomate Cereja"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="mt-1"
                  required
                />
              </div>

              <div>
                <Label htmlFor="category" className="text-sm font-medium">Categoria *</Label>
                <Select onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="description" className="text-sm font-medium">Descrição</Label>
                <Textarea
                  id="description"
                  placeholder="Descreva as características do produto..."
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="mt-1 min-h-[80px] resize-none"
                />
              </div>
            </CardContent>
          </Card>

          {/* Pricing & Measurement */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Preço e Medidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price" className="text-sm font-medium">Preço *</Label>
                  <Input
                    id="price"
                    placeholder="R$ 0,00"
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: formatPrice(e.target.value) }))}
                    className="mt-1"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="unitType" className="text-sm font-medium">Tipo de Unidade *</Label>
                  <Select onValueChange={(value: any) => {
                    setFormData(prev => ({ 
                      ...prev, 
                      unitType: value,
                      allowWeightSelection: isWeightUnit(value) // Auto-enable para kg
                    }))
                  }}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      {unitTypes.map(unit => (
                        <SelectItem key={unit.value} value={unit.value}>
                          {unit.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="stock" className="text-sm font-medium">
                  Estoque * {isWeightUnit(formData.unitType) ? "(em kg)" : "(quantidade)"}
                </Label>
                <Input
                  id="stock"
                  type="number"
                  step={isWeightUnit(formData.unitType) ? "0.1" : "1"}
                  min="0"
                  placeholder={isWeightUnit(formData.unitType) ? "0.0" : "0"}
                  value={formData.stock}
                  onChange={(e) => setFormData(prev => ({ ...prev, stock: e.target.value }))}
                  className="mt-1"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  {isWeightUnit(formData.unitType) ? 
                    "Informe a quantidade em quilogramas disponível" : 
                    "Informe a quantidade de unidades disponível"
                  }
                </p>
              </div>

              {/* Weight Selection Options - Only for kg */}
              {isWeightUnit(formData.unitType) && (
                <div className="space-y-4 border-t pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium">Permitir seleção de peso personalizada</Label>
                      <p className="text-xs text-gray-500">Cliente pode escolher o peso desejado</p>
                    </div>
                    <Switch
                      checked={formData.allowWeightSelection}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, allowWeightSelection: checked }))}
                    />
                  </div>

                  {formData.allowWeightSelection && (
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="minWeight" className="text-sm font-medium">Peso mínimo (kg)</Label>
                        <Input
                          id="minWeight"
                          type="number"
                          step="0.1"
                          placeholder="0.5"
                          value={formData.minWeight}
                          onChange={(e) => setFormData(prev => ({ ...prev, minWeight: e.target.value }))}
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="maxWeight" className="text-sm font-medium">Peso máximo (kg)</Label>
                        <Input
                          id="maxWeight"
                          type="number"
                          step="0.1"
                          placeholder="5.0"
                          value={formData.maxWeight}
                          onChange={(e) => setFormData(prev => ({ ...prev, maxWeight: e.target.value }))}
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="weightIncrement" className="text-sm font-medium">Incremento (kg)</Label>
                        <Input
                          id="weightIncrement"
                          type="number"
                          step="0.1"
                          placeholder="0.1"
                          value={formData.weightIncrement}
                          onChange={(e) => setFormData(prev => ({ ...prev, weightIncrement: e.target.value }))}
                          className="mt-1"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Product Variations */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Variações do Produto</CardTitle>
              <p className="text-sm text-gray-500">
                Adicione variações como "Tomate mais verde", "Tomate mais maduro", etc.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Existing Variations */}
              {variations.length > 0 && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Variações adicionadas:</Label>
                  <div className="space-y-2">
                    {variations.map((variation) => (
                      <div key={variation.id} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium text-sm">{variation.name}</p>
                          {variation.description && (
                            <p className="text-xs text-gray-500">{variation.description}</p>
                          )}
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeVariation(variation.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Add New Variation */}
              <div className="space-y-3 border-t pt-4">
                <Label className="text-sm font-medium">Adicionar nova variação:</Label>
                <div className="space-y-3">
                  <div>
                    <Input
                      placeholder="Nome da variação (ex: Mais verde, Mais maduro)"
                      value={newVariation.name}
                      onChange={(e) => setNewVariation(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Input
                      placeholder="Descrição (opcional)"
                      value={newVariation.description}
                      onChange={(e) => setNewVariation(prev => ({ ...prev, description: e.target.value }))}
                    />
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addVariation}
                    disabled={!newVariation.name.trim()}
                    className="w-full"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar Variação
                  </Button>
                </div>
              </div>

              {variations.length === 0 && (
                <div className="text-center py-6 text-gray-500">
                  <Package className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                  <p className="text-sm">Nenhuma variação adicionada</p>
                  <p className="text-xs">As variações são opcionais</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="space-y-4">
            <Button 
              type="submit" 
              className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Salvando...
                </div>
              ) : (
                <>
                  <Package className="w-5 h-5 mr-2" />
                  Adicionar Produto
                </>
              )}
            </Button>

            <Link href="/Marketer/MarketerStall">
              <Button variant="outline" className="w-full h-12">
                Cancelar
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
