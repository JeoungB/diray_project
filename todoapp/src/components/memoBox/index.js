import React from "react";
import "./memoBox.css";
import { useDispatch, useSelector } from "react-redux";
import { updateList } from "../../reducers/user";

const MemoBox = ({ contents}) => {

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
  };

  const getStyle = (important) => {
    return {
      border: important ? "3px solid black" : "1px solid black",
    };
  };

  return (
    <div className="ListBoX-Container">
      {
        contents.map((contents) => (
          <div className="ListBox" key={contents.id} style={getStyle(contents.important)}>
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
        ))
      }
    </div>
  );
};

export default MemoBox;
