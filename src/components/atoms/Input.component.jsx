import PropTypes from 'prop-types'
import { useState } from 'react'
import '../../assets/styles/inputbox.style.css'
export const InputBox = ({
  value,
  setValue,
  customStyle,
  borderRadius,
  borderColor,
  title,
  inputType,
  error,
  color,
  placeholder,
  required,
  margin
}) => {
  const [focussedColor, setfoccussed] = useState(color)

  const red = '#FF0000'
  const style = {
    ...customStyle,
    borderRadius,
    color,
    borderShadow: 'none',
    outline: 'none',
    borderStyle: 'solid',
    borderColor: focussedColor === red || error ? red : focussedColor
  }

  return (
    <div
      className="inputContainer"
      style={{ margin: margin ? `${margin}rem 0 ${margin}rem 0` : 0 }}
    >
      {title && <p className="p">{title}</p>}
      <input
        type={inputType}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="input"
        style={style}
        placeholder={placeholder}
        onFocus={() => setfoccussed(borderColor)}
        onBlur={() => setfoccussed(color)}
        onInvalid={() => setfoccussed(red)}
        required={required}
      />
      {error && <p className="p danger">{error}</p>}
    </div>
  )
}

InputBox.propTypes = {
  value: PropTypes.any.isRequired,
  setValue: PropTypes.func.isRequired,
  customStyle: PropTypes.object,
  borderRadius: PropTypes.string,
  borderColor: PropTypes.string,
  title: PropTypes.string,
  inputType: PropTypes.string,
  error: PropTypes.string,
  color: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  margin: PropTypes.string
}

InputBox.defaultProps = {
  borderRadius: '8px',
  borderColor: '#3c37f9',
  color: '#738391'
}
