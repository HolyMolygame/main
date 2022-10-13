const express = require('express');
const path = require('path');

const app = express();
const port = 5010;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/:page', (req, res) => {
  const { page } = req.params;
  res.sendFile(path.join(__dirname, `/data/${page}.json`));
});

const users = [
  { userid: 'ungmo2@gmail.com', password: '111111', name: '이웅모' },
  { userid: 'test@test.com', password: '123456', name: 'test' },
];

app.post('/signin', (req, res) => {
  const { userid, password } = req.body;

  // 401 Unauthorized
  if (!userid || !password)
    return res.status(401).send({ error: '사용자 아이디 또는 패스워드가 전달되지 않았습니다.' });

  const user = users.findUser(userid, password);
  console.log('사용자 정보:', user);

  // 401 Unauthorized
  if (!user) return res.status(401).send({ error: '등록되지 않은 사용자입니다.' });

  // 로그인 성공
  res.send({ userid, username: user.name });
});

// 브라우저 새로고침을 위한 처리 (다른 route가 존재하는 경우 맨 아래에 위치해야 한다)
// 브라우저 새로고침 시 서버는 index.html을 전달하고 클라이언트는 window.location.pathname를 참조해 다시 라우팅한다.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(port, () => {
  console.log(`Server listening on http:/localhost:${port}`);
});
