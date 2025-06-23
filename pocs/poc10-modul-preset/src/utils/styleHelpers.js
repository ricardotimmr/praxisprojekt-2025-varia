export const getShadowStyle = (shadowEffect) => {
  switch (shadowEffect) {
    case 'light':
      return '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
    case 'standard':
      return '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
    case 'strong':
      return '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
    default:
      return 'none'
  }
}

export const getBorderStyle = (borderStyle, borderColor) => {
  switch (borderStyle) {
    case 'thin':
      return `1px solid ${borderColor}`
    case 'standard':
      return `2px solid ${borderColor}`
    default:
      return 'none'
  }
}

export const getWidthStyle = (moduleWidth) => {
  switch (moduleWidth) {
    case 'wide':
      return { width: '100%', maxWidth: 'calc(100% * 5 / 6)', margin: '0 auto' }
    case 'standard':
      return { width: '100%', maxWidth: 'calc(100% * 3 / 4)', margin: '0 auto' }
    case 'narrow':
      return { width: '100%', maxWidth: 'calc(100% * 1 / 2)', margin: '0 auto' }
    default:
      return { width: '100%' }
  }
}

export const getVerticalAlignmentStyle = (verticalAlignment) => {
  switch (verticalAlignment) {
    case 'top':
      return 'flex-start'
    case 'middle':
      return 'center'
    case 'bottom':
      return 'flex-end'
    default:
      return 'center'
  }
}

export const getContentAlignmentStyle = (contentAlignment) => {
  switch (contentAlignment) {
    case 'left':
      return { alignItems: 'flex-start', textAlign: 'left' }
    case 'center':
      return { alignItems: 'center', textAlign: 'center' }
    case 'right':
      return { alignItems: 'flex-end', textAlign: 'right' }
    default:
      return { alignItems: 'center', textAlign: 'center' }
  }
}

export const getPaddingStyle = (paddingSize) => {
  switch (paddingSize) {
    case 'compact':
      return '1rem'
    case 'standard':
      return '1.5rem'
    case 'spacious':
      return '2rem'
    default:
      return '1.5rem'
  }
}
