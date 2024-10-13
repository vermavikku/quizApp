const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    topic_code: {
        type:String,
        ref: "Topic", 
        required: true
    },
    question: {
        type: String,
        required: true
    },
    options: {
        type: [String], 
        required: true
    },
    correct_answer: {
        type: String,
        required: true
    }
}, { 
    timestamps: true,
    versionKey: false
});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
