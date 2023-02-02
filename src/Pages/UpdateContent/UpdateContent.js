import React from "react";
import { useParams } from "react-router-dom";
// import { useParams } from "react-router";
import { UpdatePage, Foot, Head } from "../ElementsUI";

export default function Update() {
    let { type } = useParams();

    return (
        <>
            <Head />
                <UpdatePage contentType={type} />
            <Foot />
        </>
    )
}