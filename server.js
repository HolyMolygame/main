const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { MongoClient } = require('mongodb');

const app = express();
const port = process.env.PORT;

app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

let users = [
  { nickname: 'test', userid: 'test@test.com', password: '123456', record: '00:40:00' },
  { nickname: 'HEALTY', userid: 'a1', password: '111', record: '00:45:00' },
  { nickname: '이웅모', userid: 'ungmo2@gmail.com', password: '111111', record: '00:35:00' },
];

MongoClient.connect(process.env.DBURL, (err, client) => {
  if (err) throw err;
  db = client.db('holymoly');

  const auth = (req, res, next) => {
    /**
     * 토큰이 리퀘스트의 Authorization 헤더를 통해 전달되면 req.headers.authorization으로 전달받고
     * 토큰이 쿠키를 통해 전달되면 req.cookies.accessToken으로 전달받는다.
     */
    const accessToken = req.headers.authorization || req.cookies.accessToken;

    try {
      /**
       * 서명이 유효하고 옵션인 expiration, audience, issuer 등이 유효한 경우 디코딩된 페이로드를 반환한다. 그렇지 않으면 에러가 발생한다.
       * @see https://github.com/auth0/node-jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback
       */
      const decoded = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
      console.log(`😀 사용자 인증 성공`, decoded);
      next();
    } catch {
      console.error('😱 사용자 인증 실패..');
      // 클라이언트로부터 토큰이 전달되지 않아 accessToken이 undefined이거나 토큰이 유효하지 않으면
      return res.redirect('/signin');
    }
  };

  const isSigned = (req, res) => {
    const accessToken = req.headers.authorization || req.cookies.accessToken;

    try {
      const decoded = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
      console.log(`😀 사용자 인증 성공`, decoded);
      res.send({ success: true });
    } catch {
      console.error('😱 사용자 인증 실패..');
      res.send({ success: false });
    }
  };

  const rank = (req, res) => {
    const accessToken = req.headers.authorization || req.cookies.accessToken;

    const compareFunc = (numA, numB) => {
      const recordA = numA.record;
      const recordB = numB.record;

      return recordA < recordB ? -1 : 1;
    };
    try {
      const decoded = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
      console.log(`😀 사용자 인증 성공`, decoded);

      users.sort((a, b) => compareFunc(a, b));
      res.send(users);
    } catch {
      console.error('😱 사용자 인증 실패..');

      res.send([]);
    }
  };
  app.get('/auth', isSigned);

  app.get('/ranker', rank);

  // auth route
  app.get('/signin', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
  });

  // app.get('/rank', (req, res) => {
  //   res.sendFile(path.join(__dirname, './public/index.html'));
  // });

  app.post('/signup', async (req, res) => {
    const { userid, username, password } = req.body;

    if (!userid || !password || !username)
      return res.status(401).send({ error: '사용자 아이디 또는 패스워드가 전달되지 않았습니다.' });

    try {
      // email을 비교하여 user가 이미 존재하는지 확인
      const isUser = await db.collection('user').findOne({ id: userid });
      const isNickname = await db.collection('user').findOne({ nickname: username });

      if (isUser) {
        return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
      }
      if (isNickname) {
        return res.status(400).json({ errors: [{ msg: 'Nickname already exists' }] });
      }

      // 디비에 저장
      db.collection('user').insertOne({ nickname: username, id: userid, password }, (err, result) => {
        console.log('저장완료');
      });
      res.send('Success');
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  });

  app.post('/signin', async (req, res) => {
    const { userid, password } = req.body; // request의 body에 담긴 내용을 사용하기위한 디스트럭쳐링할당
    // userid 가 없거나, password가 없으면 띄워주는 에러메세지
    if (!userid || !password)
      return res.status(401).send({ error: '사용자 아이디 또는 패스워드가 전달되지 않았습니다.' });

    // users배열에 userid와 password가 일치하는 user있는지 find 해서 user에 담아준다.
    // 데이터베이스를 불러와서 탐색한다음 찾아줘야 하는 코드 작성 필요
    const isUser = await db.collection('user').findOne({ id: userid });

    // 만약 위 검색에서 user가 담기지 않았다면 띄워주는 에러메세지
    if (!isUser) return res.status(401).send({ error: '등록되지 않은 사용자입니다.' });

    // 로그인 성공 시 user 가 있다면 jwt 토큰을 발급해서 response의 헤더에 쿠키에 담아서 보내줘야함.
    const accessToken = jwt.sign({ userid }, process.env.JWT_SECRET_KEY, {
      expiresIn: '1d',
    });

    // 쿠키에 토큰 설정(http://expressjs.com/ko/api.html#res.cookie)
    res.cookie('accessToken', accessToken, {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7d
      httpOnly: true,
    });

    res.send(isUser.nickname);
  });

  app.post('/matching', (req, res) => {
    const { nickname, record } = req.body;

    users = users.map(user => (user.nickname === nickname ? { ...user, nickname, record } : user));
    console.log(users);

    res.send(record);
  });

  // url 로 들어오는 모든 요청이 오면 index.html 을 보내준다.
  app.get('*', auth, (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
  });

  app.listen('5010', () => {
    console.log(`Server listening on http://localhost:${port}`);
  });
});
