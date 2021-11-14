import React from "react"
import { LoginPage } from "../../components"
import { EuiLoadingSpinner } from "@elastic/eui"
import { useProtectedRoute } from "../../hooks/auth/useProtectedRoute"

export default function ProtectedRoute({ component: Component, ...props }) {
  const { isAuthenticated, userLoaded } = useProtectedRoute()
  if (!userLoaded) return <EuiLoadingSpinner size="xl" />
  if (!isAuthenticated) {
    return (
      <>
        <LoginPage />
      </>
    )
  }
  return <Component {...props} />
}
