import { createContext, useState, useContext } from 'react';

// Creamos el contexto del usuario
const UserContext = createContext();

// Hook para usar el contexto del usuario en cualquier componente
export function useUser() {
  return useContext(UserContext);
}

// Proveedor del contexto del usuario
export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}