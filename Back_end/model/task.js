const mongoose = require('mongoose')

const Taskschema = new mongoose.Schema({
    content:{
        type: String,
        required: true,
        default: ''
    }, 
    rank:{
        type: String,
        default: 'E'
    },
    isdone:{
        type: Boolean,
        default: false
    },
    t_desc:{
        type:String,
        default:''
    },
    Project_id: {
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    user_id:{
        type:mongoose.Schema.Types.String,
        required:true
    },
    ans:{
        type:String,
        default:''
    }
        
})

const Task_collection = mongoose.model("Task_collection",Taskschema)

module.exports = Task_collection