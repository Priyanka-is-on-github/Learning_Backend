const express = require("express");

const router = express.Router();

const bcrypt = require("bcrypt"); 

const createDB = require("./config/db")

const {validateName, validateEmail, validatePassword} = require("./utils/validators");
let users = {} 
router.post("/signUp", async (req, res)=>{
    try {
        const {name, email, password }=req.body;  
        console.log(name, email, password);
        const userExist = users.hasOwnProperty(email);  //it will return only true or false

        if(userExist)
        {
            res.send("user exists");
        }
        if(!validateName(name))
        {
            res.send("Invalid name");
        }

        if(!validateEmail(email))
        {
            res.send("Invalid email");
        }

        if(!validatePassword(password))
        {
            res.send("Invalid password");
        }

        const Epassword = await bcrypt.hash(password, 10)
        console.log("password",Epassword)

        users[email]={name,password: Epassword}; 
        console.log(users);

        res.send("success");
    } catch (error) {
        res.send(error);
        
    }
})


router.post("/signIn", async (req, res)=>{ 
    try {
       const {email, password}=req.body;
       const userExist = users.hasOwnProperty(email);

       if(!userExist){
        res.send("User does not exist")
       }

       const passMatch= await bcrypt.compare(password, users[email].password);

       if(!passMatch){
        res.send("Password Mismatch");
       }

       res.send("success");
    } catch (error) {
        
        res.send(error);
    }
})


module.exports = router;


// router.get("/greet" , (req, res)=>{
//  res.send("Hi priyanka ");
// })