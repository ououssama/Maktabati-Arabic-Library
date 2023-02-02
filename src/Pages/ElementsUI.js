import React from 'react';
import styled, { css } from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faHeadphones, faSearch, faPlusCircle, faUser, faVideo, faCamera, faCloudUpload, faFileAudio, faFilePdf, faFileVideo, faDownload, faTrashCan, faPencil, faEye } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useRef, useState } from 'react'
// import video from "../public/Database/video/bookvideo.mp4"

// import { Link } from 'react-router'
import './style.css';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';

let pdfRegx = RegExp(/\.pdf/);
let audioRegx = RegExp(/\.mp3 || \.wav/);
let videoRegx = RegExp(/\.mp4 || \.mov/);

// Styled components
const Button = styled.button`
    display: flex;
    align-items: center;
    width: max-content;
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
    };
     &:active{
     background-color: #3a8038;

};
    ${props => props.admin && css`
    @media only screen and (max-width: 600px){
      padding: 14px;
      font-size: 25px;
      border-radius: 100%;
    }
    `};

    ${props => props.second && css`
      font-size: 18px;
    `};
    `

// Style for cardUI components
const CardDisplay = styled.div`
  display: flex;
  flex-direction: column;
  width: max-content;
  direction: rtl;
  display: inline-block;
`
const ContentText = styled.p`
margin: 0;
font-size: 20px;
line-height: 1.3;

${props => props.secondText && css`
  font-size: 16px;
  color: #999;
`}
`

// Style for header components
const Header = styled.header`
    display: flex;
    justify-content: space-between;
    padding: 0 40px;
    width: 100%;
    box-sizing: border-box;
    align-items: center;
    height: 70px;
    background-color: #8acb88;
    gap: 4em;
    position: relative;
    `
const DropDownMenu = styled.ul`
    position: absolute;
    list-style: none;
    background-color: white;
    border: solid 1.5px #499C44;
    width: 100%;
    padding: 5px;
    box-sizing: border-box;
    left: 0;
    top: 2em;
    border-radius: 5px;
    z-index: 10;
    @media only screen and (max-width: 600px){
     translate: calc(-100% + 40px) calc(-100% - 55px);
     width: max-content;
    }
   `

const AddButton = styled.p`
    margin: 0;
    display: block;
    @media only screen and (max-width: 600px){
     display: none;
    }
   `

//  style for searchbar
const SearchBar = styled.div`
    width: 100%; 
    max-width: 700px; 
    position: relative;
    display: block;
    z-index: 20;
    @media only screen and (max-width: 768px){
      display:'none';
      position: absolute;
      width: 100%;
      // min-width: 100%;
      padding: 0 15px;
      right: 0;
      box-sizing: border-box;
      flex: 1;
    }
    `

const InputSearch = styled.input`
  width: 100%;
  background-color: #69ad67;
  color: white;
  box-sizing: border-box;
  padding: 12px 50px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  float: right;
  font-size: 20px;
  outline: none; 
  /* overflow: hidden; */
  ::placeholder{
    color: white;
    opacity:0.7;
  }
  &:active{
    outline:none;
     border: none;
  }

`

const SerachResulte = styled.div`
  position: absolute;
  top: 3.5em;
  width: 100%;
  padding: 15px;
  background: white;
  box-shadow: 0 10px 13px 0px #00000026;
  box-sizing: border-box;
  border-radius: 5px;
  text-align: center;
  z-index: 10;
  @media only screen and (max-width: 768px){
    width: calc(100% - 30px);
  }
`

const QueryResult = styled.div`
  position: relative;
  color: #36bf31;
  z-index: 1;
  cursor: pointer;
  text-align: start;
  padding: 5px 5px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap:10px;
  &:hover{
    border-radius:5px;
    background-color: #0000000a;
  }
`

const SearchButton = styled.div`
  background-color: #4EAA4B; 
  border-radius: 10px;  
  cursor: pointer;
  display: none;
  @media only screen and (max-width: 768px){
    display: inherit;
  }
`

// Style for footer components
const Footer = styled.footer`
  bottom: auto;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  box-sizing: border-box;
  padding: 30px 50px;
  align-items: center;
  background-color: #1b261e;
  @media only screen and (max-width: 600px){
    flex-direction: column;
  }
`

const Nav = styled.span`
  margin:5px;
  padding: 5px 14px;
 color: white; 
 font-size: 15px; 
 display: inline-block;
 &:hover{
  background-color: #418E3E;
  border-radius:10px
 }
`

const Copyright = styled.p`
 color:white;
 text-align:center;
`

const Logo = styled.p`
 font-weight: 500;
 margin: 0;
 color:white;
 font-size:28px;
`
const Li = styled.li`
 padding: 5px 15px;
 border-radius: 3px;
 cursor: pointer;
 &:hover{
  background-color: #4EAA4B;
  color:white;
 }
`

// styled components for add content page
const Input = styled.input`
    padding: 7px 5px;
`

const Submit = styled.input`
    width: max-content;
    align-self: end;
    cursor: pointer;
    border-radius: 5px;
    border: none;
    font-size: 15px;
    background-color: #4EAA4B;
    color: white;
    font-family: 'Cairo', sans-serif;
    padding: 7px 14px;
     &:hover{
         background-color: #418E3E;
    };`

