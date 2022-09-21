import create from "zustand/react";
import { GlobalStoreTypes } from "../types";

export const GlobalStore = create<GlobalStoreTypes>((set) => ({
  isLoading: false,
  setIsLoading: (isLoading) => set((state) => ({ ...state, isLoading })),
}));
