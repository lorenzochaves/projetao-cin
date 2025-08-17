import { MarketerRoute } from "@/components/ProtectedRoute"
import MarketerMainPage from "./MarketerMain"

export default function MarketerPage() {
  return (
    <MarketerRoute>
      <MarketerMainPage />
    </MarketerRoute>
  )
}
