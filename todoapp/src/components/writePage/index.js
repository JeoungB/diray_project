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

  const contentsHandler = (event) => {
    const divContent = document.getElementById("content").innerHTML;

    setContent(divContent);
  };

  // 이미지 삽입 후 뒤에 br 태그 추가.
  const imageUploader = (event) => {
    const file = event.target.files;
    if(file.length === 0) {
      return;
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
  
      reader.onload = (event) => {
        const divContent = document.getElementById("content");
        divContent.style.overflow = "hidden";
        divContent.style.position = "relative";
        const image = document.createElement("img");
        image.setAttribute("src", event.target.result);
        image.style.position = "relative";
        image.style.width = "100%";
        image.style.left = "50%"
        image.style.transform = "translate(-50%, 0)";
        divContent.appendChild(image);
      }
    }
  };

  const textAreaStyle = {
    width: "500px",
    height: "500px",
    resize: "none",
    outline: "none",
    border : "1px solid black"
  };

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
        <div>
        <input 
            type="file"
            name="image"
            accept="image/*"
            onChange={imageUploader}
          />
        <div
          id="content"
          name="content"
          value={content}
          contentEditable="true"
          onInput={contentsHandler}
          style={textAreaStyle}
        ></div>
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
