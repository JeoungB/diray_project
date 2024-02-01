import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addList } from "../../reducers/user";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Editor } from '@toast-ui/react-editor';
//import '@toast-ui/editor/dist/toastui-editor.css';

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

  const editorRef = useRef();

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
    console.log(editorRef.current.getInstance().getMarkdown());
    setContent(editorRef.current.getInstance().getMarkdown());
  };

  // 이미지 미리보기
  // 이 함수 살려뒀다가 프로필 이미지 설정 같은곳에 써보자.
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
      <Editor
        previewStyle="vertical"
        height="600px"
        initialEditType="wysiwyg"
        hideModeSwitch = "true"
        useCommandShortcut={false}
        language="ko-KR"
        ref={editorRef}
        onChange={contentsHandler}

      />
        {/* <input
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
            style={fileS}
          />
        <textarea
          id="content"
          name="content"
          value={content}
          onChange={contentsHandler}
          style={textAreaStyle}
        ></textarea>
        </div> */}
        <input
          type="submit"
          name="submit"
          value="등록하기"
          onClick={handleSubmit}
        ></input>
    </div>
  );
};
