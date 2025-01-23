const projectCollection = require("../model/project");
const mongoose = require("mongoose");

const getAllProjects = async () => {
    try {
        const project = await projectCollection.find({});
        return { status: 200, data: project };
    }
    catch (error) {
        throw new Error(error.message);
    }
};

const createProject = async (data) => {
    
    try {
        const project = await projectCollection.create(data);
        return { status: 200, data: project };
    }
    catch (error) {
        throw new Error(error.message);
    }
};

const addTask = async (id, task_id) => {
    try {
        const project = await projectCollection.findOneAndUpdate(
            { _id: new mongoose.Types.ObjectId(id) }, 
            { $push: { tasks: task_id } }, 
            { new: true }
        );

        if (!project) {
            return { status: 404, message: "User not found" };
        }

        return { status: 200, data: project };
    }
    catch (error) {
        throw new Error(error.message);
    }
};

module.exports = { getAllProjects, createProject, addTask };