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
          task: [],
          quiz: [],
          status: "0"
        ) { _id }
      }`).then(() => {
        /* eslint-enable */
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
        /* eslint-enable */
        resolve();
      });
    });
  }

  progressTask(param) {
    return new Promise((resolve, reject) => {
      /* eslint-disable */
      Fetch(`mutation {
        enrollment_task(
          _id: "` + param._id + `",
          task: ` + param.task + `,
        ){ _id }
      }`).then(() => {
        /* eslint-enable */
        resolve();
      });
    });
  }

  progressQuiz(param) {
    return new Promise((resolve, reject) => {
      /* eslint-disable */
      Fetch(`mutation {
        enrollment_quiz(
          _id: "` + param._id + `",
          quiz: ` + param.quiz + `,
        ){ _id }
      }`).then(() => {
        /* eslint-enable */
        resolve();
      });
    });
  }
}

const EnrollmentStore = new EnrollmentClass();
export default EnrollmentStore;
