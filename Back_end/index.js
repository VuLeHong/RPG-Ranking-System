const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv');

const userRoutes = require("./router/userRoute");
const projectRoutes = require("./router/projectRoute");
const taskRoutes = require("./router/taskRoute");

dotenv.config();

const app = express()
app.use(cors())
app.use(express.json())

app.use("/user", userRoutes);
app.use("/project", projectRoutes);
app.use("/task", taskRoutes);

app.get("/", (req, res) => {
    res.send("Server is running");
});

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB Connected");
    } catch (error) {
        console.error(`Database connection error: ${error.message}`);
        process.exit(1);
    }
};

connectDB();

const PORT =process.env.PORT || 1000;

app.listen(PORT, console.log(`server is running in port ${PORT}`));