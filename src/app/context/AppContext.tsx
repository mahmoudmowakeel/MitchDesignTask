// contexts/AppContext.tsx
"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";
import { ProductsQueryParams } from "../lib/types/main";

export type SortByType =
  | "Most Recommended"
  | "Price Lowest First"
  | "Price Highest First"
  | "Best Rating";

// Define your context type
interface AppContextType {
  selectedBrands: string[];
  setSelectedBrands: React.Dispatch<React.SetStateAction<string[]>>;
  filterIsOpen: boolean;
  setFilterIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  sortbyIsOpen: boolean;
  setSortbyIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  sortedBy: SortByType;
  setSortedBy: React.Dispatch<React.SetStateAction<SortByType>>;
  selectedFilters: ProductsQueryParams;
  setSelectedFilters: React.Dispatch<React.SetStateAction<ProductsQueryParams>>;
  tempFilters: ProductsQueryParams;
  setTempFilters: React.Dispatch<React.SetStateAction<ProductsQueryParams>>;
  selectedPrices: string[];
  setSelectedPrices: React.Dispatch<React.SetStateAction<string[]>>;
  selectedLang: string;
  numFiltersApplied: number;
  setSelectedLang: React.Dispatch<React.SetStateAction<string>>;
  setNumFiltersApplied: React.Dispatch<React.SetStateAction<number>>;
}

// Create context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider component
export function AppProvider({ children }: { children: ReactNode }) {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [filterIsOpen, setFilterIsOpen] = useState<boolean>(false);
  const [sortbyIsOpen, setSortbyIsOpen] = useState<boolean>(false);
  const [sortedBy, setSortedBy] = useState<SortByType>("Most Recommended");
  const [selectedFilters, setSelectedFilters] = useState<ProductsQueryParams>(
    {}
  );
  const [selectedLang, setSelectedLang] = useState<string>("EN");
  const [tempFilters, setTempFilters] = useState<ProductsQueryParams>({});
  const [selectedPrices, setSelectedPrices] = useState<string[]>([]);
  const [numFiltersApplied, setNumFiltersApplied] = useState<number>(0);

  return (
    <AppContext.Provider
      value={{
        selectedBrands,
        setSelectedBrands,
        filterIsOpen,
        setFilterIsOpen,
        sortbyIsOpen,
        setSortbyIsOpen,
        sortedBy,
        setSortedBy,
        selectedFilters,
        setSelectedFilters,
        tempFilters,
        setTempFilters,
        selectedPrices,
        setSelectedPrices,
        selectedLang,
        setSelectedLang,
        numFiltersApplied,
        setNumFiltersApplied,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

// Custom hook to use the context
export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
}
