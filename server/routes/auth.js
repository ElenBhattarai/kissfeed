const router = require("express").Router()
const User = require("../models/user")
const bcrypt = require("bcrypt")

router.post("/register", async (req,res)=>{
    //De-structure the request body json
    const {username, email, password} = req.body
    try{
        //generate hashed password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt)
        //generate new user
        const newUser = new User({username,email,password:hashedPassword})
        //save user to DB
        const user = await newUser.save()
        res.status(200).send(user)
    } catch(e) {
        console.log(e)    
    }
})

router.post("/login", async (req,res)=>{
    const {email,password} = req.body
    try{
        //check the user's email in DB
        const user = await User.findOne({email})
        //if no user found
        if(!user) {
            res.status(404).json("user not found")
        }
        //check the password
        const validPassword = await bcrypt.compare(password,user.password)
        //wrong password
        if(!validPassword) {
            res.status(400).json("Wrong password")
        }
        //correct login details
        res.status(200).json(user)
    } catch (e) {
        console.log(e)
    }
})

module.exports = router