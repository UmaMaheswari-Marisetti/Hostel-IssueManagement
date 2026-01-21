import express from 'express'
import User from "../models/User.js"
import jwt from "jsonwebtoken"
import bcrypt from 'bcryptjs'


const router= express.Router();
router.post("/register", async(req,res)=>{
  const {name,email,password,role} = req.body;
  const hashed = await bcrypt.hash(password,10);
  const user = new User({name,email,password:hashed,role});
  await user.save();
  res.json("Registered");
});

router.post("/login", async(req,res)=>{
  const {email,password} = req.body;
  const user = await User.findOne({email});
  if(!user) return res.status(400).json("User not found");

  const match = await bcrypt.compare(password,user.password);
  if(!match) return res.status(400).json("Wrong password");

  const token = jwt.sign({id:user._id,role:user.role},process.env.JWT_SECRET,{expiresIn:"1d"});
  res.json({token,role:user.role});
});

export default router;
