const mongoose = require('mongoose');

const quizSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
    questions: [{
        question_text: {
            type: String,
            required: true
        },
        options: [{
            type: String,
            required: true
        }],
        correct_answer: {
            type: Number,
            required: true
        }
    }]
}, {
    timestamps: true
});

const Quiz = mongoose.model('Quiz', quizSchema);
module.exports = Quiz;
