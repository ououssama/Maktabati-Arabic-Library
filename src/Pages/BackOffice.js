import React, { useEffect } from 'react';
import { useState } from 'react';
import { CardUI, Head, Foot } from './ElementsUI';
import './style.css';
import styled from 'styled-components';
// import { type } from '@testing-library/user-event/dist/type';
// import { isDisabled } from '@testing-library/user-event/dist/utils';

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
const LastAdded = styled.div`
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
`
const Pagination = styled.button`
display: flex;
align-items: center;
gap: 7px;
cursor: pointer;
border-radius: 5px;
border: none;
font-size: 14px;
background-color: #4EAA4B;
color: white;
font-family: 'Cairo', sans-serif;
padding: 10px 14px;
 &:hover{
     background-color: #418E3E;
 }
 &:active{
     background-color: #3a8038;
};
  &:disabled{
    background-color: #c6c6c6;
  }
`

export default function BackOfficeUI() {

  // let counter = -1;
  // let arr = [];
  // let pageNumber = [];
  // const [page, setPage] = useState(0);
  // const [current, setCurrent] = useState("");
  const [page, setPage] = useState(1)
  const [allContent, setAllContent] = useState([]);
  const [latestContent, setLatestContent] = useState([]);

  // const [randContent, setRandContent] = useState([])

  const [books, setBooks] = useState([]);
  const [audios, setaudios] = useState([]);
  const [videos, setvideos] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:7000/Books?_page=${page}&_limit=3`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      }).then((Response) => Response.json())
      .then((data) => data)
      .then((data2) =>
        fetch(`http://localhost:7000/Audio?_page=${page}&_limit=3`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json"
            },
          }).then((Response) => Response.json())
          .then((data) => [data2, data])
    ).then((data3) => 
    fetch(`http://localhost:7000/Video?_page=${page}&_limit=3`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    }).then((Response) => Response.json())
    .then((data) => setAllContent([...data3, data])))

  }, [page])

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
          .then((data) => [data2, data])
    ).then((data3) => 
    fetch(`http://localhost:7000/Video`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    }).then((Response) => Response.json())
    .then((data) => setLatestContent([...data3, data])))

  }, [null])

  return (
    <>
      <Head />
      <div style={{ margin: "4em 4em" }}>
        <h1>أحدث الإضافات</h1>
        <LastAdded>
          {latestContent && latestContent.map((Content) => Content.map((eachContent, i) => i >= Content.length - 2 && <CardUI key={i} imgSrc={eachContent.img} tag={eachContent.tag} title={eachContent.title} author={eachContent.author} id={eachContent.id} type={eachContent.tag} />))}
        </LastAdded>
      </div>
      <div style={{ margin: "4em 4em" }}>
        <h1>محتوى المضاف</h1>
        <ContentContainer>
          {
            allContent && (
              allContent && allContent.map((Content) => Content.map((eachContent, i) => <CardUI key={i} imgSrc={eachContent.img} tag={eachContent.tag} title={eachContent.title} author={eachContent.author} id={eachContent.id} type={eachContent.tag} />))
            )}
        </ContentContainer>
        <div style={{ display: "flex", gap: "5px", height: "min-content", justifyContent: "center", marginTop: "3em" }}>
          <Pagination onClick={() => setPage(page - 1)} disabled={page < 2 ? true : false}>السابق</Pagination>
          <Pagination onClick={() => setPage( page + 1)} disabled={allContent[0]?.length === 0 || allContent[1]?.length === 0 || allContent[2]?.length <= 0? true : false}>التالي</Pagination>
        </div>
      </div>
      <Foot />
    </>
  )
}