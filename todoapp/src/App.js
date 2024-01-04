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

  const Test = true

  return (
    <div className="App">
      <Routes>
        { Test ? (
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
