const Question = require('../models/Question');
const Score = require('../models/Score');
const Quiz = require('../models/Quiz');

// Helper to generate 6-digit code
const generateCode = () => Math.floor(100000 + Math.random() * 900000).toString();

// @desc    Create a new quiz
// @route   POST /api/quiz/create
// @access  Private
const createQuiz = async (req, res) => {
    const { title, questions } = req.body;

    if (!questions || questions.length === 0) {
        return res.status(400).json({ message: 'No questions provided' });
    }

    try {
        let code = generateCode();
        // Ensure uniqueness (simple check, collision unlikely for small scale)
        let exists = await Quiz.findOne({ code });
        while (exists) {
            code = generateCode();
            exists = await Quiz.findOne({ code });
        }

        const quiz = await Quiz.create({
            title,
            creator: req.user._id,
            code,
            questions
        });

        res.status(201).json(quiz);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get quiz by code
// @route   GET /api/quiz/:code
// @access  Private
const getQuizByCode = async (req, res) => {
    const { code } = req.params;

    try {
        const quiz = await Quiz.findOne({ code }).populate('creator', 'username');
        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }
        res.json(quiz);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get questions by category and difficulty (Global Pool)
// @route   GET /api/quiz/questions
// @access  Private
const getQuestions = async (req, res) => {
    const { category, difficulty } = req.query;

    try {
        const query = {};
        if (category) query.category = category;
        if (difficulty) query.difficulty = difficulty.toLowerCase();

        // Get random questions (e.g., 10)
        const questions = await Question.aggregate([
            { $match: query },
            { $sample: { size: 10 } }
        ]);

        res.json(questions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Submit quiz score
// @route   POST /api/quiz/submit
// @access  Private
const submitScore = async (req, res) => {
    const { score, category, difficulty, total_questions, time_taken, quiz_id } = req.body;

    if (!req.user) {
        return res.status(401).json({ message: 'User not authorized' });
    }

    try {
        const newScore = await Score.create({
            user: req.user._id,
            score,
            category: category || 'Custom', // Default for custom quiz
            difficulty: difficulty || 'Mixed',
            total_questions,
            time_taken,
            quiz_id: quiz_id || null
        });

        res.status(201).json(newScore);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get leaderboard
// @route   GET /api/quiz/leaderboard
// @access  Public
const getLeaderboard = async (req, res) => {
    const { category, difficulty, quiz_id } = req.query;

    try {
        const query = {};

        // If quiz_id is passed => show leaderboard of that specific hosted quiz
        if (quiz_id) {
            query.quiz_id = quiz_id;
        }
        else {
            // Otherwise GLOBAL leaderboard
            if (category) query.category = category;
            if (difficulty) query.difficulty = difficulty;

            // ⛔️ DO NOT force quiz_id = null
            // We want ALL attempts (global + hosted quizzes)
        }

        const leaderboard = await Score.find(query)
            .populate('user', 'username')
            .sort({ score: -1, time_taken: 1, createdAt: 1 })
            .limit(50);

        res.json(leaderboard);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all quizzes (Community)
// @route   GET /api/quiz/all
// @access  Public (or Protected, led's keep protected for now as app requires login generally)
const getAllQuizzes = async (req, res) => {
    try {
        const quizzes = await Quiz.find().populate('creator', 'username').sort({ createdAt: -1 });
        res.json(quizzes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get my created quizzes
// @route   GET /api/quiz/my
// @access  Private
const getMyQuizzes = async (req, res) => {
    try {
        const quizzes = await Quiz.find({ creator: req.user._id }).sort({ createdAt: -1 });
        res.json(quizzes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a quiz
// @route   DELETE /api/quiz/:id
// @access  Private
const deleteQuiz = async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id);

        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }

        // Check ownership
        if (quiz.creator.toString() !== req.user._id.toString()) {
            console.log(`Unauthorized delete attempt: User ${req.user._id} tried to delete Quiz ${quiz._id} owned by ${quiz.creator}`);
            return res.status(401).json({ message: 'Not authorized to delete this quiz' });
        }

        await quiz.deleteOne();
        console.log(`Quiz ${quiz._id} deleted by ${req.user._id}`);
        res.json({ message: 'Quiz removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getQuestions, submitScore, getLeaderboard, createQuiz, getQuizByCode, getAllQuizzes, getMyQuizzes, deleteQuiz };
