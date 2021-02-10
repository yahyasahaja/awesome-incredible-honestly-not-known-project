import { createContext, useContext } from "react";
import Bab from "./bab";
import Class from "./class";
import Content from "./content";
import Course from "./course";
import Instructor from "./instructor";
import KeyFeature from "./keyfeature";
import LearningPath from "./learningpath";
import Materi from "./materi";
import Question from "./question";
import Quiz from "./quiz";
import Task from "./task";
import User from "./user";

class AdministratorClass {
  bab = Bab;
  class = Class;
  content = Content;
  course = Course;
  instructor = Instructor;
  keyfeature = KeyFeature;
  learningpath = LearningPath;
  materi = Materi;
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
