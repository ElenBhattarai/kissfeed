const loginRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')

loginRouter.post('/register', async (req,res) => {
    //De-structure the request body json
    const {username, email, password} = req.body
    try{
        //generate hashed password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        //generate new user
        const newUser = new User({username,email,password:hashedPassword})
        //save user to DB
        const user = await newUser.save()
        res.status(200).send(user)
    } catch(e) {
        console.log(e)
    }
})

loginRouter.post('/', async (req,res) => {
    const {username, password} = req.body

    //check the user's email in DB
    const user = await User.findOne({username})
    //if no user found
    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(password, user.passwordHash)

    if (!(user && passwordCorrect)) {
        return res.status(401).json({
            error: 'invalid username or password'
        })
    }
    const userForToken = {
        username: user.username,
        id: user._id
    }
    const token = jwt.sign(
        userForToken,
        config.SECRET,
        { expiresIn: 60*60 }
    )

    //correct login details
    res.status(200).json({ token, username: user.username, id: user._id.toString() })

})

module.exports = loginRouter
