"use client"

import { useState } from "react"
import ClientHomePage from "@/app/Client/Homepage/ClientHomePage"
import MarketerHomePage from "@/app/Marketer/Homepage/page"
import UserTypePage, { type UserType } from "@/app/UserType/page"

export default function RootPage() {
  const [userType, setUserType] = useState<UserType | null>(null)

  if (!userType) {
    return <UserTypePage onSelectUserType={setUserType} />
  }

  if (userType === "marketer") {
    return <MarketerHomePage />
  }

  if (userType === "courier") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Área do entregador em breve</p>
      </div>
    )
  }

  // default: client
  return <ClientHomePage />
}
