"use client"
import { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface RegionContextType {
  region: string;
  setRegion: (region: string) => void;
  getPrice: (basePrice: number) => { price: number; currency: string };
}

const RegionContext = createContext<RegionContextType | undefined>(undefined);

export const RegionProvider = ({ children }: { children: ReactNode }) => {
    const [region, setRegion] = useState("IN");
    useEffect(() => {
        const storedRegion = localStorage.getItem("region");
        if (storedRegion) {
            setRegion(storedRegion);
        }
    }, []);
  const getPrice = (basePrice: number) => {
    switch (region) {
      case "EU":
        return { price: basePrice * 0.85, currency: "€" };
      case "UK":
        return { price: basePrice * 0.75, currency: "£" };
      case "IN":
        return { price: basePrice * 85, currency: "₹" };
      case "AU":
        return { price: basePrice * 1.10, currency: "A$" };
      case "CA":
        return { price: basePrice * 1.05, currency: "C$" };
      case "JP":
        return { price: basePrice * 1.20, currency: "¥" };
      case "CN":
        return { price: basePrice * 0.65, currency: "¥" };
      default:
        return { price: basePrice, currency: "$" };
    }
  };

  return (
    <RegionContext.Provider value={{ region, setRegion, getPrice }}>
      {children}
    </RegionContext.Provider>
  );
};

export const useRegion = () => {
  const context = useContext(RegionContext);
  if (!context) {
    throw new Error("useRegion must be used within a RegionProvider");
  }
  return context;
};
