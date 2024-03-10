const express = require("express");

const router = express.Router();

const bcrypt = require("bcrypt"); 

const createDB = require("../config/db.js");

const {validateName, validateEmail, validatePassword} = require("../utils/validators.js");

const User = require("../models/userModels");

createDB.sync().then(()=>{ //DB connectivity
    console.log("DB is running");  
})

router.post("/signUp", async (req, res)=>{  
    try {
      
        const {name, email, password }=req.body;  
        console.log(name, email, password); 
       // const userExist = users.hasOwnProperty(email);  //it will return only true or false

       const userExist= await User.findOne({
        where:{
            email
        }

       })

        if(userExist)
        {
            res.status(403).send("user exists, please do signIn");
        }
        if(!validateName(name))
        {
            res.status(400).send("Invalid user name:name must be longer than two character and must not include number and special character");
        }

        if(!validateEmail(email))
        {
            res.status(400).send("Invalid email");
        }

        if(!validatePassword(password))
        {
            res.status(400).send("Invalid password: password must be atleast 8 characters long and must and must include one uppercase letter, one lowercase latter, one digit, one spacial character ");
        }

        const hashedpassword = await bcrypt.hash(password, 10);
        console.log("password",hashedpassword);

        // users[email]={name,password: hashedpassword}; 
        // console.log(users);

        const saveToDB = {
            name, email, password:hashedpassword
        }

        const createdUser = await User.create(saveToDB)

        // res.status(201).send("Profile created, successfully!");
        res.status(201).send(createdUser);

    } catch (error) {
        res.status(500).send(error.message);
        
    }
})


router.post("/signIn", async (req, res)=>{ 
    try {
       const {email, password}=req.body;
       const userExist = users.hasOwnProperty(email);

       if(!userExist){
        res.send("User does not exist ,please first signup"); 
       }

       const passMatch= await bcrypt.compare(password, users[email].password); 

       if(!passMatch){
        res.send("Password Mismatch");
       }

       res.send("SignIn successful");
    } catch (error) {
        
        res.send(error);
    }
})


module.exports = router;


// router.get("/greet" , (req, res)=>{
//  res.send("Hi priyanka ");
// })