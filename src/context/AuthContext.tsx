import { createContext, useState, useContext, type ReactNode } from 'react';
import { type Usuario } from '../domain/models/Usuario';
import usuariosMock from '../infrastructure/mock/usuarios.json';
import { auth } from '../services/auth';

interface AuthContextData {
  usuario: Usuario | null;
  login: (email: string, senha?: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  const login = (email: string, senha?: string) => {
    // Busca o usuário no mock
    const usuarioEncontrado = usuariosMock.find(
      (u) => u.email === email && u.senha === senha
    );

    if (usuarioEncontrado) {
      setUsuario(usuarioEncontrado as Usuario);
    } else {
      throw new Error('Credenciais inválidas');
    }
  };

  const logout = () => {
    setUsuario(null);
    auth.logout();
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);