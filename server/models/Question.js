const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        required: true,
        enum: ['easy', 'medium', 'hard']
    },
    question_text: {
        type: String,
        required: true
    },
    options: [{
        type: String,
        required: true
    }],
    correct_answer: {
        type: Number, // 0, 1, 2, 3 corresponding to index of options
        required: true
    },
    hint: {
        type: String
    }
}, {
    timestamps: true
});

const Question = mongoose.model('Question', questionSchema);
module.exports = Question;
