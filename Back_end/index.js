const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv');
const user_collection = require('./model/user')
const asyncHandler = require('express-async-handler')
const Project_collection = require('./model/project')
const Task_collection = require('./model/task')

dotenv.config();

const app = express()
app.use(cors())
app.use(express.json())

app.post("/login", async(req, res) => {
    const{user_id,password}=req.body
    try{
        const check = await user_collection.findOne({user_id:user_id})
        .then (check => {
            if(check){
                if (check.password === password) {
                    res.status(200).json(check)
                }
                else {
                    res.status(202).json(check)
                }
            }
            else{
                res.status(204).json(check)
            }
        })
    }
    catch(e){
        res.json("fail")
    }
})
//user
app.get('/home', async(req, res) => {
    try {
        const user = await user_collection.find({});
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})
app.post('/uprank', asyncHandler(async(req,res) =>{
    const{
        user_id: user_id, 
        organizational_up: organizational_up, 
        techical_up: techical_up,
        idea_up: idea_up,
        communication_up: communication_up,
        product_up: product_up,
        organizational_skill:organizational_skill,
        techical_skill:techical_skill,
        idea_contribution: idea_contribution,
        communication_skill: communication_skill,
        product_optimization: product_optimization
    } = req.body;
    const new_total = 
         parseInt(organizational_skill) + parseInt(organizational_up)
        + parseInt(techical_skill) + parseInt(techical_up)
        + parseInt(idea_contribution) + parseInt(idea_up)
        + parseInt(communication_skill) + parseInt(communication_up)
        + parseInt(product_optimization) + parseInt(product_up)
    ;
    if(new_total >= 300 && new_total < 1000) 
        {
            
           const rank = "D";
           const works = await user_collection.findOneAndUpdate({user_id: user_id}, {rank:rank})
           .then(result => res.json(result))
           .catch(err => res.json(err))
        }
    else if(new_total >= 1000 && new_total < 2000) 
        {
           const rank = "C";
           const works = await user_collection.findOneAndUpdate({user_id: user_id}, {rank:rank})
           .then(result => res.json(result))
           .catch(err => res.json(err))
        }
    else if(new_total >= 2000 && new_total < 5000) 
        {
           const rank = "B";
           const works = await user_collection.findOneAndUpdate({user_id: user_id}, {rank:rank})
           .then(result => res.json(result))
           .catch(err => res.json(err))
        }
    else if(new_total >= 5000) 
        {
           const rank = "A";
           const works = await user_collection.findOneAndUpdate({user_id: user_id}, {rank:rank})
           .then(result => res.json(result))
           .catch(err => res.json(err))
        }
}))
app.post('/home', async(req, res) => {
    try {
        const user = await user_collection.create(req.body)
        res.status(200).json(user);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
})

app.post('/get', (req,res) =>{
    const {user_id} = req.body;
    user_collection.findOne({user_id: user_id})
    .then(user => {
            res.json(user);   
    })
    .catch(err => res.json(err))
})

app.post('/upscore', asyncHandler(async(req,res) =>{
    const{
        user_id: user_id, 
        organizational_up: organizational_up, 
        techical_up: techical_up,
        idea_up: idea_up,
        communication_up: communication_up,
        product_up: product_up,
        organizational_skill:organizational_skill,
        techical_skill:techical_skill,
        idea_contribution: idea_contribution,
        communication_skill: communication_skill,
        product_optimization: product_optimization
    } = req.body;
    const stats = {
        organizational_skill: parseInt(organizational_skill) + parseInt(organizational_up), 
        techical_skill: parseInt(techical_skill) + parseInt(techical_up),
        idea_contribution: parseInt(idea_contribution) + parseInt(idea_up),
        communication_skill: parseInt(communication_skill) + parseInt(communication_up),
        product_optimization: parseInt(product_optimization) + parseInt(product_up),
    };
   const works = await user_collection.findOneAndUpdate({user_id: user_id}, {stats:stats})
    .then(result => res.json(result))
    .catch(err => res.json(err))
}))
app.post('/addtaskid', asyncHandler(async(req,res) =>{
    const{ user_id:user_id, task_id: task_id} = req.body;
    const task = {task_id:task_id};
    //console.log(task)
   const works = await user_collection.findOneAndUpdate({user_id: user_id}, {$push:{tasks:task}})
    .then(result => res.json(result))
    .catch(err => res.json(err))
}))
//project
app.post('/project', async(req, res) => {
    try {
        const result = await Project_collection.create(req.body)
        res.status(200).json(result);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
})
app.get('/getprojects', async(req, res) => {
    try {
        const user = await Project_collection.find({});
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})
app.post('/pushtaskid', asyncHandler(async(req,res) =>{
    const{ Project_id:Project_id, task_id: task_id} = req.body;
    const task = {task_id:task_id};
    //console.log(task)
   const works = await Project_collection.findOneAndUpdate({_id: Project_id}, {$push:{tasks:task}})
    .then(result => res.json(result))
    .catch(err => res.json(err))
}))

//task 
app.post('/addtask', asyncHandler(async(req,res) =>{
    const{ content:content, rank:rank, Project_id: Project_id, user_id:user_id} = req.body;
    const task = {content: content, rank: rank, isdone: false ,Project_id: Project_id, user_id: user_id};
   const works = await Task_collection.create(task)
    .then(result => res.json(result))
    .catch(err => res.json(err))
}))

app.get('/gettasks', async(req, res) => {
    try {
        const user = await Task_collection.find({});
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})
app.post('/addcmt', asyncHandler(async(req,res) =>{
    const{task_id: task_id, t_desc : t_desc} = req.body;
   const works = await Task_collection.findOneAndUpdate({_id: task_id}, {t_desc:t_desc})
    .then(result => res.json(result))
    .catch(err => res.json(err))
}))
app.post('/updone', asyncHandler(async(req,res) =>{
    const{task_id: task_id} = req.body;
   const works = await Task_collection.findOneAndUpdate({_id: task_id}, {isdone:true})
    .then(result => res.json(result))
    .catch(err => res.json(err))
}))

app.post('/result', asyncHandler(async(req,res) =>{
    const{task_id: task_id, ans: ans} = req.body;
   const works = await Task_collection.findOneAndUpdate({_id: task_id}, {ans: ans})
    .then(result => res.json(result))
    .catch(err => res.json(err))
}))


async function connect () {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URL,{
        });
        console.log("Mongo Connected");
    }
    catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
}

connect();

const PORT =process.env.PORT || 1000;

app.listen(PORT, console.log(`server is running in port ${PORT}`));