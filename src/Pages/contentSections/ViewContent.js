
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
    fetch(`http://localhost:7000/Books`,
    {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    }).then((Response) => Response.json())
    .then((data) => data)
    .then((data2) =>
        fetch(`http://localhost:7000/Audio`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            }).then((Response) => Response.json())
            .then((data) => [...data2, ...data])
    ).then((data3) =>
        fetch(`http://localhost:7000/Video`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            }).then((Response) => Response.json())
            .then((data) => setAllContent([...data3, ...data])))

  }, [])

  return (
    <>
      <div style={{ display: "grid", gridTemplateRows: "auto 1fr auto", height: "100vh" }}>
        <Head />
        <div style={{display:'flex', justifyContent:'center'}}>
          {
            allContent?
              allContent.map((eachContent, i) => (eachContent.id === parseInt(id) && eachContent.tag === (type === 'Books' ? 'كتاب' : type === 'Video' ? 'فيديو' : 'أديو')) && <DetailPage key={i} img={eachContent.img} title={eachContent.title} author={eachContent.author} type={eachContent.tag} video={eachContent.file} audio={eachContent.file} pdf={eachContent.file} tag={eachContent.tag} description={ eachContent.description } />)
              :
              <div className="Loader" style={{ height: "calc(100vh - (40px * 2) * 2)" }}>
                <div className="dots">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
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
