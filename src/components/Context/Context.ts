import React, { createContext, useContext } from "react";

export type Algorithm = {
  algorithm: string;
  setAlgorithm: (a: string) => void;
};

export const algorithmContext = createContext<Algorithm>({
  algorithm: "",
  setAlgorithm: () => {},
});

export const useAlgorithmContext = () => useContext(algorithmContext);

export type VisualisationStatus = {
  visualisationStatus: string;
  setVisualisationStatus: (s: string) => void;
};

export const visualisationStatusContext = createContext<VisualisationStatus>({
  visualisationStatus: "idle",
  setVisualisationStatus: () => {},
});

export const useVisualisationStatusContext = () =>
  useContext(visualisationStatusContext);
