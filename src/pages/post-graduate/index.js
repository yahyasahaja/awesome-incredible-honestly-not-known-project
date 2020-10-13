import React, { useState, useEffect, Fragment } from "react";
import { useApplication } from "../../store";
import Content, { PostGraduateStore } from "../../modules/post-graduate";
import Navbar from "../../components/navbar";
import Router from "next/router";

export default function Index() {
  const app = useApplication();
  const [data, setData] = useState({
    _id: "",
    title: "",
    start: "",
    duration: "",
    learningpath: [],
  });
  useEffect(() => {
    if (PostGraduateStore._id === "") {
      Router.push("/");
    } else {
      setData(app.course.findPostGraduateById(PostGraduateStore._id));
    }
  }, [app.course]);
  return (
    <Fragment>
      <Navbar />
      {data._id !== "" && <Content data={data} />}
    </Fragment>
  );
}
