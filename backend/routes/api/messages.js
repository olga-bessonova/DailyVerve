const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const OpenAI = require('openai');
const Message = mongoose.model('Message');
const sgMail = require('@sendgrid/mail');
const schedule = require('node-schedule');
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
    const responseChatGpt = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      // max_tokens: 50,
    });
    const text = responseChatGpt.choices[0].message.content;

    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt: text,
      n: 1,
      size: '1024x1024',
    });
    const image_url = response.data[0].url;

    const newMessage = new Message({
      owner: req.user._id,
      text,
      prompt,
      imageUrl: image_url,
    });

    let message = await newMessage.save();
    message = await message.populate('owner', '_id username profileImageUrl');

    return res.json(message);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
});

// POST /api/messages/email
router.post('/email', async (req, res, next) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  // scheduleJob * seconds, * minutes, * hours, * day of month (1-31), * month, * day of week
  const job = schedule.scheduleJob('* 22 * * *', function () {
    const msg = {
      to: req.body.email,
      from: 'info.daily.verve@gmail.com',
      // send_at: 1694050095,
      subject: `Have a Nice Day!`,
      html: `
        <p>${req.body.text}</p>
        <img src=${req.body.imageUrl} alt="Embedded Image" />`,
      // text: 'Test Test Why did the scarecrow win an award? Because he was outstanding in his field!',
    };
    sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent');
        res.send(msg);
      })
      .catch((error) => {
        console.error(error);
      });
  });
});

module.exports = router;
