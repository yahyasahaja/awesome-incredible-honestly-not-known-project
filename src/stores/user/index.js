import { createContext, useContext } from "react";
import Enrollment from "./enrollment";
import Profile from "./profile";
import Session from "./session";

class UserClass {
  enrollment = Enrollment;
  profile = Profile;
  session = Session;
}

export const UserStore = new UserClass();
export const UserContext = createContext(UserStore);
export const useUser = () => {
  const context = useContext(UserContext);
  return context;
};
