const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema({
    topic_code: {
        type: String,
        required: true,
        unique : true
    },
      topic_name: {
        type: String,
        required: true,
    },
    description: {
        type: String
    }
}, { 
    timestamps: true,
    versionKey: false
});

const Topic = mongoose.model("Topic", topicSchema);

module.exports = Topic;
