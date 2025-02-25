import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of our context
interface SearchContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

// Create context with default values
const SearchContext = createContext<SearchContextType>({
  searchQuery: "",
  setSearchQuery: () => {},
});

// Custom hook to use the search context
export const useSearch = () => useContext(SearchContext);

// Provider component
interface SearchProviderProps {
  children: ReactNode;
}

export const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </SearchContext.Provider>
  );
};
