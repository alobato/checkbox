import React, { useRef } from 'react'
import styled from 'styled-components'

const Checkbox = ({ checked, label, labelStyle, containerStyle, checkAnimation, uncheckAnimation, ...rest }) => {
  const checkboxRef = useRef()
  const checkRef = useRef()

  const handleClick = () => {
    if (checked) {
      if (uncheckAnimation) {
        uncheckAnimation(checkRef, () => rest.onChange(false))
      } else {
        rest.onChange(false)
      }
    } else {
      if (checkAnimation) {
        checkAnimation(checkRef, () => rest.onChange(true))
      } else {
        rest.onChange(true)
      }
    }
  }

  const content = (
    <div onKeyPress={e => (['Enter', ' '].includes(e.key)) && handleClick()} ref={checkboxRef} onClick={handleClick} {...rest}>
      <div ref={checkRef} style={{opacity: checked ? 1 : 0}} />
    </div>
  )

  if (label) return (
    <div style={containerStyle}>
      {content}
      <label style={labelStyle} onClick={handleClick}>{label}</label>
    </div>
  )

  return content
}

const checkAnimation = (ref, callback) => {
  if (!ref.current) return
  if ('animate' in ref.current) {
    ref.current.animate([{opacity: 0, transform: 'rotate(45deg) scale(0)'}, {opacity: 1, transform: 'rotate(45deg) scale(1)'}], {duration: 200, easing: 'ease'})
      .onfinish = () => {
        callback()
      }
  } else {
    callback()
  }
}

const uncheckAnimation = (ref, callback) => {
  if (!ref.current) return
  if ('animate' in ref.current) {
    ref.current.animate([{opacity: 1, transform: 'rotate(45deg) scale(1)'}, {opacity: 0, transform: 'rotate(45deg) scale(0)'}], {duration: 200, easing: 'ease'})
      .onfinish = () => {
        callback()
      }
  } else {
    callback()
  }
}

const StyledCheckbox = styled(Checkbox)`
  display: inline-block;
  position: relative;
  cursor: pointer;
  width: 18px;
  height: 18px;
  background-color: transparent;
  border-radius: 2px;
  border: 2px solid hsla(216, 20%, 50%, 0.85);
  transition: background-color 500ms, border-color 500ms;
  &:hover {
    background-color: hsla(216, 20%, 50%, 0.2);
    border-color: hsla(216, 20%, 50%, 1);
  }
  & > div {
    position: absolute;
    top: 1px;
    left: 4px;
    width: 6px;
    height: 10px;
    border-bottom: 2px solid hsla(216, 20%, 50%, 0.85);
    border-left: none;
    border-right: 2px solid hsla(216, 20%, 50%, 0.85);
    border-top: none;
    transform: rotate(45deg);    
    pointer-events: none;
  }
`

const StyledCheckboxWithAnimations = props => (
  <StyledCheckbox checkAnimation={checkAnimation} uncheckAnimation={uncheckAnimation} {...props} />
)

StyledCheckboxWithAnimations.defaultProps = {
  tabIndex: 0,
  onChange: () => {},
  containerStyle: { display: 'flex', alignItems: 'center', cursor: 'pointer', userSelect: 'none' },
  labelStyle: { cursor: 'pointer', marginLeft: 8 },
}

export default StyledCheckboxWithAnimations
