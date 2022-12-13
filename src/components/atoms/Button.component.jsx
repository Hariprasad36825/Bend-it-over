import PropTypes from 'prop-types'
import '../../assets/styles/button.style.css'

export const Button = ({ handleClick, customStyles, text, borderRadius }) => {
  const style = {
    ...customStyles,
    borderRadius
  }
  return (
    <button style={style} className="btn" onClick={handleClick}>
      {text}
    </button>
  )
}

Button.propTypes = {
  handleClick: PropTypes.func.isRequired,
  customStyles: PropTypes.object,
  text: PropTypes.string,
  borderRadius: PropTypes.string
}

Button.defaultProps = {
  borderRadius: '8px'
}
