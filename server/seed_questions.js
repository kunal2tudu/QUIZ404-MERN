const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Question = require('./models/Question');

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

const questions = [
    // --- General (Easy) ---
    {
        category: 'General',
        difficulty: 'easy',
        question_text: 'What is the largest mammal in the world?',
        options: ['Elephant', 'Blue Whale', 'Giraffe', 'Great White Shark'],
        correct_answer: 1,
        hint: 'It lives in the ocean.'
    },
    {
        category: 'General',
        difficulty: 'easy',
        question_text: 'How many continents are there on Earth?',
        options: ['5', '6', '7', '8'],
        correct_answer: 2,
        hint: 'Asia, Africa, North America...'
    },
    {
        category: 'General',
        difficulty: 'easy',
        question_text: 'Which color is not in a rainbow?',
        options: ['Red', 'Indigo', 'Pink', 'Violet'],
        correct_answer: 2,
        hint: 'Think of ROYGBIV.'
    },
    {
        category: 'General',
        difficulty: 'easy',
        question_text: 'What is the main ingredient in guacamole?',
        options: ['Tomato', 'Avocado', 'Onion', 'Pepper'],
        correct_answer: 1,
        hint: 'A green creamy fruit.'
    },
    {
        category: 'General',
        difficulty: 'easy',
        question_text: 'How many legs does a spider have?',
        options: ['6', '8', '10', '12'],
        correct_answer: 1,
        hint: 'Spiderman knows.'
    },

    // --- General (Medium) ---
    {
        category: 'General',
        difficulty: 'medium',
        question_text: 'In which year did the Titanic sink?',
        options: ['1912', '1905', '1920', '1898'],
        correct_answer: 0,
        hint: 'It was early in the 20th century.'
    },
    {
        category: 'General',
        difficulty: 'medium',
        question_text: 'What is the chemical symbol for Gold?',
        options: ['Go', 'Ag', 'Au', 'Fe'],
        correct_answer: 2,
        hint: 'It comes from the Latin word Aurum.'
    },
    {
        category: 'General',
        difficulty: 'medium',
        question_text: 'Which planet is closest to the Sun?',
        options: ['Venus', 'Earth', 'Mercury', 'Mars'],
        correct_answer: 2,
        hint: 'Named after the messenger god.'
    },
    {
        category: 'General',
        difficulty: 'medium',
        question_text: 'How many bones are in the adult human body?',
        options: ['206', '250', '180', '300'],
        correct_answer: 0,
        hint: 'More than 200.'
    },
    {
        category: 'General',
        difficulty: 'medium',
        question_text: 'What is the hardest rock?',
        options: ['Granite', 'Marble', 'Diamond', 'Quartz'],
        correct_answer: 2,
        hint: 'A girl\'s best friend.'
    },

    // --- General (Hard) ---
    {
        category: 'General',
        difficulty: 'hard',
        question_text: 'Who painted the Mona Lisa?',
        options: ['Van Gogh', 'Picasso', 'Leonardo da Vinci', 'Michelangelo'],
        correct_answer: 2,
        hint: 'He was a famous Italian polymath.'
    },
    {
        category: 'General',
        difficulty: 'hard',
        question_text: 'What is the smallest country in the world?',
        options: ['Monaco', 'Vatican City', 'San Marino', 'Liechtenstein'],
        correct_answer: 1,
        hint: 'Located within Rome.'
    },
    {
        category: 'General',
        difficulty: 'hard',
        question_text: 'Which element has the atomic number 1?',
        options: ['Helium', 'Hydrogen', 'Oxygen', 'Carbon'],
        correct_answer: 1,
        hint: 'The lightest element.'
    },
    {
        category: 'General',
        difficulty: 'hard',
        question_text: 'Who wrote "Hamlet"?',
        options: ['Charles Dickens', 'William Shakespeare', 'Mark Twain', 'Jane Austen'],
        correct_answer: 1,
        hint: 'The Bard of Avon.'
    },
    {
        category: 'General',
        difficulty: 'hard',
        question_text: 'What year did the Berlin Wall fall?',
        options: ['1987', '1989', '1991', '1993'],
        correct_answer: 1,
        hint: 'End of the Cold War era.'
    },

    // --- Technology (Easy) ---
    {
        category: 'Technology',
        difficulty: 'easy',
        question_text: 'What does CPU stand for?',
        options: ['Central Processing Unit', 'Central Process Utility', 'Computer Personal Unit', 'Central Processor Unit'],
        correct_answer: 0,
        hint: 'It is the brain of the computer.'
    },
    {
        category: 'Technology',
        difficulty: 'easy',
        question_text: 'Which company makes the iPhone?',
        options: ['Samsung', 'Google', 'Apple', 'Huawei'],
        correct_answer: 2,
        hint: 'Founded by Steve Jobs.'
    },
    {
        category: 'Technology',
        difficulty: 'easy',
        question_text: 'What does "www" stand for in a website browser?',
        options: ['World Wide Web', 'World Web Wide', 'Web World Wide', 'World Wide Wares'],
        correct_answer: 0,
        hint: 'Global network.'
    },
    {
        category: 'Technology',
        difficulty: 'easy',
        question_text: 'Which social media app has a ghost as its logo?',
        options: ['Instagram', 'Snapchat', 'Twitter', 'Facebook'],
        correct_answer: 1,
        hint: 'Disappearing photos.'
    },
    {
        category: 'Technology',
        difficulty: 'easy',
        question_text: 'What do you use to type on a computer?',
        options: ['Mouse', 'Screen', 'Keyboard', 'Speaker'],
        correct_answer: 2,
        hint: 'QWERTY.'
    },

    // --- Technology (Medium) ---
    {
        category: 'Technology',
        difficulty: 'medium',
        question_text: 'Who is the founder of Microsoft?',
        options: ['Steve Jobs', 'Bill Gates', 'Mark Zuckerberg', 'Elon Musk'],
        correct_answer: 1,
        hint: 'He is also a philanthropist.'
    },
    {
        category: 'Technology',
        difficulty: 'medium',
        question_text: 'What is the name of the first electronic general-purpose computer?',
        options: ['ENIAC', 'UNIVAC', 'IBM 701', 'Altair'],
        correct_answer: 0,
        hint: 'Built in the 1940s.'
    },
    {
        category: 'Technology',
        difficulty: 'medium',
        question_text: 'What does RAM stand for?',
        options: ['Read Access Memory', 'Random Access Memory', 'Run Accept Memory', 'Real Access Memory'],
        correct_answer: 1,
        hint: 'Volatile memory.'
    },
    {
        category: 'Technology',
        difficulty: 'medium',
        question_text: 'Which programming language is known as the language of the web?',
        options: ['Python', 'Java', 'JavaScript', 'C++'],
        correct_answer: 2,
        hint: 'Used for frontend logic.'
    },
    {
        category: 'Technology',
        difficulty: 'medium',
        question_text: 'What is the name of the AI developed by OpenAI?',
        options: ['Siri', 'Alexa', 'ChatGPT', 'Watson'],
        correct_answer: 2,
        hint: 'It powers this conversation.'
    },

    // --- Technology (Hard) ---
    {
        category: 'Technology',
        difficulty: 'hard',
        question_text: 'What does HTTP stand for?',
        options: ['HyperText Transfer Protocol', 'HyperText Transmission Protocol', 'HyperText Transfer Program', 'HyperText Transmission Program'],
        correct_answer: 0,
        hint: 'The foundation of data communication on the WWW.'
    },
    {
        category: 'Technology',
        difficulty: 'hard',
        question_text: 'Who is considered the father of Computer Science?',
        options: ['Alan Turing', 'Charles Babbage', 'Ada Lovelace', 'John von Neumann'],
        correct_answer: 0,
        hint: 'Cracked the Enigma code.'
    },
    {
        category: 'Technology',
        difficulty: 'hard',
        question_text: 'What year was the first iPhone released?',
        options: ['2005', '2007', '2009', '2010'],
        correct_answer: 1,
        hint: 'A revolutionary year for mobile phones.'
    },
    {
        category: 'Technology',
        difficulty: 'hard',
        question_text: 'What does GPU stand for?',
        options: ['General Processing Unit', 'Graphics Processing Unit', 'Graphical Performance Unit', 'General Performance Unit'],
        correct_answer: 1,
        hint: 'Essential for gaming.'
    },
    {
        category: 'Technology',
        difficulty: 'hard',
        question_text: 'Which company acquired GitHub in 2018?',
        options: ['Google', 'Amazon', 'Microsoft', 'Facebook'],
        correct_answer: 2,
        hint: 'Creators of Windows.'
    },

    // --- Geography (Easy) ---
    {
        category: 'Geography',
        difficulty: 'easy',
        question_text: 'What is the capital of France?',
        options: ['London', 'Berlin', 'Madrid', 'Paris'],
        correct_answer: 3,
        hint: 'Home to the Eiffel Tower.'
    },
    {
        category: 'Geography',
        difficulty: 'easy',
        question_text: 'Which continent is the Sahara Desert located in?',
        options: ['Asia', 'South America', 'Africa', 'Australia'],
        correct_answer: 2,
        hint: 'The second largest continent.'
    },
    {
        category: 'Geography',
        difficulty: 'easy',
        question_text: 'What is the largest ocean?',
        options: ['Atlantic', 'Indian', 'Arctic', 'Pacific'],
        correct_answer: 3,
        hint: 'Peaceful name.'
    },
    {
        category: 'Geography',
        difficulty: 'easy',
        question_text: 'Which country is shaped like a boot?',
        options: ['Spain', 'Italy', 'Greece', 'Portugal'],
        correct_answer: 1,
        hint: 'Famous for pasta.'
    },
    {
        category: 'Geography',
        difficulty: 'easy',
        question_text: 'What is the capital of Japan?',
        options: ['Beijing', 'Seoul', 'Bangkok', 'Tokyo'],
        correct_answer: 3,
        hint: 'Largest metropolitan area.'
    },

    // --- Geography (Medium) ---
    {
        category: 'Geography',
        difficulty: 'medium',
        question_text: 'Which is the longest river in the world?',
        options: ['Amazon', 'Nile', 'Yangtze', 'Mississippi'],
        correct_answer: 1,
        hint: 'It flows through northeastern Africa.'
    },
    {
        category: 'Geography',
        difficulty: 'medium',
        question_text: 'Mount Everest is located in which mountain range?',
        options: ['Andes', 'Rockies', 'Himalayas', 'Alps'],
        correct_answer: 2,
        hint: 'It spans five countries in Asia.'
    },
    {
        category: 'Geography',
        difficulty: 'medium',
        question_text: 'Which country has the largest population?',
        options: ['India', 'China', 'USA', 'Indonesia'],
        correct_answer: 0,
        hint: 'Recently surpassed its neighbor.'
    },
    {
        category: 'Geography',
        difficulty: 'medium',
        question_text: 'What is the smallest continent?',
        options: ['Europe', 'Antarctica', 'South America', 'Australia'],
        correct_answer: 3,
        hint: 'Land Down Under.'
    },
    {
        category: 'Geography',
        difficulty: 'medium',
        question_text: 'Which river flows through London?',
        options: ['Seine', 'Thames', 'Danube', 'Rhine'],
        correct_answer: 1,
        hint: 'Famous English river.'
    },

    // --- Geography (Hard) ---
    {
        category: 'Geography',
        difficulty: 'hard',
        question_text: 'What country has the most natural lakes?',
        options: ['USA', 'Canada', 'Russia', 'Brazil'],
        correct_answer: 1,
        hint: 'The Great White North.'
    },
    {
        category: 'Geography',
        difficulty: 'hard',
        question_text: 'What is the capital of Australia?',
        options: ['Sydney', 'Melbourne', 'Canberra', 'Brisbane'],
        correct_answer: 2,
        hint: 'A planned city.'
    },
    {
        category: 'Geography',
        difficulty: 'hard',
        question_text: 'Which African country was formerly known as Abyssinia?',
        options: ['Ethiopia', 'Sudan', 'Egypt', 'Kenya'],
        correct_answer: 0,
        hint: 'Never colonized.'
    },
    {
        category: 'Geography',
        difficulty: 'hard',
        question_text: 'What is the longest river in South America?',
        options: ['Orinoco', 'Paraná', 'Amazon', 'São Francisco'],
        correct_answer: 2,
        hint: 'Largest by discharge volume.'
    },
    {
        category: 'Geography',
        difficulty: 'hard',
        question_text: 'Which country has the most time zones?',
        options: ['USA', 'Russia', 'France', 'China'],
        correct_answer: 2,
        hint: 'Including overseas territories.'
    },

    // --- Science (Easy) ---
    {
        category: 'Science',
        difficulty: 'easy',
        question_text: 'Which planet is known as the Red Planet?',
        options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
        correct_answer: 1,
        hint: 'Named after the Roman god of war.'
    },
    {
        category: 'Science',
        difficulty: 'easy',
        question_text: 'What is H2O more commonly known as?',
        options: ['Salt', 'Sugar', 'Water', 'Air'],
        correct_answer: 2,
        hint: 'Essential for life.'
    },
    {
        category: 'Science',
        difficulty: 'easy',
        question_text: 'What is the center of an atom called?',
        options: ['Electron', 'Proton', 'Nucleus', 'Neutron'],
        correct_answer: 2,
        hint: 'Core.'
    },
    {
        category: 'Science',
        difficulty: 'easy',
        question_text: 'Which organ pumps blood in the human body?',
        options: ['Brain', 'Lungs', 'Heart', 'Stomach'],
        correct_answer: 2,
        hint: 'Beats rhythmically.'
    },
    {
        category: 'Science',
        difficulty: 'easy',
        question_text: 'What star shines in the day and provides heat?',
        options: ['Moon', 'Sun', 'Mars', 'Venus'],
        correct_answer: 1,
        hint: 'Solar.'
    },

    // --- Science (Medium) ---
    {
        category: 'Science',
        difficulty: 'medium',
        question_text: 'What is the hardest natural substance on Earth?',
        options: ['Gold', 'Iron', 'Diamond', 'Platinum'],
        correct_answer: 2,
        hint: 'Used in jewelry and cutting tools.'
    },
    {
        category: 'Science',
        difficulty: 'medium',
        question_text: 'What gas do plants absorb from the atmosphere for photosynthesis?',
        options: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Hydrogen'],
        correct_answer: 1,
        hint: 'Humans exhale this gas.'
    },
    {
        category: 'Science',
        difficulty: 'medium',
        question_text: 'What is the speed of light?',
        options: ['300,000 km/s', '150,000 km/s', '1,000 km/s', 'Sound speed'],
        correct_answer: 0,
        hint: 'Fastest speed in the universe.'
    },
    {
        category: 'Science',
        difficulty: 'medium',
        question_text: 'Which planet is the largest in our solar system?',
        options: ['Saturn', 'Jupiter', 'Uranus', 'Neptune'],
        correct_answer: 1,
        hint: 'A gas giant.'
    },
    {
        category: 'Science',
        difficulty: 'medium',
        question_text: 'What is the boiling point of water?',
        options: ['100°C', '90°C', '110°C', '50°C'],
        correct_answer: 0,
        hint: 'At sea level.'
    },

    // --- Science (Hard) ---
    {
        category: 'Science',
        difficulty: 'hard',
        question_text: 'What applies the force of gravity on Earth?',
        options: ['The Moon', 'The Sun', 'Mass of the Earth', 'Magnetic Field'],
        correct_answer: 2,
        hint: 'The more massive the object, the stronger the pull.'
    },
    {
        category: 'Science',
        difficulty: 'hard',
        question_text: 'What is the study of fungi called?',
        options: ['Botany', 'Zoology', 'Mycology', 'Ecology'],
        correct_answer: 2,
        hint: 'Mushrooms and molds.'
    },
    {
        category: 'Science',
        difficulty: 'hard',
        question_text: 'Which element is liquid at room temperature?',
        options: ['Iron', 'Mercury', 'Zinc', 'Copper'],
        correct_answer: 1,
        hint: 'Used in old thermometers.'
    },
    {
        category: 'Science',
        difficulty: 'hard',
        question_text: 'Who developed the theory of relativity?',
        options: ['Isaac Newton', 'Albert Einstein', 'Galileo Galilei', 'Nikola Tesla'],
        correct_answer: 1,
        hint: 'E=mc^2.'
    },
    {
        category: 'Science',
        difficulty: 'hard',
        question_text: 'What is the powerhouse of the cell?',
        options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Cytoplasm'],
        correct_answer: 1,
        hint: 'Generates energy.'
    },

    // --- Movies (Easy) ---
    {
        category: 'Movies',
        difficulty: 'easy',
        question_text: 'Who played Iron Man in the Marvel Cinematic Universe?',
        options: ['Chris Evans', 'Robert Downey Jr.', 'Chris Hemsworth', 'Mark Ruffalo'],
        correct_answer: 1,
        hint: 'He is also Sherlock Holmes.'
    },
    {
        category: 'Movies',
        difficulty: 'easy',
        question_text: 'Which dinosaur is the main villain in Jurassic Park (1993)?',
        options: ['T-Rex', 'Velociraptor', 'Spinosaurus', 'Brachiosaurus'],
        correct_answer: 0,
        hint: 'The Tyrant Lizard King.'
    },
    {
        category: 'Movies',
        difficulty: 'easy',
        question_text: 'What kind of fish is Nemo?',
        options: ['Goldfish', 'Clownfish', 'Shark', 'Betta'],
        correct_answer: 1,
        hint: 'Orange and white stripes.'
    },
    {
        category: 'Movies',
        difficulty: 'easy',
        question_text: 'Who lives in a pineapple under the sea?',
        options: ['Patrick', 'Squidward', 'SpongeBob', 'Sandy'],
        correct_answer: 2,
        hint: 'SquarePants.'
    },
    {
        category: 'Movies',
        difficulty: 'easy',
        question_text: 'Which movie features a character named "Simba"?',
        options: ['The Lion King', 'Aladdin', 'Frozen', 'Tarzan'],
        correct_answer: 0,
        hint: 'Hakuna Matata.'
    },

    // --- Movies (Medium) ---
    {
        category: 'Movies',
        difficulty: 'medium',
        question_text: 'Which movie won the first Academy Award for Best Picture?',
        options: ['Wings', 'Sunrise', 'Metropolis', 'The Jazz Singer'],
        correct_answer: 0,
        hint: 'A silent film about WWI pilots.'
    },
    {
        category: 'Movies',
        difficulty: 'medium',
        question_text: 'What is the name of the kingdom in "Frozen"?',
        options: ['Arendelle', 'Genovia', 'Aldovia', 'Far Far Away'],
        correct_answer: 0,
        hint: 'Sounds like a dell.'
    },
    {
        category: 'Movies',
        difficulty: 'medium',
        question_text: 'Who directed "Avatar"?',
        options: ['Christopher Nolan', 'Steven Spielberg', 'James Cameron', 'George Lucas'],
        correct_answer: 2,
        hint: 'Also directed Titanic.'
    },
    {
        category: 'Movies',
        difficulty: 'medium',
        question_text: 'Which actor played the Joker in "The Dark Knight"?',
        options: ['Jack Nicholson', 'Heath Ledger', 'Jared Leto', 'Joaquin Phoenix'],
        correct_answer: 1,
        hint: 'Won a posthumous Oscar.'
    },
    {
        category: 'Movies',
        difficulty: 'medium',
        question_text: 'What is the highest-grossing film of all time (as of 2023)?',
        options: ['Avengers: Endgame', 'Avatar', 'Titanic', 'Star Wars: The Force Awakens'],
        correct_answer: 1,
        hint: 'Blue aliens.'
    },

    // --- Movies (Hard) ---
    {
        category: 'Movies',
        difficulty: 'hard',
        question_text: 'Who directed the movie "Inception"?',
        options: ['Steven Spielberg', 'Christopher Nolan', 'James Cameron', 'Quentin Tarantino'],
        correct_answer: 1,
        hint: 'He also directed The Dark Knight trilogy.'
    },
    {
        category: 'Movies',
        difficulty: 'hard',
        question_text: 'What was the first feature-length animated movie?',
        options: ['Pinocchio', 'Fantasia', 'Snow White and the Seven Dwarfs', 'Bambi'],
        correct_answer: 2,
        hint: 'Released by Disney in 1937.'
    },
    {
        category: 'Movies',
        difficulty: 'hard',
        question_text: 'Who wrote the score for "Star Wars"?',
        options: ['Hans Zimmer', 'John Williams', 'Ennio Morricone', 'Howard Shore'],
        correct_answer: 1,
        hint: 'Prolific composer.'
    },
    {
        category: 'Movies',
        difficulty: 'hard',
        question_text: 'Which movie is set on the planet Pandora?',
        options: ['Star Trek', 'Avatar', 'Guardians of the Galaxy', 'Dune'],
        correct_answer: 1,
        hint: 'Na\'vi people.'
    },
    {
        category: 'Movies',
        difficulty: 'hard',
        question_text: 'What is the name of the hobbit played by Elijah Wood?',
        options: ['Samwise', 'Bilbo', 'Frodo', 'Merry'],
        correct_answer: 2,
        hint: 'The Ring Bearer.'
    },

    // --- Sports (Easy) ---
    {
        category: 'Sports',
        difficulty: 'easy',
        question_text: 'Which sport is known as "The Beautiful Game"?',
        options: ['Basketball', 'Tennis', 'Soccer (Football)', 'Cricket'],
        correct_answer: 2,
        hint: 'Played with feet and a round ball.'
    },
    {
        category: 'Sports',
        difficulty: 'easy',
        question_text: 'What is the national sport of Japan?',
        options: ['Judo', 'Karate', 'Sumo', 'Baseball'],
        correct_answer: 2,
        hint: 'Wrestling with heavyweights.'
    },
    {
        category: 'Sports',
        difficulty: 'easy',
        question_text: 'Which sport uses a shuttlecock?',
        options: ['Tennis', 'Badminton', 'Squash', 'Ping Pong'],
        correct_answer: 1,
        hint: 'Played with racquets over a high net.'
    },
    {
        category: 'Sports',
        difficulty: 'easy',
        question_text: 'How many holes are in a standard golf course?',
        options: ['9', '18', '27', '36'],
        correct_answer: 1,
        hint: 'Double nine.'
    },
    {
        category: 'Sports',
        difficulty: 'easy',
        question_text: 'Which NBA player is known as "King James"?',
        options: ['Michael Jordan', 'Kobe Bryant', 'LeBron James', 'Shaquille O\'Neal'],
        correct_answer: 2,
        hint: 'Lakers star.'
    },

    // --- Sports (Medium) ---
    {
        category: 'Sports',
        difficulty: 'medium',
        question_text: 'How many players are on a basketball team on the court?',
        options: ['5', '6', '7', '11'],
        correct_answer: 0,
        hint: 'A standard starting lineup.'
    },
    {
        category: 'Sports',
        difficulty: 'medium',
        question_text: 'In tennis, what follows a score of 40-40?',
        options: ['Win', 'Deuce', 'Advantage', 'Love'],
        correct_answer: 1,
        hint: 'A tie score term.'
    },
    {
        category: 'Sports',
        difficulty: 'medium',
        question_text: 'Who has won the most Grand Slam tennis titles (Men\'s Singles)?',
        options: ['Roger Federer', 'Rafael Nadal', 'Novak Djokovic', 'Pete Sampras'],
        correct_answer: 2,
        hint: 'Serbian player.'
    },
    {
        category: 'Sports',
        difficulty: 'medium',
        question_text: 'Which country won the first FIFA World Cup?',
        options: ['Brazil', 'Argentina', 'Uruguay', 'Italy'],
        correct_answer: 2,
        hint: 'Host nation in 1930.'
    },
    {
        category: 'Sports',
        difficulty: 'medium',
        question_text: 'What is the length of a marathon?',
        options: ['26.2 miles', '20 miles', '13.1 miles', '30 miles'],
        correct_answer: 0,
        hint: 'Around 42 kilometers.'
    },

    // --- Sports (Hard) ---
    {
        category: 'Sports',
        difficulty: 'hard',
        question_text: 'Which country has won the most FIFA World Cups?',
        options: ['Germany', 'Italy', 'Argentina', 'Brazil'],
        correct_answer: 3,
        hint: 'Famous for yellow jerseys.'
    },
    {
        category: 'Sports',
        difficulty: 'hard',
        question_text: 'Who holds the record for the fastest 100m sprint?',
        options: ['Tyson Gay', 'Usain Bolt', 'Yohan Blake', 'Justin Gatlin'],
        correct_answer: 1,
        hint: 'Lightning.'
    },
    {
        category: 'Sports',
        difficulty: 'hard',
        question_text: 'In what year were the first modern Olympics held?',
        options: ['1896', '1900', '1904', '1924'],
        correct_answer: 0,
        hint: 'Athens, Greece.'
    },
    {
        category: 'Sports',
        difficulty: 'hard',
        question_text: 'How many points is a touchdown worth in American Football?',
        options: ['3', '6', '7', '2'],
        correct_answer: 1,
        hint: 'Without the extra point.'
    },
    {
        category: 'Sports',
        difficulty: 'hard',
        question_text: 'Which boxer was known as "The Greatest"?',
        options: ['Mike Tyson', 'Floyd Mayweather', 'Muhammad Ali', 'Rocky Marciano'],
        correct_answer: 2,
        hint: 'Float like a butterfly.'
    },

    // --- History (Easy) ---
    {
        category: 'History',
        difficulty: 'easy',
        question_text: 'Who discovered America in 1492?',
        options: ['Christopher Columbus', 'Leif Erikson', 'Amerigo Vespucci', 'Ferdinand Magellan'],
        correct_answer: 0,
        hint: 'Sailed the Ocean Blue.'
    },
    {
        category: 'History',
        difficulty: 'easy',
        question_text: 'Which ancient civilization built the pyramids?',
        options: ['Romans', 'Greeks', 'Egyptians', 'Mayans'],
        correct_answer: 2,
        hint: 'Pharaohs.'
    },
    {
        category: 'History',
        difficulty: 'easy',
        question_text: 'Who was the first man on the moon?',
        options: ['Buzz Aldrin', 'Neil Armstrong', 'Yuri Gagarin', 'Michael Collins'],
        correct_answer: 1,
        hint: 'One small step.'
    },
    {
        category: 'History',
        difficulty: 'easy',
        question_text: 'What wall divided Berlin?',
        options: ['Great Wall', 'Berlin Wall', 'Iron Curtain', 'Hadrian\'s Wall'],
        correct_answer: 1,
        hint: 'Fell in 1989.'
    },
    {
        category: 'History',
        difficulty: 'easy',
        question_text: 'Which country gifted the Statue of Liberty to the USA?',
        options: ['UK', 'Spain', 'France', 'Germany'],
        correct_answer: 2,
        hint: 'European ally.'
    },

    // --- History (Medium) ---
    {
        category: 'History',
        difficulty: 'medium',
        question_text: 'Who was the first President of the United States?',
        options: ['Thomas Jefferson', 'Abraham Lincoln', 'George Washington', 'John Adams'],
        correct_answer: 2,
        hint: 'He is on the one-dollar bill.'
    },
    {
        category: 'History',
        difficulty: 'medium',
        question_text: 'Which empire built the Colosseum?',
        options: ['Greek', 'Roman', 'Ottoman', 'Byzantine'],
        correct_answer: 1,
        hint: 'Based in Italy.'
    },
    {
        category: 'History',
        difficulty: 'medium',
        question_text: 'What ship hit an iceberg and sank in 1912?',
        options: ['Britannic', 'Olympic', 'Titanic', 'Lusitania'],
        correct_answer: 2,
        hint: 'Jack and Rose.'
    },
    {
        category: 'History',
        difficulty: 'medium',
        question_text: 'Who wrote the Declaration of Independence?',
        options: ['George Washington', 'Thomas Jefferson', 'Benjamin Franklin', 'John Hancock'],
        correct_answer: 1,
        hint: 'Third US President.'
    },
    {
        category: 'History',
        difficulty: 'medium',
        question_text: 'In which war was the Gettysburg Address given?',
        options: ['Revolutionary War', 'Civil War', 'WWI', 'War of 1812'],
        correct_answer: 1,
        hint: 'North vs South.'
    },

    // --- History (Hard) ---
    {
        category: 'History',
        difficulty: 'hard',
        question_text: 'In which year did World War II end?',
        options: ['1943', '1944', '1945', '1946'],
        correct_answer: 2,
        hint: 'The same year the UN was established.'
    },
    {
        category: 'History',
        difficulty: 'hard',
        question_text: 'What was the code name for the Battle of Normandy?',
        options: ['Operation Barbarossa', 'Operation Overlord', 'Operation Market Garden', 'Operation Torch'],
        correct_answer: 1,
        hint: 'Began on D-Day.'
    },
    {
        category: 'History',
        difficulty: 'hard',
        question_text: 'Who was the first female Prime Minister of the UK?',
        options: ['Theresa May', 'Margaret Thatcher', 'Indira Gandhi', 'Angela Merkel'],
        correct_answer: 1,
        hint: 'The Iron Lady.'
    },
    {
        category: 'History',
        difficulty: 'hard',
        question_text: 'Which year did the French Revolution start?',
        options: ['1776', '1789', '1804', '1815'],
        correct_answer: 1,
        hint: 'Storming of the Bastille.'
    },
    {
        category: 'History',
        difficulty: 'hard',
        question_text: 'Who was the last Tsar of Russia?',
        options: ['Peter the Great', 'Alexander II', 'Nicholas II', 'Ivan the Terrible'],
        correct_answer: 2,
        hint: 'Romanov dynasty.'
    },

    // --- Music (Easy) ---
    {
        category: 'Music',
        difficulty: 'easy',
        question_text: 'How many strings does a standard guitar have?',
        options: ['4', '5', '6', '7'],
        correct_answer: 2,
        hint: 'Half a dozen.'
    },
    {
        category: 'Music',
        difficulty: 'easy',
        question_text: 'What instrument has 88 keys?',
        options: ['Piano', 'Violin', 'Flute', 'Drum'],
        correct_answer: 0,
        hint: 'Black and white keys.'
    },
    {
        category: 'Music',
        difficulty: 'easy',
        question_text: 'Who sings "Hello"?',
        options: ['Adele', 'Taylor Swift', 'Beyonce', 'Rihanna'],
        correct_answer: 0,
        hint: 'British singer.'
    },
    {
        category: 'Music',
        difficulty: 'easy',
        question_text: 'Which band consists of John, Paul, George, and Ringo?',
        options: ['The Rolling Stones', 'The Beatles', 'Queen', 'Led Zeppelin'],
        correct_answer: 1,
        hint: 'Fab Four.'
    },
    {
        category: 'Music',
        difficulty: 'easy',
        question_text: 'What does a DJ do?',
        options: ['Dances', 'Plays music', 'Sings', 'Writes books'],
        correct_answer: 1,
        hint: 'Disc Jockey.'
    },

    // --- Music (Medium) ---
    {
        category: 'Music',
        difficulty: 'medium',
        question_text: 'Who is known as the "King of Pop"?',
        options: ['Elvis Presley', 'Michael Jackson', 'Prince', 'Freddie Mercury'],
        correct_answer: 1,
        hint: 'Thriller singer.'
    },
    {
        category: 'Music',
        difficulty: 'medium',
        question_text: 'Who released the album "1989"?',
        options: ['Katy Perry', 'Adele', 'Taylor Swift', 'Rihanna'],
        correct_answer: 2,
        hint: 'She was born in that year.'
    },
    {
        category: 'Music',
        difficulty: 'medium',
        question_text: 'What is the name of Beyoncé\'s fanbase?',
        options: ['Swifties', 'BeyHive', 'Little Monsters', 'Beliebers'],
        correct_answer: 1,
        hint: 'Buzzing.'
    },
    {
        category: 'Music',
        difficulty: 'medium',
        question_text: 'Which rapper is known as Slim Shady?',
        options: ['Drake', 'Kanye West', 'Eminem', 'Jay-Z'],
        correct_answer: 2,
        hint: 'Will the real Slim Shady please stand up?'
    },
    {
        category: 'Music',
        difficulty: 'medium',
        question_text: 'Who sang "I Will Always Love You"?',
        options: ['Mariah Carey', 'Celine Dion', 'Whitney Houston', 'Tina Turner'],
        correct_answer: 2,
        hint: 'From "The Bodyguard".'
    },

    // --- Music (Hard) ---
    {
        category: 'Music',
        difficulty: 'hard',
        question_text: 'Which band wrote the song "Bohemian Rhapsody"?',
        options: ['The Beatles', 'Led Zeppelin', 'Pink Floyd', 'Queen'],
        correct_answer: 3,
        hint: 'Freddie Mercury was the lead singer.'
    },
    {
        category: 'Music',
        difficulty: 'hard',
        question_text: 'Who composed "Symphony No. 9"?',
        options: ['Mozart', 'Beethoven', 'Bach', 'Chopin'],
        correct_answer: 1,
        hint: 'He was deaf when he wrote it.'
    },
    {
        category: 'Music',
        difficulty: 'hard',
        question_text: 'Which year did Woodstock take place?',
        options: ['1967', '1969', '1971', '1975'],
        correct_answer: 1,
        hint: 'Summer of Love.'
    },
    {
        category: 'Music',
        difficulty: 'hard',
        question_text: 'Who is the lead singer of Coldplay?',
        options: ['Chris Martin', 'Thom Yorke', 'Bono', 'Dave Grohl'],
        correct_answer: 0,
        hint: 'Yellow.'
    },
    {
        category: 'Music',
        difficulty: 'hard',
        question_text: 'Which genre originated in the Bronx, NYC?',
        options: ['Jazz', 'Blues', 'Hip Hop', 'Country'],
        correct_answer: 2,
        hint: 'DJ Kool Herc.'
    }
];

const seedDB = async () => {
    await connectDB();
    try {
        await Question.deleteMany({}); // Clear existing
        console.log('Cleared existing questions...');

        await Question.insertMany(questions);
        console.log(`Inserted ${questions.length} new questions!`);

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

seedDB();
