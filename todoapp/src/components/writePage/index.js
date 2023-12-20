import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addList } from "../../reducers/user";

export const WritePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const dispatch = useDispatch();

  // 새로운 메모
  const handleSubmit = (event) => {
    event.preventDefault();

    let newMemo = {
      id: Date.now(),
      title: title,
      content: content,
      important: false,
    };

    dispatch(addList(newMemo));
  };

  const { contents } = useSelector((state) => state);
  console.log("contant:", contents);

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
        <td style={writeStyle}>
        <textarea
          type="text"
          name="content"
          value={content}
          placeholder="내용을 입력해 주세요."
          onChange={(event) => setContent(event.target.value)}
          style={textAreaStyle}
        ></textarea>
        </td>
        <input
          type="submit"
          name="submit"
          value="등록하기"
          onClick={handleSubmit}
        ></input>
    </div>
  );
};
