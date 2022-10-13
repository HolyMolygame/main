const express = require('express');
const path = require('path');
const { send } = require('process');

const app = express();
const port = 5010;

app.use(express.static('public'));
app.use(express.json());

const users = [
  { userid: 'ungmo2@gmail.com', password: '111111', nickname: '이웅모' },
  { userid: 'test@test.com', password: '123456', nickname: 'test' },
  { userid: 'sogogijjang@naver.com', password: '123456', nickname: '이채련' },
];

app.post('/signin', (req, res) => {
  console.log(req);
  const { userid, password } = req.body;
  if (!userid || !password)
    return res.status(401).send({ error: '사용자 아이디 또는 패스워드가 전달되지 않았습니다.' });

  const user = users.find(user => user.userid === userid && user.password === password);

  if (!user) return res.status(401).send({ error: '등록되지 않은 사용자입니다.' });

  res.send({ userid });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen('5010', () => {
  console.log(`Server listening on http://localhost:${port}`);
});
