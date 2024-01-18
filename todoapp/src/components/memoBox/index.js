import React, { memo } from "react";
//import "./memoBox.css";
import { useDispatch, useSelector } from "react-redux";
import { updateList, deleteList } from "../../reducers/user";

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
    // 클릭 할 때마다 새로운 배열 데이터 서버에 저장.
    console.log("datas", newData);
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

  const deleteLists = (id) => {
    let newData = mainContents.filter(mainContents => mainContents.id !== id);
    console.log("삭제 후 리스트", newData);
    if(window.confirm("선택한 메모를 지우시겠습니까?")) {
      dispatch(deleteList(newData));
    }
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
          <div className="Content">{contents.content}</div>
          <input
            name="check-box"
            type="checkBox"
            defaultChecked={false}
            onClick={() => clickCheck(contents.id)}
          />
          <button onClick={() => deleteLists(contents.id)}>X</button>
          <button onClick={() => editList(contents.id)}>수정하기</button>
        </div>
      ))}
    </div>
  );
};
