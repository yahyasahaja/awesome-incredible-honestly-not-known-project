import Router from "next/router";
import Fetch from "../../libraries/fetch";

class ContentClass {
  add(param) {
    return new Promise((resolve, reject) => {
      /* eslint-disable */
      Fetch(`mutation {
        content_add(
          order: "` + param.order + `",
          title: "` + param.title + `",
          content: "` + param.content + `",
        ) { _id }
      }`).then(result => {
        /* eslint-enable */
        Router.push("/administrator/content");
        resolve(result.data.content_add._id);
      });
    });
  }

  update(param) {
    return new Promise((resolve, reject) => {
      /* eslint-disable */
      Fetch(`mutation {
        content_update(
          _id: "` + param._id + `",
          order: "` + param.order + `",
          title: "` + param.title + `",
          content: "` + param.content + `",
        ) { _id }
      }`).then(() => {
        /* eslint-enable */
        Router.push("/administrator/content");
        resolve();
      });
    });
  }

  delete(_id) {
    return new Promise((resolve, reject) => {
      /* eslint-disable */
      Fetch(`mutation { content_delete(_id:"` + _id + `"){ _id } }`)
      .then(() => {
        /* eslint-enable */
          Router.push("/administrator/content");
          resolve();
        }
      );
    });
  }
}

const ContentStore = new ContentClass();
export default ContentStore;
