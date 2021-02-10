import Router from "next/router";
import Fetch from "../../libraries/fetch";

class InstructorClass {
  add(param) {
    return new Promise((resolve, reject) => {
      /* eslint-disable */
      Fetch(`{ instructorByParam(email:"` + param.email + `") { password } }`)
      .then(result => {
        /* eslint-enable */
        if (result.data.instructorByParam !== null) {
            reject(1); // eslint-disable-line
        } else {
          /* eslint-disable */
          Fetch(`mutation {
            instructor_add(
              name: "` + param.name + `",
              email: "` + param.email + `",
              password: "` + param.password + `"
            ){ _id }
          }`).then(() => {
            /* eslint-enable */
            resolve(null);
            Router.push("/administrator/instructor");
          });
        }
      });
    });
  }

  update(param) {
    return new Promise((resolve, reject) => {
      /* eslint-disable */
      Fetch(`mutation {
        instructor_update(
          _id: "` + param._id + `",
          name: "` + param.name + `",
          email: "` + param.email + `",
          password: "` + param.password + `",
        ) { _id }
      }`).then(() => {
        /* eslint-enable */
        resolve();
      });
    });
  }

  delete(_id) {
    return new Promise((resolve, reject) => {
      /* eslint-disable */
      Fetch(`mutation { instructor_delete(_id:"` + _id + `"){ _id } }`)
      .then(() => {
          /* eslint-enable */
          resolve();
        }
      );
    });
  }
}

const InstructorStore = new InstructorClass();
export default InstructorStore;
