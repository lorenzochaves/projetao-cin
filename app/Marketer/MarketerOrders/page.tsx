import Link from "next/link"
import { ChevronLeft, ChevronDown, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { BottomNavigation } from "@/components/ui/bottom-navigation"

export default function MarketerOrdersPage() {
  return (
    <div className="min-h-screen bg-white">
      
      <div className="px-4 py-4 pb-24">
        <div className="flex items-center mb-6">
          <Link href="/">
            <Button variant="ghost" size="icon" className="mr-2">
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">Pedidos</h1>
        </div>
        
        <div className="space-y-4">
          <Collapsible defaultOpen>
            <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left">
              <span className="text-lg font-medium">Pendentes</span>
              <ChevronDown className="h-5 w-5" />
            </CollapsibleTrigger>
            <CollapsibleContent className="px-4 pb-4 space-y-2">
              <Link href="/Marketer/MarketerOrders/order-detail?status=pendente">
                <div className="text-gray-700 hover:text-gray-900">Pedido nº xxx</div>
              </Link>
              <div className="text-gray-700">Pedido nº yyy</div>
            </CollapsibleContent>
          </Collapsible>
          
          <Link href="/Marketer/MarketerOrders/order-detail?status=separacao">
            <div className="flex items-center justify-between p-4 border-b">
              <span className="text-lg font-medium">Em separação</span>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
          </Link>
          
          <Link href="/Marketer/MarketerOrders/order-detail?status=pronto">
            <div className="flex items-center justify-between p-4 border-b">
              <span className="text-lg font-medium">Prontos</span>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
          </Link>
          
          <Link href="/Marketer/MarketerOrders/order-detail?status=entrega">
            <div className="flex items-center justify-between p-4 border-b">
              <span className="text-lg font-medium">Em entrega</span>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
          </Link>
          
          <Link href="/Marketer/MarketerOrders/order-detail?status=entregue">
            <div className="flex items-center justify-between p-4">
              <span className="text-lg font-medium">Entregues</span>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
          </Link>
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  )
}
