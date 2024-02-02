import "./App.css";
import { Routes, Route } from "react-router-dom";
import DefaultLayout from "./components/defaultLayout";
import { WritePage } from "./components/writePage";
import { LoginPage } from "./components/logIn";
import { SingInPage } from "./components/singIn";
import { useDispatch, useSelector } from "react-redux";
import NotLogin from "./components/notLogin";
import axios from "axios";
import {login} from '../src/reducers/isLogin';
import { MainPage } from "./components/mainPage";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const isLogin  = useSelector((state) => state.login.isLogin);
  const TOKEN_LOGIN_URL = "http://localhost:8080/api/isLogin";

  // 토큰 존재 여부에 따른 로그인 유지.
  const tokenLoginState = async () => {
    try {
      const loginState = await axios.get(TOKEN_LOGIN_URL, {withCredentials: true});
      console.log(loginState);
      if(loginState.data === true) {
        dispatch(login(true));
      }

      if(loginState.data === false) {
        dispatch(login(false));
      }
    } catch (err) {
      console.log(err)
    }
  }

  // =========================== 1 ===================================
  // CSS 작업 들어가면서 부족한 기능 채우기
  // 이 후 mysql 설치 및 연결 및 기능 확인까지

  // ============================= 2 =================================
  // 게스트 유저인 경우 로그인 페이지로 이동하거나 화면을 끄면 자동 로그아웃
  // 멤버 유저인 경우 로그아웃을 누를때만 로그아웃
  // isLogin 은 게스트 유저 || 쿠키 여부 둘중 하나라도 있다면 로그인 유지
  // isLogin 은 게스트 유저 전용으로 세션스토리지에 저장.  

  return (
    <div className="App">
      <Routes>
        { isLogin ? (
          <Route path="/" element={<DefaultLayout />}>
            <Route path="main" element={<MainPage />} />
            <Route path="write" element={<WritePage />} />
          </Route>
        ) : (
          ["/main", "/write"].map((path) => (
            <Route path={path} key={path} element={<NotLogin />} />
          ))
        )}
        <Route index element={<LoginPage />} />
        <Route path="singin" element={<SingInPage />} />
      </Routes>
    </div>
  );
}

export default App;
