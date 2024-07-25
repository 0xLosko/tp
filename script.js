const axios = require('axios');
const crypto = require('crypto');

// Configuration
const serverHost = 'http://34.163.219.17:3000';
const address = '0x72370fec39ccc419669c892c6f34525b1361575e';

async function processChallenge() {
    try {
        // Étape 1 : Requête GET
        console.log('Fetching challenge data...');
        const getResponse = await axios.get(`${serverHost}/challenge/encrypt/${address}`);
        const {  challenge_id, sentence } = getResponse.data;
        console.log(getResponse.data)

        let hashedSentence = crypto.createHash('sha256').update(sentence, 'utf8').digest('hex');

        const postResponse = await axios.post(`${serverHost}/challenge/hash/${address}/${challenge_id}`, { Hash: hashedSentence, Sentence: sentence  });

        console.log('Response from POST request:', postResponse.data);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

// Exécution du script
for (let i = 0; i < 3000; i++) {
  processChallenge();
}
