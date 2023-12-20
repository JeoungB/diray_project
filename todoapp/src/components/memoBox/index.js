import React from "react";
import "./memoBox.css";
import { useDispatch, useSelector } from "react-redux";
import { updateList } from "../../reducers/user";

const MemoBox = ({ contents, data }) => {

  const dispatch = useDispatch();
  const {user} = useSelector((state) => state);

  //console.log("redux data:", contents);
  //console.log("SQL data:", data);

  const loginData = () => {
    if(contents.length !== 0) {
      console.log("SQL 비었음")
      return contents; 
    }
    if(data.length !== 0) {
      console.log("리덕스 비었음")
      return data;
    }
  }

  loginData();

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
      {user ? (
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
      ) : (
        data.map((data) => (
          <div className="ListBox" key={data.id} style={getStyle(data.important)}>
            <div className="Title">{data.title}</div>
            <div className="Content">{data.content}</div>
            <input
              name="check-box"
              type="checkBox"
              defaultChecked={false}
              onClick={() => clickCheck(data.id)}
            />
            <button>X</button>
          </div>
        ))
      )}
    </div>
  );
};

export default MemoBox;
