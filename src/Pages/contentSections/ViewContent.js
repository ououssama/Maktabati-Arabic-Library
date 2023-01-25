
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DetailPage, Foot, Head } from "../ElementsUI";

export default function ViewContent() {
  let { id, type } = useParams();
  const [books, setBooks] = useState([]);
  const [audios, setaudios] = useState([]);
  const [videos, setvideos] = useState([]);
  const [allContent, setAllContent] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:7000/Books/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      }).then((Response) => Response.json())
      .then((data) => setBooks(data))

    fetch(`http://localhost:7000/Audio/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      }).then((Response) => Response.json())
      .then((data) => setaudios(data))
    fetch(`http://localhost:7000/Video/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      }).then((Response) => Response.json())
      .then((data) => setvideos(data))

  }, [])


  useEffect(() => {
    (books.length || videos.length || audios.length) && setAllContent([books, audios, videos])
  }, [books, audios, videos])


  // console.log(allContent.Audio);

  return (
    <>
      <div style={{ display: "grid", gridTemplateRows: "auto 1fr auto", height: "100vh" }}>
        <Head />
        <div>
          {
            allContent?
              allContent.map((eachContent) => eachContent.map((Content, i) => (Content.id === parseInt(id) && Content.tag === (type === 'Books' ? 'كتاب' : type === 'Video' ? 'فيديو' : 'اديو')) && <DetailPage key={i} img={Content.img} title={Content.title} author={Content.author} type={Content.tag} video={Content.file} audio={Content.file} pdf={Content.file} tag={Content.tag} description={ Content.description } />))
              :
              <div className="Loader" style={{ height: "calc(100vh - (40px * 2) * 2)" }}>
                <div className="dots">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  {/* <img src="/book.gif" /> */}
                </div>
                <p>جاري التحميل</p>
              </div>
          }
        </div>
        <Foot />
      </div>
    </>
  )
}
