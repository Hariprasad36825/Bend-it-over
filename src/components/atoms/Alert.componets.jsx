import PropTypes from 'prop-types'
import { NotificationContainer, NotificationManager } from 'react-notifications'
export const ShowAlert = ({ type, title, message }) => {
  console.log(
    '🚀 ~ file: Alert.componets.jsx:4 ~ ShowAlert ~ type, title, message',
    type,
    title,
    message
  )
  switch (type) {
    case 'info':
      NotificationManager.info('Info message')
      break
    case 'success':
      NotificationManager.success('Success message', 'Title here')
      break
    case 'warning':
      NotificationManager.warning('Warning message', 'Close after 3000ms', 3000)
      break
    case 'error':
      NotificationManager.error('Error message', 'Click me!', 5000, () => {
        alert('callback')
      })
      break
  }
  return <NotificationContainer />
}
ShowAlert.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string,
  message: PropTypes.string
}
