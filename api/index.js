const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 4000;

// Allow CORS for front-end
app.use(cors());
app.use(bodyParser.json());

// Simple in-memory store
let stories = [];

// Endpoint to receive stories from n8n
app.post('/api/news', (req, res) => {
    if (!req.body.summaries) {
        return res.status(400).json({ error: 'No summaries in request' });
    }

    // Save to in-memory store
    stories = req.body.summaries.map((s, i) => ({
        id: i + 1,
        summary: s,
        timestamp: new Date()
    }));

    console.log(`Received ${stories.length} stories`);
    res.status(200).json({ message: 'Stories saved' });
});

// Endpoint for front-end to fetch stories
app.get('/api/news', (req, res) => {
    res.json(stories);
});

// Start server
app.listen(PORT, () => {
    console.log(`API server running at http://localhost:${PORT}`);
});