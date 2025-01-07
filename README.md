# ControleAcessoRotasAutenticacao
Controle de acesso a rotas com autenticação.

### Passo a passo para rodar esse projeto localmente.
1. Configuração do Projeto
Primeiro, criamos um novo projeto com Vite e instalamos as dependências necessárias:
```
npm create vite@latest my-app --template react-ts
cd my-app
npm install
npm install react-router-dom
```

2. Definição das Rotas
Criamos um arquivo routes.tsx para definir as rotas da aplicação:
```
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { useAuth } from './auth';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
    </Routes>
  </Router>
);

export default AppRoutes;
```
Router: Envolve toda a aplicação e gerencia as rotas.  
Routes: Contém todas as rotas definidas.  
PrivateRoute: Componente que verifica se o usuário está autenticado. Se não estiver, redireciona para a página de login.  

3. Contexto de Autenticação
Criamos um contexto de autenticação em auth.tsx:
```
import React, { createContext, useContext, useState, ReactNode } from 'react';
interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
```
AuthContext: Contexto que armazena o estado de autenticação.  
AuthProvider: Provedor que envolve a aplicação e fornece o contexto de autenticação.  
useAuth: Hook personalizado para acessar o contexto de autenticação.  

4. Páginas de Exemplo
Criamos algumas páginas de exemplo (Home.tsx, Login.tsx, Dashboard.tsx):
> Home.tsx
```
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div>
    <h1>Home</h1>
    <Link to="/login">Login</Link>
  </div>
);
export default Home;
```

> // Login.tsx
```
import React from 'react';
import { useAuth } from '../auth';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const handleLogin = () => {
    login();
    navigate('/dashboard');
  };
  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};
export default Login;
```

> // Dashboard.tsx
```
import React from 'react';
import { useAuth } from '../auth';
const Dashboard = () => {
  const { logout } = useAuth();
  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
};
export default Dashboard;
```
Home: Página inicial com um link para a página de login.  
Login: Página de login que autentica o usuário e redireciona para o dashboard.  
Dashboard: Página protegida que só pode ser acessada por usuários autenticados.  

5. Integração
Finalmente, integramos tudo no main.tsx:
```
import React from 'react';
import ReactDOM from 'react-dom';
import AppRoutes from './routes';
import { AuthProvider } from './auth';
import './index.css';
ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
```
AuthProvider: Envolve a aplicação para fornecer o contexto de autenticação.
AppRoutes: Define as rotas da aplicação.

Execute o projeto: Finalmente, execute o projeto com o comando:
``` npm run dev ```



