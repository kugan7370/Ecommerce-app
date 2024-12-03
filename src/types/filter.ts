export interface IFilters {
    sortBy: string;
    category: string;
    priceRange: string;
}

export interface IFilterContextProps {
    filters: IFilters;
    updateFilter: (filterType: keyof IFilters, value: string) => void;
    clearFilters: () => void;
    applyFilters: () => Partial<IFilters>;
}