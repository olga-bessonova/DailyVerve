const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const OpenAI = require('openai');
const Message = mongoose.model('Message');
const sgMail = require('@sendgrid/mail')
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
      to: 'teamsigndesign@gmail.com', 
      from: 'info.daily.verve@gmail.com', 
      send_at: 1693877295,
      subject: 'Sending with SendGrid is Fun',
      text: 'Why did the scarecrow win an award?Because he was outstanding in his field!',
      html: "<strong> What did one wall say to the other wall? I'll meet you at the corner! </strong>",
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
const sendEmail = () => {
  const msg = {
    to: 'olga.sleepless@gmail.com',
    from: 'info.daily.verve@gmail.com',
    subject: 'Sending with SendGrid is Fun',
    text: "Why did the scarecrow win an award? Because he was outstanding in his field!",
    html: "<strong>What did one wall say to the other wall? I'll meet you at the corner!</strong>",
  };

  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent');
    })
    .catch((error) => {
      console.error(error);
    });
};

// Schedule the email to be sent every day at 9:40 PM EST
const cronExpression = '40 21 * * *'; // EST is 5 hours behind UTC
const scheduledJob = schedule.scheduleJob(cronExpression, () => {
  sendEmail();
});

router.post('/email', async (req, res, next) => {
  res.send('Email will be sent every day at 9:40 PM EST.');
});



module.exports = router;
