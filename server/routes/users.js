var express = require('express');
var router = express.Router();
const User = require("../models/user")

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// router.put("/follow",async(req,res)=>{
//     try{
//         const currentUser = await User.findById(req.body.userId)
//         await user.updateOne({$push: {followers: req.body.userId}})
//         await currentUser.updateOne({$push: {following: req.params.id}})
//         res.status(200).json("Followed successfully")
//     } catch (e) {
//         res.status(500).json(e)
//     }
// })


module.exports = router;
