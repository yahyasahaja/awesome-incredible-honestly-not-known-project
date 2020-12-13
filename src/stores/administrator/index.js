import { createContext, useContext } from "react";
import Class from "./class";
import Content from "./content";
import Course from "./course";
import KeyFeature from "./keyfeature";
import LearningPath from "./learningpath";
import Question from "./question";
import Quiz from "./quiz";
import Task from "./task";
import User from "./user";

class AdministratorClass {
  content = Content;
  course = Course;
  class = Class;
  keyfeature = KeyFeature;
  learningpath = LearningPath;
  question = Question;
  quiz = Quiz;
  task = Task;
  user = User;
}

export const AdministratorStore = new AdministratorClass();
export const AdministratorContext = createContext(AdministratorStore);
export const useAdministrator = () => {
  const context = useContext(AdministratorContext);
  return context;
};
