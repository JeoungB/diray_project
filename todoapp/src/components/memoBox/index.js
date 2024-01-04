import React, { memo } from "react";
//import "./memoBox.css";
import { useDispatch, useSelector } from "react-redux";
import { updateList } from "../../reducers/user";

export const MemoBox = ({ contents, memberContents }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const clickCheck = (id) => {
    let newData = contents.map((contents) => {
      if (contents.id === id) {
        contents.important = !contents.important;
      }
      return contents;
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

  return (
    <div className="ListBoX-Container">
      {user ? (
        <div>
          {contents?.map((contents) => (
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
              <button>X</button>
            </div>
          ))}
        </div>
      ) : (
        <div>
          {memberContents?.map((memberContents) => (
            <div
              className="ListBox"
              key={memberContents.id}
              style={getStyle(memberContents.important)}
            >
              <div className="Title">{memberContents.title}</div>
              <div className="Content">{memberContents.content}</div>
              <input
                name="check-box"
                type="checkBox"
                defaultChecked={false}
                onClick={() => clickCheck(memberContents.id)}
              />
              <button>X</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
