import { createContext, useContext } from "react";
import Profile from "./profile";
import Session from "./session";

class InstructorClass {
  profile = Profile;
  session = Session;
}

export const InstructorStore = new InstructorClass();
export const InstructorContext = createContext(InstructorStore);
export const useInstructor = () => {
  const context = useContext(InstructorContext);
  return context;
};
