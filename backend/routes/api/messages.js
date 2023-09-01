const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const OpenAI = require('openai');
const Message = mongoose.model('Message');
const sgMail = require('@sendgrid/mail')
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
      // max_tokens: 50,
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

// POST /api/messages/email

router.post('/email', async (req, res, next) => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
      to: 'olga.sleepless@gmail.com', // Change to your recipient
      from: 'info.daily.verve@gmail.com', // Change to your verified sender
      subject: 'Sending with SendGrid is Fun',
      text: 'and easy to do anywhere, even with Node.js',
      html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    }
    sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent')
        res.send(msg)
      })
      .catch((error) => {
        console.error(error)
      })
});



module.exports = router;
