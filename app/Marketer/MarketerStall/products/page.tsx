"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft, Edit, Search, Filter } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { MarketerBottomNavigation } from "@/components/ui/bottom-navigation"

const products = [
  { name: "Tomate", price: "3,95", unit: "kg", category: "Legumes", status: "Ativo", stock: 15 },
  { name: "Batata Inglesa", price: "2,55", unit: "kg", category: "Legumes", status: "Ativo", stock: 8 },
  { name: "Morango", price: "13", unit: "bandeja", category: "Frutas", status: "Inativo", stock: 0 },
  { name: "Banana prata", price: "3,95", unit: "kg", category: "Frutas", status: "Ativo", stock: 12 },
  { name: "Ovo branco", price: "14", unit: "bandeja", category: "Proteínas", status: "Ativo", stock: 6 },
  { name: "Ovo caipira", price: "16", unit: "bandeja", category: "Proteínas", status: "Ativo", stock: 4 },
  { name: "Couve", price: "2,55", unit: "mão", category: "Verduras", status: "Ativo", stock: 10 },
  { name: "Coentro", price: "1,00", unit: "mão", category: "Verduras", status: "Ativo", stock: 7 },
]

export default function MarketerProductsListPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    const matchesStatus = selectedStatus === "all" || product.status === selectedStatus
    return matchesSearch && matchesCategory && matchesStatus
  })

  return (
    <div className="min-h-screen bg-white">
      <div className="px-4 py-6 pb-24">
        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Buscar produtos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 rounded-xl border-gray-200 h-12"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-3 mb-6">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="flex-1 rounded-xl">
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas categorias</SelectItem>
              <SelectItem value="Frutas">Frutas</SelectItem>
              <SelectItem value="Verduras">Verduras</SelectItem>
              <SelectItem value="Legumes">Legumes</SelectItem>
              <SelectItem value="Proteínas">Proteínas</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="flex-1 rounded-xl">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos status</SelectItem>
              <SelectItem value="Ativo">Ativo</SelectItem>
              <SelectItem value="Inativo">Inativo</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-4 mb-6">
          {filteredProducts.map((product, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-lg font-medium">{product.name}</span>
                  <Badge 
                    variant={product.status === "Ativo" ? "default" : "secondary"}
                    className={product.status === "Ativo" ? "bg-green-100 text-green-800 border-green-200" : ""}
                  >
                    {product.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>R$ {product.price}/{product.unit}</span>
                  <span>Estoque: {product.stock}</span>
                  <span>{product.category}</span>
                </div>
              </div>
              <Link href={`/Marketer/MarketerStall/edit-product?name=${encodeURIComponent(product.name)}`}>
                <Button variant="ghost" size="icon">
                  <Edit className="h-4 w-4 text-gray-500" />
                </Button>
              </Link>
            </div>
          ))}
          
          {filteredProducts.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">Nenhum produto encontrado</p>
            </div>
          )}
        </div>
        
        <Link href="/Marketer/MarketerStall/add-product">
          <Button className="w-full h-12 bg-orange-500 hover:bg-orange-600 rounded-xl">
            + Cadastrar produto
          </Button>
        </Link>
      </div>
      
      <MarketerBottomNavigation />
    </div>
  )
}
