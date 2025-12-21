const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const Question = require('./models/Question');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const importData = async () => {
    try {
        await Question.deleteMany();

        const sqlContent = fs.readFileSync(path.join(__dirname, '../questions.sql'), 'utf-8');
        const lines = sqlContent.split('\n');

        const questions = [];

        // Regex to match a single SQL INSERT value set: ('...', '...', '...', '...', '...', 1, '...', '...', '...')
        // Capturing groups:
        // 1: question_text
        // 2-5: options
        // 6: correct_answer (number)
        // 7: hint
        // 8: category
        // 9: difficulty
        const valueRegex = /\('((?:[^']|\\'|'')*)',\s*'((?:[^']|\\'|'')*)',\s*'((?:[^']|\\'|'')*)',\s*'((?:[^']|\\'|'')*)',\s*'((?:[^']|\\'|'')*)',\s*(\d+),\s*'((?:[^']|\\'|'')*)',\s*'((?:[^']|\\'|'')*)',\s*'((?:[^']|\\'|'')*)'\)/g;

        let match;
        while ((match = valueRegex.exec(sqlContent)) !== null) {
            // Unescape SQL escaped single quotes (\' or '') if necessary. 
            // The file seems to use \' based on previous view.
            const clean = (str) => str.replace(/\\'/g, "'").replace(/''/g, "'");

            questions.push({
                question_text: clean(match[1]),
                options: [
                    clean(match[2]),
                    clean(match[3]),
                    clean(match[4]),
                    clean(match[5])
                ],
                correct_answer: parseInt(match[6], 10),
                hint: clean(match[7]),
                category: clean(match[8]),
                difficulty: clean(match[9]).toLowerCase() // Ensure lowercase for enum
            });
        }

        if (questions.length === 0) {
            console.log('No questions found to import. Check regex or file content.');
        } else {
            console.log(`Found ${questions.length} questions.`);
        }

        await Question.insertMany(questions);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

importData();
