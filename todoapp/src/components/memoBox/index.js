import React, { useState } from "react";
//import "./memoBox.css";
import { useDispatch, useSelector } from "react-redux";
import { updateList } from "../../reducers/user";
import { MemoButton } from "../memoButton";
import Parser from "html-react-parser";
import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';

export const MemoBox = ({ mainContents, setEditPopupState }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const clickCheck = (id) => {
    let newData = mainContents.map((mainContents) => {
      if (mainContents.id === id) {
        mainContents.important = !mainContents.important;
      }
      return mainContents;
    });
    dispatch(updateList(newData));
  };

  const getStyle = (important) => {
    return {
      border: important ? "1px solid black" : "3px solid black",
    };
  };

  const editList = (id) => {
    setEditPopupState(true);
    sessionStorage.setItem("editMemo", id);
  }

  return (
    <div className="ListBoX-Container">
      {mainContents?.map((contents) => (
        <div
          className="ListBox"
          key={contents.id}
          style={getStyle(contents.important)}
        >
          <div className="Title">{contents.title}</div>
          {/* 뷰어 수정하기 바로 적용 안됨 */}
          {/* <div className="Content">{contents.content}</div> */}
          <Viewer initialValue={contents.content} />
          <div className="Datetime">{contents.datetime}</div>
          <input
            name="check-box"
            type="checkBox"
            defaultChecked={false}
            onClick={() => clickCheck(contents.id)}
          />
          <MemoButton mainContents={mainContents} contentsId={contents.id} />
          {/* 컴포넌트 나누기 */}
          <button onClick={() => editList(contents.id)}>수정하기</button>
        </div>
      ))}
    </div>
  );
};
