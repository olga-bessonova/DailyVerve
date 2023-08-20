const express = require('express');
const router = express.Router();
const OpenAI = require('openai');
const { openAiApiKey } = require('../../config/keys');

const openai = new OpenAI({
  apiKey: openAiApiKey,
});

// POST /api/openai/ask
router.post('/ask', async (req, res, next) => {
  const prompt = req.body.prompt;
  try {
    if (!prompt) {
      throw new Error('Uh oh, no prompt was provided');
    }
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    });
    const completion = response.data.choices[0].text;
    return res.status(200).json({
      success: true,
      message: completion,
    });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
});

module.exports = router;
