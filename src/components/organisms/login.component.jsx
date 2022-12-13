import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoginApi } from '../../apis/auth.api'
import '../../assets/styles/login.style.css'
import { emailRegex, passwordRegex } from '../../config/regex.variables'
import { ApiWrapper } from '../../utils/apiWrapper.util'
import { validate } from '../../utils/validate.utils'
import { Button } from '../atoms/Button.component'
import { InputBox } from '../atoms/Input.component'

export const Login = ({ setCurComponent }) => {
  const [email, setEmail] = useState('sample@gmail.com')
  const [password, setPassword] = useState('Sample@2001')
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()
  useEffect(() => {
    if (!validate(emailRegex, email)) {
      setErrors({ ...errors, email: 'enter valid email' })
    } else {
      setErrors({ ...errors, email: '' })
    }
  }, [email])

  useEffect(() => {
    if (!validate(passwordRegex, password)) {
      setErrors({
        ...errors,
        password:
          'enter password with 8-15 characters and atleast one lower, upper and numeric character'
      })
    } else {
      setErrors({ ...errors, password: '' })
    }
  }, [password])

  const handleSubmit = async (e) => {
    e.preventDefault()
    let no_of_errors = 0

    Object.values(errors).map((val) => {
      no_of_errors += val ? 1 : 0
    })

    const data = {
      email,
      password
    }

    const successFunc = (res) => {
      localStorage.setItem('AccessToken', res.data.AccessToken)
      localStorage.setItem('RefreshToken', res.data.RefreshToken)
      localStorage.setItem('type', res.data.type)
      navigate('/', { replace: true })
    }

    if (!no_of_errors) {
      await ApiWrapper(LoginApi, data, successFunc)
    }
  }

  return (
    <div className="container">
      <div className="header">
        <h2>Sign In</h2>
        <p>
          {"Don't have an account, "}
          <span className="a" onClick={() => setCurComponent('register')}>
            Register
          </span>
        </p>
      </div>
      <form className="formContainer">
        <InputBox
          value={email}
          setValue={setEmail}
          title={'Email'}
          inputType={'email'}
          placeholder={'enter your email'}
          error={errors?.email}
          required={true}
        />
        <InputBox
          value={password}
          setValue={setPassword}
          title={'Password'}
          inputType={'password'}
          placeholder={'enter your password'}
          margin={'1'}
          error={errors?.password}
          required={true}
        />
        <Button
          handleClick={handleSubmit}
          text="Login"
          customStyles={{ margin: '1rem 0 0 0' }}
        />
      </form>
    </div>
  )
}

Login.propTypes = {
  setCurComponent: PropTypes.func.isRequired
}
