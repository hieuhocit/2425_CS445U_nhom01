require('dotenv').config();
const cors = require('cors');
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const path = require('path');

const userRouter = require('./route/userRouter');
const lawRouter = require('./route/lawRouter');
const signRouter = require('./route/signRouter');
const licenseRouter = require('./route/licenseRouter');
const examRouter = require('./route/examRouter');
const questionRouter = require('./route/questionRouter');
const answerRouter = require('./route/answerRouter');
const topicRouter = require('./route/topicRouter');
const viewRouter = require('./route/viewRouter');
const adminRouter = require('./route/adminRouter');

const app = express();

app.use(cors({ origin: process.env.ORIGIN_URL, credentials: true }));

// Static assets
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      sameSite: 'none',
    },
  })
);

app.use('/api/track-visit', viewRouter);
app.use('/api/user', userRouter);
app.use('/api/law', lawRouter);
app.use('/api/sign', signRouter);
app.use('/api/licenses', licenseRouter);
app.use('/api/exams', examRouter);
app.use('/api/questions', questionRouter);
app.use('/api/answers', answerRouter);
app.use('/api/topics', topicRouter);
app.use('/api/admin', adminRouter);

app.use((req, res) => {
  res.status(404).json({
    statusCode: 404,
    message: 'NOT FOUND',
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
