import React, { useCallback, useState } from "react"
import { useDispatch } from "react-redux";
import { updateList, deleteList } from "../../reducers/user";

export const MemoButton = ({mainContents, contentsId}) => {
    const dispatch = useDispatch();

    const deleteLists = (id) => {
        if(window.confirm("선택한 메모를 지우시겠습니까?")) {
            dispatch(deleteList(id));
        }
      }

    return (
        <div className="memoButton">
             <button onClick={() => deleteLists(contentsId)}>X</button>
        </div>
    );
}