import Fetch from "../library/fetch";

class LearningPathClass {
  add(param) {
    return new Promise((resolve, reject) => {
      Fetch(`mutation {
        learningpath_add(
          order: "` + param.order + `",
          title: "` + param.title + `",
          description: "` + param.description + `",
          course: "` + param.course + `",
        ) { _id }
      }`).then(result => {
        resolve(result.data.learningpath_add._id);
      });
    });
  }

  delete(_id) {
    return new Promise((resolve, reject) => {
      Fetch(`mutation { learningpath_delete(_id:"` + _id + `"){ _id } }`)
      .then(() => { resolve() });
    });
  }
}

const LearningPathStore = new LearningPathClass();
export default LearningPathStore;
