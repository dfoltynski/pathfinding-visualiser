import React, { createContext, useContext } from "react";

export type IAlgorithm = {
  algorithm: string;
  setAlgorithm: (a: string) => void;
};

export const algorithmContext = createContext<IAlgorithm>({
  algorithm: "",
  setAlgorithm: () => {},
});

export const useAlgorithmContext = () => useContext(algorithmContext);
