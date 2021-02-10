import Router from "next/router";
import Fetch from "../../libraries/fetch";

class SessionClass {
  data = {};

  login(param) {
    return new Promise((resolve, reject) => {
      /* eslint-disable */
      Fetch(`{ userByParam(email:"` + param.email + `") { _id name password } }`)
      .then(result => {
        /* eslint-enable */
        if (result.data.userByParam === null) {
            reject(1); // eslint-disable-line
        } else {
          if (result.data.userByParam.password !== param.password) {
              reject(2); // eslint-disable-line
          } else {
            this.data = {
              _id: result.data.userByParam._id,
              name: result.data.userByParam.name,
            };
            resolve(null);
            Router.push("/");
          }
        }
      });
    });
  }

  register(param) {
    return new Promise((resolve, reject) => {
      /* eslint-disable */
      Fetch(`{ userByParam(email:"` + param.email + `") { password } }`)
      .then(result => {
        /* eslint-enable */
          if (result.data.userByParam !== null) {
            reject(1); // eslint-disable-line
          } else {
            /* eslint-disable */
          Fetch(`mutation {
            user_add(
              name: "` + param.name + `",
              email: "` + param.email + `",
              phonenumber : "` + param.phonenumber + `",
              password: "` + param.password + `"
            ){ _id }
          }`).then(() => {
            /* eslint-enable */
              resolve(null);
              Router.push("/user/login");
            });
          }
        }
      );
    });
  }

  logout() {
    this.data = {};
    Router.push("/");
  }
}

const SessionStore = new SessionClass();
export default SessionStore;
