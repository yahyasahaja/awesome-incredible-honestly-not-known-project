import Fetch from "../library/fetch";

class ContentClass {
  add(param) {
    return new Promise((resolve, reject) => {
      /* eslint-disable */
      Fetch(`mutation {
        question_add(
          order: "` + param.order + `",
          question: "` + param.question + `",
          answer: "` + param.answer + `",
          a: "` + param.a + `",
          b: "` + param.b + `",
          c: "` + param.c + `",
          d: "` + param.d + `",
          quiz: "` + param.quiz + `",
        ) { _id }
      }`).then(result => {
        /* eslint-enable */
        resolve(result.data.question_add._id);
      });
    });
  }

  update(param) {
    return new Promise((resolve, reject) => {
      /* eslint-disable */
      Fetch(`mutation {
        question_update(
          _id: "` + param._id + `",
          order: "` + param.order + `",
          question: "` + param.question + `",
          answer: "` + param.answer + `",
          a: "` + param.a + `",
          b: "` + param.b + `",
          c: "` + param.c + `",
          d: "` + param.d + `",
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
      Fetch(`mutation { question_delete(_id:"` + _id + `"){ _id } }`)
      .then(() => { resolve() });
      /* eslint-enable */
    });
  }
}

const ContentStore = new ContentClass();
export default ContentStore;
