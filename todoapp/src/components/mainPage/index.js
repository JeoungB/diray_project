/* eslint-disable array-callback-return */
import React, { useEffect, useLayoutEffect, useState } from "react";
import "./mainPage.css";
import MemoBox from "../memoBox";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";

const MainPage = () => {

  const refreshURL = "http://localhost:8080/api/refreshToken";
  const accessURL = "http://localhost:8080/api/accessToken";

  const refreshToken = async () => {
    try{
      const response = await axios.get(refreshURL, {withCredentials: true})
      console.log("refreshToken", response);
    } catch (err) { 
      console.log(err);
    }
  }

  const accessToken = async () => {
    try {
      const response = await axios.get(accessURL, {withCredentials: true})
      console.log("accessToken", response.data);
    } catch (err) {
      console.log(err);
    }
  }

  const contents = useSelector((state) => state.user.contents);
  const user = useSelector((state) => state.user.user);

  const [data, setData] = useState([
    {
    id: "1",
    title: "회원 데이터",
    content: "로그인 데이터 입니다.",
    important: false
  },
    {
      id: "2",
      title: "테스트 데이터",
      content: "테스트 데이터 입니다.",
      important: false
    }
  ]);

  const [memoContents, setmemoContents] = useState([]);

  // 이 함수에서 data 대신 서버에서 가져온 데이터로 수정.
  const checkData = () => {
    if(!user) {
      console.log("게스트 데이터 없다")
      setmemoContents(data);
    }

    if(data.length === 0) {
      console.log("회원 데이터 없다.")
      setmemoContents(contents);
    }
  }

  console.log("memoContents", memoContents)
  console.log("data", data)

  useEffect(() => {
    checkData();
  }, [])

  const navigate = useNavigate();

  // 검색 State
  const [searchValue, setSearchValue] = useState("");

  // 검색 데이터 보내는 함수
  const handleSubmit = (event) => {
    event.preventDefault();
    searchDatas(memoContents);
  };
  
  useLayoutEffect(() => {
    // 검색 데이터 세션스토리지 저장
    setSearchValue(sessionStorage.getItem("searchData"));
    // refreshToken();
    // accessToken();
  }, []);

  const searchDatas = (memoContents) => {
    memoContents = memoContents.filter((memoContents) => {
      return memoContents.title.indexOf(searchValue) > -1; // 한 문자만 일치해도 검색 하도록 수정.
    });
    return <MemoBox contents={memoContents}/>;
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
        searchDatas(memoContents)
      ) : (
        <MemoBox contents={memoContents} />
      )}
        </div>
    </div>
  );
};

export default MainPage;
