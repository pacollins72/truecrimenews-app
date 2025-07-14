const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

let stories = [];

// POST endpoint for n8n
app.post('/api/news', (req, res) => {
    if (!req.body.summaries) {
        return res.status(400).json({ error: 'Missing summaries' });
    }

    stories = req.body.summaries.map(s => ({
        summary: s,
        timestamp: new Date()
    }));

    console.log(`Received ${stories.length} stories`);
    res.json({ message: 'Stories saved' });
});

// GET endpoint for browser
app.get('/', (req, res) => {
    let html = `
    <h1>True Crime News</h1>
    ${stories.length === 0 ? '<p>No stories yet.</p>' : ''}
    <ul>
        ${stories.map(s => `<li>${s.summary}</li>`).join('')}
    </ul>`;
    res.send(html);
});

app.listen(PORT, () => {
    console.log(`Service running on port ${PORT}`);
});