import React, { createContext, useContext } from 'react';

const defaultCI = {
  accentColor: '#E43D12',
  backgroundColor: '#FFFFFF',
  textColor: '#383838',
  titleColor: '#E43D12',
  fontFamily: 'Sora, Arial, sans-serif'
};

const CIContext = createContext(defaultCI);

export const useCI = () => useContext(CIContext);

export const CIProvider = ({ value, children }) => (
  <CIContext.Provider value={value}>{children}</CIContext.Provider>
);
