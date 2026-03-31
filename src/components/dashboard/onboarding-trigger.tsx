"use client"

import * as React from "react"
import { OnboardingWizard } from "./onboarding-wizard"

export function OnboardingTrigger() {
  const [show, setShow] = React.useState(true)

  const handleComplete = () => {
    // CLEAR FRESH INSTALL FLAG
    document.cookie = "isFreshInstall=false; path=/"
    setShow(false)
    window.location.reload()
  }

  if (!show) return null

  return <OnboardingWizard onComplete={handleComplete} />
}
