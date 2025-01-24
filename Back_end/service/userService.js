const userCollection = require("../model/user");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const login = async (user_id, password) => {
    try {
        const user = await userCollection.findOne({ user_id: user_id });

        if (!user) {
            return { status: 404, message: "User not found" };
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return { status: 401, message: "Incorrect password" };
        }

        return { status: 200, data: user };
    } catch (error) {
        throw new Error(error.message);
    }
};

const getAllUsers = async () => {
    try {
        const user = await userCollection.find({});
        return { status: 200, data: user };
    } catch (error) {
        throw new Error(error.message);
    }
};

const getUser = async (user_id) => {
    try {
        const user = await userCollection.findOne({ user_id: user_id });
        return { status: 200, data: user };
    } catch (error) {
        throw new Error(error.message);
    }
};

const upScore = async (user_id, statUpdates) => {
    try {
        const updateValues = {
            "stats.organizational_skill": Number(statUpdates.organizational_up) ?? 0,
            "stats.techical_skill": Number(statUpdates.techical_up) ?? 0,
            "stats.idea_contribution": Number(statUpdates.idea_up) ?? 0,
            "stats.communication_skill": Number(statUpdates.communication_up) ?? 0,
            "stats.product_optimization": Number(statUpdates.product_up) ?? 0
        };
        const user = await userCollection.findOneAndUpdate(
            { user_id: user_id },
            { $inc: updateValues }, 
            { new: true } 
        );

        if (!user) {
            return { status: 404, message: "User not found" };
        }

        const total =  user.stats.organizational_skill + user.stats.techical_skill + user.stats.idea_contribution + user.stats.communication_skill + user.stats.product_optimization;
        let newRank = user.rank;
        if (total >= 5000) {
            newRank = "A";
        } else if (total >= 2000) {
            newRank = "B";
        } else if (total >= 1000) {
            newRank = "C";
        } else if (total >= 300) {
            newRank = "D";
        }
        if (user.rank !== newRank) {
            user.rank = newRank;
            await user.save();
        }
        return { status: 200, data: user };
    } catch (error) {
        throw new Error(error.message);
    }
};


const createUser = async (userData) => {
    try {
        console.log(userData);
        const saltRounds = 10;
        userData.password = await bcrypt.hash(userData.password, saltRounds);
        const user = await userCollection.create(userData);
        return { status: 200, data: user };
    }
    catch (error) {
        throw new Error(error.message);
    }
};

const addTask = async (user_id, task_id) => {
    try {
        const user = await userCollection.findOneAndUpdate(
            { user_id: user_id }, 
            { $push: { tasks: task_id } }, 
            { new: true }
        );

        if (!user) {
            return { status: 404, message: "User not found" };
        }

        return { status: 200, data: user };
    }
    catch (error) {
        throw new Error(error.message);
    }
};

module.exports = { login, getAllUsers, getUser, upScore, createUser, addTask };