"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Minus, Plus } from "lucide-react"
import { Product, ProductVariation } from "@/app/Client/types"

interface ProductAddModalProps {
  product: Product
  isOpen: boolean
  onClose: () => void
  onConfirm: (data: {
    selectedVariation?: string
    selectedWeight?: number
    observation: string
    quantity: number
  }) => void
}

const getUnitDisplayName = (unitType?: string) => {
  const unitNames: Record<string, string> = {
    'kg': 'Produtos por kg',
    'unidade': 'Produtos por unidade',
    'maco': 'Produtos por maço',
    'mao': 'Produtos por mão/mói',
    'bandeja': 'Produtos por bandeja'
  }
  return unitNames[unitType || ''] || 'Produtos'
}

const generateWeightOptions = (min: number, max: number, increment: number) => {
  const options = []
  for (let weight = min; weight <= max; weight += increment) {
    options.push(weight)
  }
  return options
}

export function ProductAddModal({ product, isOpen, onClose, onConfirm }: ProductAddModalProps) {
  const [selectedVariation, setSelectedVariation] = useState<string>('')
  const [selectedWeight, setSelectedWeight] = useState<number>(product.minWeight || 1)
  const [observation, setObservation] = useState('')
  const [quantity, setQuantity] = useState(1)

  const handleConfirm = () => {
    onConfirm({
      selectedVariation: selectedVariation || undefined,
      selectedWeight: product.allowWeightSelection ? selectedWeight : undefined,
      observation,
      quantity
    })
    
    // Reset form
    setSelectedVariation('')
    setSelectedWeight(product.minWeight || 1)
    setObservation('')
    setQuantity(1)
  }

  const handleClose = () => {
    onClose()
    // Reset form
    setSelectedVariation('')
    setSelectedWeight(product.minWeight || 1)
    setObservation('')
    setQuantity(1)
  }

  const weightOptions = product.allowWeightSelection && product.minWeight && product.maxWeight && product.weightIncrement
    ? generateWeightOptions(product.minWeight, product.maxWeight, product.weightIncrement)
    : []

  const calculatePrice = () => {
    let basePrice = product.price
    if (product.allowWeightSelection && selectedWeight) {
      basePrice = product.price * selectedWeight
    }
    return basePrice * quantity
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md mx-auto max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-left">
            Adicionar à feira
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Product Info */}
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.style.display = 'none'
                  target.parentElement!.classList.add('flex', 'items-center', 'justify-center', 'text-lg')
                  target.parentElement!.innerHTML = '📦'
                }}
              />
            </div>
            <div className="flex-1">
              <h3 className="font-medium">{product.name}</h3>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Badge variant="outline" className="text-xs">
                  {getUnitDisplayName(product.unitType)}
                </Badge>
                <span>R$ {product.price.toFixed(2)}/{product.unit}</span>
              </div>
            </div>
          </div>

          {/* Variations */}
          {product.variations && product.variations.length > 0 && (
            <div>
              <Label className="text-base font-medium mb-3 block">
                Escolha uma variação:
              </Label>
              <RadioGroup value={selectedVariation} onValueChange={setSelectedVariation}>
                <div className="space-y-2">
                  {product.variations.map((variation: ProductVariation) => (
                    <div key={variation.id} className="flex items-start space-x-2 p-3 rounded-lg border hover:bg-gray-50 cursor-pointer">
                      <RadioGroupItem value={variation.id} id={variation.id} className="mt-1" />
                      <div className="flex-1 cursor-pointer" onClick={() => setSelectedVariation(variation.id)}>
                        <Label htmlFor={variation.id} className="font-medium cursor-pointer">
                          {variation.name}
                        </Label>
                        {variation.description && (
                          <p className="text-sm text-gray-600 mt-1">{variation.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>
          )}

          {/* Weight Selection */}
          {product.allowWeightSelection && weightOptions.length > 0 && (
            <div>
              <Label className="text-base font-medium mb-3 block">
                Selecione o peso:
              </Label>
              <div className="grid grid-cols-4 gap-2">
                {weightOptions.map((weight) => (
                  <Button
                    key={weight}
                    variant={selectedWeight === weight ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedWeight(weight)}
                    className="h-10"
                  >
                    {weight < 1 ? `${(weight * 1000).toFixed(0)}g` : `${weight.toFixed(weight % 1 === 0 ? 0 : 2)}kg`}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selection */}
          <div>
            <Label className="text-base font-medium mb-3 block">
              Quantidade:
            </Label>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
                className="w-10 h-10 p-0"
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span className="text-lg font-medium min-w-[2rem] text-center">{quantity}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 p-0"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Observation */}
          <div>
            <Label className="text-base font-medium mb-3 block">
              Observações (opcional):
            </Label>
            <Textarea
              placeholder="Exemplo: sem casca, bem maduro, etc..."
              value={observation}
              onChange={(e) => setObservation(e.target.value)}
              className="bg-gray-100 border-0 resize-none"
              rows={3}
            />
          </div>

          {/* Total and Confirm */}
          <div className="space-y-3 pt-4 border-t">
            <div className="flex justify-between items-center">
              <span className="text-base">Total:</span>
              <span className="text-lg font-bold text-orange-500">
                R$ {calculatePrice().toFixed(2)}
              </span>
            </div>
            <Button 
              onClick={handleConfirm} 
              className="w-full bg-orange-500 hover:bg-orange-600 text-white"
              disabled={product.variations && product.variations.length > 0 && !selectedVariation}
            >
              Adicionar à feira
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
