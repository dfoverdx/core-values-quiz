let values = [
    { name: 'Acceptance', desc: 'to be open to and accepting of myself, others, life etc' },
    { name: 'Adventure', desc: 'to be adventurous; to actively seek, create, or explore novel or stimulating experiences' },
    { name: 'Assertiveness', desc: 'to respectfully stand up for my rights and request what I want' },
    { name: 'Authenticity', desc: 'to be authentic, genuine, real; to be true to myself' },
    { name: 'Beauty', desc: 'to appreciate, create, nurture or cultivate beauty in myself, others, the environment etc' },
    { name: 'Caring', desc: 'to be caring towards myself, others, the environment etc' },
    { name: 'Challenge', desc: 'to keep challenging myself to grow, learn, improve' },
    { name: 'Compassion', desc: 'to act with kindness towards those who are suffering' },
    { name: 'Connection', desc: 'to engage fully in whatever I am doing, and be fully present with others' },
    { name: 'Contribution', desc: 'to contribute, help, assist, or make a positive difference to myself or others' },
    { name: 'Conformity', desc: 'to be respectful and obedient of rules and obligations' },
    { name: 'Cooperation', desc: 'to be cooperative and collaborative with others' },
    { name: 'Courage', desc: 'to be courageous or brave; to persist in the face of fear, threat, or difficulty' },
    { name: 'Creativity', desc: 'to be creative or innovative' },
    { name: 'Curiosity', desc: 'to be curious, open-minded and interested; to explore and discover' },
    { name: 'Encouragement', desc: 'to encourage and reward behaviour that I value in myself or others' },
    { name: 'Equality', desc: 'to treat others as equal to myself, and vice-versa' },
    { name: 'Excitement', desc: 'to seek, create and engage in activities that are exciting, stimulating or thrilling' },
    { name: 'Fairness', desc: 'to be fair to myself or others' },
    { name: 'Fitness', desc: 'to maintain or improve my fitness; to look after my physical and mental health and wellbeing' },
    { name: 'Flexibility', desc: 'to adjust and adapt readily to changing circumstances' },
    { name: 'Freedom', desc: 'to live freely; to choose how I live and behave, or help others do likewise' },
    { name: 'Friendliness', desc: 'to be friendly, companionable, or agreeable towards others' },
    { name: 'Forgiveness', desc: 'to be forgiving towards myself or others' },
    { name: 'Fun', desc: 'to be fun-loving; to seek, create, and engage in fun-filled activities' },
    { name: 'Generosity', desc: 'to be generous, sharing and giving, to myself or others' },
    { name: 'Gratitude', desc: 'to be grateful for and appreciative of the positive aspects of myself, others and life' },
    { name: 'Honesty', desc: 'to be honest, truthful, and sincere with myself and others' },
    { name: 'Humour', desc: 'to see and appreciate the humorous side of life' },
    { name: 'Humility', desc: 'to be humble or modest; to let my achievements speak for themselves ' },
    { name: 'Industry', desc: 'to be industrious, hard-working, dedicated' },
    { name: 'Independence', desc: 'to be self-supportive, and choose my own way of doing things' },
    { name: 'Intimacy', desc: 'to open up, reveal, and share myself – emotionally or physically – in my close personal relationships' },
    { name: 'Justice', desc: 'to uphold justice and fairness' },
    { name: 'Kindness', desc: 'to be kind, compassionate, considerate, nurturing or caring towards myself or others' },
    { name: 'Love', desc: 'to act lovingly or affectionately towards myself or others' },
    { name: 'Mindfulness', desc: 'to be conscious of, open to, and curious about my here-and-now experience' },
    { name: 'Order', desc: 'to be orderly and organized' },
    { name: 'Open-mindedness', desc: 'to think things through, see things from other’s points of view, and weigh evidence fairly.' },
    { name: 'Patience', desc: 'to wait calmly for what I want' },
    { name: 'Persistence', desc: 'to continue resolutely, despite problems or difficulties.' },
    { name: 'Pleasure', desc: 'to create and give pleasure to myself or others' },
    { name: 'Power', desc: 'to strongly influence or wield authority over others, e.g. taking charge, leading, organizing' },
    { name: 'Reciprocity', desc: 'to build relationships in which there is a fair balance of giving and taking' },
    { name: 'Respect', desc: 'to be respectful towards myself or others; to be polite, considerate and show positive regard' },
    { name: 'Responsibility', desc: 'to be responsible and accountable for my actions' },
    { name: 'Romance', desc: 'to be romantic; to display and express love or strong affection' },
    { name: 'Safety', desc: 'to secure, protect, or ensure safety of myself or others' },
    { name: 'Self-awareness', desc: 'to be aware of my own thoughts, feelings and actions' },
    { name: 'Self-care', desc: 'to look after my health and wellbeing, and get my needs met' },
    { name: 'Self-development', desc: 'to keep growing, advancing or improving in knowledge, skills, character, or life experience.' },
    { name: 'Self-control', desc: 'to act in accordance with my own ideals' },
    { name: 'Sensuality', desc: 'to create, explore and enjoy experiences that stimulate the five senses' },
    { name: 'Sexuality', desc: 'to explore or express my sexuality' },
    { name: 'Spirituality', desc: 'to connect with things bigger than myself' },
    { name: 'Skillfulness', desc: 'to continually practice and improve my skills, and apply myself fully when using them' },
    { name: 'Supportiveness', desc: 'to be supportive, helpful, encouraging, and available to myself or others' },
    { name: 'Trust', desc: 'to be trustworthy; to be loyal, faithful, sincere, and reliable' }
];

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

// shuffle values
for (let i = 0; i < values.length; i++) {
    let swapi = getRandomInt(i, values.length);
    let temp = values[i];
    values[i] = values[swapi];
    values[swapi] = temp;
}

export default values;