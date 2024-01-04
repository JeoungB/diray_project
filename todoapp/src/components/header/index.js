import React, { useEffect, useState } from "react";
import "./header.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MainPage } from "../mainPage";

//const apiUrl = 'http://localhost:8080/api';

const Header = () => {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  return (
    <div className="Header">
      <p>{user}님</p>
      {/* 글쓰기는 css로 동그라미 안에 + 의 형태로 만들자 */}
      <button onClick={() => navigate("/write")}>글쓰기</button>
    </div>
  );
};

export default Header;
