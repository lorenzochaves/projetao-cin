"use client"

import Link from "next/link"
import { ChevronLeft, Star, Edit, Plus, Eye, Package, BarChart3 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MarketerBottomNavigation } from "@/components/ui/bottom-navigation"
import { useMarketer } from "@/hooks/api/useMarketer"

export default function MarketerStallPage() {
  const { products, stats } = useMarketer()

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="px-4 py-4">
          <div className="flex items-center mb-6">
            <Link href="/Marketer">
              <Button variant="ghost" size="icon" className="mr-2">
                <ChevronLeft className="h-6 w-6" />
              </Button>
            </Link>
            <h1 className="text-xl font-bold">Minha banca</h1>
          </div>
          
          {/* Profile Section */}
          <div className="flex items-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full mr-4 flex items-center justify-center">
              <span className="text-white font-bold text-xl">F1</span>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900">Feirante 1</h2>
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-current text-yellow-500 mr-1" />
                  <span className="font-medium">4.8</span>
                  <span className="text-sm text-gray-500 ml-1">(42)</span>
                </div>
                <Badge 
                  variant="default"
                  className="bg-green-100 text-green-800 border-green-200"
                >
                  Aberto
                </Badge>
              </div>
              <p className="text-sm text-gray-600 mt-1">Especialidades: Frutas, Verduras, Legumes</p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-3">
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-3 text-center">
                <Package className="h-5 w-5 text-blue-600 mx-auto mb-1" />
                <p className="text-lg font-bold text-blue-800">{stats.totalProducts}</p>
                <p className="text-xs text-blue-600">Produtos</p>
              </CardContent>
            </Card>
            
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-3 text-center">
                <BarChart3 className="h-5 w-5 text-green-600 mx-auto mb-1" />
                <p className="text-lg font-bold text-green-800">{stats.completedOrders}</p>
                <p className="text-xs text-green-600">Vendas</p>
              </CardContent>
            </Card>
            
            <Card className="bg-yellow-50 border-yellow-200">
              <CardContent className="p-3 text-center">
                <Star className="h-5 w-5 text-yellow-600 mx-auto mb-1" />
                <p className="text-lg font-bold text-yellow-800">4.8</p>
                <p className="text-xs text-yellow-600">Avaliação</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Link href="/Marketer/MarketerStall/add-product">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Plus className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="font-medium text-gray-900">Novo Produto</h3>
              </CardContent>
            </Card>
          </Link>

          <Link href="/Marketer/MarketerStall/products">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Eye className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-medium text-gray-900">Ver Todos</h3>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Products Section */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Meus produtos</CardTitle>
              <Link href="/Marketer/MarketerStall/products">
                <Button variant="ghost" size="sm">Ver todos</Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {products.length === 0 ? (
              <div className="text-center py-8">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum produto cadastrado</h3>
                <p className="text-gray-600 mb-6">Comece cadastrando seus primeiros produtos</p>
                <Link href="/Marketer/MarketerStall/add-product">
                  <Button className="bg-orange-500 hover:bg-orange-600">
                    <Plus className="h-4 w-4 mr-2" />
                    Cadastrar produto
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {products.slice(0, 5).map((product) => (
                  <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                        <Package className="h-6 w-6 text-gray-500" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{product.name}</h4>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">R$ {product.price.toFixed(2)}/{product.unit}</span>
                          <Badge 
                            variant={product.isAvailable ? "default" : "secondary"}
                            className={product.isAvailable ? "bg-green-100 text-green-800 border-green-200" : ""}
                          >
                            {product.isAvailable ? "Ativo" : "Inativo"}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">Estoque: {product.stock}</span>
                      <Link href={`/Marketer/MarketerStall/edit-product?id=${product.id}`}>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
                
                {products.length > 5 && (
                  <Link href="/Marketer/MarketerStall/products">
                    <Button variant="outline" className="w-full mt-3">
                      Ver todos os {products.length} produtos
                    </Button>
                  </Link>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Reviews Section */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Avaliações recentes</CardTitle>
              <Link href="/Marketer/MarketerStall/reviews">
                <Button variant="ghost" size="sm">Ver todas</Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-center py-6">
              <Star className="h-10 w-10 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">Nenhuma avaliação ainda</p>
              <p className="text-sm text-gray-500 mt-2">As avaliações dos clientes aparecerão aqui</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <MarketerBottomNavigation />
    </div>
  )
}
