import "./App.css";
import { Routes, Route } from "react-router-dom";
import DefaultLayout from "./components/defaultLayout";
import MainPage from "./components/mainPage";
import { WritePage } from "./components/writePage";
import { LoginPage } from "./components/logIn";
import { SingInPage } from "./components/singIn";
import { useSelector } from "react-redux";
import Loding from "./components/loding";

function App() {
  // 리액트 메모 써서 최적화.
  // 앱 첫 화면에 투두 리스트 메인화면 보여주고 메인화면 애니메이션 사라지면서
  // 로그인 페이지로 이동하고 로그인이 되어있으면 바로 투두 리스트 페이지로 이동하게.
  // !!!!!!!!!!!!!! 작업 순서 !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // 1. 게스트로 시작해서 URL 작업.
  // 2. 게스트로 시작하면 데이터를 스토리지에 저장
  // 3. 게스트 모드로 메모 기능 구현 및 모든 기능 구현
  // - 메모 갯수 제한.
  // 4. CSS 작업
  // 5. 위 모든 기능 및 CSS가 완성되면 로그인 기능 구현
  // 만들다가 로그인에서 이메일 보내기 부분 문제 생길거 같으면 그냥 로그인 빼고 만들자
  // 아니면 거기까진 내가 생각 안해도 되는 부분일 수 있으니까 대충 이름 이메일 적으면 비번 알려구고 하자. 간단하게 만들자.

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // 나중에 로그인 후 사용해 주세요 팝업 뜨면서 팝업 바깥부분은 어두운 색으로 CSS 작업

  // store에 접근하여 state가져오기
  // isLogin 리듀서 새로 하나 만들어서 그걸로 로그인 처리.. 이거 먼저!!
  // 이후에 검색 데이터 수정
  const { user } = useSelector((state) => state);

  return (
    <div className="App">
      {/* <Routes>
        {user ? (
          <Route path="/" element={<DefaultLayout />}>
            <Route path="main" element={<MainPage />} />
            <Route path="write" element={<WritePage />} />
          </Route>
        ) : (
          ["/main", "/write"].map((path) => (
            <Route path={path} key={path} element={<Loding />} />
          ))
        )}
        <Route index element={<LoginPage />} />
        <Route path="singin" element={<SingInPage />} />
      </Routes> */}

<Routes>
          <Route path="/" element={<DefaultLayout />}>
            <Route path="main" element={<MainPage />} />
            <Route path="write" element={<WritePage />} />
          </Route>
        <Route index element={<LoginPage />} />
        <Route path="singin" element={<SingInPage />} />
      </Routes>
    </div>
  );
}

export default App;
