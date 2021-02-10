import Router from "next/router";
import Fetch from "../../libraries/fetch";

class ClassClass {
  add(param) {
    return new Promise((resolve, reject) => {
      /* eslint-disable */
      Fetch(`mutation {
        class_add(
          name: "` + param.name + `",
          course: "` + param.course + `",
          instructor: "` + param.instructor + `",
        ) { _id }
      }`).then(result => {
        /* eslint-enable */
        Router.push("/administrator/class");
        resolve(result.data.class_add._id);
      });
    });
  }

  update(param) {
    return new Promise((resolve, reject) => {
      /* eslint-disable */
      Fetch(`mutation {
        class_update(
          _id: "` + param._id + `",
          name: "` + param.name + `",
          course: "` + param.course + `",
          instructor: "` + param.instructor + `",
        ) { _id }
      }`).then(() => {
        /* eslint-enable */
        Router.push("/administrator/class");
        resolve();
      });
    });
  }

  delete(_id) {
    return new Promise((resolve, reject) => {
      /* eslint-disable */
      Fetch(`mutation { class_delete(_id:"` + _id + `"){ _id } }`)
      .then(() => {
        Router.push("/administrator/class");
        resolve();
      });
      /* eslint-enable */
    });
  }
}

const ClassStore = new ClassClass();
export default ClassStore;
