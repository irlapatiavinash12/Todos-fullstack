
const express = require("express");

const mongoose = require("mongoose");

const TaskSchema = require("./model")

const cors = require("cors")

const app = express()

mongoose.connect("mongodb+srv://irlapatiavinash:irlapatiavinash@cluster0.f556b.mongodb.net/",).then(() => 
    console.log("Db Connected")) 

app.use(express.json())
app.use(cors({
    origin:"*"
}))

app.get("/" , (req,res) => {
    res.send("Hello world")
})

app.post("/addtask" , async(req,res) => {
    const {todo} = req.body;
    try{
        const newData = new TaskSchema({
          todo : todo
        })
        await newData.save()

        return  res.json(await TaskSchema.find())

    }
    catch(e){
        console.log(e) 
    }
})


app.get("/getTask" , async(req,res) => {
    try{
       return res.json(await TaskSchema.find()) 
    }
    catch(e){
        console.log(e)
    }
})

app.delete("/delete/:id" , async(req,res) => {
    try{
       await TaskSchema.findByIdAndDelete(req.params.id)
       return res.json(await TaskSchema.find())
    }
    catch(e){
        console.log(e)
    }
})

app.listen(5000, () => {
    console.log("Server running....")
})