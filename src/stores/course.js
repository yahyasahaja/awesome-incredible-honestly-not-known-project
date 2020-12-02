import Router from "next/router";
import Fetch from "../libraries/fetch";

class CourseClass {
  add(param) {
    return new Promise((resolve, reject) => {
      /* eslint-disable */
      Fetch(`mutation {
        course_add(
          type: "` + param.type + `",
          title: "` + param.title + `",
          description: "` + param.description + `",
        ) { _id }
      }`).then(result => {
        /* eslint-enable */
        Router.push("/adminpanel/course");
        resolve(result.data.course_add._id);
      });
    });
  }

  update(param) {
    return new Promise((resolve, reject) => {
      /* eslint-disable */
      Fetch(`mutation {
        course_update(
          _id: "` + param._id + `",
          type: "` + param.type + `",
          title: "` + param.title + `",
          description: "` + param.description + `",
        ) { _id }
      }`).then(() => {
        /* eslint-enable */
        Router.push("/adminpanel/course");
        resolve();
      });
    });
  }

  delete(_id) {
    return new Promise((resolve, reject) => {
      /* eslint-disable */
      Fetch(`mutation { course_delete(_id:"` + _id + `"){ _id } }`)
      .then(() => {
        /* eslint-enable */
        Router.push("/adminpanel/course");
        resolve();
      });
    });
  }
}

const CourseStore = new CourseClass();
export default CourseStore;
