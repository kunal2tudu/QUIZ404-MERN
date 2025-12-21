const mongoose = require('mongoose');
const Quiz = require('./models/Quiz');
const User = require('./models/User');
require('dotenv').config();

const checkDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/quiz404');
        console.log('Connected to MongoDB');

        const quizzes = await Quiz.find({}).populate('creator', 'username');
        console.log(`Found ${quizzes.length} quizzes.`);
        quizzes.forEach(q => {
            console.log(`- Title: "${q.title}", Code: ${q.code}, Questions: ${q.questions.length}, Creator: ${q.creator?.username}`);
            console.log(`  Sample Q: ${q.questions[0]?.question_text}`);
        });

        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

checkDB();
