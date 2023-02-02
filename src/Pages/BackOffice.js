import React, { useEffect } from 'react';
import { useState } from 'react';
import { CardUI, Head, Foot } from './ElementsUI';
import './style.css';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'

// styled Component
const ContentContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  box-sizing: border-box;
  justify-content: center;
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

  const [page, setPage] = useState(1)
  const [allContent, setAllContent] = useState([]);
  const [latestContent, setLatestContent] = useState([]);
  const [successAddedMsg, setSuccessAddedMsg] = useState();
  const [successDeletedMsg, setSuccessDeletedMsg] = useState();
  let ContentStatus = sessionStorage;

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
          .then((data) => [...data2, ...data])
      ).then((data3) =>
        fetch(`http://localhost:7000/Video?_page=${page}&_limit=3`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json"
            },
          }).then((Response) => Response.json())
          .then((data) => setAllContent([...data3, ...data])))

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
          .then((data) => [...data2, ...data])
      ).then((data3) =>
        fetch(`http://localhost:7000/Video`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json"
            },
          }).then((Response) => Response.json())
          .then((data) => setLatestContent([...data3, ...data])))

    setSuccessAddedMsg(ContentStatus.getItem('isAdded'))
    setSuccessDeletedMsg(ContentStatus.getItem('isDeleted'))

  }, [])

  let popUpMessage = () => {

    setTimeout(() => {
      setSuccessAddedMsg(false)
      setSuccessDeletedMsg(false)
      ContentStatus.clear()
    }, 3000);

    return (
      <>
        <span style={{ display: successAddedMsg ? 'block' : 'none', position: 'fixed', right: '50%', translate: '50% 1em', backgroundColor: 'green', color: 'white', borderRadius: '5px', padding: '12px', zIndex: 100 }}><FontAwesomeIcon icon={faCheckCircle} style={{ marginLeft: '7px' }} /><p style={{ display: 'inline' }}>تم إضافة المحتوى بنجاح</p></span>
        <span style={{ display: successDeletedMsg ? 'block' : 'none', position: 'fixed', right: '50%', translate: '50% 1em', backgroundColor: 'green', color: 'white', borderRadius: '5px', padding: '12px', zIndex: 100 }}><FontAwesomeIcon icon={faCheckCircle} style={{ marginLeft: '7px' }} /><p style={{ display: 'inline' }}>تم إزالة المحتوى بنجاح</p></span>
      </>
    )

  }

  return (
    <>
      <Head />
      {popUpMessage()}
      <div style={{ margin: "4em 4em" }}>
        <h1>أحدث الإضافات</h1>
        <LastAdded>
          {
            latestContent && latestContent.sort(((a, b) => new Date(b.date) - new Date(a.date))).map((Content, i) => i < 6 && <CardUI key={i} imgSrc={Content.img} tag={Content.tag} title={Content.title} author={Content.author} id={Content.id} type={Content.tag} impression={Content.impression} />)
          }
        </LastAdded>
      </div>
      <div style={{ margin: "4em 4em" }}>
        <h1>محتوى المضاف</h1>
        <ContentContainer>
          {
            allContent && (
              allContent && allContent.sort(((a, b) => new Date(b.date) - new Date(a.date))).map((Content, i) => <CardUI key={i} imgSrc={Content.img} tag={Content.tag} title={Content.title} author={Content.author} id={Content.id} type={Content.tag} impression={Content.impression} />)
            )}
        </ContentContainer>
        <div style={{ display: "flex", gap: "5px", height: "min-content", justifyContent: "center", marginTop: "3em" }}>
          <Pagination onClick={() => setPage(page - 1)} disabled={page < 2 ? true : false}>السابق</Pagination>
          <Pagination onClick={() => setPage(page + 1)} disabled={allContent.length ? false : true}>التالي</Pagination>
        </div>
      </div>
      <Foot />
    </>
  )
}