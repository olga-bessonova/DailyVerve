const mongoose = require("mongoose");
const { mongoURI: db } = require('../config/keys.js');
const User = require('../models/User');
const Tweet = require('../models/Tweet');
const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');


const users = [];

users.push(
  new User ({
    username: 'olga',
    email: 'olga@user.io',
    hashedPassword: bcrypt.hashSync('password', 10)
  })
)

users.push(
  new User ({
    username: 'stan',
    email: 'stan@user.io',
    hashedPassword: bcrypt.hashSync('password', 10)
  })
)

users.push(
  new User ({
    username: 'peter',
    email: 'peter@user.io',
    hashedPassword: bcrypt.hashSync('password', 10)
  })
)

users.push(
  new User ({
    username: 'amin',
    email: 'amin@user.io',
    hashedPassword: bcrypt.hashSync('password', 10)
  })
)

users.push(
  new User ({
    username: 'stephen',
    email: 'stephen@user.io',
    hashedPassword: bcrypt.hashSync('password', 10)
  })
)

users.push(
  new User ({
    username: 'clarence',
    email: 'clarence@user.io',
    hashedPassword: bcrypt.hashSync('password', 10)
  })
)

const NUM_SEED_TWEETS = 30;
// Create tweets
const tweets = [];

for (let i = 0; i < NUM_SEED_TWEETS; i++) {
  tweets.push(
    new Tweet ({
      text: faker.hacker.phrase(),
      author: users[Math.floor(Math.random() * users.length)]._id
    })
  )
}