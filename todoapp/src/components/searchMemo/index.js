import React from "react";
import { updateList } from "../../reducers/user";
import { useDispatch } from "react-redux";
import { MemoButton } from "../memoButton";

export const SearchMemo = ({
  mainContents,
  setEditPopupState,
  searchValue,
}) => {
  const dispatch = useDispatch();

  const searchDatas = () => {
    mainContents = mainContents.filter((mainContents) => {
      return mainContents.title.indexOf(searchValue) > -1; // 한 문자만 일치해도 검색 하도록 수정.
    });
  };

  const editList = (id) => {
    setEditPopupState(true);
    sessionStorage.setItem("editMemo", id);
  };

  const clickCheck = (id) => {
    let newData = mainContents.map((mainContents) => {
      if (mainContents.id === id) {
        mainContents.important = !mainContents.important;
      }
      return mainContents;
    });
    dispatch(updateList(newData));
  };

  searchDatas();

  const getStyle = (important) => {
    return {
      border: important ? "1px solid black" : "3px solid black",
    };
  };

  return (
    <div className="searchMemo">
      {mainContents?.map((contents) => (
        <div
          className="ListBox"
          key={contents.id}
          style={getStyle(contents.important)}
        >
          <div className="Title">{contents.title}</div>
          <div className="Content">{contents.content}</div>
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
