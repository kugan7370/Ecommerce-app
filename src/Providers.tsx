import React, { ReactNode } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { SearchProvider } from './contexts/SearchContext ';
import { FilterProvider } from './contexts/FilterContext';

interface ProvidersProps {
  children: ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => (
  <AuthProvider>
    <CartProvider>
      <SearchProvider>
        <FilterProvider>
          {children}
        </FilterProvider>
      </SearchProvider>
    </CartProvider>
  </AuthProvider>
);

export default Providers;
