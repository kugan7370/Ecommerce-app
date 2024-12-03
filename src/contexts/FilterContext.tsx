import React, { createContext, useState, useContext, useCallback, ReactNode } from 'react';
import { IFilterContextProps, IFilters } from '../types/filter';



const FilterContext = createContext<IFilterContextProps | undefined>(undefined);

interface FilterProviderProps {
  children: ReactNode;
}

export const FilterProvider: React.FC<FilterProviderProps> = ({ children }) => {
  const [filters, setFilters] = useState<IFilters>({
    sortBy: '',
    category: '',
    priceRange: ''
  });

  const updateFilter = useCallback((filterType: keyof IFilters, value: string) => {
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
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {} as Partial<IFilters>);
    
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

export const useFilter = (): IFilterContextProps => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
};
