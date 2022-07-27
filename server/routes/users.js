const express = require('express')
const userRouter = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')


/* GET users listing. */
userRouter.get('/', async (req, res) => {
    const users = await User.find({})
    res.json(users)
})

userRouter.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id)

    res.json({
        followed: user.followed,
        articleCount: user.articleCount
    })
})

userRouter.post('/', async (req, res) => {
    const { username, password } = req.body

    const existingUser = await User.findOne({ username })
    if (existingUser) {
        return res.status(400).json({
            error: 'username must be unique'
        })
    }

    const passwordHash = await bcrypt.hash(password, 10)

    const newUser = new User({
        username,
        passwordHash,
        'numArticles': 0
    })

    const savedUser = await newUser.save()
    res.status(201).json(savedUser)
})

userRouter.put('/', async (req, res) => {
    const { username, followed, articleCount } = req.body

    const user = await User.findOne({ username })

    user.followed = followed
    user.articleCount = articleCount
    console.log(user)
    const updatedUser = await User.findByIdAndUpdate(
        user._id.toString(),
        user,
        { new: true, runValidator: true, context: 'query' }
    )

    res.json(updatedUser)
})


module.exports = userRouter
