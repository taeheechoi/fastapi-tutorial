import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { extractErrorMessages } from "../../utils/errors"
import validation from "../../utils/validation"
import { useAuthenticatedUser } from "../auth/useAuthenticatedUser"

export const useLoginAndRegistrationForm = ({ isLogin = false }) => {
    const navigate = useNavigate()
    const { user, error: authError, isLoading, isAuthenticated } = useAuthenticatedUser()
    const [form, setForm] = useState({
      username: "",
      email: "",
      password: "",
      passwordConfirm: "",
    })
    const [agreedToTerms, setAgreedToTerms] = useState(false)
    const [errors, setErrors] = useState({})
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const authErrorList = extractErrorMessages(authError)
    const validateInput = (label, value) => {
      // grab validation function and run it on input if it exists
      // if it doesn't exists, just assume the input is valid
      const isValid = validation?.[label] ? validation?.[label]?.(value) : true
      // set an error if the validation function did NOT return true
      setErrors((errors) => ({ ...errors, [label]: !isValid }))
    }
    const handleInputChange = (label, value) => {
      validateInput(label, value)
      setForm((form) => ({ ...form, [label]: value }))
    }
    const handlePasswordConfirmChange = (value) => {
      setErrors((errors) => ({
        ...errors,
        passwordConfirm: form.password !== value ? `Passwords do not match.` : null,
      }))
      setForm((form) => ({ ...form, passwordConfirm: value }))
    }
    const getFormErrors = () => {
      const formErrors = []
      if (errors.form) {
        formErrors.push(errors.form)
      }
      if (hasSubmitted && authErrorList.length) {
        const additionalErrors = isLogin ? [`Invalid credentials. Please try again.`] : authErrorList
        return formErrors.concat(additionalErrors)
      }
      return formErrors
    }
    // if the user is already authenticated, redirect them to the "/profile" page
    useEffect(() => {
      if (user?.email && isAuthenticated) {
        navigate("/profile")
      }
    }, [user, navigate, isAuthenticated])
    return {
      form: isLogin ? { email: form.email, password: form.password } : form,
      setForm,
      errors,
      setErrors,
      isLoading,
      getFormErrors,
      hasSubmitted,
      setHasSubmitted,
      handleInputChange,
      validateInput,
      agreedToTerms,
      setAgreedToTerms,
      handlePasswordConfirmChange,
    }
  }