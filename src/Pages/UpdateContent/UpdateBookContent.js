import React from "react";
// import { useParams } from "react-router";
import { UpdatePage, Foot, Head } from "../ElementsUI";

export default function UpdateBook() {

    return (
        <>
            <Head />
                <UpdatePage contentType="كتاب" />
            <Foot />
        </>
    )
}