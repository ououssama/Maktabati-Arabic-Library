import React, { useEffect } from 'react';
import { useState } from 'react';
import { CardUI, Head, Foot } from './ElementsUI';
import './style.css';
import styled from 'styled-components';
import { type } from '@testing-library/user-event/dist/type';

// styled Component
const ContentContainer = styled.div`
display: grid;
grid-template-columns: 1fr 1fr; 
grid-auto-columns: auto;
gap: 30px;
box-sizing: border-box;
@media only screen and (min-width: 768px){
    grid-template-columns: 1fr 1fr 1fr; 
}
@media only screen and (min-width: 992px){
    grid-template-columns: 1fr 1fr 1fr 1fr; 
}
@media only screen and (min-width: 1200px){
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr; 
}
`

export default function BackOfficeUI() {

    let counter = -1;
    let arr = [];
    let pageNumber = [];
    const [page, setPage] = useState(0);
    const [current, setCurrent] = useState("");

    const [allContent, setAllContent] = useState([]);
    // const [latestAddedContent, setlatestAddedContent] = useState(null);

    // const [randContent, setRandContent] = useState([])

    const [books, setBooks] = useState([]);
    const [audios, setaudios] = useState([]);
    const [videos, setvideos] = useState([]);
  
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
      setAllContent([books, audios, videos])
    }, [books, audios, videos])


    return (
        <>
            <Head />
            <div style={{ margin: "4em 4em" }}>
                <h1>أحدث الإضافات</h1>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr", gridAutoColumns: "auto", gap: "30px", boxSizing: "border-box", overflowX: 'scroll' }}>
                    {allContent && allContent.map((Content) => Content.map((eachContent, i) => i >= Content.length - 2 && <CardUI key={i} imgSrc={eachContent.img} tag={eachContent.tag} title={eachContent.title} author={eachContent.author} id={eachContent.id} type={eachContent.tag} />))}
                </div>
            </div>
            <div style={{ margin: "4em 4em" }}>
                <h1>محتوى المضاف</h1>
                <ContentContainer>
                    {
                        allContent && (
                            allContent && allContent.map((Content) => Content.map((eachContent, i) => <CardUI key={i} imgSrc={eachContent.img} tag={eachContent.tag} title={eachContent.title} author={eachContent.author} id={eachContent.id} type={eachContent.tag} />))
                    )}
                </ContentContainer>
                {/* <div style={{ display: "flex", gap: "5px", height: "min-content", justifyContent: "center", marginTop: "3em" }}>
                    { allContent && arr.map((number, i) => <span className={`pageNumbers ${i === page && current}`} onClick={(e) => { setPage(parseInt(e.target.textContent) - 1); setCurrent("active") }} key={i}>{i + 1}</span>)}
                </div> */}
            </div>
            <Foot />
        </>
    )
}