const express = require('express');
const jwt = require('jsonwebtoken')
const secretkey = "xyz"
const app = express();

app.get("/",(req,res)=>{
    res.json({
        Message:"a sample api"
    })
})

app.post("/login",(req,res)=>{
    const user ={
        id:1,
        username : "Tushar Sharma",
        gmail: "xdzenos@gmail.com"
    }
    jwt.sign({user},secretkey,{expiresIn:'300s'},(err,token)=>{
        res.json(token)
    })
})

app.post("/profile",verifyToken,(req,res)=>{
    jwt.verify(req.token,secretkey,(err,authData)=>{
        if(err){
            res.send({result: "invalid Token"})
        }else{
            res.json([{
                Message: "profile Acessed",
                authData
            }])
        }
    })
})

function verifyToken(req,res,next){
    const bearerHeader = req.headers['authorization']
    if(typeof bearerHeader !== undefined){
        const bearer = bearerHeader.split(" ")
        const token = bearer[1];
        req.token = token;
        next();
    }else{
        res.send({result: "Token is not Valid"})
    }

}

app.listen(5000,()=>{console.log("app is running on 5000 port")})