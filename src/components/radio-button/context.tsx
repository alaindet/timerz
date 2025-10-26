import { createContext } from "react";

export type RadioButtonGroupContextType = {
  id: string;
  titleId: string;
  select: (value: string) => void;
  value: string | null;
};

export const RadioButtonGroupContext = createContext<
  RadioButtonGroupContextType | undefined
>(undefined);