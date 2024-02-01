import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { updateList } from "../../reducers/user";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";

export const EditPage = ({
  mainContents,
  setEditPopupState
}) => {
  const memoId = JSON.parse(sessionStorage.getItem("editMemo"));
  const [currentTitle, setCurrentTitle] = useState("");
  const [currentContent, setCurrentContent] = useState();
  const [editTitle, setEditTitle] = useState();
  const [editContent, setEditContent] = useState();
  const dispatch = useDispatch();
  const editorRef = useRef();

  // 그대로 가져올 메모
  const editMemo = () => {
    const thisMemo = mainContents.filter((contents) => contents.id === memoId);
    setCurrentTitle(thisMemo[0].title);
    setCurrentContent(thisMemo[0].content);
    setEditTitle(thisMemo[0].title);
    setEditContent(thisMemo[0].content);
  };

  const editMemoList = () => {
    let newList = mainContents.map((mainContents) => {
      if (mainContents.id === memoId) {
        mainContents.title = editTitle;
        mainContents.content = editContent;
      }
      return mainContents;
    });
    if (window.confirm("수정 하시겠습니까?")) {
      dispatch(updateList(newList));
      setEditPopupState(false);
    }
  };

  const outEditPage = () => {
    if (currentTitle !== editTitle || currentContent !== editContent) {
      if (window.confirm("수정 후 저장하지 않았습니다. 취소 하시겠습니까?")) {
        setEditPopupState(false);
      }
    } else {
      setEditPopupState(false);
    }
  };

  useEffect(() => {
    editMemo();
  }, []);

  const contentsHandler = () => {
    console.log(editorRef.current.getInstance().getMarkdown());
    setEditContent(editorRef.current.getInstance().getMarkdown());
  };

  return (
    <div className="editPage">
      <input
        name="title"
        placeholder="제목"
        defaultValue={currentTitle || ""}
        onChange={(event) => setEditTitle(event.target.value)}
      ></input>
      {mainContents?.map((mainContents) => {
        if(mainContents.id === memoId) {
          return  <Editor
          key={mainContents.id}
          initialValue={mainContents.content || ""}
          placeholder="내용 입력"
          previewStyle="vertical"
          height="600px"
          initialEditType="wysiwyg"
          hideModeSwitch="true"
          useCommandShortcut={false}
          language="ko-KR"
          ref={editorRef}
          onChange={contentsHandler}
        /> 
        }
      })}
      {/* <textarea
          name="content"
          placeholder="내용"
          defaultValue={currentContent || ""}
          style={textAreaStyle}
          onChange={(event) => setEditContent(event.target.value)}
        ></textarea> */}
      <button onClick={outEditPage}>취소</button>
      <button onClick={editMemoList}>수정</button>
    </div>
  );
};
