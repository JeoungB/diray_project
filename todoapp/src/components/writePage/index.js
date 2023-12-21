import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addList } from "../../reducers/user";
import axios from "axios";

export const WritePage = ({token}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const {user} = useSelector((state) => state);
  const dispatch = useDispatch();
  const WRITE_API = "http://localhost:8080/api/createMemo";
  let day = new Date();

  // 새로운 메모
  const handleSubmit = async (event) => {
    event.preventDefault();

    let newMemo = {
      id: Date.now(),
      title: title,
      content: content,
      dateTime : day.toLocaleDateString(),
      important: false,
    };

    if(user) {
      console.log("게스트 유저 존재")
      dispatch(addList(newMemo));
    }

    if(token) {
      console.log("토큰 존재", token);
      try{
        await axios.post(WRITE_API, {
          email : token.email,
          content : newMemo,
        })
      } catch(err) {
        console.log("write Err", err);
      }
    }

  };

  const { contents } = useSelector((state) => state);

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
