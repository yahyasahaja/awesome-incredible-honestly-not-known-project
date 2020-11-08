import Fetch from "../library/fetch";

class KeyFeatureClass {
  add(param) {
    return new Promise((resolve, reject) => {
      Fetch(`mutation {
        keyfeature_add(
          order: "` + param.order + `",
          title: "` + param.title + `",
          course: "` + param.course + `",
        ) { _id }
      }`).then(result => {
        resolve(result.data.keyfeature_add._id);
      });
    });
  }

  delete(_id) {
    return new Promise((resolve, reject) => {
      Fetch(`mutation { keyfeature_delete(_id:"` + _id + `"){ _id } }`)
      .then(() => { resolve() });
    });
  }
}

const KeyFeatureStore = new KeyFeatureClass();
export default KeyFeatureStore;
