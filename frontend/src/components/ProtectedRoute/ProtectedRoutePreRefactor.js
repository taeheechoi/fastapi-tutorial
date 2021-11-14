import React from "react"
import { LoginPage } from "../../components"
import { connect } from "react-redux"
import { useToasts } from "../../hooks/ui/useToasts"
import { EuiLoadingSpinner } from "@elastic/eui"

function ProtectedRoute({
  user,
  userLoaded,
  isAuthenticated,
  component: Component,
  redirectTitle = `Access Denied`,
  redirectMessage = `Authenticated users only. Login here or create a new account to view that page.`,
  ...props
}) {
  // const [toasts, setToasts] = React.useState([
  //   {
  //     id: "auth-redirect-toast",
  //     title: redirectTitle,
  //     color: "warning",
  //     iconType: "alert",
  //     toastLifeTimeMs: 3000,
  //     text: <p>{redirectMessage}</p>
  //   }
  // ])
  const { addToast } = useToasts()
  const isAuthed = isAuthenticated && Boolean(user?.email)

  React.useEffect(() => {
    if (userLoaded && !isAuthed) {
      addToast({
        id: `auth-toast-redirect`,
        title: redirectTitle,
        color: "warning",
        iconType: "alert",
        toastLifeTimeMs: 3000,
        text: redirectMessage,
      })
    }
  }, [userLoaded, isAuthed, addToast, redirectTitle, redirectMessage])

  if (!userLoaded) return <EuiLoadingSpinner size="xl" />


  if (!isAuthed) {
    return (
      <>
        <LoginPage />
        {/* <EuiGlobalToastList
          toasts={toasts}
          dismissToast={() => setToasts([])}
          toastLifeTimeMs={3000}
          side="right"
          className="auth-toast-list"
        /> */}
      </>
    )
  }

  return <Component {...props} />
}

export default connect((state) => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
  userLoaded: state.auth.userLoaded
}))(ProtectedRoute)
