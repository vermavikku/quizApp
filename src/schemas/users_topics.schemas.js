const mongoose = require("mongoose");

const userTopicSchema = new mongoose.Schema({
    user_email: {
        type:String,
        ref: "Users", 
        required: true,
        unique : true
    },
    topics: {
        type: [String], 
        required: true
    }
}, { 
    timestamps: true,
    versionKey: false
});

const userTopics = mongoose.model("users_topics", userTopicSchema);

module.exports = userTopics;
