//var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
require("dotenv").config()
require('express-async-errors')
const articleRouter = require('./routes/article')
const usersRouter = require('./routes/users')
const loginRouter = require('./routes/auth')
const reqArticleRouter = require('./routes/requestArticle.js')
const mongoose = require("mongoose")
const { Configuration, OpenAIApi } = require("openai")
const cors = require("cors")
var bodyParser = require('body-parser')

var app = express()

//db connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

//routes
app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)
app.use('/articles', reqArticleRouter)
app.use('/api/articles', articleRouter)
// app.use('/', indexRouter)
// app.use('/users', usersRouter)

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404))
// })

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message
//   res.locals.error = req.app.get('env') === 'development' ? err : {}

//   // render the error page
//   res.status(err.status || 500)
//   res.render('error')
// })

app.get('/', (req,res)=>{
  res.send("this is a response")
  // var query = req.params.query
  // var data = new Model({
  //   'Title': req.params.title,
  //   'Author': req.params.Author,
  //   'Link': req.params.Text,
  //   'Text': req.params.Text,
  // }).save(function(err, result) {
  //   if (err) throw err
  //   if (result) {
  //     res.json(result)
  //   }
  // })
  
})

app.use((err, req, res, next) => {
  res.locals.error = err
  const status = err.status || 500
  res.status(status)
  res.render('error')
})

app.listen(process.env.PORT, () => {
  console.log(`Backend is running on port ${process.env.PORT}`)
})




module.exports = app
