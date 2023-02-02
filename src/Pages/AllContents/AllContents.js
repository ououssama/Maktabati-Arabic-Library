import { Head, Foot, CardUI } from "../ElementsUI";
import { useState, useEffect } from "react";
import styled from "styled-components";

const ContentContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
  box-sizing: border-box;
  margin: 4em;
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
            <Head />
            <div>
                    {
                         allContent?
                        <ContentContainer>
                            {allContent.sort(((a,b) => b.impression - a.impression)).map((Content, i) => <CardUI key={i} imgSrc={Content.img} tag={Content.tag} title={Content.title} author={Content.author} id={Content.id} type={Content.tag} impression={Content.impression}/>)}
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