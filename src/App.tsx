import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { PageWrapper } from './components/layout/PageWrapper';

// Pages
import { LoginPage } from './pages/LoginPage';
import { FranquiaSelectionPage } from './pages/FranquiaSelectionPage';
import { MenuPage } from './pages/MenuPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { FidelizacaoPage } from './pages/FidelizacaoPage';
import { ProfilePage } from './pages/ProfilePage';
import { AboutPage } from './pages/AboutPage';

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <PageWrapper>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/franquias" element={<FranquiaSelectionPage />} />
              <Route path="/cardapio" element={<MenuPage />} />
              <Route path="/carrinho" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/fidelizacao" element={<FidelizacaoPage />} />
              <Route path="/perfil" element={<ProfilePage />} />
              <Route path="/sobre" element={<AboutPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </PageWrapper>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
