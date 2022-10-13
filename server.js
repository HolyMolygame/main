const express = require('express');
// const { MongoClient } = require('mongodb');
const path = require('path');

const app = express();
const port = 5010;

let users = [
  { userid: 'ungmo2@gmail.com', password: '111111', name: '이웅모' },
  { userid: 'test@test.com', password: '123456', name: 'test' },
];

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.post('/signin', (req, res) => {
  console.log(req.body);
  res.send('전송완료');
});

// 브라우저 새로고침을 위한 처리 (다른 route가 존재하는 경우 맨 아래에 위치해야 한다)
// 브라우저 새로고침 시 서버는 index.html을 전달하고 클라이언트는 window.location.pathname를 참조해 다시 라우팅한다.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen('5010', () => {
  console.log(`Server listening on http://localhost:${port}`);
});
