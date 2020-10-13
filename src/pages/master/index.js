import React, { useState, useEffect, Fragment } from "react";
import { useApplication } from "../../store";
import Content, { MasterStore } from "../../modules/master";
import Navbar from "../../components/navbar";
import Router from "next/router";

export default function Index() {
  const app = useApplication();
  const [data, setData] = useState({
    _id: "",
    title: "",
    course: "",
    duration: "",
    detail: [],
    description: "",
  });
  useEffect(() => {
    if (MasterStore._id === "") {
      Router.push("/");
    } else {
      setData(app.course.findMasterById(MasterStore._id));
    }
  }, [app.course]);
  return (
    <Fragment>
      <Navbar />
      {data._id !== "" && <Content data={data} />}
    </Fragment>
  );
}
