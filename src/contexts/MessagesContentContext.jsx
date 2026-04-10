import { createContext, useState, useContext } from "react";

const MessagesContentContext = createContext();

export function MessagesContentProvider({ children }) {
  const [instant, setInstant] = useState("");
  const [future, setFuture] = useState("");

  return (
    <MessagesContentContext.Provider
      value={{ instant, setInstant, future, setFuture }}
    >
      {children}
    </MessagesContentContext.Provider>
  );
}

export function useMessagesContentContext() {
  return useContext(MessagesContentContext);
}
