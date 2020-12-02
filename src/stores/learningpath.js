import Fetch from "../libraries/fetch";

class LearningPathClass {
  add(param) {
    return new Promise((resolve, reject) => {
      /* eslint-disable */
      Fetch(`mutation {
        learningpath_add(
          order: "` + param.order + `",
          title: "` + param.title + `",
          description: "` + param.description + `",
          course: "` + param.course + `",
        ) { _id }
      }`).then(result => {
        /* eslint-enable */
        resolve(result.data.learningpath_add._id);
      });
    });
  }

  delete(_id) {
    return new Promise((resolve, reject) => {
      /* eslint-disable */
      Fetch(`mutation { learningpath_delete(_id:"` + _id + `"){ _id } }`)
      .then(() => { resolve(); });
      /* eslint-enable */
    });
  }
}

const LearningPathStore = new LearningPathClass();
export default LearningPathStore;
