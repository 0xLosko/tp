const express = require('express');
const axios = require('axios');
const crypto = require('crypto');

const app = express();
const port = 3000;
const serverHost = 'http://34.163.219.17:3000';

app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
    next();
});

app.post('/subscribe', async (req, res) => {
    try {
        console.log('POST /subscribe');
        const response = await axios.post(`${serverHost}/subscribe`, req.body);
        res.status(response.status).json(response.data);
    } catch (error) {
        console.error('Error in /subscribe:', error);
        res.status(error.response?.status || 500).json(error.response?.data || { error: 'Internal server error' });
    }
});

app.get('/info/:address', async (req, res) => {
    try {
        console.log('GET /info/:address');
        const response = await axios.get(`${serverHost}/info/${req.params.address}`);
        res.status(response.status).json(response.data);
    } catch (error) {
        console.error('Error in /info/:address:', error.message);
        res.status(error.response?.status || 500).json(error.response?.data || { error: 'Internal server error' });
    }
});

app.get('/challenge/hash/:address', async (req, res) => {
    try {
        console.log('GET /challenge/hash/:address');
        const response = await axios.get(`${serverHost}/challenge/hash/${req.params.address}`);
        res.status(response.status).json(response.data);
    } catch (error) {
        console.error('Error in /challenge/hash/:address:', error.message);
        res.status(error.response?.status || 500).json(error.response?.data || { error: 'Internal server error' });
    }
});

app.post('/challenge/hash/:address/:challengeID', async (req, res) => {
    try {
        console.log('Received request body:', req.body);

        if (!req.body.Sentence) {
            console.error('No Sentence provided');
            return res.status(400).json({ error: 'Sentence is required' });
        }

        const sentence = req.body.Sentence;
        const hashedSentence = crypto.createHash('sha256').update(sentence, 'utf8').digest('hex');
        console.log('Hashed Sentence:', hashedSentence);

        const response = await axios.post(`${serverHost}/challenge/hash/${req.params.address}/${req.params.challengeID}`, { Hash: hashedSentence, Sentence: sentence });
        res.status(response.status).json(response.data);
    } catch (error) {
        console.error('Error in /challenge/hash/:address/:challengeID:', error.message);
        res.status(error.response?.status || 500).json(error.response?.data || { error: 'Internal server error' });
    }
});

app.get('/challenge/encrypt/:address', async (req, res) => {
    try {
        console.log('GET /challenge/encrypt/:address');
        const response = await axios.get(`${serverHost}/challenge/encrypt/${req.params.address}`);
        res.status(response.status).json(response.data);
    } catch (error) {
        console.error('Error in /challenge/encrypt/:address:', error.message);
        res.status(error.response?.status || 500).json(error.response?.data || { error: 'Internal server error' });
    }
});

app.post('/challenge/encrypt/:address/:challengeID', async (req, res) => {
    try {
        console.log('POST /challenge/encrypt/:address/:challengeID');
        console.log('Received request body:', req.body);

        const { sentence, public_key } = req.body;

        if (!sentence || !public_key) {
            console.error('Missing Sentence or publicKey in request body');
            return res.status(400).json({ error: 'Sentence and publicKey are required' });
        }

        const encryptedPhrase = encryptWithRSA(sentence, public_key);
        console.log(encryptedPhrase)

        const response = await axios.post(`${serverHost}/challenge/encrypt/${req.params.address}/${req.params.challengeID}`, { Sentence: sentence, cipherText: encryptedPhrase });
        res.status(response.status).json(response.data);
    } catch (error) {
        console.error('Error in /challenge/encrypt/:address/:challengeID:', error.message);
        res.status(error.response?.status || 500).json(error.response?.data || { error: 'Internal server error' });
    }
});

function encryptWithRSA(phrase, publicKey) {
    try {
        const cipher = crypto.publicEncrypt(
            {
                key: publicKey,
                padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
            },
            Buffer.from(phrase, 'utf8')
        );
        return cipher.toString('hex');
    } catch (error) {
        console.error('Error encrypting phrase with RSA:', error.message);
        throw error;
    }
}

app.listen(port, 'localhost', () => {
    console.log(`Server listening on port ${port}`);
});
