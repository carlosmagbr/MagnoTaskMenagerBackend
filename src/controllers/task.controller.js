const TaskModel = require('../models/task.model')

class TaskController {
    constructor(req, res) {
        this.req = req
        this.res = res
    }

    async getAll() {
        try {
            const tasks = await TaskModel.find({});
            this.res.status(200).send(tasks)
        } catch (error) {
            this.res.status(500).send(error.message)
        }
    }

    async getById() {
        try {
            const taskId = this.req.params.id

            const task = await TaskModel.findById(taskId)

            if (!task) {
                return this.res.status(404).send("Task not found")
            }

            this.res.status(200).send(task)
        } catch (error) {
            this.res.status(500).send(error.message)
        }
    }

    async create() {
        try {
            const newTask = new TaskModel(this.req.body);
            await newTask.save()
            this.res.status(201).send(newTask)
        } catch (error) {
            this.res.status(500).send(error.message)
        }
    }

    async update() {
        try {
            const taskId = this.req.params.id
            const taskData = this.req.body
            const taskUpdate = await TaskModel.findById(taskId)

            const allowedUpdates = ['isCompleted'];
            const requestedUpdates = Object.keys(taskData)

            for (const update of requestedUpdates) {
                if (allowedUpdates.includes(update)) {
                    taskUpdate[update] = taskData[update]
                } else {
                    return this.res.status(500).send('one or more fields are not editable')
                }
            }

            await taskUpdate.save()
            return this.res.status(200).send(taskUpdate)
        } catch (error) {
            this.res.status(500).send(error.message)
        }
    }
    
    async delete(){
        try{
            const taskId = this.req.params.id
    
            const taskToDelete = await TaskModel.findById(taskId)
    
            if(!taskToDelete){
                return this.res.status(404).send("Task not found")
            }
    
            const deletedTask = await TaskModel.findByIdAndDelete(taskId)
    
            this.res.status(200).send(deletedTask)
        }catch(error){
            this.res.status(500).send(error.message)
        }
    }

}

module.exports = TaskController