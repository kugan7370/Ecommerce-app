export interface ISearchContextProps {
    searchQuery: string;
    updateSearchQuery: (query: string) => void;
    clearSearchQuery: () => void;
  }