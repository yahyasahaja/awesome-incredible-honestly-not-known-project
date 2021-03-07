import Router from "next/router";
import Fetch from "../../libraries/fetch";

class SessionClass {
  data = {};

  login(param) {
    return new Promise((resolve, reject) => {
      /* eslint-disable */
      Fetch(`{ instructorByParam(email:"` + param.email + `") { _id name password } }`)
      .then(result => {
        /* eslint-enable */
        if (result.data.instructorByParam === null) {
            reject(1); // eslint-disable-line
        } else {
          if (result.data.instructorByParam.password !== param.password) {
              reject(2); // eslint-disable-line
          } else {
            this.data = {
              _id: result.data.instructorByParam._id,
              name: result.data.instructorByParam.name,
            };
            resolve(null);
            Router.push("/instructor/class");
          }
        }
      });
    });
  }

  logout() {
    this.data = {};
    Router.push("/");
  }
}

const SessionStore = new SessionClass();
export default SessionStore;
