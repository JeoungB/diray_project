/* eslint-disable array-callback-return */
import React, { useEffect, useLayoutEffect, useState } from "react";
import "./mainPage.css";
import MemoBox from "../memoBox";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";

const MainPage = () => {

  const {contents} = useSelector((state) => state);

  const [data, setData] = useState([{
    id: "1",
    title: "회원 데이터",
    content: "로그인 데이터 입니다.",
    important: false
  }]);

  const navigate = useNavigate();

  // 검색 State
  const [searchValue, setSearchValue] = useState("");

  // 검색 데이터 보내는 함수
  const handleSubmit = (event) => {
    event.preventDefault();
    searchDatas(contents);
  };
  
  useLayoutEffect(() => {
    // 검색 데이터 세션스토리지 저장
    setSearchValue(sessionStorage.getItem("searchData"));
  }, []);

  const searchDatas = (contents) => {
    contents = contents.filter((contents) => {
      return contents.title.indexOf(searchValue) > -1; // 한 문자만 일치해도 검색 하도록 수정.
    });
    return <MemoBox contents={contents}/>;
  };

  const handleSearch = (event) => {
    setSearchValue(event.target.value);
    sessionStorage.setItem("searchData", event.target.value);
  };

  return (
    <div className="MainPage">
       <div>
          <form
        name="search-form"
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          width: "100px",
          height: "30px",
          position: "relative",
          left: "50%",
        }}
      >
        <input
          type="text"
          name="value"
          value={searchValue || ""}
          placeholder="알림장 찾기"
          onChange={handleSearch}
        ></input>
      </form>

      {searchValue ? (
        searchDatas(contents)
      ) : (
        <MemoBox contents={contents} data={data} />
      )}
        </div>
    </div>
  );
};

export default React.memo(MainPage);
