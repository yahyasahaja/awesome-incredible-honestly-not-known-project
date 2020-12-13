import Fetch from "../../libraries/fetch";

class QuizClass {
  add(param) {
    return new Promise((resolve, reject) => {
      /* eslint-disable */
      Fetch(`mutation {
        quiz_add(
          title: "` + param.title + `",
          course: "` + param.course + `",
        ) { _id }
      }`).then((result) => {
        /* eslint-enable */
        resolve(result.data.quiz_add._id);
      });
    });
  }

  update(param) {
    return new Promise((resolve, reject) => {
      /* eslint-disable */
      Fetch(`mutation {
        quiz_update(
          _id: "` + param._id + `",
          title: "` + param.title + `",
        ) { _id }
      }`).then((result) => {
        /* eslint-enable */
        resolve();
      });
    });
  }

  delete(_id) {
    return new Promise((resolve, reject) => {
      /* eslint-disable */
      Fetch(`mutation { quiz_delete(_id:"` + _id + `"){ _id } }`)
      .then(() => { resolve(); });
      /* eslint-enable */
    });
  }
}

const QuizStore = new QuizClass();
export default QuizStore;
