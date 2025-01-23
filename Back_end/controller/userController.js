const userService = require('../service/userService');

const login = async (req, res) => {
    const { user_id, password } = req.body;

    try {
        const result = await userService.login(user_id, password);
        res.status(result.status).json(result.data || { message: result.message });
    } catch (error) {
        res.status(500).json({ message: "Login failed", error: error.message });
    }
};

const getAllUsers = async (req, res) => {

    try {
        const result = await userService.getAllUsers();
        res.status(result.status).json(result.data || { message: result.message });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUser = async (req, res) => {
    const  id  = req.params;

    try {
        const result = await userService.getUser(id);
        res.status(result.status).json(result.data || { message: result.message });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const upScore = async (req, res) => {
    const  id  = req.params;
    const {  organizational_up: organizational_up, 
        techical_up: techical_up,
        idea_up: idea_up,
        communication_up: communication_up,
        product_up: product_up 
    } = req.body;

    try {
        const result = await userService.upScore(id, {
            organizational_up, techical_up, idea_up, communication_up, product_up
        });
        res.status(result.status).json(result.data || { message: result.message });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createUser = async (req, res) => {
    const  userData  = req.body;
    
    try {
        const result = await userService.createUser(userData);
        res.status(result.status).json(result.data || { message: result.message });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addTask = async (req, res) => {
    const  id  = req.params;
    const   task_id  = req.body;

    try {
        const result = await userService.addTask(id, task_id);
        res.status(result.status).json(result.data || { message: result.message });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { login, getAllUsers, getUser, upScore, createUser, addTask };