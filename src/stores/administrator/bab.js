import Fetch from "../../libraries/fetch";

class BabClass {
  add(param) {
    return new Promise((resolve, reject) => {
      /* eslint-disable */
      Fetch(`mutation {
        bab_add(
          name: "` + param.name + `",
          order: "` + param.order + `",
          course: "` + param.course + `",
        ) { _id }
      }`).then(result => {
        /* eslint-enable */
        resolve(result.data.bab_add._id);
      });
    });
  }

  update(param) {
    return new Promise((resolve, reject) => {
      /* eslint-disable */
      Fetch(`mutation {
        bab_update(
          _id: "` + param._id + `",
          name: "` + param.name + `",
          order: "` + param.order + `",
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
      Fetch(`mutation { bab_delete(_id:"` + _id + `"){ _id } }`)
      .then(() => {
        /* eslint-enable */
        resolve();
      });
    });
  }
}

const BabStore = new BabClass();
export default BabStore;
