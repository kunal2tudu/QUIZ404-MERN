const mongoose = require('mongoose');

const scoreSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    quiz_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz'
        // Not required, as null means global pool
    },
    score: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        required: true
    },
    total_questions: {
        type: Number,
        required: true
    },
    time_taken: {
        type: Number, // in seconds
        required: true
    }
}, {
    timestamps: true
});

const Score = mongoose.model('Score', scoreSchema);
module.exports = Score;
