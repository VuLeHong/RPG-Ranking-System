const taskService = require('../service/taskService');

const getAllTasks = async (req, res) => {

    try {
        const result = await taskService.getAllTasks();
        res.status(result.status).json(result.data || { message: result.message });
    } catch (error) {
        res.status(500).json({ message: "Login failed", error: error.message });
    }
};

const createTask = async (req, res) => {
    const data = req.body;
    try {
        const result = await taskService.createTask(data);
        res.status(result.status).json(result.data || { message: result.message });
    } catch (error) {
        res.status(500).json({ message: "Login failed", error: error.message });
    }
};

const upDone = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await taskService.upDone(id);
        res.status(result.status).json(result.data || { message: result.message });
    } catch (error) {
        res.status(500).json({ message: "Login failed", error: error.message });
    }
};

const updateTask = async (req, res) => {
    const data = req.body;
    const { id } = req.params; 
    try {
        const result = await taskService.updateTask(id, data);
        res.status(result.status).json(result.data || { message: result.message });
    } catch (error) {
        res.status(500).json({ message: "Login failed", error: error.message });
    }
};

module.exports = {  getAllTasks, createTask, upDone, updateTask };