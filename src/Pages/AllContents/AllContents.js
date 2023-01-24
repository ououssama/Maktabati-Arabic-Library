import { Head, Foot, CardUI } from "../ElementsUI";
import { useState, useEffect } from "react";
import styled from "styled-components";

const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr; 
  grid-auto-columns: auto;
  gap: 30px;
  box-sizing: border-box;
  margin: 4em;
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

export default function AllContents() {

    const [allContent, setAllContent] = useState(null);
    // const { user } = useParams()

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
                    .then((data) => setAllContent([...data3, data])))

    }, [])
    return (
        <>
            <Head />
            <div>
                    {
                         allContent?
                        <ContentContainer>
                            {allContent.map((Content) => Content.map((eachContent, i) => <CardUI key={i} imgSrc={eachContent.img} tag={eachContent.tag} title={eachContent.title} author={eachContent.author} id={eachContent.id} type={eachContent.tag} />))}
                        </ContentContainer>
                           :
                            <div className="Loader" style={{height:"calc(100vh - 180px)"}}>
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
        </>
    )
}