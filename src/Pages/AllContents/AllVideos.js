import { Head, Foot, CardUI } from "../ElementsUI";
import { useState, useEffect } from "react";
import styled from "styled-components";
import '../style.css'

const ContentContainer = styled.div`
  display: grid;
  justify-content: space-evenly;
  grid-template-columns: repeat(2, auto); 
  grid-auto-columns: auto;
  gap: 25px;
  box-sizing: border-box;
margin: 4em;
  @media only screen and (max-width: 1200px){
      grid-template-columns: auto; 
  }
`

export default function AllVideoContent() {
    const [video, setVideo] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:7000/Video/`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            }).then((Response) => Response.json())
            .then((data) => setVideo(data))
            .catch((error) => console.error(error));


    }, [])
    return (
        <>
            <Head />
            {
                video.length ?
                    <ContentContainer>
                        {video.sort((a,b) => a.data - b.data).map((eachContent, i) => <CardUI key={i} imgSrc={eachContent.img} tag={eachContent.tag} title={eachContent.title} author={eachContent.author} id={eachContent.id} type={eachContent.tag} impression={eachContent.impression}/>)}
                    </ContentContainer>
                    :
                    <div className="Loader" style={{ height: "calc(100vh - 180px)" }}>
                        <div className="dots">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                        <p>جاري التحميل</p>
                    </div>
            }
            <Foot />
        </>
    )
}