// import { useState, useEffect } from "react";
// import { CardUI } from "../ElementsUI";
// import styled from "styled-components";
// //  import useFetch from "./useFetch";

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


// function ComposBook() {
//   // let {data,isLoading,errMsg}=useFetch('http://localhost:3000/composantBook')

//   const [books, setBooks] = useState(null);
//   useEffect(() => {
//     fetch(`http://localhost:7000/Contents/`,
//       {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json"
//         },
//       }).then((Response) => Response.json())
//       .then((data) => setBooks(data.Books))
//       .catch((error) => console.error(error))
//   }, [])

//   return (
//     <Container>
//       <Div>
//         <Info>
//           <h1 style={{ color: "#384b3d", margin: 0 }}> </h1>
//           <h4 style={{ margin: 0 }}>المزيد</h4>
//         </Info>

//         <Comp>
//           {books ?
//             books.map((latestContent, i) => i > books.length - 6 && <CardUI key={i} imgSrc={latestContent.img} tag={latestContent.tag} title={latestContent.title} author={latestContent.author} id={latestContent.id} />)
//             :
//             <div className="Loader" style={{ width: "calc(15em * 5)" }}>
//               <div className="dots">
//                 <span></span>
//                 <span></span>
//                 <span></span>
//                 <span></span>
//               </div>
//               <p>جاري التحميل</p>
//             </div>
//           }
//         </Comp>
//       </Div>
//     </Container>
//   );
// }

// export default ComposBook;



import React, { useState, useEffect } from "react";
import { CardUI } from "../ElementsUI";
import styled from "styled-components";


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
`;

const Info = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;




function ComposBook() {

  const [book, setBook] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:7000/Books/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      }).then((Response) => Response.json())
      .then((data) => setBook(data))
      .catch((error) => console.error(error));


  }, [])


  // console.log(allContent);
  return (
    <Container>
      {/* <Slide> */}
      <Div>
        <Info>
          <h1
            style={{
              color: "#384b3d",
              margin: 0,
            }}
          >
            الكتب
          </h1>
          <h4
            style={{
              margin: 0,
            }}
          >
            المزيد
          </h4>
        </Info>

        <Comp>
          {
            book ?
              book.map((eachContent, i) => i >= (book.length) -5  && <CardUI key={i} imgSrc={eachContent.img} tag={eachContent.tag} title={eachContent.title} author={eachContent.author} id={eachContent.id} type={eachContent.tag} />)
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
export default ComposBook;
