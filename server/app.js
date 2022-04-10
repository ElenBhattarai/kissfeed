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

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

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

app.get('/:url', (req,res)=>{
  console.log('anything')
  let url = req.params.url
  
  const configuration = new Configuration({
    apiKey: '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'
  });
  const openai = new OpenAIApi(configuration);

  let response;

  const truncate = (str, max) => str.length < max ? str : `${str.substr(0, str.substr(0, max).lastIndexOf(' '))}`

  parser.extract(url).then((article) => {
      
      let content = article.content.replace(/(<([^>]+)>)/ig, "")
      content = content.replace(/(\r\n|\n|\r)/gm, "")
      console.log(content)

      return content
  }).catch((err) => {
      console.trace(err)
  }).then((content)=> {
      let iterations = content.length / 1500
      let simplified = String()
      for (let i=0; i < iterations; i++) {
          content = content.replace(truncate(content, 1500), "")
          if (content.length < 100) {
              continue
          }
          const openai2 = async()=> {
              response = await openai.createCompletion("text-davinci-002", {
                  prompt: "Summarize this for a second-grade student:\n\n" + content,
                  temperature: 0.7,
                  max_tokens: 300,
                  top_p: 1.0,
                  frequency_penalty: 0.0,
                  presence_penalty: 0.0,
              })
              console.log(response.data.choices[0].text)
              simplified = simplified.concat(response.data.choices[0].text)
          }
          openai2()
          console.log(simplified, "test\n\n")
      }
      
  })

})

app.listen(8800, ()=> {
  console.log("Backend is running")
})

module.exports = app;
