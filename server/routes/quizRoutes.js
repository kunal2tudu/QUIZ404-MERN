const express = require('express');
const router = express.Router();
const { getQuestions, submitScore, getLeaderboard, createQuiz, getQuizByCode, getAllQuizzes, getMyQuizzes, deleteQuiz } = require('../controllers/quizController');
const { protect } = require('../middleware/authMiddleware');

router.get('/questions', protect, getQuestions);
router.post('/submit', protect, submitScore);
router.get('/leaderboard', getLeaderboard); // Public
router.post('/create', protect, createQuiz);

// Specific routes before parameterized routes
router.get('/all', protect, getAllQuizzes);
router.get('/my', protect, getMyQuizzes);

router.get('/code/:code', protect, getQuizByCode); // Explicit sub-path to avoid collision

router.route('/:id')
    .delete(protect, deleteQuiz);

module.exports = router;
