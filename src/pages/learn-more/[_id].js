import React, { Fragment } from "react";
import Content from "../../modules/learn-more";
import Navbar from "../../components/navbar";
import Fetch from "../../library/fetch";

export async function getServerSideProps(context) {
  /* eslint-disable */
  const data = await Fetch(`{
    courseById(_id:"` + context.params._id + `") {
      _id
      type
      title
      start
      duration
      description,
      learningpath {
        _id
        order
        title
        description
      }
    }
  }`).then((result) => {
    return result.data.courseById;
  })
  /* eslint-enable */
  return {
    props: {
      data: data
    },
  }
}

export default function Index({ data }) {
  return (
    <Fragment>
      <Navbar />
      <Content data={data} />
    </Fragment>
  );
}
