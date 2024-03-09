const express =  require("express");

const cors=require("cors");  
 


// CORS stands for Cross-Origin Resource Sharing. It's a mechanism implemented by web browsers to allow or restrict requests made from one origin (domain, protocol, or port) to another origin. 


const router = require("./routes/authRoutes");  

const app = express();
app.use(cors());

const PORT = 1326;     
//accept json
app.use(express.json());
                                                //these are middleware
//accept body
app.use(express.urlencoded({extended: true}));  
//use the html
app.use(express.static("public"));

app.use("/api/v1",router)   //create api
 
app.listen(PORT, ()=>{
    console.log("App is running at port=",PORT); 
});