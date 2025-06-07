import React from 'react'

const ColorPicker = ({ label, value, onChange }) => {
  const inputRef = React.useRef(null)
  return (
    <div>
      <label
        style={{
          display: 'block',
          fontSize: '0.875rem',
          fontWeight: '500',
          color: '#8E8D8A',
          marginBottom: '0.5rem',
        }}
      >
        {label}
      </label>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '0.5rem',
          backgroundColor: '#EBE9E1',
          borderRadius: '0.5rem',
          cursor: 'pointer',
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
          transition: 'box-shadow 0.3s',
        }}
        onClick={() => inputRef.current && inputRef.current.click()}
      >
        <div
          style={{
            width: '2rem',
            height: '2rem',
            borderRadius: '9999px',
            border: '1px solid #d1d5db',
            backgroundColor: value,
          }}
        ></div>
        <span
          style={{
            color: '#8E8D8A',
            fontWeight: '500',
            textTransform: 'uppercase',
            fontSize: '0.875rem',
          }}
        >
          {value}
        </span>
        <input
          type="color"
          ref={inputRef}
          value={value}
          onChange={onChange}
          style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
        />
      </div>
    </div>
  )
}

export default ColorPicker
