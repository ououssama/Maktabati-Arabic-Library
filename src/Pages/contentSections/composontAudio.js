
// import React, { useEffect, useState } from "react";
// import { CardUI } from "../ElementsUI";
// import styled from "styled-components";

// const Container = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   margin: 0 3em;
// `;

// const Div = styled.div`
//   background-color: #e7f2e6;
//   padding: 1em 3em 3em;
//   min-width: 150px;
//   gap: 1.5em;
//   border-radius: 10px;
//   justify-content: center;
//   display: flex;
//   flex-direction: column;
//   direction: rtl;
// `;

// const Comp = styled.div`
//   display: flex;
//   flex-direction: row;
//   overflow-x: scroll;
//   gap: 20px;
//   width: 100%;
//   direction: rtl;
//   padding-bottom: 1em;
//   &::-webkit-scrollbar {
//     height: 5px;
//   }
//   &::-webkit-scrollbar-thumb {
//     background-color: #73a580;
//     border-radius: 10px;
//   }
// `;

// const Info = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
// `;




// function ComposAudio() {

//   const [Audios, setAudios] = useState(null);

//   useEffect(() => {
//     fetch(`http://localhost:7000/Contents/`,
//       {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json"
//         },
//       }).then((Response) => Response.json())
//       .then((data) => setAudios(data.Audio))
//       .catch((error) => console.error(error))
//   },[])

//   return (
//     <Container>
//       <Div>
//         {" "}
//         <Info>
//           <h1
//             style={{
//               color: "#384b3d",
//               margin: 0,
//             }}
//           >
//             {" "}
//             اديو
//           </h1>
//           <h4
//             style={{
//               margin: 0,
//             }}
//           >
//             المزيد
//           </h4>
//         </Info>
//         <Comp>
//           {Audios ?
//             Audios.map((latestContent, i) => i > Audios.length - 6 && <CardUI key={i} imgSrc={latestContent.img} tag={latestContent.tag} title={latestContent.title} author={latestContent.author} id={latestContent.id} />)
//             :
//             <div className="Loader" style={{ width: "calc(15em * 5)" }}>
//               <div className="dots">
//                 <span></span>
//                 <span></span>
//                 <span></span>
//                 <span></span>
//               </div>
//               <p>جاري التحميل</p>
//             </div>}
//         </Comp>
//       </Div>
//     </Container>
//   );
// }
// export default ComposAudio;


import React, { useState, useEffect } from "react";
import { CardUI } from "../ElementsUI";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";

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


function ComposAudio() {

  const [audio, setAudio] = useState([]);
  const { user } = useParams();

  useEffect(() => {
    fetch(`http://localhost:7000/Audio/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      }).then((Response) => Response.json())
      .then((data) => setAudio(data))
      .catch((error) => console.error(error));


  }, [])

  // console.log(allContent);
  return (
    <Container>
      {/* <Slide> */}
      <Div>
        <Info>
          <h1 style={{ color: "#384b3d", margin: 0 }}>اديوهات</h1>
          <Link className="more-link" to={`/${user}/Audios`}><h4 style={{ margin: 0 }}>المزيد</h4></Link>
        </Info>

        <Comp className="section-scroll">
          {
            audio.length ?
              audio.map((eachContent, i) => i >= (audio.length) - 5 && <CardUI key={i} imgSrc={eachContent.img} tag={eachContent.tag} title={eachContent.title} author={eachContent.author} id={eachContent.id} type={eachContent.tag} />)
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
export default ComposAudio;
