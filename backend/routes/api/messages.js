const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const OpenAI = require('openai');
const Message = mongoose.model('Message');
const { requireUser } = require('../../config/passport');
const { openAiApiKey } = require('../../config/keys');

const openai = new OpenAI({
  apiKey: openAiApiKey,
});

// POST /api/messages/
router.post('/', requireUser, async (req, res, next) => {
  const prompt = req.body.prompt;
  try {
    if (!prompt) {
      throw new Error('Uh oh, no prompt was provided');
    }
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 50,
    });

    const newMessage = new Message({
      owner: req.user._id,
      text: response.choices[0].message.content,
      prompt,
    });

    let message = await newMessage.save();
    message = await message.populate('owner', '_id username');

    return res.json(message);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
});

module.exports = router;
