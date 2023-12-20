const express = require("express");
const bodyParder = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

app.use(bodyParder.json());
app.use(cookieParser());
app.use(bodyParder.urlencoded({ extended: false }));
app.use(express.json()); // 유저가 보낸 array/onject 데이터를 출력해보기 위해 필요.
app.use(cors({
  origin : 'http://localhost:3000',
  methods: ['GET', 'POST'],
  credentials : true,
})); // 다른 도메인주소끼리 ajax요청 주고받을 때.

// mysql 연결
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

db.connect();

// 테스트 용 디비 데이터 전송 ===========================================================
app.get("/api", async (req, res) => {
  const sqlQuery = "SELECT * FROM user";
  db.query(await sqlQuery, (err, result) => {
    res.send({ result });
    //console.log("data :", result);
  });
});

// 회원가입 ==============================================================
app.post("/api/singin", async (req, res) => {
  try {
    const userData = req.body;
    const userEmail = req.body.email;
    console.log("회원가입 정보 :", userData);
    const userEmailQuery = "SELECT email FROM user WHERE email=?";
    const userIntoQuery = "INSERT INTO user SET ?";

        db.query(await userEmailQuery, userEmail, (err, result, fields) => {
            if (result.length !== 0) {
              console.log("이미 가입된 계정입니다.");
              res
              .sendStatus(409)
            }
            if (result.length === 0) {
              db.query(userIntoQuery, userData, (err, result, fields) => {
                if (err) throw err;
                console.log("등록 완료");
                res
                .sendStatus(200)
              });
            }
          });
  } catch (err) {
    console.log(err);
  }
});

// 이메일 중복 체크 ===================================================================
app.post("/api/singin/emailcheck", async (req, res) => {
  try {
    const userEmail = req.body.email;
    const sqlQuery = "SELECT email FROM user WHERE email=?";
    db.query(await sqlQuery, userEmail, (err, result, fields) => {
      if (err) throw err;
      if (result.length === 0) {
        res.sendStatus(200)
      }
      if (result.length !== 0) {
        res.sendStatus(409)
      }
    });
  } catch (err) {
    console.log(err);
  }
});

// 로그인 ==========================================================
app.post("/api/login", async (req, res) => {
  try {
    const userEmail = req.body.userData.email;
    const userPassword = req.body.userData.password;
    // 인증
    const sqlQuery = `SELECT * FROM user WHERE email ='${userEmail}'  AND password = '${userPassword}'`;
    db.query(await sqlQuery, (err, result) => {
      if(!result) {
        res.status(403).json("Not Authorized");
      } else {
        console.log("현존 로그인 데이터 :", result[0]);
        // access Token 발급
        const accessToken = jwt.sign({
          id: result[0].id,
          name: result[0].name,
          password: result[0].password,
        }, process.env.ACCESS_SECRET, {
          expiresIn: '1m',
          issuer: 'About Tech',
        })
        // refresh Token 발급
        const refreshToken = jwt.sign({
          id: result[0].id,
          name: result[0].name,
          password: result[0].password,
        }, process.env.REFRESH_SECRET, {
          expiresIn: '24h',
          issuer: 'About Tech',
        })

        console.log("토큰1", accessToken)
        console.log("2", refreshToken)

        // token 전송
        res.cookie("accessToken", accessToken, {
          secure: false,
          httpOnly: true,
        })

        res.cookie("refreshToken", refreshToken, {
          secure: false,
          httpOnly: true,
        })

        res.status(200).json("login success");
      }
    })
  } catch (err) {
    res.status(500).json(err);
  }
});

app.listen(process.env.PORT, () => {
  console.log(`server id on ${process.env.PORT}`)
});
