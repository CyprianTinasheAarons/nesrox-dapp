import { useEffect, useState, useCallback } from 'react'
import { Logo, Button, Input } from '@components/ui'
import useLogin from '@framework/auth/use-login'
import { useUI } from '@components/ui/context'
import { validate } from 'email-validator'

const LoginView: React.FC = () => {
  // Form State
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [dirty, setDirty] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const { setModalView, closeModal } = useUI()

  const login = useLogin()

  const handleLogin = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault()

    if (!dirty && !disabled) {
      setDirty(true)
      handleValidation()
    }

    try {
      setLoading(true)
      setMessage('')
      await login({
        email,
        password,
      })
      closeModal()
    } catch ({ errors }) {
      if (errors instanceof Array) {
        setMessage(errors.map((e: any) => e.message).join('<br/>'))
      } else {
        setMessage('Unexpected error')
      }
      setDisabled(false)
    } finally {
      setLoading(false)
    }
  }

  const handleValidation = useCallback(() => {
    // Test for Alphanumeric password
    const validPassword = /^(?=.*[a-zA-Z])(?=.*[0-9])/.test(password)
    // Unable to send form unless fields are valid.
    if (dirty) {
      setDisabled(!validate(email) || password.length < 7 || !validPassword)
    }
  }, [email, password, dirty])

  useEffect(() => {
    handleValidation()
  }, [handleValidation])

  return (
    <form
      onSubmit={handleLogin}
      className="flex flex-col justify-between p-3 w-80"
    >
      <div className="flex justify-center pb-12 ">
        <Logo />
      </div>
      <div className="flex flex-col space-y-3">
        {message && (
          <div className="p-3 border text-red border-red">
            {message}. Did you {` `}
            <a
              className="inline font-bold cursor-pointer text-accent-9 hover:underline"
              onClick={() => setModalView('FORGOT_VIEW')}
            >
              forgot your password?
            </a>
          </div>
        )}
        <Input type="email" placeholder="Email" onChange={setEmail} />
        <Input type="password" placeholder="Password" onChange={setPassword} />

        <Button
          variant="slim"
          type="submit"
          loading={loading}
          disabled={disabled}
          className='rounded-md'
        >
          Log In
        </Button>
        <div className="pt-1 text-sm text-center">
          <span className="text-accent-7">Don't have an account?</span>
          {` `}
          <a
            className="font-bold cursor-pointer text-accent-9 hover:underline"
            onClick={() => setModalView('SIGNUP_VIEW')}
          >
            Sign Up
          </a>
        </div>
      </div>
    </form>
  )
}

export default LoginView
