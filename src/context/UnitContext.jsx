import { createContext, useContext } from 'react';

const UnitContext = createContext();

export const UnitProvider = ({ children }) => {
  // 'imperial' as a fixed value
  const value = { unit: 'imperial' };

  return (
    <UnitContext.Provider value={value}>
      {children}
    </UnitContext.Provider>
  );
};

export const useUnit = () => useContext(UnitContext);