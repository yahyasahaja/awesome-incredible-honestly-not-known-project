import React, { Fragment } from "react";
import Navbar from "../components/navbar";
import Content from "../modules/index";

export default function Index() {
  return (
    <Fragment>
      <Navbar />
      <Content />
    </Fragment>
  );
}
