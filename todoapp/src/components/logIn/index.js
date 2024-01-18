import React, { useContext, useEffect, useState } from 'react'
import { LoginContext } from '../../context/LoginState';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteList, getGestUser, logout} from '../../reducers/user';
import {login} from '../../reducers/isLogin';
import axios from 'axios';
import NotLogin from '../notLogin';

export const LoginPage = () => {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const user = useSelector((state) => state.user.user);

  const navigate = useNavigate();

  // disoatch를 사용하기 위한 준비
  const dispatch = useDispatch();

  // 게스트 닉네임 팝업 true / false
  const [namePopUp, setnamePopUp] = useState(false);

  const popUpStyle = {
    display : namePopUp ? "block" : "none",
  }

  useEffect(() => {
    if(user) {
      dispatch(login(false));
      dispatch(logout());
    }
  }, [])

  // 게스트 로그인 팝업
  const loginHandler = (event) => {
    event.preventDefault();

    //1. 임시 닉네임 작성 팝업창
    // 팝업창은 css로 중앙에 나타나고 배경은 어둡게
    setnamePopUp(true);
  }

  // 게스트 이름 상태
  const [geustName, setgeustName] = useState();

  // 게스트 로그인
  const geustNameHandler = () => {
    dispatch(getGestUser(geustName));
    dispatch(login(true));
    navigate("/main");
  }

  const moveSingin = () => {
    navigate('/singin');
  }

  const loginURL = "http://localhost:8080/api/login";

  // member login
  const userLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(loginURL, 
        {userData: {email: email, password: password}},
        {withCredentials: true}
        );
      console.log("데이터", response.status);
      if(response.status === 200) {
        dispatch(login(true));
        navigate("/main");
      }
    } catch (err) {
      console.log("LOGIN_ERR :", err);
    }
  }

  return (
    <div id='loginPage'>
        <form className='login__form'>
            <input type='text' placeholder='아이디' onChange={(event) => setEmail(event.target.value)}></input>
            <input type='password' placeholder='비밀번호' onChange={(event) => setPassword(event.target.value)}></input>
            <p>ID / PW 찾기</p>
            <p onClick={moveSingin}>회원가입</p>
            <button onClick={loginHandler}>게스트로 시작하기</button>
            <button onClick={userLogin}>로그인</button>
        </form>

        <div className='popUp' style={popUpStyle}>
            <input type='text' placeholder='게스트 이름' onChange={(event) => setgeustName(event.target.value)}></input>
            <button onClick={geustNameHandler}>완료</button>
            </div>
    </div>
  )
}
