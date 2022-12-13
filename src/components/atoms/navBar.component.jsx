import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const NavBar = () => {
  const [logged, setLogged] = useState(true)

  const navigate = useNavigate()
  const LogOut = () => {
    localStorage.clear()
    navigate('/auth')
  }
  const Login = () => {
    navigate('/auth')
  }

  const Enroll = () => {
    navigate('/enroll')
  }

  useEffect(() => {
    const AccessToken = localStorage.getItem('AccessToken')
    if (!AccessToken) {
      setLogged(false)
    }
  })

  return (
    <div className="navBar">
      <h3 className="logo">Bend It Over</h3>
      <div className="pages">
        <p className="navItem" onClick={Enroll}>
          Enroll
        </p>
        {!logged ? (
          <p className="navItem" onClick={Login}>
            Login
          </p>
        ) : (
          <p className="navItem" onClick={LogOut}>
            Logout
          </p>
        )}
      </div>
    </div>
  )
}
