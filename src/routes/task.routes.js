const express = require('express')
const TaskModel = require('../models/task.model')

const router = express.Router()

router.get("/", async (req, res) => {
    try{
        const tasks = await TaskModel.find({});
        res.status(200).send(tasks)
    }catch(error){
        res.status(500).send(error.message)
    }
})

router.get("/:id", async (req,res)=>{
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

router.post("/", async (req,res) =>{
    try{
        const newTask = new TaskModel(req.body);
        await newTask.save()
        res.status(201).send(newTask)
    }catch(error){
        res.status(500).send(error.message)
    }
})

router.patch("/:id", async (req,res)=>{
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

router.delete("/:id", async (req,res)=>{
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

module.exports = router