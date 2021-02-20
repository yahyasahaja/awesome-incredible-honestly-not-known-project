import Router from "next/router";

class SessionClass {
  password = "administrator";
  isLogin = false;

  login(param) {
    return new Promise((resolve, reject) => {
      if (param === this.password) {
        this.isLogin = true;
        Router.push("/administrator");
        resolve(null);
      } else {
        const message = "incorrect password";
        reject(message);
      }
    });
  }
}

const SessionStore = new SessionClass();
export default SessionStore;
