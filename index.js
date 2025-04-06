const express = require('express')
const dotenv = require('dotenv')

const connectToDatabase = require('./src/database/mongoose.database');
const TaskModel = require('./src/models/task.mode');

dotenv.config();

const app = express()
app.use(express.json())

connectToDatabase()

app.get("/tasks", async (req, res) => {
    try{
        const tasks = await TaskModel.find({});
        res.status(200).send(tasks)
    }catch(error){
        res.status(500).send(error.message)
    }
})

app.get("/task/:id", async (req,res)=>{
    try{
        const taskId = req.params.id

        const task = await TaskModel.findById(taskId)

        if(!task){
            return res.status(404).send("Task not found")
        }

        res.status(200).send(task)
    }catch(error){
        res.status(500).send(error.message)
    }
})

app.post("/task", async (req,res) =>{
    try{
        const newTask = new TaskModel(req.body);
        await newTask.save()
        res.status(201).send(newTask)
    }catch(error){
        res.status(500).send(error.message)
    }
})

app.patch("/task/:id", async (req,res)=>{
    try{
        const taskId = req.params.id
        const taskData = req.body
        const taskUpdate = await TaskModel.findById(taskId)

        const allowedUpdates = ['isCompleted'];
        const requestedUpdates = Object.keys(taskData)

        for(update of requestedUpdates){
            if(allowedUpdates.includes(update)){
                taskUpdate[update] = taskData[update]
            }else{
                return res.status(500).send('one or more fields are not editable')
            }
        }

        await taskUpdate.save()
        return res.status(200).send(taskUpdate)
    }catch(error){
        res.status(500).send(error.message)
    }

})

app.delete("/task/:id", async (req,res)=>{
    try{
        const taskId = req.params.id

        const taskToDelete = await TaskModel.findById(taskId)

        if(!taskToDelete){
            return res.status(404).send("Task not found")
        }

        const deletedTask = await TaskModel.findByIdAndDelete(taskId)

        res.status(200).send(deletedTask)
    }catch(error){
        res.status(500).send(error.message)
    }
})

app.listen(8000,()=>console.log("Listening on port: 8000"))