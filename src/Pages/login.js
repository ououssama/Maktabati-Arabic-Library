import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

const Form = styled.form`
  display: grid;
  justify-content: center;
  align-items: center;
  gap: 20px;
  background-color: #73a580;
  text-align: center;
  border-radius: 10px;
  padding: 3em;
  width: fit-content;
`;
const H1 = styled.h1`
  font-size: 40px;
  color: white;
  margin: 0;
`;

const Label = styled.label`
  text-align: end;
  font-size: 18px;
  color: white;
`;

const Input = styled.input`
  color: white;
  direction: rtl;
  border: none;
  height: 20px;
  width: 290px;
  padding: 20px;
  background-color: #c5c39294;
  border-radius: 5px;
  padding-left: 30px;
  &:focus,
  &:hover,
  &:active {
    outline: none;
  }
`;

const Btn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SubmitBtn = styled.input`
  margin-top: 30px;
  font-size: 19px;
  height: 60px;
  width: 290px;
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
  const regularUser = { username: "oussama", pass: "12345" };
  const adminUser = { username: "hiba", pass: "54321" };
  const [userName, setUserName] = useState("");
  const [pass, setPass] = useState("");
  const [userspan, setUserspan] = useState("");
  const [passspan, setPassspan] = useState("");
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
  if (userName!=='oussama' || userName!=='hiba'){
    setUserspan('اسم المستخدم خطا المرجو المحاولة مرة اخرى')
  }
  if(pass!=='12345'|| pass!=='54321'){
    setPassspan(' الرقم السري خطا المرجو المحاولة مرة اخرى')
  }
}
  return (
    <>
      <Container>
        <Form action='' onSubmit={(e) => handleForm(e)}>
          <H1>مكتبتي</H1>
          <Label>اسم المستخدم</Label>
          <div>
            {" "}
            <Input
              type='text'
              id='name'
              onChange={(e) => setUserName(e.target.value)}
            /><br /><span style={{color:'red'}}>{userspan}</span>
          </div>
          <Label>الرمز السري</Label>
          <div>
            <Input
              type='password'
              id='password'
              onChange={(e) => setPass(e.target.value)}
            />
            <br /><span style={{ color: 'red' }}>{passspan}</span>
          </div>

          <Btn>
              <SubmitBtn type='submit' value="تسجيل الدخول" onClick={handlerTest} />
          </Btn>
        </Form>
      </Container>
    </>
  );
}
export default Login;
