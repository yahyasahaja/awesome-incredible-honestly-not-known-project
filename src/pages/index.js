import React, { Fragment } from "react";
import { useObserver } from "mobx-react-lite";
import { useApplication } from "../store";
import Navbar from "../components/navbar";
import Content from "../modules/index";

export default function Index() {
  const app = useApplication();
  return useObserver(() => (
    <Fragment>
      <Navbar />
      <Content
        postgraduate={app.course.postgraduate}
        master={app.course.master}
        certification={app.asset.certification}
        description={app.asset.description}
        offering={app.asset.offering}
        achievement={app.asset.achievement}
      />
    </Fragment>
  ));
}
