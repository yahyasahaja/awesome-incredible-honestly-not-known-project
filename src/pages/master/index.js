import React, { useState, useEffect, Fragment } from "react";
import { useObserver } from "mobx-react-lite";
import { useApplication } from "../../store";
import Content, { useMaster } from "../../modules/master";
import Navbar from "../../components/navbar";
import Router from "next/router";

export default function Index() {
  const app = useApplication();
  const master = useMaster();
  const [data, setData] = useState({
    _id: "",
    title: "",
    course: "",
    duration: "",
    detail: [],
    description: "",
  });
  useEffect(() => {
    if (master._id === "") {
      Router.push("/");
    } else {
      setData(app.course.findMasterById(master._id));
    }
  }, [master._id, app.course]);
  return useObserver(() => (
    <Fragment>
      <Navbar />
      {data._id !== "" && <Content data={data} />}
    </Fragment>
  ));
}
