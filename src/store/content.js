import Fetch from "../library/fetch";
import Router from "next/router";

class ContentClass {
  add(param) {
    return new Promise((resolve, reject) => {
      Fetch(`mutation {
        content_add(
          order: "` + param.order + `",
          title: "` + param.title + `",
          content: "` + param.content + `",
        ) { _id }
      }`).then(result => {
        Router.push("/adminpanel/content");
        resolve(result.data.content_add._id);
      });
    });
  }

  update(param) {
    return new Promise((resolve, reject) => {
      Fetch(`mutation {
        content_update(
          _id: "` + param._id + `",
          order: "` + param.order + `",
          title: "` + param.title + `",
          content: "` + param.content + `",
        ) { _id }
      }`).then(() => {
        Router.push("/adminpanel/content");
        resolve();
      });
    });
  }

  delete(_id) {
    return new Promise((resolve, reject) => {
      Fetch(`mutation { content_delete(_id:"` + _id + `"){ _id } }`)
      .then(() => {
        Router.push("/adminpanel/content");
        resolve();
      });
    });
  }
}

const ContentStore = new ContentClass();
export default ContentStore;
