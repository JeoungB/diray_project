import React, { useEffect } from "react";
import "./header.css";
import axios from 'axios';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

//const apiUrl = 'http://localhost:8080/api';

const Header = () => {

  const {user} = useSelector((state) => state);
  const navigate = useNavigate();

  // const sendRequest = async() => {
  //   const response = await axios.get(apiUrl);
  //   console.log(response);
  // }

  return (
    <div className="Header">
      <p>{user}님</p>
      {/* 글쓰기는 css로 동그라미 안에 + 의 형태로 만들자 */}
      <button onClick={() => navigate('/write')}>글쓰기</button>
      <button>다크모드</button>
      <button>중요한 메모</button>
      <button>메모장 꾸미기 옵션</button>
      <button>리스트 순서 바꾸기</button>
    </div>
  );
};

export default Header;
