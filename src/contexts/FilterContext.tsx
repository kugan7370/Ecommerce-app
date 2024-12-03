import React, { createContext, useState, useContext, useCallback, ReactNode } from 'react';

interface Filters {
  sortBy: string;
  category: string;
  priceRange: string;
}

interface FilterContextProps {
  filters: Filters;
  updateFilter: (filterType: keyof Filters, value: string) => void;
  clearFilters: () => void;
  applyFilters: () => Partial<Filters>;
}

const FilterContext = createContext<FilterContextProps | undefined>(undefined);

interface FilterProviderProps {
  children: ReactNode;
}

export const FilterProvider: React.FC<FilterProviderProps> = ({ children }) => {
  const [filters, setFilters] = useState<Filters>({
    sortBy: '',
    category: '',
    priceRange: ''
  });

  const updateFilter = useCallback((filterType: keyof Filters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({
      sortBy: '',
      category: '',
      priceRange: ''
    });
  }, []);

  const applyFilters = useCallback(() => {
    const activeFilters = Object.entries(filters)
      .filter(([_, value]) => value !== '')
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {} as Partial<Filters>);
    
    return activeFilters;
  }, [filters]);

  return (
    <FilterContext.Provider 
      value={{ 
        filters, 
        updateFilter, 
        clearFilters, 
        applyFilters 
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = (): FilterContextProps => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
};
