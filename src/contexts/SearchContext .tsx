import React, { createContext, useState, useContext, useCallback, ReactNode } from 'react';

interface SearchContextProps {
  searchQuery: string;
  updateSearchQuery: (query: string) => void;
  clearSearchQuery: () => void;
}

const SearchContext = createContext<SearchContextProps | undefined>(undefined);

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

export const useSearch = (): SearchContextProps => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};
