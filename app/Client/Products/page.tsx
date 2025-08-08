"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ArrowLeft } from "lucide-react"
import { Product, Screen, CartItem, Feirante } from "../types"
import { products } from "../data"
import { BottomNav } from "../components/BottomNav"

interface ProductPageProps {
  selectedProduct: Product
  selectedFeirante: Feirante | null
  cart: CartItem[]
  showObservationModal: boolean
  currentObservation: string
  onScreenChange: (screen: Screen) => void
  onAddToCart: (product: Product, feirante: string) => void
  onObservationModalChange: (show: boolean) => void
  onObservationChange: (observation: string) => void
  onConfirmAddToCart: () => void
}

export default function ProductPage({ 
  selectedProduct, 
  selectedFeirante,
  cart, 
  showObservationModal,
  currentObservation,
  onScreenChange, 
  onAddToCart, 
  onObservationModalChange,
  onObservationChange,
  onConfirmAddToCart
}: ProductPageProps) {
  return (
    <div className="min-h-screen bg-white pb-16">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pt-12">
        <Button variant="ghost" size="sm" onClick={() => onScreenChange("feirante")}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
      </div>

      {/* Product */}
      <div className="px-4">
        <div className="text-center mb-8">
          <div className="w-32 h-32 bg-gray-100 rounded-lg mx-auto mb-4 flex items-center justify-center text-6xl">
            {selectedProduct.image}
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-2">{selectedProduct.name}</h1>
        <p className="text-xl font-bold mb-1">
          R$ {selectedProduct.price.toFixed(2)} /{selectedProduct.unit}
        </p>
        <p className="text-gray-600 text-sm mb-6">
          {selectedProduct.description ||
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
        </p>

        <Button
          className="w-full mb-8 bg-gray-200 text-black hover:bg-gray-300 rounded-xl py-3"
          onClick={() => selectedFeirante && onAddToCart(selectedProduct, selectedFeirante.name)}
        >
          Adicionar à feira
        </Button>

        {/* Peça também */}
        <div>
          <h2 className="text-lg font-bold mb-4">Peça também</h2>
          <div className="grid grid-cols-4 gap-4">
            {products.slice(0, 4).map((product) => (
              <Card key={product.id} className="p-2 cursor-pointer hover:shadow-md transition-shadow">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg mx-auto mb-1 flex items-center justify-center text-lg">
                    {product.image}
                  </div>
                  <p className="text-xs font-medium">R$ {product.price.toFixed(2)}</p>
                  <p className="text-xs text-gray-600">{product.name}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Modal de Observação */}
      <Dialog open={showObservationModal} onOpenChange={onObservationModalChange}>
        <DialogContent className="max-w-sm mx-auto">
          <DialogHeader>
            <DialogTitle className="text-left">
              Você tem alguma
              <br />
              observação sobre o item?
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              placeholder="Quero uma fruta mais madura..."
              value={currentObservation}
              onChange={(e) => onObservationChange(e.target.value)}
              className="bg-gray-100 border-0 resize-none"
              rows={3}
            />
            <Button onClick={onConfirmAddToCart} className="w-full bg-gray-200 text-black hover:bg-gray-300">
              Adicionar à feira
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <BottomNav cart={cart} onScreenChange={onScreenChange} />
    </div>
  )
}
