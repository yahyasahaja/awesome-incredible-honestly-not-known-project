import React, { Fragment } from "react";
import Navbar from "../components/navbar";
import Content from "../modules/index";
import Fetch from "../library/fetch";

export async function getServerSideProps() {
  /* eslint-disable */
  const postgraduate = await Fetch(`{
    courseByType(type:"postgraduate") {
      _id
      title
      start
      duration
    }
  }`).then((result) => {
    return result.data.courseByType;
  })
  const master = await Fetch(`{
    courseByType(type:"master") {
      _id
      title
      start
      duration
    }
  }`).then((result) => {
    return result.data.courseByType;
  })
  /* eslint-enable */
  return {
    props: {
      postgraduate: postgraduate,
      master: master
    },
  }
}

export default function Index({ postgraduate, master }) {
  return (
    <Fragment>
      <Navbar />
      <Content postgraduate={postgraduate} master={master} />
    </Fragment>
  );
}
