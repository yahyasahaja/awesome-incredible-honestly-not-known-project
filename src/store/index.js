import { createContext, useContext } from "react";
import Course from "./course";
import LearningPath from "./learningpath";
import KeyFeature from "./keyfeature";
import Content from "./content";

class ApplicationClass {
  course = Course;
  learningpath = LearningPath;
  keyfeature = KeyFeature;
  content = Content;
}

export const ApplicationStore = new ApplicationClass();
export const ApplicationContext = createContext(ApplicationStore);
export const useApplication = () => {
  const context = useContext(ApplicationContext);
  return context;
};
