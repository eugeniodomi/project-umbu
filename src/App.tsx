import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { PageWrapper } from './components/layout/PageWrapper';
import { auth } from './services/auth';

// Pages
import { LoginPage } from './pages/LoginPage';
import { FranquiaSelectionPage } from './pages/FranquiaSelectionPage';
import { MenuPage } from './pages/MenuPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { FidelizacaoPage } from './pages/FidelizacaoPage';
import { ProfilePage } from './pages/ProfilePage';
import { AboutPage } from './pages/AboutPage';
import { Failed } from './pages/Failed';

function RequireAuth({ children }: { children: JSX.Element }) {
  const location = useLocation();
  if (!auth.isAuthenticated()) {
    // redirect to /failed (requested behavior)
    return <Navigate to="/failed" state={{ from: location }} replace />;
  }
  return children;
}

function PreventAuthAccess({ children }: { children: JSX.Element }) {
  // Prevent access to login page when already authenticated
  if (auth.isAuthenticated()) {
    return <Navigate to="/franquias" replace />;
  }
  return children;
}

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <PageWrapper>
            <Routes>
              <Route path="/" element={
                <PreventAuthAccess>
                  <LoginPage />
                </PreventAuthAccess>
              } />
              <Route path="/franquias" element={
                <RequireAuth>
                  <FranquiaSelectionPage />
                </RequireAuth>
              } />
              <Route path="/cardapio" element={
                <RequireAuth>
                  <MenuPage />
                </RequireAuth>
              } />
              <Route path="/carrinho" element={
                <RequireAuth>
                  <CartPage />
                </RequireAuth>
              } />
              <Route path="/checkout" element={
                <RequireAuth>
                  <CheckoutPage />
                </RequireAuth>
              } />
              <Route path="/fidelizacao" element={
                <RequireAuth>
                  <FidelizacaoPage />
                </RequireAuth>
              } />
              <Route path="/perfil" element={
                <RequireAuth>
                  <ProfilePage />
                </RequireAuth>
              } />
              <Route path="/sobre" element={
                <RequireAuth>
                  <AboutPage />
                </RequireAuth>
              } />
              <Route path="/failed" element={<Failed />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </PageWrapper>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
