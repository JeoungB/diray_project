/* eslint-disable array-callback-return */
import React, { useEffect, useLayoutEffect, useState } from "react";
//import "./mainPage.css";
import { MemoBox } from "../memoBox";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import { EditPage } from "../editPage";
import { SearchMemo } from "../searchMemo";

export const MainPage = () => {
  const refreshURL = "http://localhost:8080/api/refreshToken";
  const accessURL = "http://localhost:8080/api/accessToken";
  const GET_MEMBER_DATA = "http://localhost:8080/api/getMemberData";

  // redux 게스트 user data
  const contents = useSelector((state) => state.user.contents);
  const user = useSelector((state) => state.user.user);

  const dispatch = useDispatch();

  const [mainContents, setMainContents] = useState();

  // 게스트 유저가 없는 경우에 토큰 실행.
  const refreshToken = async () => {
    try{
      await axios.get(refreshURL, {withCredentials: true}).then((res) => {
        console.log(res);
      })
      checkData();
    } catch (err) { 
      console.log(err);
    }
  }

  const checkData = async () => {
    console.log("게스트 데이터 없다");
    try {
      await axios.get(GET_MEMBER_DATA, {withCredentials: true})
      .then((res) => {
        console.log(res.data)
        setMainContents(res.data);
      })
    } catch (err) {
      console.log(err);
    };
}

useEffect(() => {
  if(user) {
    setMainContents(contents);
  }
}, [contents])

  useLayoutEffect(() => {
    if(!user) {
      checkData();
      refreshToken();
    }
  }, []);

  const navigate = useNavigate();
  const searchData = sessionStorage.getItem("searchData");

  // 검색 State
  const [searchValue, setSearchValue] = useState(searchData);

  const handleSearch = (event) => {
    setSearchValue(event.target.value);
    sessionStorage.setItem("searchData", event.target.value);
  };

  const [editPopupState, setEditPopupState] = useState(false);

  return (
    <div className="MainPage">
      <div>
        <form
          name="search-form"
        >
          <input
            type="text"
            name="value"
            value={searchValue || ""}
            placeholder="알림장 찾기"
            onChange={handleSearch}
          ></input>
        </form>

        {searchValue && mainContents ? (
          // searchDatas(mainContents)
          <SearchMemo mainContents={mainContents} setEditPopupState={setEditPopupState} searchValue={searchValue} />
        ) : mainContents ? (
          <MemoBox mainContents={mainContents} setEditPopupState={setEditPopupState} />
        ) : ""}

          {editPopupState && mainContents ? (
            <EditPage mainContents={mainContents} setEditPopupState={setEditPopupState} editPopupState={editPopupState} />
          ) : ""}
      </div>
    </div>
  );
};
