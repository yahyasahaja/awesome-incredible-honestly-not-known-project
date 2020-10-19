import { createContext, useContext } from "react";
import Asset from "./asset";

class ApplicationClass {
  asset = Asset;
}

export const ApplicationStore = new ApplicationClass();
export const ApplicationContext = createContext(ApplicationStore);
export const useApplication = () => {
  const context = useContext(ApplicationContext);
  return context;
};
