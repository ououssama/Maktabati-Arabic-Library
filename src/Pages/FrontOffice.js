import React, { useEffect } from "react";
import {Head} from "./ElementsUI";
import {Foot} from "./ElementsUI";
import ComposCart from "./contentSections/composantUI";
import ComposAudio from "./contentSections/composontAudio";
import ComposVid from "./contentSections/composantVideo";
import ComposBook from "./contentSections/composantBook";
import './style.css'
import { useLocation, useNavigate } from "react-router-dom";

export function FrontOffice() {
  let route = useLocation()
  let defineUser = useNavigate()

  useEffect(() => {
    // console.log(route.pathname);
    route.pathname === '/' && defineUser('/guest')
  },[])
  return (
    <>
        <Head />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "3em",
            margin: "5em 0",
          }}
        >
          <ComposCart />
          <ComposBook />
          <ComposVid />
          <ComposAudio />
        </div>
        <Foot />
    </>
  );
}
