"use client"

import { useState } from "react"
import MarketerHomepage from "./Homepage/page"
import MarketerOrdersPage from "./MarketerOrders/page"
import MyStorePage from "./MyStore/page"
import MarketerFinancePage from "./Finance/page"
import MarketerSettingsPage from "./Settings/page"
import HelpPage from "./Help/page"
import { MarketerBottomNavigation } from "./components/BottomNav"

export default function MarketerMainPage() {
  const [currentScreen, setCurrentScreen] = useState<string>("home")

  const handleScreenChange = (screen: string) => {
    setCurrentScreen(screen)
  }

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case "home":
        return <MarketerHomepage onScreenChange={handleScreenChange} />
      case "orders":
        return <MarketerOrdersPage onScreenChange={handleScreenChange} />
      case "my-store":
        return <MyStorePage onScreenChange={handleScreenChange} />
      case "finance":
        return <MarketerFinancePage onScreenChange={handleScreenChange} />
      case "help":
        return <HelpPage onScreenChange={handleScreenChange} />
      case "profile":
        return <MarketerSettingsPage onScreenChange={handleScreenChange} />
      default:
        return <MarketerHomepage onScreenChange={handleScreenChange} />
    }
  }

  return (
    <div className="relative min-h-screen">
      {renderCurrentScreen()}
      <MarketerBottomNavigation 
        onScreenChange={handleScreenChange}
        currentScreen={currentScreen}
      />
    </div>
  )
}
