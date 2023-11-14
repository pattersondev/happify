import React from "react";
import "./Home.css";
import Login from "../login/Login";
import { useDataLayerValue } from "../../../DataLayer";
import Happify from "../happify/Happify";

function Home() {

  const [{ token }] = useDataLayerValue();

  if (token?.access_token !== undefined) {
    return <>
      <Happify /></>
  } else {
    return <><Login /></>
  }
}

export default Home;