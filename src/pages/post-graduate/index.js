import React, { useState, useEffect, Fragment } from "react";
import { useObserver } from "mobx-react-lite";
import { useApplication } from "../../store";
import Content, { usePostGraduate } from "../../modules/post-graduate";
import Navbar from "../../components/navbar";
import Router from "next/router";

export default function Index() {
  const app = useApplication();
  const postGraduate = usePostGraduate();
  const [data, setData] = useState({
    _id: "",
    title: "",
    start: "",
    duration: "",
    learningpath: [],
  });
  useEffect(() => {
    if (postGraduate._id === "") {
      Router.push("/");
    } else {
      setData(app.course.findPostGraduateById(postGraduate._id));
    }
  }, [postGraduate._id, app.course]);
  return useObserver(() => (
    <Fragment>
      <Navbar />
      {data._id !== "" && <Content data={data} />}
    </Fragment>
  ));
}
