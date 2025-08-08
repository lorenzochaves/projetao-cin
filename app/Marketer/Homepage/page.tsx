import Link from "next/link"
import { Card } from "@/components/ui/card"
import { BottomNavigation } from "@/components/ui/bottom-navigation"

export default function MarketerHomePage() {
  return (
    <div className="min-h-screen bg-white">
      
      <div className="px-4 pt-8 pb-24">
        <h1 className="text-2xl font-bold mb-8">Olá, xxx!</h1>
        
        <div className="grid grid-cols-2 gap-4">
          <Link href="/Marketer/MarketerOrders">
            <Card className="aspect-square flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-colors">
              <span className="text-lg font-medium">Pedidos</span>
            </Card>
          </Link>
          
          <Link href="/Marketer/MarketerStall">
            <Card className="aspect-square flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-colors">
              <span className="text-lg font-medium">Minha banca</span>
            </Card>
          </Link>
          
          <Link href="/Marketer/Finance">
            <Card className="aspect-square flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-colors">
              <span className="text-lg font-medium">Finanças</span>
            </Card>
          </Link>
          
          <Card className="aspect-square flex items-center justify-center bg-gray-100">
            <span className="text-lg font-medium">Configurações</span>
          </Card>
        </div>
        
        <Card className="mt-4 aspect-[2/1] flex items-center justify-center bg-gray-100">
          <span className="text-lg font-medium">Ajuda</span>
        </Card>
      </div>
      
      <BottomNavigation />
    </div>
  )
}
