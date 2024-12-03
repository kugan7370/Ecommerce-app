import React, { createContext, useState, useContext, useCallback, ReactNode } from 'react';
import { ISearchContextProps } from '../types/search';



const SearchContext = createContext<ISearchContextProps | undefined>(undefined);

interface SearchProviderProps {
  children: ReactNode;
}

export const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const updateSearchQuery = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const clearSearchQuery = useCallback(() => {
    setSearchQuery('');
  }, []);

  return (
    <SearchContext.Provider 
      value={{ 
        searchQuery, 
        updateSearchQuery, 
        clearSearchQuery 
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = (): ISearchContextProps => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};
