import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'

const Container = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  height: 100vh;
  direction: rtl;
  background: url("./Database/kindle_ebook.jpg"), #73a580;
  background-blend-mode: multiply;
  objectFit: cover;
  @media only screen and (max-width: 992px){
    background-blend-mode: overlay;
    justify-content: center;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
  text-align: start;
  border-radius: 10px;
  padding: 3em 4em 6em;
  width: 100%;
  background-color: white;
  height: 100%;
  box-sizing: border-box;
  @media only screen and (min-width: 600px){
    height: max-content;
    width: 60%;
  }
  @media only screen and (min-width: 786px){
    height: max-content;
    width: 50%;
  }
  @media only screen and (min-width: 992px){
    border-radius: 10px 0 0 10px;
    height: 100%;
    width: 50%;
  }
`;
const H1 = styled.h1`
  font-size: 64px;
  color: #73a580;
  margin: 0 0 12px;
`;

const InputContainer = styled.div`
  display:flex;
  flex-direction:column;
  gap: 10px;
  width:100%;
  max-width: 360px;
  min-width: 250px;
`
const Label = styled.label`
  font-size: 18px;
  color: #73a580;
  text-align: start;
`;

const Input = styled.input`
  color: black;
  font-size: 18px;
  direction: rtl;
  border: none;
  // height: 20px;
  width: 100%;
  padding: 20px;
  background-color: #c5c39294;
  border-radius: 5px;
  box-sizing: border-box;
  // padding-left: 30px;
  &:focus,
  &:hover,
  &:active {
    outline: none;
  }
`;

const SubmitBtn = styled.input`
  margin-top: 30px;
  font-size: 19px;
  height: 60px;
    width:100%;
  max-width:360px;
  min-width:250px;
  color: white;
  background-color: rgb(244, 247, 247);
  border-radius: 5px;
  text-align: center;
  border: none;
  background-color: #3e5945;
  &:hover {
    cursor: pointer;
    background-color: #1b261e;
  }
`;

function Login() {
  const regularUser = { username: "user", pass: "12345" };
  const adminUser = { username: "admin", pass: "54321" };
  const [userName, setUserName] = useState("");
  const [pass, setPass] = useState("");
  const [userAuth, setUserAuth] = useState(true);
  const [passAuth, setPassAuth] = useState(true);
    let bridge = useNavigate();

  const handleForm = (e) => {
    e.preventDefault();
      if (adminUser.username === userName && adminUser.pass === pass) {
          bridge("/admin");
      } else if (regularUser.username === userName && regularUser.pass === pass) {
          bridge("/user")
      } else {
          console.log("invalid user");
      }
  };
// la function de test l input 
const  handlerTest=()=>{
  if (userName === regularUser.username) {
    setUserAuth(true);
    if ( pass === regularUser.pass) {
      setPassAuth(true);
    } else {
      setPassAuth(false)
    }
  } else if (userName === adminUser.username) {
    setUserAuth(true);
    if ( pass === adminUser.pass) {
      setPassAuth(true);
    } else {
      setPassAuth(false)
    }
  } else {
    setUserAuth(false);
  }

}
  return (
    <>
      <Container>
        <Form action='' onSubmit={(e) => handleForm(e)}>
          <H1>مكتبتي</H1>
          <InputContainer>
            {" "}
          <Label>اسم المستخدم</Label>
            <Input
              type='text'
              id='name'
              onChange={(e) => setUserName(e.target.value)}
            /><span style={{display: userAuth? 'none' : 'block', backgroundColor: 'orangered', color: 'white', borderRadius: '5px', padding: '12px' }}><FontAwesomeIcon icon={faCircleExclamation} style={{ marginLeft: '7px' }} /><p style={{ display: 'inline'}}>اسم المستخدم خطا المرجو المحاولة مرة اخرى</p></span>
          </InputContainer>

          <InputContainer>
            <Label>الرمز السري</Label>
            <Input
              type='password'
              id='password'
              onChange={(e) => setPass(e.target.value)}
            />
            <span style={{ display: passAuth? 'none' : 'block', backgroundColor: 'orangered', color: 'white', borderRadius: '5px', padding: '12px' }}><FontAwesomeIcon icon={faCircleExclamation} style={{ marginLeft: '7px' }} /><p style={{ display: 'inline'}}>الرقم السري خطا المرجو المحاولة مرة اخرى</p></span>
          </InputContainer>

          <SubmitBtn type='submit' value="تسجيل الدخول" onClick={handlerTest} />

        </Form>
      </Container>
    </>
  );
}
export default Login;
