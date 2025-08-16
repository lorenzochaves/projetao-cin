import { MarketerRoute } from "@/components/ProtectedRoute"
import MarketerHomePage from "./Homepage/page"

export default function MarketerPage() {
  return (
    <MarketerRoute>
      <MarketerHomePage />
    </MarketerRoute>
  )
}
