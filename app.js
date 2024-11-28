const connectDB = require("./database/database");
const express = require("express");
const userModel = require("./model/usermodel.js")
const path = require("path");


const app = express();
app.set("view engine","ejs")
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,"public")))

connectDB();


//  create a new user:---------------
// app.get("/create",async (req,res)=>{
// const createdUser = await userModel.create({
//   name:"suraj sharma",
//   email:"surajsharma774@gmail.com",
//   password:"password"
// });
// res.send(createdUser)
// })

// // update particular user-------------
// app.get("/update",async (req,res)=>{
// const updatedUser = await userModel.findOneAndUpdate({email:"john123@gmail.com"},{name:"baki"},{new:true});
// res.send(updatedUser)
// })

// //  read particular user from database
// app.get("/readUser",async (req,res)=>{
// const user = await userModel.findOne({email:"john123@gmail.com"});
// res.send(user)
// })

// // read all users:------------------ 
// app.get("/readUsers",async (req,res)=>{
// const users = await userModel.find();
// res.send(users)
// })


// app.get("/delete",async (req,res)=>{
//   const removeUser = await userModel.findOneAndDelete({email:"john123@gmail.com"});
//   res.send(removeUser)
// })

app.get("/", (req,res)=>{
  res.render("index")
})

app.get("/read",async (req,res)=>{
  let users= await userModel.find();
  res.render("read",{users})
})

app.post("/create",async (req,res)=>{
 const {name,email,image}=req.body
 let createdUser = await userModel.create({
    name,
    email,
    image
  }) 
  res.redirect("/read")

})

app.get("/delete/:id",async (req,res)=>{
  let user=await userModel.findOneAndDelete({_id:req.params.id});
  res.redirect("/read")
})

app.get("/edit/:userid",async  (req,res)=>{
let user = await userModel.findOne({_id:req.params.userid})
  res.render("edit",{user})
})

app.post("/update/:userid",async (req,res)=>{
  let {name,email,image}= req.body;
 await userModel.findOneAndUpdate({_id:req.params.userid},{name,email,image},{new:true});
  res.redirect("/read") 

})
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

