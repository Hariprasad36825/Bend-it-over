import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { RegisterApi } from '../../apis/auth.api'
import '../../assets/styles/login.style.css'
import {
  emailRegex,
  mobileRegex,
  nameRegex,
  passwordRegex
} from '../../config/regex.variables'
import { ApiWrapper } from '../../utils/apiWrapper.util'
import { validate } from '../../utils/validate.utils'
import { Button } from '../atoms/Button.component'
import { InputBox } from '../atoms/Input.component'

export const Register = ({ setCurComponent }) => {
  const [email, setEmail] = useState('sample@gmail.com')
  const [password, setPassword] = useState('Sample@2001')
  const [name, setName] = useState('Sample')
  const [age, setAge] = useState(22)
  const [mobile, setMobile] = useState(9585372567)

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

  useEffect(() => {
    if (!validate(nameRegex, name)) {
      setErrors({
        ...errors,
        name: 'enter valid name'
      })
    } else {
      setErrors({ ...errors, name: '' })
    }
  }, [name])

  useEffect(() => {
    if (!(age >= 18 && age <= 65)) {
      setErrors({
        ...errors,
        age: 'only age with 18-65 are allowed'
      })
    } else {
      setErrors({ ...errors, age: '' })
    }
  }, [age])

  useEffect(() => {
    if (!validate(mobileRegex, mobile)) {
      setErrors({
        ...errors,
        mobile: 'enter valid mobile number'
      })
    } else {
      setErrors({ ...errors, mobile: '' })
    }
  }, [mobile])

  const handleSubmit = async (e) => {
    e.preventDefault()
    let no_of_errors = 0

    Object.values(errors).map((val) => {
      no_of_errors += val ? 1 : 0
    })

    const data = {
      email,
      password,
      name,
      age,
      phone: mobile
    }

    const successFunc = (res) => {
      localStorage.setItem('AccessToken', res.data.AccessToken)
      localStorage.setItem('RefreshToken', res.data.RefreshToken)
      localStorage.setItem('type', res.data.type)
      navigate('/', { replace: true })
    }

    if (!no_of_errors) {
      await ApiWrapper(RegisterApi, data, successFunc)
    }
  }

  return (
    <div className="container">
      <div className="header">
        <h2>Sign Up</h2>
        <p>
          {'Have an account, '}
          <span className="a" onClick={() => setCurComponent('login')}>
            Login
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
          margin={'0.6'}
          error={errors?.password}
          required={true}
        />
        <InputBox
          value={name}
          setValue={setName}
          title={'Full name'}
          inputType={'text'}
          placeholder={'enter your name'}
          margin={'0.6'}
          error={errors?.name}
          required={true}
        />
        <InputBox
          value={age}
          setValue={setAge}
          title={'Age'}
          inputType={'number'}
          placeholder={'enter your age'}
          margin={'0.6'}
          error={errors?.age}
          required={true}
        />
        <InputBox
          value={mobile}
          setValue={setMobile}
          title={'Phone no.'}
          inputType={'tel'}
          placeholder={'enter your mobile number'}
          margin={'0.6'}
          error={errors?.mobile}
          required={true}
        />
        <Button
          handleClick={handleSubmit}
          text="Create account"
          customStyles={{ margin: '1rem 0 0 0' }}
        />
      </form>
    </div>
  )
}

Register.propTypes = {
  setCurComponent: PropTypes.func.isRequired
}
