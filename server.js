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

MongoClient.connect(process.env.DBURL, (err, client) => {
  if (err) throw err;
  db = client.db('holymoly');
  const dbUser = db.collection('user');

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
      console.log(`😀 auth success`, decoded);
      next();
    } catch {
      console.error('😱 auth failure..');
      // 클라이언트로부터 토큰이 전달되지 않아 accessToken이 undefined이거나 토큰이 유효하지 않으면
      return res.redirect('/signin');
    }
  };

  const isSigned = (req, res) => {
    const accessToken = req.headers.authorization || req.cookies.accessToken;

    try {
      const decoded = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
      console.log(`😀 auth success`, decoded);
      res.send({ success: true });
    } catch {
      console.error('😱 auth failuer..');
      res.send({ success: false });
    }
  };

  app.get('/auth', isSigned);

  app.get('/ranker', (req, res) => {
    dbUser
      .find()
      .sort({ record: 1 })
      .toArray((err, result) => {
        if (err) throw err;
        res.send(result.slice(0, 10));
      });
  });

  // auth route
  app.get('/signin', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));

  app.get('/logout', (req, res) => res.clearCookie('accessToken').end());

  app.post('/signup', async (req, res) => {
    const { userid, username, password } = req.body;

    try {
      const isUser = await dbUser.findOne({ id: userid });

      if (isUser) return res.status(401).send({ error: 'already used id' });

      dbUser.insertOne({ nickname: username, id: userid, password, record: '99:99:96' }, (err, res) => {
        if (err) throw err;
        console.log('saved!');
      });
      res.send('Success');
    } catch (error) {
      console.log(error.message);
      return res.status(500).send('Server Error');
    }
  });

  app.post('/signin', async (req, res) => {
    const { userid, password } = req.body;
    // userid 가 없거나, password가 없으면 에러
    if (!userid || !password) return res.status(401).send({ error: 'No username or password was passed.' });

    const isUser = await dbUser.findOne({ id: userid });
    const isPassword = await dbUser.findOne({ password });

    if (!isUser) return res.status(401).send({ error: 'Unregistered user.' });
    if (!isPassword) return res.status(401).send({ error: 'password is wrong.' });

    // jwt 토큰 발급
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

  app.post('/matching', async (req, res) => {
    const { nickname, record } = req.body;

    const oldValue = await dbUser.findOne({ nickname });
    let newValue;

    if (oldValue.record < record) {
      newValue = { $set: { record: oldValue.record } };
    } else if (oldValue.record >= record) {
      newValue = { $set: { record } };
    }

    dbUser.updateOne({ nickname }, newValue, (err, res) => {
      if (err) throw err;
      console.log('saved!!!');
    });

    res.send(record);
  });

  app.get('/rank', auth, (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));
  app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));

  app.listen(`${port}`, () => console.log(`Server listening on http://localhost:${port}`));
});
