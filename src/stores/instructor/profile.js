import Fetch from "../../libraries/fetch";
import SessionStore from "./session";

class ProfileClass {
  check(param) {
    return new Promise((resolve, reject) => {
      /* eslint-disable */
      Fetch(`{ instructorByParam(_id:"` + SessionStore.data._id + `") { email password } }`)
      .then(check => {
        /* eslint-enable */
        if (check.data.instructorByParam.password !== param.confirmation) {
          reject(2); // eslint-disable-line
        } else {
          if (check.data.instructorByParam.email === param.email) {
            resolve(null);
          } else {
            /* eslint-disable */
            Fetch(`{ instructorByParam(email:"` + param.email + `") { _id } }`)
            .then(isExist => {
              /* eslint-enable */
              if (isExist.data.instructorByParam === null) {
                /* eslint-disable */
                resolve(null);
                /* eslint-enable */
              } else {
                reject(1); // eslint-disable-line
              }
            });
          }
        }
      });
    });
  }

  update(param) {
    return new Promise((resolve, reject) => {
      this.check(param)
        .then(() => {
          /* eslint-disable */
        Fetch(`mutation {
          instructor_update(
            _id: "` + SessionStore.data._id + `",
            name: "` + param.name + `",
            email: "` + param.email + `",
            password: "` + param.password + `",
          ){ _id }
        }`).then(() => {
          /* eslint-enable */
            resolve(null);
          });
        })
        .catch((result) => {
          reject(result);
        });
    });
  }
}

const ProfileStore = new ProfileClass();
export default ProfileStore;
