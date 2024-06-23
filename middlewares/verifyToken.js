const Vendor=require('../models/Vendor');
const jwt=require('jsonwebtoken');
const dotEnv=require('dotenv');

dotEnv.config();


const verifyToken=async(req,res,next)=>{ //ext allows next fucntion execution
    const token=req.headers.token;
    // const token = req.headers['authorization'];




    const secretkey=process.env.WhatIsYourName;

    if(!token){
        return res.status(401).json({error:"Token is required"});
    }

    try{
    const decoded=jwt.verify(token,secretkey);

    const vendor=await Vendor.findById(decoded.vendorId);

    if(!vendor){
        return res.status(404).json({error:"Vendor not found"});
    }

    req.vendorId=vendor._id;

    next()
    }

    catch(error){
        console.log(error);
        res.status(500).json({error:"Invalid token"})
    }
}

module.exports=verifyToken;