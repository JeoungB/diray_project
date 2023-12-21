import "./App.css";
import { Routes, Route } from "react-router-dom";
import DefaultLayout from "./components/defaultLayout";
import MainPage from "./components/mainPage";
import { WritePage } from "./components/writePage";
import { LoginPage } from "./components/logIn";
import { SingInPage } from "./components/singIn";
import { useSelector } from "react-redux";
import Loding from "./components/loding";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {

  const refreshURL = "http://localhost:8080/api/refreshToken";
  const accessURL = "http://localhost:8080/api/accessToken";
  const { user } = useSelector((state) => state);
  const [token, setToken] = useState();

  const refreshToken = async () => {
    try{
      const response = axios.get(refreshURL, {withCredentials: true})
      console.log("refreshToken", response);
    } catch (err) { 
      console.log(err);
    }
  }

  const accessToken = async () => {
    try {
      const response = await axios.get(accessURL, {withCredentials: true})
      console.log("accessToken", response);
      setToken(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    refreshToken();
    accessToken();
  }, [])
  
  return (
    <div className="App">
      <Routes>
        {token || user ? (
          <Route path="/" element={<DefaultLayout />}>
            <Route path="main" element={<MainPage />} />
            <Route path="write" element={<WritePage token={token} />} />
          </Route>
        ) : (
          ["/main", "/write"].map((path) => (
            <Route path={path} key={path} element={<Loding />} />
          ))
        )}
        <Route index element={<LoginPage />} />
        <Route path="singin" element={<SingInPage />} />
      </Routes>
    </div>
  );
}

export default App;