const AddContentButton = styled.div`
  position: relative;
  width: max-content;
  @media only screen and (max-width: 600px){
    z-index: 20;
    position: fixed;
    bottom: 10px;
    right: 10px;
  }
`

// style for options availble to admin
const Options = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    overflow: hidden;
    background-color: rgba(0, 0, 0, 0.9);
    z-index: 1;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    opacity: 0;
    transition: all 0.3s ease;
    display: flex;
    gap: 1em;
    justify-content: center;
    align-items: center;
    &:hover {
      opacity: 1;
    };
  `;
const OptionsTool = styled.button`
  position:relative;
  width: 60px;
  width: max-content;
  height: 60px;
  padding: 0 15px;
  border: none;
  border-radius: 10px;
  background-color: #c5c39294;
  color: white;
  font-size: 17px;
  cursor: pointer;
  font-family: "Cairo", sans-serif;
  ${(props) => props.delete && css`
  background-color: #f41f;
  width: 60px;
  &:hover {
    background-color: #db3d12;
  };
    `};
  ${(props) => props.update && css`
  background-color: #1185ff;
  width: 60px;
  &:hover {
    background-color: #1273db;
  };
    `};
`;

//  style for view content page
const CoverImg = styled.img`
  height: 100%;
  width: 15em;
  border: solid .5px #9998;
  border-radius: 10px;
  overflow: hidden;
  ${(props) => props.meduim && css`
  height: 22em;
  width: 17em;
  `};
`
const CoverVideo = styled.img`
  height: 100%;
  width: max-content;
  min-width: 50px;
  object-fit: cover;
  border: solid .5px #9998;
  border-radius: 10px;
  overflow: hidden;
  ${(props) => props.meduim && css`
  height: 22em;
  width: 17em;
  `};
`

const Titre = styled.h1`
  font-size: 32px;
  margin: 0;
  color: #73a580;
`;
const Description = styled.div`
  font-size: 18px;
  position: relative;
  flex-wrap: wrap;
  flex: flex;
  margin: 15px 0;
  
`;

const Responsive = styled.div`
  width: 100%;
  max-width: 70em;
  height: 100%;
  padding: 5em 4em;
  box-sizing: border-box;
  display: flex;
  gap: 3em;
  margin: 0;
  align-items: start;
  justify-content:start;

  @media only screen and (max-width: 768px) {
    flex-direction: column;
  }
;

