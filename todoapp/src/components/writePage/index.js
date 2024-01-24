import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addList } from "../../reducers/user";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const WritePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const dispatch = useDispatch();
  const WRITE_API = "http://localhost:8080/api/createMemo";
  const user = useSelector((state) => state.user.user);
  let day = new Date();

  const [token, setToken] = useState();

  const accessURL = "http://localhost:8080/api/accessToken";

  const navigate = useNavigate();

  // const accessToken = async () => {
  //   try {
  //     const response = await axios.get(accessURL, {withCredentials: true})
  //     console.log("accessToken", response);
  //     setToken(response.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  // useEffect(() => {
  //     accessToken();
  // }, [])

  // 새로운 메모
  const handleSubmit = async (event) => {
    event.preventDefault();

    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    let newMemo = {
      id: Date.now(),
      title: title,
      content: content,
      timestemp : today,
      datetime : date,
      important: false,
    };

    if(user) {
      console.log("게스트 유저 존재")
      dispatch(addList(newMemo));
    }

    // if(token) {
    //   console.log("토큰 존재", token);
    //   try{
    //     await axios.post(WRITE_API, {
    //       email : token.email,
    //       content : newMemo,
    //     })
    //   } catch(err) {
    //     console.log("write Err", err);
    //   }
    // }
    navigate("/main");
  };

  const textAreaStyle = {
    width: "100%",
    height: "100%",
    resize: "none",
    outline: "none"
  }

  const writeStyle = {
    width: "500px",
    height: "500px"
  }

  return (
    <div className="WritePage">
      <h1>WritePage</h1>
        <input
          type="text"
          name="title"
          value={title}
          placeholder="제목 입력"
          onChange={(event) => setTitle(event.target.value)}
        ></input>
        <div style={writeStyle}>
        <textarea
          type="text"
          name="content"
          value={content}
          placeholder="내용을 입력해 주세요."
          onChange={(event) => setContent(event.target.value)}
          style={textAreaStyle}
        ></textarea>
        </div>
        <input
          type="submit"
          name="submit"
          value="등록하기"
          onClick={handleSubmit}
        ></input>
    </div>
  );
};
