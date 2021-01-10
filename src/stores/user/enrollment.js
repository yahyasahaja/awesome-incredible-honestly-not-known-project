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
          materi: "0",
          status: "0"
        ) { _id }
      }`).then(() => {
        resolve();
        Router.push("/user/learn/status");
      });
    });
  }

  progressModule(param) {
    return new Promise((resolve, reject) => {
      /* eslint-disable */
      Fetch(`mutation {
        enrollment_materi(
          _id: "` + param._id + `",
          materi: "` + param.materi + `",
        ){ _id }
      }`).then(() => {
        resolve();
      });
    });
  }
}

const EnrollmentStore = new EnrollmentClass();
export default EnrollmentStore;