`

// Components
function CardUI(btn) {

  let navigate = useNavigate();
  let { user } = useParams();
  let route = useLocation();
  const [routeCheckout, setRouteCheckout] = useState();
  const [viewRate, setViewRate] = useState(0);
  let isDeleted = sessionStorage;

  // check for the route path name
  useEffect(() => {
    setRouteCheckout(route.pathname)
  }, [route.pathname])

  // track users clicked content to costumize what they want to see
  useEffect(() => {
    if (viewRate) {
      const data = {
        impression: btn.impression + 1
      }
      fetch(`http://localhost:7000/${btn.type === 'كتاب' ? 'Books' : btn.type === 'فيديو' ? 'Video' : 'Audio'}/${btn.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data),
        }).then((Response) => Response.json())
        .then(() => navigate(`/${user}/view/${btn.type === 'كتاب' ? 'Books' : btn.type === 'فيديو' ? 'Video' : 'Audio'}/${btn.id}`))
    }
  }, [btn.id, btn.impression, btn.type, navigate, user, viewRate])



  const DeleteContent = (targetedIDContent, targetedTypeContent) => {
    fetch(`http://localhost:7000/${targetedTypeContent === "كتاب" ? "Books" : targetedTypeContent === "أديو" ? "Audio" : targetedTypeContent === "فيديو" && "Video"}/${targetedIDContent}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((Response) => console.log(Response.json()))

    isDeleted.setItem('isDeleted', true)
  }

  return (
    <CardDisplay>
      <div style={{ position: "relative" }}>
        <div style={{ position: "relative", height: '20em', marginBottom: '7px' }}>
          {/* Check content type to give it the propre cover size */}
          {btn.type === 'فيديو' ?
            <CoverVideo src={`/Database/images/${btn.imgSrc}`} alt={btn.title} />
            :
            <CoverImg src={`/Database/images/${btn.imgSrc}`} alt={btn.title} />

          }
          <span style={{ position: "absolute", right: "0", top: "0", padding: "7px 15px", fontSize: "12px", fontWeight: "600", color: btn.tag === "كتاب" ? "#fff" : "#2d2d2", margin: "5px", borderRadius: "10px", backgroundColor: btn.tag === "كتاب" ? "#FF3636" : btn.tag === "فيديو" ? "#FFC736" : "#8EFF36" }}>{btn.tag}</span>
          {
            // check if current user is in the dashbord page and add option for him
            routeCheckout && routeCheckout.match(/dashbord/) ?
              <Options className='options'>
                {/* <More onClick={() => navigate(`/view/${btn.type === 'كتاب' ? 'Books' : btn.type === 'فيديو' ? 'Video' : 'Audio'}/${btn.id}`)}>more</More> */}
                <OptionsTool className='options-tool' delete onClick={() => DeleteContent(btn.id, btn.type)}>
                  <div className='tooltiptext'>Delete</div>
                  <FontAwesomeIcon icon={faTrashCan} size={'xl'}></FontAwesomeIcon>
                </OptionsTool>
                <OptionsTool className='options-tool' update onClick={() => navigate(`/${user}/dashbord/update/${btn.type === 'كتاب' ? 'Books' : btn.type === 'فيديو' ? 'Video' : 'Audio'}/${btn.id}`)}>
                  <div className='tooltiptext'>Update</div>
                  <FontAwesomeIcon icon={faPencil} size={'xl'}></FontAwesomeIcon>
                </OptionsTool>
              </Options>
              :
              <Options>
                <OptionsTool onClick={() => setViewRate(viewRate + 1)}>
                  <FontAwesomeIcon icon={faEye}></FontAwesomeIcon>
                  <p style={{ display: 'inline', marginRight: '15px' }}>المزيد</p>
                </OptionsTool>
              </Options>
          }
        </div>

        <ContentText>{btn.title}</ContentText>
        <ContentText secondText>{btn.author}</ContentText>
      </div>

    </CardDisplay>
  );
}
function Head() {

  const [searchQuery, setSearchQuery] = useState();
  const SearchOpen = useRef();
  const [searchBarVisiblity, setSearchBarVisiblity] = useState(true)
  const isInsideSearchBar = useRef();
  const [listVisiblity, setListVisiblity] = useState(false)
  const [allContent, setAllContent] = useState([]);
  const [iconHoverBook, setIconHoverBook] = useState(false);
  const [iconHoverAudio, setIconHoverAudio] = useState(false);
  const [iconHoverVideo, setIconHoverVideo] = useState(false);
  const [menuToggel, setMenuToggel] = useState(false);
  const insideButton = useRef();
  const { user } = useParams();
  const navigate = useNavigate();

  // Hook that take the user search query and match it with right content
  useEffect(() => {
    fetch(`http://localhost:7000/Books?title_like=^${searchQuery}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      }).then((Response) => Response.json())
      .then((data) => data)
      .then((data2) =>
        fetch(`http://localhost:7000/Audio?title_like=^${searchQuery}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json"
            },
          }).then((Response) => Response.json())
          .then((data) => [...data2, ...data])
      ).then((data3) =>
        fetch(`http://localhost:7000/Video?title_like=^${searchQuery}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json"
            },
          }).then((Response) => Response.json())
          .then((data) => setAllContent([...data3, ...data])))

  }, [searchQuery])

  // check if the width of the window in the first load to make the search bar responsive
  window.onload = () => {
    if (window.innerWidth <= 775) {
      setSearchBarVisiblity(false)
    } else {
      setSearchBarVisiblity(true)
    }
  }


  useEffect(() => {
    window.onclick = (e) => {
      // check if user has clicked in the add button
      if (e.target.parentElement === insideButton.current || e.target === insideButton.current) {
        setMenuToggel(true);
      } else {
        setMenuToggel(false);
      }
      // check if user has clicked in the search icon
      if (window.innerWidth <= 775) {
        if (e.target.parentElement === insideButton.current || e.target === SearchOpen.current) {
          setSearchBarVisiblity(true);
        }
      }
    }

    //  show result for users only if he search somthing
    if (searchQuery) {
      setListVisiblity(true)
    } else {
      setListVisiblity(false)
    }

    // check if the width of the window when it is resized to make the search bar responsive
    window.onresize = () => {
      if (window.innerWidth <= 768) {
        setSearchBarVisiblity(false)
      } else {
        setSearchBarVisiblity(true)
      }
    }
  })



  return (
    <Header>
      {/* check the state of the user anď match it with the right page layout */}
      {user === "admin" ? (
        <>
          <Link to="/admin" style={{ textDecoration: "none", display: 'flex', alignItems: 'center', gap: '15px' }}><img src='/logo.png' width='50px' height='40px' alt='logo' /><Logo>مكتبتي</Logo></Link>
          <SearchBar style={{ display: searchBarVisiblity ? 'block' : 'none' }}>
            <InputSearch ref={isInsideSearchBar} onChange={(e) => setSearchQuery(e.target.value)} type='search' placeholder='البحت' />
            <FontAwesomeIcon style={{ position: "absolute", right: "20px", fontSize: '20px', top: "50%", translate: '0 -50%', }} icon={faSearch} color='white' />
            <SerachResulte style={{ display: listVisiblity ? 'block' : 'none' }}>
              {allContent.length ?
                allContent.map((result) => <QueryResult onClick={() => navigate(`/${user}/view/${result.tag === 'كتاب' ? 'Books' : result.tag === 'فيديو' ? 'Video' : 'Audio'}/${result.id}`)}><img src={`/Database/images/${result.img}`} alt={result.title} width="35px" /><div style={{ position: 'relative', width: '100%', display: 'flex', alignItems: 'center' }}><span>{searchQuery}</span><span style={{ position: 'absolute', right: 0, color: "black", opacity: "0.3", zIndex: "-1", boxSizing: "border-box" }}>{result.title}</span></div><span>{result.tag}</span></QueryResult>)
                :
                <p style={{ opacity: ".5" }}>محتوى غير متوفر</p>
              }
            </SerachResulte>

          </SearchBar>
          <div>
            <div style={{ display: "flex", gap: "2em", alignItems: "center" }}>
              <SearchButton>
                <FontAwesomeIcon ref={SearchOpen} style={{ padding: '10px', fontSize: '18px' }} icon={faSearch} color='white' />
              </SearchButton>
              <AddContentButton>
                <Button admin ref={insideButton}>
                  <FontAwesomeIcon icon={faPlusCircle}></FontAwesomeIcon>
                  <AddButton>أضف محتوى</AddButton>
                </Button>
                <DropDownMenu style={{ display: menuToggel ? "block" : "none" }}>
                  <Link to="/admin/book" style={{ textDecoration: "auto", color: 'black' }}><Li onMouseEnter={() => setIconHoverBook(true)} onMouseLeave={() => setIconHoverBook(false)}><FontAwesomeIcon icon={faBook} color={iconHoverBook ? "#ffff" : "#4EAA4B"} /><p style={{ margin: 0, display: "inline", marginRight: "10px" }}>كتاب</p></Li></Link>
                  <Link to="/admin/Audio" style={{ textDecoration: "auto", color: 'black' }}><Li onMouseEnter={() => setIconHoverAudio(true)} onMouseLeave={() => setIconHoverAudio(false)}><FontAwesomeIcon icon={faHeadphones} color={iconHoverAudio ? "#ffff" : "#4EAA4B"} /><p style={{ margin: 0, display: "inline", marginRight: "10px" }}>أديو</p></Li></Link>
                  <Link to="/admin/Video" style={{ textDecoration: "auto", color: 'black' }}><Li onMouseEnter={() => setIconHoverVideo(true)} onMouseLeave={() => setIconHoverVideo(false)}><FontAwesomeIcon icon={faVideo} color={iconHoverVideo ? "#ffff" : "#4EAA4B"} /><p style={{ margin: 0, display: "inline", marginRight: "10px" }}>فيديو</p></Li></Link>
                </DropDownMenu>
              </AddContentButton>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <p style={{ color: "white", fontWeight: "500" }}>المسؤول</p>
                <Link to="/admin/dashbord">
                  <div style={{ backgroundColor: "white", width: "35px", height: "35px", borderRadius: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <FontAwesomeIcon icon={faUser} color="#4EAA4B" />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </>
      ) : user === "user" ? (
        <>
          <Link to="/user" style={{ textDecoration: "none", display: 'flex', alignItems: 'center', gap: '15px' }}><img src='/logo.png' width='50px' height='40px' alt='logo' /><Logo>مكتبتي</Logo></Link>
          <SearchBar style={{ display: searchBarVisiblity ? 'block' : 'none' }}>
            <InputSearch ref={isInsideSearchBar} onChange={(e) => setSearchQuery(e.target.value)} type='search' placeholder='البحت' />
            <FontAwesomeIcon style={{ position: "absolute", right: "20px", fontSize: '20px', top: "50%", translate: '0 -50%', }} icon={faSearch} color='white' />
            <SerachResulte style={{ display: listVisiblity ? 'block' : 'none' }}>
              {allContent.length ?
                allContent.map((result) => <QueryResult onClick={() => navigate(`/${user}/view/${result.tag === 'كتاب' ? 'Books' : result.tag === 'فيديو' ? 'Video' : 'Audio'}/${result.id}`)}><img src={`/Database/images/${result.img}`} alt={result.title} width="35px" /><div style={{ position: 'relative', width: '100%', display: 'flex', alignItems: 'center' }}><span>{searchQuery}</span><span style={{ position: 'absolute', right: 0, color: "black", opacity: "0.3", zIndex: "-1", boxSizing: "border-box" }}>{result.title}</span></div><span>{result.tag}</span></QueryResult>)
                :
                <span style={{ opacity: ".5" }}>محتوى غير متوفر</span>
              }
            </SerachResulte>

          </SearchBar>
          <div style={{ display: 'flex', alignItems: 'center', gap: "25px" }}>
            <SearchButton>
              <FontAwesomeIcon ref={SearchOpen} style={{ padding: '10px', fontSize: '18px' }} icon={faSearch} color='white' />
            </SearchButton>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <p style={{ color: "white", fontWeight: "500" }}>المستعمل</p>
              <div style={{ backgroundColor: "white", width: "35px", height: "35px", borderRadius: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <FontAwesomeIcon icon={faUser} color="#4EAA4B" />
              </div>

            </div>
          </div>
        </>
      ) : (
        <>
          <Link to="/guest" style={{ textDecoration: "none", display: 'flex', alignItems: 'center', gap: '15px' }}><img src='/logo.png' width='50px' height='40px' alt='logo' /><Logo>مكتبتي</Logo></Link>
          <SearchBar style={{ display: searchBarVisiblity ? 'block' : 'none' }}>
            <InputSearch ref={isInsideSearchBar} onChange={(e) => setSearchQuery(e.target.value)} type='search' placeholder='البحت' />
            <FontAwesomeIcon style={{ position: "absolute", right: "20px", fontSize: '20px', top: "50%", translate: '0 -50%', }} icon={faSearch} color='white' />
            <SerachResulte style={{ display: listVisiblity ? 'block' : 'none' }}>
              {allContent.length ?
                allContent.map((result) => <QueryResult onClick={() => navigate(`/${user}/view/${result.tag === 'كتاب' ? 'Books' : result.tag === 'فيديو' ? 'Video' : 'Audio'}/${result.id}`)}><img src={`/Database/images/${result.img}`} alt={result.title} width="35px" /><div style={{ position: 'relative', width: '100%', display: 'flex', alignItems: 'center' }}><span>{searchQuery}</span><span style={{ position: 'absolute', right: 0, color: "black", opacity: "0.3", zIndex: "-1", boxSizing: "border-box" }}>{result.title}</span></div><span>{result.tag}</span></QueryResult>)
                :
                <span style={{ opacity: ".5" }}>محتوى غير متوفر</span>
              }
            </SerachResulte>

          </SearchBar>
          <div style={{ display: 'flex', alignItems: 'center', gap: "25px" }}>
            <SearchButton>
              <FontAwesomeIcon ref={SearchOpen} style={{ padding: '10px', fontSize: '18px' }} icon={faSearch} color='white' />
            </SearchButton>
            <Link style={{ textDecoration: "none" }} to='/login'>
              <Button>تسجيل الدخول</Button>
            </Link>
          </div>
        </>
      )}
    </Header >
  )
}

function Foot() {

  let { user } = useParams();
  return (
    <Footer>

      <div>
        <Logo>مكتبتي</Logo>
      </div>
      <div>
        <Link to={`/${user}/Books`}><Nav>الكتب</Nav></Link>
        <Link to={`/${user}/Videos`}><Nav>الفديوهات</Nav></Link>
        <Link to={`/${user}/Audios`}><Nav>أوديو</Nav></Link>
      </div>
      <div>
        <Copyright>© جميع الحقوق محفوظة لموقع مكتبتي</Copyright>
      </div>
    </Footer>
  )
}

// componants
function AddPage({ contentType }) {

  const [fileName, setFileName] = useState("");
  const [photo, setPhoto] = useState(null);

  const [allContent, setAllContent] = useState([]);
  const redirect = useNavigate();
  let { user } = useParams();

  let NewAddedContent = sessionStorage;

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



  let HandelForm = (e) => {
    e.preventDefault();
    // check for the latest id added
    let latestID = 0;
    allContent && allContent.filter((content) => content.id >= latestID ? latestID = content.id : latestID);

    const data = {
      id: latestID + 1,
      img: photo,
      tag: contentType,
      title: e.target.title.value,
      author: e.target.author.value,
      description: e.target.description.value,
      file: fileName,
      date: new Date().toLocaleDateString()
    }
    fetch(`http://localhost:7000/${contentType === "كتاب" ? "Books" : contentType === "أديو" ? "Audio" : "Video"}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }).then((Response) => console.log(Response))
      .then((data) => console.log(data))
      .catch((error) => console.error(error))

    // if the content has been added the admin is been redirects to the dashboard and get notified with a message
    redirect(`/${user}/dashbord`)
    NewAddedContent.setItem('isAdded', true);
  }

  return (
    <>
      <div style={{ maxWidth: "58em", margin: "2em auto 5em", padding: " 0 4em", boxSizing: "border-box" }}>
        <h1 style={{ fontSize: "42px" }}>{contentType}</h1>
        <div style={{ display: "flex", gap: "30px", flexWrap: "wrap", flexDirection: 'column' }}>
          <div style={{ flex: 1, cursor: "pointer", width: '100%' }}>
            <label htmlFor="uploadImage">
              <div style={{ backgroundColor: "#9992", width: "16em", height: "22em", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", cursor: "pointer", objectFit: 'cover', alignSelf: 'center' }}>
                {photo ?
                  <>
                    <img style={{ width: "100%" }} src={`/Database/images/${photo}`} alt={contentType} />
                  </>
                  :
                  <>
                    <FontAwesomeIcon style={{ backgroundColor: "#9993", padding: "20px", borderRadius: "100%" }} icon={faCamera} size="xl" color="#999" />
                    <p style={{ backgroundColor: "#9993", color: "#777", fontSize: "18px", margin: "0", position: "absolute", bottom: "0", width: "100%", textAlign: "center", padding: "12px 0", borderRadius: "10px 10px 0 0" }}>إختر صورة</p>
                  </>
                }
                <input type="file" className="uploadFile" id="uploadImage" onChange={(e) => setPhoto(e.target.files[0].name)} />
              </div>
            </label>
          </div>

          <form onSubmit={(e) => HandelForm(e)} style={{ flex: 2, cursor: "pointer", display: "flex", flexDirection: "column", rowGap: "15px" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label htmlFor="title" >العنوان</label>
              <Input type="text" name="title" />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label htmlFor="author" >الكاتب</label>
              <Input type="text" name="author" />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label htmlFor="description" >الوصف</label>
              <textarea rows={10} name="description" />
            </div>
            <div>
              <span>المحتوى</span>
              <label htmlFor="upload" style={{ cursor: "pointer" }}>
                <div style={{ backgroundColor: "#9992", border: "solid #9996", height: "10em", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", borderRadius: "10px" }}>
                  {fileName ?
                    <>
                      <span style={{ fontSize: "18px", display: "flex" }}>{fileName}<FontAwesomeIcon style={{ margin: "0 12px" }} icon={fileName.match(pdfRegx) ? faFilePdf : fileName.match(audioRegx) ? faFileAudio : fileName.match(videoRegx) && faFileVideo} size="2xl" color="red" /></span>
                    </>
                    :
                    <>
                      <FontAwesomeIcon style={{ backgroundColor: "#9993", padding: "18px 16px", borderRadius: "100%" }} icon={faCloudUpload} size="lg" color="#999" />
                      <p style={{ color: "#777", fontSize: "16px", margin: "0", width: "100%", textAlign: "center", padding: "12px 0" }}>إختر الملف</p>
                    </>
                  }
                  <input className="uploadFile" type="file" name="upload" id="upload" onChange={(e) => setFileName(e.target.files[0].name)} />
                </div>
              </label>
            </div>
            <Submit type="submit" value="أضف المحتوى" />
          </form>
        </div>
      </div>
    </>
  )
}

function DetailPage(btn) {
  return (
    btn.tag === "كتاب" ?
      <>

        <Responsive>
          <div style={{ margin: "0 auto" }}>
            <CoverImg meduim src={`/Database/images/${btn.img}`} />
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div>
              <Titre>{btn.title}</Titre>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <p style={{ margin: "0", fontSize: "20px" }}>ل{btn.author}</p>
            </div>

            <Description>
              <h2 style={{ margin: "15px 0 8px", fontSize: "24px", color: "#73a580" }}>نبذة عن الكتاب </h2>
              <p style={{ margin: "0" }}>{btn.description}</p>
            </Description>

            <Button second style={{ width: "max-content", marginTop: "2em" }}>
              <a style={{ textDecoration: "none", color: 'white' }} href={`/Database/documents/${btn.pdf}`} download>لتحميل</a>
              <FontAwesomeIcon
                icon={faDownload}
                size='12px'
                color='#fff'
                style={{ marginRight: "10px" }}
              />
            </Button>
          </div>
        </Responsive>
      </>

      : btn.tag === 'أديو' ?
        <>

          <Responsive>
            <div style={{
              display: 'grid',
              alignItems: 'center',
              justifyContent: 'center',
              width: "100%",
              height: "100%",

            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1em',
                width: 'auto'
              }}>
                <Titre>{btn.title}</Titre>
                <Button second style={{ width: "max-content" }}>
                  <a style={{ textDecoration: "none", color: 'white' }} href={`/Database/Audios/${btn.audio}`} download>لتحميل</a>
                  <FontAwesomeIcon
                    icon={faDownload}
                    size='12px'
                    color='#fff'
                    style={{ marginRight: "10px" }}
                  />
                </Button>
              </div>


              <div>
                <img width='100%' src={`/Database/images/${btn.img}`} />
                <audio style={{
                  width: '100%'
                }} controls onTimeUpdate={(e) => e.target.currentTime > 10 && e.target.pause()}>
                  <source width='100%' src={`/Database/Audios/${btn.audio}`} type="audio/mp3" />
                </audio>
              </div>



            </div>

          </Responsive>
        </>

        : btn.tag === 'فيديو' &&
        <>

          <Responsive>
            <div style={{
              display: 'grid',
              alignItems: 'center',
              justifyContent: 'center',
              width: "100%",
              height: "100%",

            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1em',
              }}>
                <Titre>{btn.title}</Titre>
                <Button second style={{ width: "max-content" }}>
                  <a style={{ textDecoration: "none", color: 'white' }} href={`/Database/videos/${btn.video}`} download>لتحميل</a>
                  <FontAwesomeIcon
                    icon={faDownload}
                    size='12px'
                    color='#fff'
                    style={{ marginRight: "10px" }}
                  />
                </Button>
              </div>

              <div style={{ maxWidth: '1000px', width: "100%", height: '100%' }} >
                <video width='100%' style={{ borderRadius: "10px" }} controls autoPlay >
                  <source src={`/Database/videos/${btn.video}`} type="video/mp4" />
                </video>
              </div>
            </div>

          </Responsive>
        </>

  );
}

function UpdatePage({ contentType }) {

  const [currentId, setCurrentId] = useState(null)
  const [newPhoto, setNewPhoto] = useState({ value: "", empty: true });
  const [newTitle, setNewTitle] = useState({ value: "", empty: true })
  const [newAuthor, setNewAuthor] = useState({ value: "", empty: true })
  const [newDesc, setNewDesc] = useState({ value: "", empty: true })
  const [newFile, setNewFile] = useState({ value: "", empty: true });

  const [getData, setGetData] = useState(null);
  let { id, type } = useParams();

  // function that handel admin update
  let HandelForm = (e) => {
    e.preventDefault();

    const data = {
      id: currentId,
      img: newPhoto.value,
      tag: contentType === "Books" ? "كتاب" : contentType === "Audio" ? "أديو" : contentType === "Video" && "فيديو",
      title: newTitle.empty ? e.target.title.value : newTitle.value,
      author: newAuthor.empty ? e.target.author.value : newAuthor.value,
      description: newDesc.empty ? e.target.description.value : newDesc.value,
      file: newFile.value,
      date: new Date().toLocaleDateString()
    }
    fetch(`http://localhost:7000/${type}/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
      }).then((Response) => Response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error))
  };


  useEffect(() => {
    fetch(`http://localhost:7000/${type}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      })
      .then(Response => Response.json())
      .then(data => setGetData(data))
  }, [type])


  return (
    type === "Books" ?
      <>
        <div style={{ maxWidth: "58em", margin: "2em auto 5em", padding: " 0 4em", boxSizing: "border-box" }}>
          <h1 style={{ fontSize: "42px" }}>كتاب</h1>
          {/* get content data that willing to be updated */}
          {getData && getData.map((content) => content.id === parseInt(id) && <div key={content.id}>
            <div style={{ display: "flex", gap: "30px", flexWrap: "wrap" }}>
              <div style={{ flex: 1, cursor: "pointer" }}>
                <label htmlFor="uploadImage">
                  <div style={{ backgroundColor: "#9992", maxWidth: "16em", height: "22em", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", cursor: "pointer" }}>
                    {newPhoto.empty && setNewPhoto({ value: content.img })}

                    <img style={{ objectFit: "cover", width: "100%" }} src={`/Database/images/${newPhoto.value}`} alt={contentType} />

                    <input type="file" className="uploadFile" id="uploadImage" onChange={(e) => e.target.files[0].name && setNewPhoto({ value: e.target.files[0].name, empty: e.target.files[0].name ? false : true })} />
                  </div>
                </label>
              </div>

              <form onSubmit={(e) => HandelForm(e)} style={{ flex: 2, cursor: "pointer", display: "flex", flexDirection: "column", rowGap: "15px" }}>
                <input value={content.id} hidden disabled />
                {!currentId && setCurrentId(content.id)}
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label htmlFor="title" >العنوان</label>
                  <Input type="text" name="title" value={newTitle.empty ? content.title : newTitle.value} onBlur={(e) => setNewTitle({ value: e.target.value, empty: e.target.value ? false : true })} onChange={(e) => setNewTitle({ value: e.target.value })} />
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label htmlFor="author" >الكاتب</label>
                  <Input type="text" name="author" value={newAuthor.empty ? content.author : newAuthor.value} onBlur={(e) => setNewAuthor({ value: e.target.value, empty: e.target.value ? false : true })} onChange={(e) => setNewAuthor({ value: e.target.value })} />
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label htmlFor="description" >الوصف</label>
                  <textarea rows={10} name="description" value={newDesc.empty ? content.description : newDesc.value} onBlur={(e) => setNewDesc({ value: e.target.value, empty: e.target.value ? false : true })} onChange={(e) => setNewDesc({ value: e.target.value })} />
                </div>
                <div>
                  <span>المحتوى</span>
                  <label htmlFor="upload" style={{ cursor: "pointer" }}>
                    <div style={{ backgroundColor: "#9992", border: "solid #9996", height: "10em", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", borderRadius: "10px" }}>
                      {newFile.empty && setNewFile({ value: content.file.split('/')[content.file.split('/').length - 1] })}

                      <span style={{ fontSize: "18px", display: "flex" }}>{newFile.value}<FontAwesomeIcon style={{ margin: "0 12px" }} icon={faFilePdf} size="2xl" color="red" /></span>

                      <input className="uploadFile" type="file" name="upload" id="upload" onChange={(e) => e.target.files[0].name && setNewFile({ value: e.target.files[0].name, empty: e.target.files[0].name ? false : true })} />
                    </div>
                  </label>
                </div>
                <Submit type="submit" value="تعديل المحتوى" />
              </form>
            </div>
          </div>
          )}
        </div>
      </>

      :

      (type === "Audio") ?
        <>
          <div style={{ maxWidth: "58em", margin: "2em auto 5em", padding: " 0 4em", boxSizing: "border-box" }}>
            <h1 style={{ fontSize: "42px" }}>أديو</h1>
            {getData && getData.map((content) => content.id === parseInt(id) && <div key={content.id}>
              <div style={{ display: "flex", gap: "30px", flexWrap: "wrap" }}>
                <div style={{ flex: 1, cursor: "pointer" }}>
                  <label htmlFor="uploadImage">
                    <div style={{ backgroundColor: "#9992", maxWidth: "16em", height: "22em", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", cursor: "pointer" }}>
                      {newPhoto.empty && setNewPhoto({ value: content.img })}

                      <img style={{ objectFit: "cover", width: "100%" }} src={`/Database/images/${newPhoto.value}`} alt={contentType} />

                      { // :
                        // <p>
                        //   <FontAwesomeIcon style={{ backgroundColor: "#9993", padding: "20px", borderRadius: "100%" }} icon={faCamera} size="xl" color="#999" />
                        //   <p style={{ backgroundColor: "#9993", color: "#777", fontSize: "18px", margin: "0", position: "absolute", bottom: "0", width: "100%", textAlign: "center", padding: "12px 0", borderRadius: "10px 10px 0 0" }}>إختر صورة</p>
                        // </>
                      }
                      <input type="file" className="uploadFile" id="uploadImage" onChange={(e) => e.target.files[0].name && setNewPhoto({ value: e.target.files[0].name, empty: e.target.files[0].name ? false : true })} />
                    </div>
                  </label>
                </div>

                <form onSubmit={(e) => HandelForm(e)} style={{ flex: 2, cursor: "pointer", display: "flex", flexDirection: "column", rowGap: "15px" }}>
                  {/* <form style={{ flex: 2, cursor: "pointer", display: "flex", flexDirection: "column", rowGap: "15px" }}> */}
                  <input value={content.id} hidden disabled />
                  {!currentId && setCurrentId(content.id)}
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label htmlFor="title" >العنوان</label>
                    <Input type="text" name="title" value={newTitle.empty ? content.title : newTitle.value} onBlur={(e) => setNewTitle({ value: e.target.value, empty: e.target.value ? false : true })} onChange={(e) => setNewTitle({ value: e.target.value })} />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label htmlFor="author" >صاحب الأديو</label>
                    <Input type="text" name="author" value={newAuthor.empty ? content.author : newAuthor.value} onBlur={(e) => setNewAuthor({ value: e.target.value, empty: e.target.value ? false : true })} onChange={(e) => setNewAuthor({ value: e.target.value })} />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label htmlFor="description" >الوصف</label>
                    <textarea rows={10} name="description" value={newDesc.empty ? content.description : newDesc.value} onBlur={(e) => setNewDesc({ value: e.target.value, empty: e.target.value ? false : true })} onChange={(e) => setNewDesc({ value: e.target.value })} />
                  </div>
                  <div>
                    <span>المحتوى</span>
                    <label htmlFor="upload" style={{ cursor: "pointer" }}>
                      <div style={{ backgroundColor: "#9992", border: "solid #9996", height: "10em", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", borderRadius: "10px" }}>
                        {newFile.empty && setNewFile({ value: content.file.split('/')[content.file.split('/').length - 1] })}

                        <span style={{ fontSize: "18px", display: "flex" }}>{newFile.value}<FontAwesomeIcon style={{ margin: "0 12px" }} icon={faFileAudio} size="2xl" color="red" /></span>

                        <input className="uploadFile" type="file" name="upload" id="upload" onChange={(e) => e.target.files[0].name && setNewFile({ value: e.target.files[0].name, empty: e.target.files[0].name ? false : true })} />
                      </div>
                    </label>
                  </div>
                  <Submit type="submit" value="تعديل المحتوى" />
                </form>
              </div>
            </div>
            )}
          </div>
        </>
        :

        type === 'Video' &&
        <>
          <div style={{ maxWidth: "58em", margin: "2em auto 5em", padding: " 0 4em", boxSizing: "border-box" }}>
            <h1 style={{ fontSize: "42px" }}>فيديو</h1>
            {getData && getData.map((content) => content.id === parseInt(id) && <div key={content.id}>
              <div style={{ display: "flex", gap: "30px", flexWrap: "wrap" }}>
                <div style={{ flex: 1, cursor: "pointer" }}>
                  <label htmlFor="uploadImage">
                    <div style={{ backgroundColor: "#9992", maxWidth: "16em", height: "22em", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", cursor: "pointer" }}>
                      {newPhoto.empty && setNewPhoto({ value: content.img })}

                      <img style={{ objectFit: "cover", width: "100%" }} src={`/Database/images/${newPhoto.value}`} alt={contentType} />
                      <input type="file" className="uploadFile" id="uploadImage" onChange={(e) => e.target.files[0].name && setNewPhoto({ value: e.target.files[0].name, empty: e.target.files[0].name ? false : true })} />
                    </div>
                  </label>
                </div>

                <form onSubmit={(e) => HandelForm(e)} style={{ flex: 2, cursor: "pointer", display: "flex", flexDirection: "column", rowGap: "15px" }}>
                  <input value={content.id} hidden disabled />
                  {!currentId && setCurrentId(content.id)}
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label htmlFor="title" >العنوان</label>
                    <Input type="text" name="title" value={newTitle.empty ? content.title : newTitle.value} onBlur={(e) => setNewTitle({ value: e.target.value, empty: e.target.value ? false : true })} onChange={(e) => setNewTitle({ value: e.target.value })} />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label htmlFor="author" >صاحب الفيديو</label>
                    <Input type="text" name="author" value={newAuthor.empty ? content.author : newAuthor.value} onBlur={(e) => setNewAuthor({ value: e.target.value, empty: e.target.value ? false : true })} onChange={(e) => setNewAuthor({ value: e.target.value })} />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label htmlFor="description" >الوصف</label>
                    <textarea rows={10} name="description" value={newDesc.empty ? content.description : newDesc.value} onBlur={(e) => setNewDesc({ value: e.target.value, empty: e.target.value ? false : true })} onChange={(e) => setNewDesc({ value: e.target.value })} />
                  </div>
                  <div>
                    <span>المحتوى</span>
                    <label htmlFor="upload" style={{ cursor: "pointer" }}>
                      <div style={{ backgroundColor: "#9992", border: "solid #9996", height: "10em", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", borderRadius: "10px" }}>
                        {newFile.empty && setNewFile({ value: content.file.split('/')[content.file.split('/').length - 1] })}

                        <span style={{ fontSize: "18px", display: "flex" }}>{newFile.value}<FontAwesomeIcon style={{ margin: "0 12px" }} icon={faFileVideo} size="2xl" color="red" /></span>

                        <input className="uploadFile" type="file" name="upload" id="upload" onChange={(e) => e.target.files[0].name && setNewFile({ value: e.target.files[0].name, empty: e.target.files[0].name ? false : true })} />
                      </div>
                    </label>
                  </div>
                  <Submit type="submit" value="تعديل المحتوى" />
                </form>
              </div>
            </div>
            )}
          </div>
        </>
  )
}

export { CardUI, Head, Foot, AddPage, DetailPage, UpdatePage };
