/* eslint-disable array-callback-return */
import React, { memo, useEffect, useLayoutEffect, useState } from "react";
//import "./mainPage.css";
import { MemoBox } from "../memoBox";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import Loding from "../loding";
import { addList } from "../../reducers/user";
import { createList } from "../../reducers/memberUser";

export const MainPage = () => {
  const refreshURL = "http://localhost:8080/api/refreshToken";
  const accessURL = "http://localhost:8080/api/accessToken";
  const GET_MEMBER_DATA = "http://localhost:8080/api/getMemberData";

  const contents = useSelector((state) => state.user.contents);
  const memberContents = useSelector((state) => state.memberUSer.contents);
  const user = useSelector((state) => state.user.user);

  const dispatch = useDispatch();

  const [data, setData] = useState();

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
        if(memberContents.length === 0) {
          dispatch(createList(res.data))
        }
      })
    } catch (err) {
      console.log(err);
    };
}

useEffect(() => {
  if(!user) {
    setData(memberContents);
  } 
  if (user) {
    setData(contents);
  }
  console.log("memberContents", memberContents);
}, [])

  useLayoutEffect(() => {
    if(!user) {
      refreshToken();
    }
  }, []);

  const navigate = useNavigate();
  const searchData = sessionStorage.getItem("searchData");

  // 검색 State
  const [searchValue, setSearchValue] = useState(searchData);

  const searchDatas = (data) => {
    data = data.filter((data) => {
      return data.title.indexOf(searchValue) > -1; // 한 문자만 일치해도 검색 하도록 수정.
    });
    return <MemoBox contents={data} memberContents={data}/>;
    // data도 useState에서 초기화 되기 떄문에 검색해서 나온 Memo들은 여전히 깜박임을 가진다.
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
        >
          <input
            type="text"
            name="value"
            value={searchValue || ""}
            placeholder="알림장 찾기"
            onChange={handleSearch}
          ></input>
        </form>

        {searchValue && data ? (
          searchDatas(data)
        ) : (
          <MemoBox contents={contents} memberContents={memberContents} />
        )}
      </div>
    </div>
  );
};
