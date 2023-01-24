

import React, { useState, useEffect } from "react";
import { CardUI } from "../ElementsUI";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import '../style.css';
// import { Fade } from 'react-slideshow-image';
// import 'react-slideshow-image/dist/styles.css'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 3em;
  font-family: 'Cairo', sans-serif;
`;

const Div = styled.div`
  background-color: #e7f2e6;
  padding: 1em 3em 3em;
  min-width: 150px;
  gap: 1.5em;
  border-radius: 10px;
  justify-content: center;
  display: flex;
  flex-direction: column;
  direction: rtl;
`;

const Comp = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
  gap: 20px;
  width: 100%;
  direction: rtl;
  padding-bottom: 1em;
  &::-webkit-scrollbar {
    height: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #73a580;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track{
    background-color: hsl(118, 20%, 85%);
  }
`;

const Info = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;




function ComposCart() {

  const [allContent, setAllContent] = useState(null);
  const { user } = useParams()

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

  // console.log(allContent);
  return (
    <Container>
      {/* <Slide> */}
      <Div>
        <Info>
          <h1 style={{color: "#384b3d", margin: 0 }}>كل الفئات</h1>
          <Link className="more-link" to={`/${user}/AllContents`}><h4 style={{margin: 0}}>المزيد</h4></Link>
        </Info>

        <Comp>
          {
            allContent ?
              allContent.sort(((a,b) => b.impression - a.impression)).map((Content, i) => i < 6 && <CardUI key={i} imgSrc={Content.img} tag={Content.tag} title={Content.title} author={Content.author} id={Content.id} type={Content.tag} impression={Content.impression}/>)
              :
              <div className="Loader" style={{ width: "calc(15em * 6)" }}>
                <div className="dots">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <p>جاري التحميل</p>
              </div>
          }
        </Comp>
      </Div>
      {/* </Slide> */}
    </Container>
  );
}
export default ComposCart;
