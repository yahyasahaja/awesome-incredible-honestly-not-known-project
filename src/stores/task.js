import Router from "next/router";
import Fetch from "../libraries/fetch";

class TaskClass {
  add(param) {
    return new Promise((resolve, reject) => {
      /* eslint-disable */
      Fetch(`mutation {
        task_add(
          title: "` + param.title + `",
          description: "` + param.description + `",
          class: "` + param.class + `",
        ) { _id }
      }`).then(result => {
        /* eslint-enable */
        Router.push("/adminpanel/class/manage/" + param.class + "/task");
        resolve(result.data.task_add._id);
      });
    });
  }

  update(param, router) {
    return new Promise((resolve, reject) => {
      /* eslint-disable */
      Fetch(`mutation {
        task_update(
          _id: "` + param._id + `",
          title: "` + param.title + `",
          description: "` + param.description + `",
        ) { _id }
      }`).then(() => {
        /* eslint-enable */
        Router.push("/adminpanel/class/manage/" + router + "/task");
        resolve();
      });
    });
  }

  delete(_id, router) {
    return new Promise((resolve, reject) => {
      /* eslint-disable */
      Fetch(`mutation { task_delete(_id:"` + _id + `"){ _id } }`)
      .then(() => {
        /* eslint-enable */
        Router.push("/adminpanel/class/manage/" + router + "/task");
        resolve();
      });
    });
  }
}

const TaskStore = new TaskClass();
export default TaskStore;
