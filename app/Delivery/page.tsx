import { DeliveryRoute } from "@/components/ProtectedRoute"
import DeliveryHomePage from "./Homepage/page"

export default function DeliveryPage() {
  return (
    <DeliveryRoute>
      <DeliveryHomePage />
    </DeliveryRoute>
  )
}
