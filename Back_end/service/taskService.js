const taskCollection = require("../model/task");
const mongoose = require("mongoose");

const getAllTasks = async () => {
    try {
        const project = await taskCollection.find({});
        return { status: 200, data: project };
    }
    catch (error) {
        throw new Error(error.message);
    }
};

const createTask = async (data) => {
    try {
        const project = await taskCollection.create(data);
        return { status: 200, data: project };
    }
    catch (error) {
        throw new Error(error.message);
    }
};

const upDone = async (id) => {
    try {
        const task = await taskCollection.findOneAndUpdate(
            { _id: new mongoose.Types.ObjectId(id) }, 
            { $set: { isdone: true } }, 
            { new: true }
        );

        if (!task) {
            return { status: 404, message: "Task not found" };
        }

        return { status: 200, data: task };
    }
    catch (error) {
        throw new Error(error.message);
    }
};

const updateTask = async (id, data) => {
    try {
        const task = await taskCollection.findOneAndUpdate(
            { _id: new mongoose.Types.ObjectId(id) }, 
            { $set: data }, 
            { new: true }
        );

        if (!task) {
            return { status: 404, message: "Task not found" };
        }

        return { status: 200, data: task };
    }
    catch (error) {
        throw new Error(error.message);
    }
};
module.exports = {  getAllTasks, createTask, upDone, updateTask };