"use client"

import { useState, useEffect } from "react"
import { Camera, Package, Plus, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Product } from "@/lib/api/types"
import { toast } from "sonner"

interface ProductModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (product: Partial<Product>) => void
  product?: Product | null
  feiranteId: string
  feiranteName: string
}

export function ProductModal({ 
  isOpen, 
  onClose, 
  onSave, 
  product = null, 
  feiranteId, 
  feiranteName 
}: ProductModalProps) {
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
    image: "/placeholder.jpg"
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

  // Carregar dados do produto para edição
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        description: product.description || "",
        category: product.category || "",
        price: product.price ? `R$ ${product.price.toFixed(2).replace('.', ',')}` : "",
        unitType: (product as any).unitType || "unidade",
        stock: product.stock?.toString() || "",
        allowWeightSelection: (product as any).allowWeightSelection || false,
        minWeight: (product as any).minWeight?.toString() || "",
        maxWeight: (product as any).maxWeight?.toString() || "",
        weightIncrement: (product as any).weightIncrement?.toString() || "",
        image: product.image || "/placeholder.jpg"
      })
      setVariations((product as any).variations || [])
    } else {
      // Reset para adicionar novo produto
      setFormData({
        name: "",
        description: "",
        category: "",
        price: "",
        unitType: "unidade",
        stock: "",
        allowWeightSelection: false,
        minWeight: "",
        maxWeight: "",
        weightIncrement: "",
        image: "/placeholder.jpg"
      })
      setVariations([])
    }
  }, [product, isOpen])

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

  const formatPrice = (value: string) => {
    const numbers = value.replace(/[^0-9]/g, '')
    
    if (numbers.length === 0) return ""
    if (numbers.length === 1) return `R$ 0,0${numbers}`
    if (numbers.length === 2) return `R$ 0,${numbers}`
    
    const cents = numbers.slice(-2)
    const reais = numbers.slice(0, -2)
    return `R$ ${reais},${cents}`
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const productData = {
        id: product?.id, // Para edição, manter o ID
        name: formData.name,
        description: formData.description,
        category: formData.category,
        price: parseFloat(formData.price.replace(/[^0-9.,]/g, '').replace(',', '.')),
        unit: getUnitLabel(formData.unitType),
        unitType: formData.unitType,
        stock: isWeightUnit(formData.unitType) ? 
          parseFloat(formData.stock) : 
          parseInt(formData.stock),
        image: formData.image,
        feiranteId: product?.feiranteId || feiranteId, // Manter o feiranteId original se for edição
        feiranteName: (product as any)?.feiranteName || feiranteName,
        isAvailable: product?.isAvailable ?? true,
        allowWeightSelection: formData.allowWeightSelection,
        minWeight: formData.minWeight ? parseFloat(formData.minWeight) : undefined,
        maxWeight: formData.maxWeight ? parseFloat(formData.maxWeight) : undefined,
        weightIncrement: formData.weightIncrement ? parseFloat(formData.weightIncrement) : undefined,
        variations: variations.length > 0 ? variations : undefined,
        // Manter campos essenciais para edição
        createdAt: (product as any)?.createdAt,
        updatedAt: new Date().toISOString()
      }

      console.log('💾 Saving product data:', productData)

      await onSave(productData)
      
      toast.success(product ? "Produto atualizado com sucesso!" : "Produto adicionado com sucesso!")
      
      // Reset form data
      setFormData({
        name: "",
        description: "",
        category: "",
        price: "",
        unitType: "unidade",
        stock: "",
        allowWeightSelection: false,
        minWeight: "",
        maxWeight: "",
        weightIncrement: "",
        image: "/placeholder.jpg"
      })
      setVariations([])
      
      // Close modal will be handled by parent component
    } catch (error) {
      console.error('Error saving product:', error)
      toast.error("Erro ao salvar produto")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm w-[90%] max-h-[85vh] flex flex-col p-0 rounded-2xl fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <DialogTitle className="text-xl font-semibold text-gray-900">
            {product ? "Editar Produto" : "Adicionar Produto"}
          </DialogTitle>
        </div>

        <div className="flex-1 px-6 py-4 overflow-y-auto">
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
                <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
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
                  <Select value={formData.unitType} onValueChange={(value: any) => {
                    setFormData(prev => ({ 
                      ...prev, 
                      unitType: value,
                      allowWeightSelection: isWeightUnit(value)
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
              </div>

              {/* Weight Selection Options */}
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

              <div className="space-y-3 border-t pt-4">
                <Label className="text-sm font-medium">Adicionar nova variação:</Label>
                <div className="space-y-3">
                  <Input
                    placeholder="Nome da variação (ex: Mais verde, Mais maduro)"
                    value={newVariation.name}
                    onChange={(e) => setNewVariation(prev => ({ ...prev, name: e.target.value }))}
                  />
                  <Input
                    placeholder="Descrição (opcional)"
                    value={newVariation.description}
                    onChange={(e) => setNewVariation(prev => ({ ...prev, description: e.target.value }))}
                  />
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
            </CardContent>
          </Card>

          {/* Buttons */}
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1 h-12" onClick={onClose}>
              Cancelar
            </Button>
            <Button 
              type="submit" 
              className="flex-1 h-12 bg-orange-500 hover:bg-orange-600 text-white"
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
                  {product ? "Salvar Alterações" : "Adicionar Produto"}
                </>
              )}
            </Button>
          </div>
        </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
