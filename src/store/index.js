import { createContext, useContext } from "react";
import { observable } from "mobx";
import Asset from "./asset";
import Course from "./course";

class ApplicationClass {
  @observable asset = Asset;
  @observable course = Course;
}

export const ApplicationStore = new ApplicationClass();
export const ApplicationContext = createContext(ApplicationStore);
export const useApplication = () => {
  const context = useContext(ApplicationContext);
  return context;
};
