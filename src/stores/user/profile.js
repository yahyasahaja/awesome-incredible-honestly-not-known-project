import Fetch from "../../libraries/fetch";
import SessionStore from "./session";

class ProfileClass {
  check(param) {
    return new Promise((resolve, reject) => {
      /* eslint-disable */
      Fetch(`{ userByParam(_id:"` + SessionStore.data._id + `") { email password } }`)
      .then(check => {
        /* eslint-enable */
        if (check.data.userByParam.password !== param.confirmation) {
          reject(2); // eslint-disable-line
        } else {
          if (check.data.userByParam.email === param.email) {
            resolve(null);
          } else {
            /* eslint-disable */
            Fetch(`{ userByParam(email:"` + param.email + `") { _id } }`)
            .then(isExist => {
              /* eslint-enable */
                if (isExist.data.userByParam === null) {
                /* eslint-disable */
                resolve(null);
              } else {
                reject(1); // eslint-disable-line
              }
            })
          }
        }
      })
    })
  }
  update(param) {
    return new Promise((resolve, reject) => {
      this.check(param)
      .then(() => {
        /* eslint-disable */
        Fetch(`mutation {
          user_update(
            _id: "` + SessionStore.data._id + `",
            name: "` + param.name + `",
            email: "` + param.email + `",
            phonenumber: "` + param.phonenumber + `",
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
