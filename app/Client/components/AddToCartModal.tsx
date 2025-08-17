"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Plus, Minus, CheckCircle2 } from "lucide-react"
import { Product, ProductVariation } from "../types"

interface AddToCartModalProps {
  isOpen: boolean
  product: Product | null
  onClose: () => void
  onAddToCart: (product: Product, quantity: number, selectedVariation?: ProductVariation, selectedWeight?: number, observation?: string) => void
}

const getUnitDisplayName = (unitType: string) => {
  switch (unitType) {
    case 'kg': return 'kg'
    case 'unit': return 'unidade'
    case 'bunch': return 'maço'
    case 'tray': return 'bandeja'
    case 'mao': return 'mão'
    case 'bandeja': return 'bandeja'
    default: return unitType
  }
}

export default function AddToCartModal({ 
  isOpen, 
  product, 
  onClose, 
  onAddToCart 
}: AddToCartModalProps) {
  const [quantity, setQuantity] = useState(1)
  const [selectedVariation, setSelectedVariation] = useState<ProductVariation | null>(null)
  const [selectedWeight, setSelectedWeight] = useState<number>(500) // Default 500g
  const [observation, setObservation] = useState("")

  // Reset estados quando o modal abre/fecha ou produto muda
  useEffect(() => {
    if (isOpen && product) {
      setQuantity(1)
      setSelectedVariation(null)
      setObservation("")
      
      // Set default weight for kg products
      if (product.unitType === 'kg' && product.minWeight) {
        setSelectedWeight(product.minWeight * 2) // Default to 2x minimum (usually 500g)
      }
    }
  }, [isOpen, product])

  if (!product) return null

  const handleAddToCart = () => {
    onAddToCart(product, quantity, selectedVariation || undefined, selectedWeight, observation)
    onClose()
  }

  const handleWeightChange = (change: number) => {
    if (!product.weightStep || !product.minWeight || !product.maxWeight) return
    
    const newWeight = selectedWeight + change
    if (newWeight >= product.minWeight && newWeight <= product.maxWeight) {
      setSelectedWeight(newWeight)
    }
  }

  const getCurrentPrice = () => {
    let basePrice = selectedVariation?.price || product.price
    
    if (product.unitType === 'kg' && selectedWeight) {
      return (basePrice * selectedWeight) / 1000 // Convert grams to kg
    }
    
    return basePrice * quantity
  }

  const getWeightOptions = () => {
    if (!product.minWeight || !product.maxWeight || !product.weightStep) return []
    
    const options = []
    for (let weight = product.minWeight; weight <= product.maxWeight; weight += product.weightStep) {
      options.push(weight)
    }
    return options
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-left text-lg font-semibold">
            Adicionar à feira
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Product Info */}
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
              {product.image}
            </div>
            <div className="flex-1">
              <h3 className="font-medium">{product.name}</h3>
              <p className="text-sm text-gray-600">
                R$ {product.price.toFixed(2)} / {getUnitDisplayName(product.unitType)}
              </p>
            </div>
          </div>

          {/* Weight Selection for kg products */}
          {product.unitType === 'kg' && (
            <div className="space-y-3">
              <h4 className="font-medium text-sm">Quantidade (gramas)</h4>
              
              {/* Quick weight buttons */}
              <div className="grid grid-cols-4 gap-2">
                {getWeightOptions().slice(0, 8).map((weight) => (
                  <Button
                    key={weight}
                    variant={selectedWeight === weight ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedWeight(weight)}
                    className={`text-xs ${selectedWeight === weight ? 'bg-orange-500 hover:bg-orange-600' : ''}`}
                  >
                    {weight}g
                  </Button>
                ))}
              </div>

              {/* Weight adjuster */}
              <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleWeightChange(-product.weightStep!)}
                  disabled={selectedWeight <= (product.minWeight || 0)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                
                <div className="text-center">
                  <div className="font-semibold">{selectedWeight}g</div>
                  <div className="text-xs text-gray-600">
                    R$ {getCurrentPrice().toFixed(2)}
                  </div>
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleWeightChange(product.weightStep!)}
                  disabled={selectedWeight >= (product.maxWeight || 0)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Quantity for non-kg products */}
          {product.unitType !== 'kg' && (
            <div className="space-y-3">
              <h4 className="font-medium text-sm">Quantidade</h4>
              <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                
                <div className="text-center">
                  <div className="font-semibold">
                    {quantity} {getUnitDisplayName(product.unitType)}{quantity > 1 ? 's' : ''}
                  </div>
                  <div className="text-xs text-gray-600">
                    R$ {getCurrentPrice().toFixed(2)}
                  </div>
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Variations */}
          {product.variations && product.variations.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-medium text-sm">Escolha uma opção</h4>
              <div className="space-y-2">
                {product.variations.map((variation) => (
                  <Card
                    key={variation.id}
                    className={`p-3 cursor-pointer transition-all border-2 ${
                      selectedVariation?.id === variation.id
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedVariation(variation)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="font-medium text-sm">{variation.name}</div>
                        {variation.price && (
                          <div className="text-xs text-gray-600">
                            R$ {variation.price.toFixed(2)} / {getUnitDisplayName(product.unitType)}
                          </div>
                        )}
                      </div>
                      {selectedVariation?.id === variation.id && (
                        <CheckCircle2 className="h-5 w-5 text-orange-500" />
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Custom Observation */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm">Observações adicionais</h4>
            <Textarea
              placeholder="Alguma observação especial sobre o produto..."
              value={observation}
              onChange={(e) => setObservation(e.target.value)}
              className="bg-gray-50 border-gray-200 resize-none"
              rows={3}
            />
          </div>

          {/* Total and Add Button */}
          <div className="border-t pt-4">
            <div className="flex items-center justify-between mb-3">
              <span className="font-medium">Total:</span>
              <span className="text-lg font-bold text-orange-600">
                R$ {getCurrentPrice().toFixed(2)}
              </span>
            </div>
            
            <Button 
              onClick={handleAddToCart} 
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
