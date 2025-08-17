"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Plus, Minus, X } from "lucide-react"
import { Product } from "@/app/Client/types"

interface ProductVariationModalProps {
  isOpen: boolean
  onClose: () => void
  product: Product | null
  onConfirm: (variation: string, quantity: number, observation: string) => void
  feirante?: { id: string; name: string }
  initialVariation?: string
  initialQuantity?: number
  initialObservation?: string
}

export default function ProductVariationModal({
  isOpen,
  onClose,
  product,
  onConfirm,
  feirante,
  initialVariation = "",
  initialQuantity = 1,
  initialObservation = ""
}: ProductVariationModalProps) {
  const [selectedVariation, setSelectedVariation] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [observation, setObservation] = useState("")

  // Reset states when modal opens/closes
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setSelectedVariation("")
      setQuantity(1)
      setObservation("")
      onClose()
    }
  }

  // Set default variation when product changes or modal opens
  useEffect(() => {
    if (isOpen && product) {
      console.log('🔧 Modal configurando valores iniciais:', {
        product: product.name,
        initialVariation,
        initialQuantity,
        initialObservation
      })
      
      // Use initial values if provided, otherwise use defaults
      if (initialVariation && product.variations?.some(v => v.name === initialVariation)) {
        setSelectedVariation(initialVariation)
      } else if (product.variations && product.variations.length > 0) {
        setSelectedVariation(product.variations[0].name)
      } else {
        setSelectedVariation("")
      }
      
      setQuantity(initialQuantity)
      setObservation(initialObservation)
    }
  }, [product, isOpen, initialVariation, initialQuantity, initialObservation])

  const handleConfirm = () => {
    if (!product) return
    
    const finalVariation = product.variations && product.variations.length > 0 ? selectedVariation : ""
    
    console.log('Modal confirmando adição:', {
      product: product.name,
      variation: finalVariation,
      quantity,
      observation,
      calculatedPrice: getCalculatedPrice()
    })
    
    onConfirm(finalVariation, quantity, observation)
    handleOpenChange(false)
  }

  const getQuantityLabel = () => {
    if (!product) return ""
    
    // Usar unitType se existir, senão usar unit como fallback
    const type = product.unitType || (product.unit === "kg" ? "kg" : "unidade")
    
    switch (type) {
      case "kg":
        return `${(quantity * 0.25).toFixed(2)}kg`
      case "unidade":
        return `${quantity} unidade${quantity > 1 ? "s" : ""}`
      case "maco":
        return `${quantity} maço${quantity > 1 ? "s" : ""}`
      case "mao":
        return `${quantity} mão${quantity > 1 ? "s" : ""}`
      case "bandeja":
        return `${quantity} bandeja${quantity > 1 ? "s" : ""}`
      default:
        return `${quantity}`
    }
  }

  const getCalculatedPrice = () => {
    if (!product) return 0
    
    // Usar unitType se existir, senão usar unit como fallback
    const type = product.unitType || (product.unit === "kg" ? "kg" : "unidade")
    
    // Para produtos por kg, calcular preço baseado no peso selecionado
    if (type === "kg") {
      const weightInKg = quantity * 0.25
      return product.price * weightInKg
    }
    
    // Para outros produtos, o preço é por unidade
    return product.price * quantity
  }

  const getMaxQuantity = () => {
    if (!product) return 10
    
    // Usar unitType se existir, senão usar unit como fallback
    const type = product.unitType || (product.unit === "kg" ? "kg" : "unidade")
    
    switch (type) {
      case "kg":
        return 20 // 5kg (20 x 0.25kg)
      default:
        return 10
    }
  }

  const getMinQuantity = () => {
    return 1
  }

  if (!product) return null

  if (!product) return null

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50"
        onClick={() => handleOpenChange(false)}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-xl p-5 mx-4 max-h-[85vh] overflow-y-auto shadow-xl w-full max-w-sm">
        {/* Close button */}
        <button
          onClick={() => handleOpenChange(false)}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>

        {/* Header */}
        <div className="mb-4">
          <h2 className="text-lg font-bold text-gray-900 pr-8">
            {product.name}
          </h2>
        </div>
        
        <div className="space-y-4">
          {/* Tipo de unidade */}
          <div>
            <Badge variant="outline" className="mb-2 px-2 py-1 text-xs border-orange-200 text-orange-600 bg-orange-50 rounded-full">
              {(() => {
                const type = product.unitType || (product.unit === "kg" ? "kg" : "unidade")
                switch (type) {
                  case "kg": return "Produto por kg"
                  case "unidade": return "Produto por unidade"
                  case "maco": return "Produto por maço"
                  case "mao": return "Produto por mão/mói"
                  case "bandeja": return "Produto por bandeja"
                  default: return "Produto"
                }
              })()}
            </Badge>
          </div>

          {/* Variações (se houver) */}
          {product.variations && product.variations.length > 0 && (
            <div className="bg-gray-50 rounded-lg p-3">
              <Label className="text-xs font-semibold mb-2 block text-gray-900">
                Escolha uma opção:
              </Label>
              <RadioGroup value={selectedVariation} onValueChange={setSelectedVariation} className="space-y-1">
                {product.variations.map((variation, index) => (
                  <div key={index} className="flex items-center space-x-2 p-2 rounded-md hover:bg-white transition-colors">
                    <RadioGroupItem 
                      value={variation.name} 
                      id={`variation-${index}`} 
                      className="border-orange-300 text-orange-500 focus:ring-orange-500 h-4 w-4" 
                    />
                    <Label htmlFor={`variation-${index}`} className="text-xs font-medium text-gray-700 cursor-pointer flex-1">
                      {variation.name}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}

          {/* Seleção de quantidade */}
          <div className="bg-gray-50 rounded-lg p-3">
            <Label className="text-xs font-semibold mb-2 block text-gray-900">
              Quantidade:
            </Label>
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.max(getMinQuantity(), quantity - 1))}
                  disabled={quantity <= getMinQuantity()}
                  className="w-8 h-8 rounded-full p-0 border-orange-300 text-orange-600 hover:bg-orange-50 hover:border-orange-400 disabled:opacity-30"
                >
                  <Minus className="w-3 h-3" />
                </Button>
                
                <span className="text-sm font-bold min-w-[80px] text-center text-gray-900">
                  {getQuantityLabel()}
                </span>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.min(getMaxQuantity(), quantity + 1))}
                  disabled={quantity >= getMaxQuantity()}
                  className="w-8 h-8 rounded-full p-0 border-orange-300 text-orange-600 hover:bg-orange-50 hover:border-orange-400 disabled:opacity-30"
                >
                  <Plus className="w-3 h-3" />
                </Button>
              </div>
              
              <div className="text-right min-w-[60px]">
                <div className="text-lg font-bold text-orange-600">
                  R$ {getCalculatedPrice().toFixed(2)}
                </div>
                {(() => {
                  const type = product.unitType || (product.unit === "kg" ? "kg" : "unidade")
                  return type === "kg" && (
                    <div className="text-[10px] text-gray-500">
                      {quantity} x 250g
                    </div>
                  )
                })()}
              </div>
            </div>
            
            {(() => {
              const type = product.unitType || (product.unit === "kg" ? "kg" : "unidade")
              return type === "kg" && (
                <p className="text-[10px] text-gray-500 mt-2 text-center">
                  Selecione de 250g em 250g
                </p>
              )
            })()}
          </div>

          {/* Observações */}
          <div>
            <Label className="text-xs font-semibold mb-2 block text-gray-900">
              Observações (opcional):
            </Label>
            <Textarea
              placeholder="Alguma preferência específica..."
              value={observation}
              onChange={(e) => setObservation(e.target.value)}
              className="bg-white border-gray-200 rounded-lg resize-none focus:border-orange-300 focus:ring-orange-200 transition-colors px-3 py-2 text-sm"
              rows={2}
            />
          </div>

          {/* Botão de confirmar */}
          <Button 
            onClick={handleConfirm} 
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2.5 rounded-lg font-semibold text-sm transition-colors shadow-sm"
            disabled={product.variations && product.variations.length > 0 && !selectedVariation}
          >
            Adicionar à feira
          </Button>
        </div>
      </div>
    </div>
  )
}
