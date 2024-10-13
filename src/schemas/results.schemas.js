const mongoose = require("mongoose");

const answersSchema = new mongoose.Schema({
  question_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "questions",
    required: true,
  },
  user_answer: {
    type: String,
    required: true,
  }, 
  correct_answer: {
    type: String,
    required: true,
  },
  result: {
    type: Boolean,
    required: true,
    default: false,
  },
},
{
    _id : false,
    timestamps: false,
    versionKey: false,
  });

const resultsSchema = new mongoose.Schema(
  {
    user_email: {
      type: String,
      ref: "Users",
      required: true,
      unique: true,
    },
    final_answers: [answersSchema],
    attempted: {
      type: Number,
      required: true,
    },
    correct_answers: {
      type: Number,
      required: true,
    },
    wrong_answers: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Results = mongoose.model("Results", resultsSchema);

module.exports = Results;
