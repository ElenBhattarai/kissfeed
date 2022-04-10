var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const dotenv = require("dotenv")
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const mongoose = require("mongoose")
var parser = require('article-parser')
const { Configuration, OpenAIApi } = require("openai");
const cors = require("cors")
var bodyParser = require('body-parser')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

dotenv.config()

//db connection
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("Connected to database!")
}

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

app.get('/', (req,res)=>{
  console.log('anything')
  let url = req.query.url
  const configuration = new Configuration({
    apiKey: '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'
  });
  const openai = new OpenAIApi(configuration);

  let response;
  let content
  parser.extract("https://www.bbc.com/news/world-asia-61055210").then((article) => {
    content = article.content.replace(/(<([^>]+)>)/ig, "")
    content = content.replace(/(\r\n|\n|\r)/gm, "")

    return content
  }).catch((err) => {
      console.trace(err)
  }).then((content)=> {
    var simplified
      let openai2 = async () => {
          response = await openai.createCompletion("text-davinci-002", {
              prompt: "Summarize this for a second-grade student:\n\n" + content,
              temperature: 0.7,
              max_tokens: 500,
              top_p: 1.0,
              frequency_penalty: 0.0,
              presence_penalty: 0.0,
          })
          simplified = response.data.choices[0].text
          console.log(simplified)
      }
      openai2()
      console.log(simplified)

      res.send("hello")

  })
})

app.use((err, req, res, next) => {
  res.locals.error = err;
  const status = err.status || 500;
  res.status(status);
  res.render('error');
});

app.listen(8800, ()=> {
  console.log("Backend is running")
})



module.exports = app;
