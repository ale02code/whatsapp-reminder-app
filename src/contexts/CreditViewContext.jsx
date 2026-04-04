import { createContext, useState, useContext } from "react";

const CreditViewContext = createContext();

export function CreditViewProvider({ children }) {
  const [visibility, setVisibility] = useState(false);

  return (
    <CreditViewContext.Provider value={{ visibility, setVisibility }}>
      {children}
    </CreditViewContext.Provider>
  );
}

export function useCreditViewContext() {
  return useContext(CreditViewContext);
}
