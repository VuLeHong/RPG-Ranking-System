const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    password:{
        type: String,
        required:true,
    },

    truename:{
        type: String,
    },

    ismale:{
        type: Boolean,
        required: true,
        default: true
    },

    role:{
        type: String,
    },

    rank:{
        type: String,
        default: 'E'
    },
    stats :
        {
            organizational_skill:{
                type: Number,
                default: 0
            },

            techical_skill:{
                type: Number,
                default: 0
            },

            idea_contribution:{
                type: Number,
                default: 0
            },

            communication_skill:{
                type: Number,
                default: 0
            },

            product_optimization:{
                type: Number,
                default: 0
            }
        },
        tasks:[
            {
                task_id:{
                    type:mongoose.Schema.Types.ObjectId,
                }, 
            }
        ],
        history:[
            {
                time:{
                    type: Date
                }, 
    
                change:{
                    type: Number,
                    required:true,
                    default: 0
                },
    
                point:{
                    type: Number,
                    required: true,
                    default: 0
                }
            }
        ]
})

const user_collection = mongoose.model("user_collection",UserSchema)

module.exports = user_collection