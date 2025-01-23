const projectService = require('../service/projectService');

const getAllProjects = async (req, res) => {

    try {
        const result = await projectService.getAllProjects();
        res.status(result.status).json(result.data || { message: result.message });
    } catch (error) {
        res.status(500).json({ message: "Login failed", error: error.message });
    }
};

const createProject = async (req, res) => {
    const data = req.body;
    try {
        const result = await projectService.createProject(data);
        res.status(result.status).json(result.data || { message: result.message });
    } catch (error) {
        res.status(500).json({ message: "Login failed", error: error.message });
    }
};

const addTask = async (req, res) => {
    const task_id = req.body;
    const id = req.params;
    try {
        const result = await projectService.addTask(id, task_id);
        res.status(result.status).json(result.data || { message: result.message });
    } catch (error) {
        res.status(500).json({ message: "Login failed", error: error.message });
    }
}
module.exports = {  getAllProjects, createProject, addTask };