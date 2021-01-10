import Fetch from "../../libraries/fetch";

class MateriClass {
  add(param) {
    return new Promise((resolve, reject) => {
      /* eslint-disable */
      Fetch(`mutation {
        materi_add(
          name: "` + param.name + `",
          content: "` + param.content + `",
          order: "` + param.order + `",
          bab: "` + param.bab + `",
        ) { _id }
      }`).then(result => {
        /* eslint-enable */
        resolve(result.data.materi_add._id);
      });
    });
  }

  update(param) {
    return new Promise((resolve, reject) => {
      /* eslint-disable */
      Fetch(`mutation {
        materi_update(
          _id: "` + param._id + `",
          name: "` + param.name + `",
          content: "` + param.content + `",
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
      Fetch(`mutation { materi_delete(_id:"` + _id + `"){ _id } }`)
      .then(() => {
        /* eslint-enable */
        resolve();
      });
    });
  }
}

const MateriStore = new MateriClass();
export default MateriStore;
