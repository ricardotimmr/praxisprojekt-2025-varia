import React from 'react';

const LivePreviewBox = ({ config }) => {
  return (
    <div
      style={{
        borderRadius: '1rem',
        background: config.backgroundColor,
        padding: '2.5rem',
        color: config.textColor,
        border: `2px solid ${config.accentColor}`,
        textAlign: 'center',
        minHeight: 180,
        boxShadow: '0 4px 24px rgba(44,44,44,0.11)',
        transition: 'all 0.3s',
      }}
    >
      <h3 style={{ fontSize: '2rem', marginBottom: '0.75rem', color: config.accentColor }}>
        {config.title}
      </h3>
      <p style={{ fontSize: '1.2rem', margin: 0 }}>{config.description}</p>
    </div>
  );
};

export default LivePreviewBox;