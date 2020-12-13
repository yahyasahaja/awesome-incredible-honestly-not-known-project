import Fetch from "../../libraries/fetch";

class UserClass {
  update(param) {
    return new Promise((resolve, reject) => {
      /* eslint-disable */
      Fetch(`mutation {
        enrollment_update(
          _id: "` + param._id + `",
          status: "` + param.status + `",
          class: "` + param.class + `"
        ){ _id }
      }`).then(() => {
        /* eslint-enable */
        resolve();
      });
    });
  }
}

const UserStore = new UserClass();
export default UserStore;
