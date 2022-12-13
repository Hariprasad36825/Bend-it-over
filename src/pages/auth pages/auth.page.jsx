import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import avatar from '../../assets/avatar.svg'
import { Login } from '../../components/organisms/login.component'
import { Register } from '../../components/organisms/register.component'

export const AuthScreen = () => {
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'row',
      width: '97%',
      minHeight: '95vh',
      height: '100%'
    },
    leftDiv: {
      width: '35%',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#3c37ff',
      color: '#f8faff',
      padding: '1rem',
      justifyContent: 'space-between',
      cursor: 'pointer'
    },
    appName: {
      color: '#d8dee7',
      fontSize: '0.9rem',
      fontWeight: '500'
    },
    white: {
      color: '#fff'
    },
    description: {
      color: '#d8dee7',
      fontWeight: 'normal',
      fontSize: '0.8rem'
    },
    reviews: {
      padding: '0.5rem',
      color: '#d8dee7',
      backgroundColor: '#2520e3',
      fontSize: '0.8rem',
      borderRadius: '8px'
    },
    user: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row',
      width: '100%',
      padding: '0 8px 0 8px'
    },
    avatar: {
      height: '2.5rem',
      width: '2.5rem',
      borderRadius: '8px'
    },
    rightDiv: {
      width: '65%',
      display: 'flex',
      flexDirection: 'column'
    }
  }
  const navigate = useNavigate()
  useEffect(() => {
    const AccessToken = localStorage.getItem('AccessToken')
    if (AccessToken) {
      navigate('/', { replace: true })
    }
  }, [])

  const [curComponent, setCurComponent] = useState(
    sessionStorage.getItem('cursec') || 'login'
  )

  useEffect(() => {
    sessionStorage.setItem('cursec', curComponent)
  }, [curComponent])

  return (
    <div style={styles.container} className="mobileCenter">
      <div style={styles.leftDiv} className="leftDiv">
        <h4 style={styles.appName}>Bend It Over</h4>
        <div>
          <h1 style={styles.white}>Start your Fitness with us</h1>
          <p style={styles.description}>
            Discover your inner peace and build a strong life
          </p>
        </div>
        <div style={styles.reviews}>
          <p>
            {
              "Wonderful quick way to get your practice in everyday, even if you don't have time highly recommend!"
            }
          </p>
          <div style={styles.user}>
            <img src={avatar} alt="avatar" style={styles.avatar} />
            <p style={{ paddingLeft: '8px' }}>Timson K</p>
          </div>
        </div>
      </div>
      <div style={styles.rightDiv} className="rightDiv">
        {curComponent === 'login' ? (
          <Login setCurComponent={setCurComponent} />
        ) : (
          <Register setCurComponent={setCurComponent} />
        )}
      </div>
    </div>
  )
}
