import React, { useState } from "react"
import {
    EuiButton,
    EuiFieldText,
    EuiForm,
    EuiFormRow,
    EuiFieldPassword,
    EuiSpacer
} from "@elastic/eui"
import { Link } from "react-router-dom"
import styled from "styled-components"
import validation from "../../utils/validation"

const LoginFormWrapper = styled.div`
  padding: 2rem;
`
const NeedAccountLink = styled.span`
  font-size: 0.8rem;
`

export default function LoginForm({
    requestUserLogin = async ({ email, password }) =>
        console.log(`Logging in with ${email} and ${password}.`)
}) {
    const [form, setForm] = useState({
        email: "",
        password: ""
    })

    const [errors, setErrors] = useState({})

    const validateInput = (label, value) => {
        const isValid = validation?.[label] ? validation?.[label]?.(value) : true
        setErrors((errors) => ({ ...errors, [label]: !isValid }))
    }

    const handleInputChange = (label, value) => {
        validateInput(label, value)
        setForm((form) => ({ ...form, [label]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        // validate inputs before submitting
        Object.keys(form).forEach((label) => validateInput(label, form[label]))
        // if any input hasn't been entered in, return early
        if (!Object.values(form).every((value) => Boolean(value))) {
            setErrors((errors) => ({ ...errors, form: `You must fill out all fields.` }))
            return
        }

        await requestUserLogin({ email: form.email, password: form.password })
    }

    return (
        <LoginFormWrapper>
            <EuiForm component="form" onSubmit={handleSubmit}>
                <EuiFormRow
                    label="Email"
                    helpText="Enter the email associated with your account."
                    isInvalid={Boolean(errors.email)}
                    error={`Please enter a valid email.`}>
                    <EuiFieldText
                        icon="email"
                        placeholder="user@gmail.com"
                        value={form.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        aria-label="Enter the email associated with your account."
                        isInvalid={Boolean(errors.email)}
                    />
                </EuiFormRow>

                <EuiFormRow
                    label="Password"
                    helpText="Enter your password."
                    isInvalid={Boolean(errors.password)}
                    error={`Password must be at least 7 characters.`}
                >
                    <EuiFieldPassword
                        placeholder="••••••••••••"
                        value={form.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        type="dual"
                        aria-label="Enter your password."
                        isInvalid={Boolean(errors.password)}
                    />
                </EuiFormRow>

                <EuiSpacer />

                <EuiButton type="submit" fill>
                    Submit
                </EuiButton>
            </EuiForm>

            <EuiSpacer size="xl" />

            <NeedAccountLink>
                Need an account? Sign up <Link to="/registration">here</Link>.
            </NeedAccountLink>
        </LoginFormWrapper>
    )
}

