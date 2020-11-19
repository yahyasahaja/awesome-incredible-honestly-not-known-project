import { createContext, useContext } from "react";
import Content from "./content";
import Course from "./course";
import KeyFeature from "./keyfeature";
import LearningPath from "./learningpath";
import Question from "./question";
import Quiz from "./quiz";

class ApplicationClass {
  content = Content;
  course = Course;
  keyfeature = KeyFeature;
  learningpath = LearningPath;
  question = Question;
  quiz = Quiz;
}

export const ApplicationStore = new ApplicationClass();
export const ApplicationContext = createContext(ApplicationStore);
export const useApplication = () => {
  const context = useContext(ApplicationContext);
  return context;
};
