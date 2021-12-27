const express=require('express')
const router = express.Router()
const User=require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken')

const JWT_SECRET = 'vinfraubrot$casa'

router.post('/createuser',[
    body('name','Enter a valid name').isLength({ min: 3 }),
    body('email','Enter a valid email').isEmail(),
    body('password','Password must be atleast 5 characters').isLength({ min: 5 }),
],async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try{
        //checking whether a user with the same email already exists
        let user = await User.findOne({email:req.body.email})
        if(user){
            return res.status(400).json({error:"Sorry a user with this email already exists"})
        }
        const salt = await bcrypt.genSalt(10)
        const secPass = await bcrypt.hash(req.body.password,salt)
        user=await  User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email
          })
          const data = {
              user:{
                  id: user.id
              }
          }
          const authtoken= jwt.sign(data,JWT_SECRET)
          
          res.json({authtoken})

    }catch(error){
        console.log(error.message);
        res.status(500).send("Some Error ocurred")
    }

}) 


module.exports=router