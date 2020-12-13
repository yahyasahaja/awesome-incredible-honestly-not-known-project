import Router from "next/router";
import Fetch from "../../libraries/fetch";
import SessionStore from "./session";

class EnrollmentClass {
  apply(param) {
    return new Promise((resolve, reject) => {
      /* eslint-disable */
      Fetch(`mutation {
        enrollment_add(
          user: "` + SessionStore.data._id + `",
          course: "` + param + `",
          class: "",
          status: "0"
        ) { _id }
      }`).then(() => {
        resolve();
        Router.push("/user/learn/status");
      });
    });
  }
}

const EnrollmentStore = new EnrollmentClass();
export default EnrollmentStore;