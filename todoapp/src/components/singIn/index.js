import axios from "axios";
import React, { useState } from "react";

export const SingInPage = () => {
  const [name, setName] = useState(""); // 이름 저장
  const [email, setEmail] = useState(""); // 이메일 저장
  const [password, setPassword] = useState(""); // 비번 저장
  const [passwordCheck, setPasswordCheck] = useState(""); // 비번 체크 저장

  const [nameNullWarnging, setNameNullWarning] = useState(true); // 이름 필수값 체크
  const [namePatternWarning, setNamePatternWarning] = useState(true); // 이름 공백 및 특수문자 체크
  const [nameCount, setNameCount] = useState(0); // 이름 길이 제한

  const [emailNullWarning, setEmailNullWarning] = useState(true); // 이메일 필수값 체크
  const [emailPatternWarning, setEmailPatternWarning] = useState(true); // 이메일 공백 및 패턴 체크

  const [passwordNullWarning, setPasswordNullWarning] = useState(true); // 패스워드 필수값 체크
  const [passwordWarning, setPasswordWarning] = useState(true); // 비번 경고문 상태
  const [passwordCount ,setPasswordCount] = useState(0);
  const [passwordCountWarning, setPasswordCountWarning] = useState(true); // 패스워드 길이 제한.

  const [emailRedundantCheck, setEmailRedundantCheck] = useState(true); // 이메일 중복 상태
  const [buttonDisabled, setButtonDisabled] = useState(false); // 이메일 인풋 밑 버튼 활성화 상태 (이름 바꾸자)
  const [disabledWarningStyle, setDisabledWarningStyle] = useState(true);

  const apiUrl = "http://localhost:8080/api/singin"; // 회원가입 API
  const emailCheckApiUrl = "http://localhost:8080/api/singin/emailcheck"; // 이메일 중복 체크 API

  let blank_pattern = /[\s]/g; // 공백 체크
  let specialNamePattern = /[`~!@#$%^&*|\\\'\";:\/?]/gi; // 특수문자 패턴 체크
  let emailPattern =
    /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/; // 이메일 패턴 체크
  const MAX_NAME_LENGTH = 4;
  // warning 으로 스펠링 다 고쳐요.. ==========================================

  // 이거 다되면 코드 정리좀 (이름 정리, 쓸데없는거 삭제 등등 깔끔해 보이게)
  // 오늘은 그래도 이거 깃 허브에 올리자 데이터베이스도 어떻게 올리는지 확인하고.

  // 해야할 것 ============================!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // 1. 비밀번호 암호화
  // 2. 비밀번호 버튼 클릭시 보이게
  // 3. 회원가입 다 했으면 로그인 페이지로 이동

  // 엔터키 전역 방지
  document.addEventListener('keydown', (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
    }
  }, true);

  // 이름 포커스
  const nameBlurHandler = () => {
    while (true) {
      // 이름 필수값 체크
      if (name === "") {
        setNameNullWarning(false);
      } else {
        setNameNullWarning(true);
      }

      // 이름 공백 체크
      if (
        blank_pattern.test(name) === true ||
        specialNamePattern.test(name) === true
      ) {
        setNamePatternWarning(false);
      } else {
        setNamePatternWarning(true);
      }
      break;
    }
  };

  // 이메일 포커스
  const emailBlurHandler = () => {
    
    while (true) {
      // 1. 이메일 필수값 체크
      if (email === "") {
        setEmailNullWarning(false);
        setEmailPatternWarning(true);
        break;
      }
      if (email !== "") {
        setEmailNullWarning(true);
      }
      // 2. 이메일 공백 및 패턴 체크
      if (
        blank_pattern.test(email) === true ||
        emailPattern.test(email) === false
      ) {
        setEmailNullWarning(true);
        setEmailPatternWarning(false);
        break;
      }
      break;
    }
  };

  // 이메일 중복 체크
  const checkEmailHandler = async (event) => {
    event.preventDefault();

    while (true) {
      if (email === "") {
        setEmailNullWarning(false);
        setEmailPatternWarning(true);
        break;
      }
      if (email !== "") {
        setEmailNullWarning(true);
      }
      if (
        blank_pattern.test(email) === true ||
        emailPattern.test(email) === false
      ) {
        setEmailNullWarning(true);
        setEmailPatternWarning(false);
        break;
      }

      try {
        const response = await axios.post(emailCheckApiUrl, {
          email: email,
        });
        console.log("이메일 중복 검사 상태 :", response.status);
        if (response.status === 200) {
          alert("사용 가능한 아이디 입니다."); // 알림 문구도 나중에 css로 꾸며보자.
          setEmailRedundantCheck(true);
          setButtonDisabled(true);
          setEmailNullWarning(true);
          setEmailPatternWarning(true);
          setDisabledWarningStyle(true);
        }
      } catch (err) {
        console.log("err :", err.response);
        if (err.response.status === 409) {
          alert("중복된 아이디 입니다.");
          setEmailRedundantCheck(false);
          setEmailNullWarning(true);
          setEmailPatternWarning(true);
        }
      }
      break;
    }
  };

  // 패스워드 포커스
  const passwordBlurHandler = () => {
      if (password === "") {
        setPasswordNullWarning(false);
      } else {
        setPasswordNullWarning(true);
      }
  
      if(password !== "" && passwordCount < 8) {
        setPasswordCountWarning(false);
      } else {
        setPasswordCountWarning(true);
      }
  };

  // 경고 및 인풋 스타일
  // 이름 경고문
  const nullNameWarningStyle = {
    display: nameNullWarnging ? "none" : "block",
    color: "red",
  };

  const NamePatternWarningStyle = {
    display: namePatternWarning ? "none" : "block",
    color: "red",
  };

  const nullNameInputStyle = {
    borderColor: nameNullWarnging ? (namePatternWarning ? "" : "red") : "red",
    outline: "none",
  };

  // 이메일 경고문
  const emailNullWarningStyle = {
    display: emailNullWarning ? "none" : "block",
    color: "red",
  };

  const emailBlankWarningStyle = {
    display: emailPatternWarning ? "none" : "block",
    color: "red",
  };

  const nullInputEmailStyle = {
    borderColor: emailNullWarning
      ? emailPatternWarning
        ? emailRedundantCheck
          ? ""
          : "red"
        : "red"
      : "red",
    outline: "none",
  };

  const emailRedundantWarningStyle = {
    display: disabledWarningStyle ? "none" : "block",
    color: "red",
  };

  // 비밀번호 경고문
  const warningPasswordStyle = {
    display: passwordWarning ? "none" : "block",
    color: "red",
  };

  const nullPasswordWarningStyle = {
    display: passwordNullWarning ? "none" : "block",
    color: "red",
  };

  const nullPasswordInputStyle = {
    borderColor: passwordNullWarning ? passwordCountWarning ? "" : "red" : "red",
  };

  const passwordCountWarningStyle = {
    display: passwordCountWarning ? "none" : "block",
    color: "red",
  };

  // 입력값
  const nameHandler = (event) => {
    if(event.target.value.length > MAX_NAME_LENGTH) {
      event.target.value = event.target.value.slice(0, MAX_NAME_LENGTH);
    }
    setName(event.target.value);
    setNameCount(event.target.value.length);
  };

  const emailHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordHandler = (event) => {
    setPassword(event.target.value);
    setPasswordCount(event.target.value.length);
  };

  const passwordCheckHandler = (event) => {
    setPasswordCheck(event.target.value);
  };

  // 데이터 전송 함수
  // 비번 보낼때 암호화 시켜서 보내자.
  // 1. HTTPS 를 사용하면 자체 보안이 있기 떄문에 프론트단에서 request 보내도 된다.
  // 2. 애초에 해커가 request 자체를 가져가 버리면 문제가 된다.
  // 3. 그런 이유로 서버에서 암호화 시키는것이 좋을듯 (HTTPS 전제하에)
  const submitData = async () => {
    try {
      const response = await axios.post(apiUrl, {
        name: name,
        email: email,
        password: password,
      });
      console.log("보낸 유저 데이터에 대한 서버 응답 :", response);
    } catch (err) {
      console.log(err);
      if(err.response.status === 409) {
        alert("이미 가입된 계정입니다.")
      }
    }
  };

  // 가입하기 버튼 함수
  const checkSubmitData = (event) => {
    const confirmResult = window.confirm("가입 하시겠습니까?");
    event.preventDefault();
    // 1. 이름 체크
    while (true) {
      if (name === "") {
        setNameNullWarning(false);
        setNamePatternWarning(true);
      }

      if (blank_pattern.test(name) === true) {
        setNameNullWarning(true);
        setNamePatternWarning(false);
      }

      // 2. 이메일 체크
      if (email === "") {
        setEmailNullWarning(false);
        setDisabledWarningStyle(true);
      } else if (
        blank_pattern.test(email) === true ||
        emailPattern.test(email) === false
      ) {
        setEmailNullWarning(true);
        setEmailPatternWarning(false);
        setDisabledWarningStyle(true);
      } else if (!buttonDisabled) {
        setEmailPatternWarning(true);
        setDisabledWarningStyle(false);
      } else {
        setEmailPatternWarning(true);
        setDisabledWarningStyle(true);
      }

      // 3. 비밀번호 체크
      if (password === "") {
        setPasswordNullWarning(false);
      }

      if(password !== "" && passwordCount < 8) {
        setPasswordCountWarning(false);
        break;
      } else {
        setPasswordCountWarning(true);
      }

      if (password !== "" && password !== passwordCheck) {
        setPasswordWarning(false);
        setPasswordNullWarning(true);
        break;
      } else {
        setPasswordWarning(true);
      }

      // 4. 필수값 입력 확인.
      if (
        !nameNullWarnging ||
        !namePatternWarning ||
        !emailNullWarning ||
        !emailPatternWarning ||
        !passwordNullWarning ||
        !buttonDisabled
      ) {
        break;
      }
      // 5. 가입 확인 체크.
      if (confirmResult) {
        console.log("전송됨");
        submitData();
        // 전송 완료 되면 로그인 페이지로 이동.
      }
      break;
    }
  };

  return (
    <div id="singInPage">
      <div className="singIn__wrapper">
        <form className="singIn__form" onSubmit={checkSubmitData}>
          <input
            className="name"
            name="name"
            type="text"
            placeholder="이름 (1 ~ 4자)"
            onChange={nameHandler}
            onBlur={nameBlurHandler}
            style={nullNameInputStyle}
            maxLength={MAX_NAME_LENGTH}
          ></input>
          <p>{nameCount} / 4 자</p>
          <p style={nullNameWarningStyle}>*이름 : 필수 값 입니다</p>
          <p style={NamePatternWarningStyle}>
            *이름 : 한글, 영문 대/소문자를 사용해 주세요. (특수기호, 공백 사용
            불가)
          </p>
          {/* 이메일 블러 떄문에 인풋 버튼 한번에 div에 넣고 블러 처리해줌. */}
          <div className="email_form" onBlur={emailBlurHandler}>
            <input
              className="email"
              name="email"
              type="text"
              placeholder="이메일"
              onChange={emailHandler}
              style={nullInputEmailStyle}
              disabled={buttonDisabled}
            ></input>
            <button onClick={checkEmailHandler} disabled={buttonDisabled}>
              이메일 중복 검사
            </button>
          </div>
          <p style={emailNullWarningStyle}>*이메일 : 필수값 입니다.</p>
          <p style={emailBlankWarningStyle}>
            *이메일 형식이 아닙니다. (공백 사용 불가)
          </p>
          <p style={emailRedundantWarningStyle}>*이메일 중복 확인을 하세요.</p>
          <input
            className="password"
            name="password"
            type="password"
            placeholder="비밀번호 (8 ~ 16자)"
            onChange={passwordHandler}
            onBlur={passwordBlurHandler}
            style={nullPasswordInputStyle}
            maxLength="16"
          ></input>
          <p>{passwordCount} / 16 자</p>
          <p style={passwordCountWarningStyle}>*비민번호 : 8~16자 이어야 합니다.</p>
          <p style={nullPasswordWarningStyle}>*비밀번호 : 필수값 입니다.</p>
          <input
            className="password"
            name="passwordCheck"
            type="password"
            placeholder="비밀번호 확인"
            onChange={passwordCheckHandler}
          ></input>
          <p style={warningPasswordStyle}>입력된 두 비밀번호가 다릅니다.</p>
          <button
            className="button"
            name="submit"
            type="submit"
            value="가입하기"
          >
            가입하기
          </button>
        </form>
      </div>
    </div>
  );
};
